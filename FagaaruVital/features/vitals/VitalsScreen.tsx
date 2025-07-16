import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Vibration } from 'react-native';

const getRandom = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

export default function VitalsScreen() {
  const [temperature, setTemperature] = useState(36.8);
  const [bpm, setBpm] = useState(75);
  const [spo2, setSpo2] = useState(98);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulation de données
      const temp = getRandom(35, 40) + Math.random();
      const heart = getRandom(50, 120);
      const oxy = getRandom(88, 100);
      setTemperature(Number(temp.toFixed(1)));
      setBpm(heart);
      setSpo2(oxy);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Détection d'anomalies
    if (temperature > 38 && bpm > 100) {
      setAlert('Fièvre suspectée');
      Vibration.vibrate(500);
    } else if (spo2 < 93) {
      setAlert('Hypoxie détectée');
      Vibration.vibrate(500);
    } else if (temperature < 35.5 && bpm < 55) {
      setAlert('Hypothermie ou bradycardie');
      Vibration.vibrate(500);
    } else {
      setAlert(null);
    }
  }, [temperature, bpm, spo2]);

  const getColor = (type: string) => {
    if (type === 'temp') {
      if (temperature > 38 || temperature < 35.5) return '#ff4d4d';
      return '#4caf50';
    }
    if (type === 'bpm') {
      if (bpm > 100 || bpm < 55) return '#ff4d4d';
      return '#4caf50';
    }
    if (type === 'spo2') {
      if (spo2 < 93) return '#ff4d4d';
      return '#4caf50';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signes vitaux (simulation)</Text>
      <View style={styles.row}>
        <Text style={[styles.value, { color: getColor('temp') }]}>🌡 Température: {temperature}°C</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.value, { color: getColor('bpm') }]}>❤️ BPM: {bpm}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.value, { color: getColor('spo2') }]}>🩸 SpO₂: {spo2}%</Text>
      </View>
      {alert && <Text style={styles.alert}>{alert}</Text>}
      <Button title="Simuler nouvelle mesure" onPress={() => {
        setTemperature(getRandom(35, 40) + Math.random());
        setBpm(getRandom(50, 120));
        setSpo2(getRandom(88, 100));
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
  },
  alert: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 20,
  },
}); 