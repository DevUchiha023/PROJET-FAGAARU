import { BleManager, Device, Subscription, Characteristic } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

export interface VitalData {
  temperature?: number;
  heartRate?: number;
  oxygenSaturation?: number;
  bloodPressure?: { systolic: number; diastolic: number };
}

class BluetoothService {
  private static instance: BluetoothService;
  private manager: BleManager;
  private connectedDevice: Device | null = null;
  private dataSubscription: Subscription | null = null;

  constructor() {
    this.manager = new BleManager();
  }

  static getInstance(): BluetoothService {
    if (!BluetoothService.instance) {
      BluetoothService.instance = new BluetoothService();
    }
    return BluetoothService.instance;
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  }

  async scanForDevices(onDeviceFound: (device: Device) => void, scanTimeout = 10000): Promise<void> {
    await this.requestPermissions();
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        Alert.alert('Erreur Bluetooth', error.message);
        return;
      }
      if (device && device.name) {
        onDeviceFound(device);
      }
    });
    setTimeout(() => {
      this.manager.stopDeviceScan();
    }, scanTimeout);
  }

  stopScan() {
    this.manager.stopDeviceScan();
  }

  async connectToDevice(deviceId: string): Promise<Device | null> {
    try {
      const device = await this.manager.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      this.connectedDevice = device;
      return device;
    } catch (error) {
      Alert.alert('Connexion échouée', 'Impossible de se connecter au bracelet.');
      return null;
    }
  }

  async disconnect() {
    if (this.connectedDevice) {
      await this.connectedDevice.cancelConnection();
      this.connectedDevice = null;
    }
    if (this.dataSubscription) {
      this.dataSubscription.remove();
      this.dataSubscription = null;
    }
  }

  async readVitalData(
    serviceUUID: string,
    characteristicUUID: string,
    onData: (data: VitalData) => void
  ) {
    if (!this.connectedDevice) return;
    this.dataSubscription = this.manager.monitorCharacteristicForDevice(
      this.connectedDevice.id,
      serviceUUID,
      characteristicUUID,
      (error, characteristic) => {
        if (error) {
          Alert.alert('Erreur de lecture', error.message);
          return;
        }
        if (characteristic?.value) {
          // Décoder la donnée reçue (base64 -> string -> JSON ou valeurs)
          const decoded = Buffer.from(characteristic.value, 'base64').toString('utf-8');
          try {
            const data = JSON.parse(decoded);
            onData(data);
          } catch {
            // Si ce n'est pas du JSON, essayer de parser autrement
            onData({});
          }
        }
      }
    );
  }

  getConnectedDevice(): Device | null {
    return this.connectedDevice;
  }
}

export default BluetoothService.getInstance(); 