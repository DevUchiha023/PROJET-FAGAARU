import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const SERVICE_UUID = '0000181a-0000-1000-8000-00805f9b34fb'; // Exemple: Health Thermometer
const TEMP_CHAR_UUID = '00002a1c-0000-1000-8000-00805f9b34fb'; // Température
const BPM_CHAR_UUID = '00002a37-0000-1000-8000-00805f9b34fb'; // BPM
const SPO2_CHAR_UUID = '00002a5f-0000-1000-8000-00805f9b34fb'; // SpO2 (exemple)
const DEVICE_NAME = 'FagaaruBracelet'; // À adapter selon le nom du bracelet

const manager = new BleManager();

export default function BluetoothConnection({ onConnect, onDisconnect, onData }) {
  const [isScanning, setIsScanning] = useState(false);
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState('Déconnecté');

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  const startScan = () => {
    setIsScanning(true);
    setStatus('Recherche du bracelet...');
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        setStatus('Erreur scan Bluetooth');
        setIsScanning(false);
        return;
      }
      if (scannedDevice && scannedDevice.name === DEVICE_NAME) {
        setStatus('Bracelet détecté, connexion...');
        manager.stopDeviceScan();
        scannedDevice.connect()
          .then((d) => d.discoverAllServicesAndCharacteristics())
          .then((d) => {
            setDevice(d);
            setStatus('Connecté');
            onConnect && onConnect(d);
            // Lecture des caractéristiques BLE
            readVitals(d);
          })
          .catch(() => {
            setStatus('Erreur de connexion');
          })
          .finally(() => setIsScanning(false));
      }
    });
  };

  const readVitals = async (d) => {
    try {
      // Température
      const tempChar = await d.readCharacteristicForService(SERVICE_UUID, TEMP_CHAR_UUID);
      const tempValue = parseTemperature(tempChar.value);
      // BPM
      const bpmChar = await d.readCharacteristicForService(SERVICE_UUID, BPM_CHAR_UUID);
      const bpmValue = parseBPM(bpmChar.value);
      // SpO2
      const spo2Char = await d.readCharacteristicForService(SERVICE_UUID, SPO2_CHAR_UUID);
      const spo2Value = parseSpO2(spo2Char.value);
      // Transmettre les données au parent
      onData && onData({ temperature: tempValue, bpm: bpmValue, spo2: spo2Value });
    } catch (e) {
      setStatus('Erreur lecture données');
    }
  };

  // Fonctions de décodage (à adapter selon le format du bracelet)
  const parseTemperature = (value) => {
    // Décoder la valeur base64/hex selon le format du bracelet
    return 37.0; // Valeur simulée
  };
  const parseBPM = (value) => {
    return 72; // Valeur simulée
  };
  const parseSpO2 = (value) => {
    return 98; // Valeur simulée
  };

  const disconnect = () => {
    if (device) {
      device.cancelConnection();
      setDevice(null);
      setStatus('Déconnecté');
      onDisconnect && onDisconnect();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Bluetooth : {status}</Text>
      {!device && (
        <Button title={isScanning ? 'Recherche...' : 'Se connecter au bracelet'} onPress={startScan} disabled={isScanning} />
      )}
      {device && (
        <Button title="Se déconnecter" onPress={disconnect} color="#F44336" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
    color: '#007AFF',
  },
}); 