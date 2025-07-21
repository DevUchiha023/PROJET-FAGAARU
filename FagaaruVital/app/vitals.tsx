import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import HealthDataService, { VitalSigns, HealthAlert } from '../services/HealthDataService';
import NotificationService from '../services/NotificationService';
import BluetoothService, { VitalData } from '../services/BluetoothService';
import { Device } from 'react-native-ble-plx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  vitalCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  vitalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  vitalInfo: {
    flex: 1,
  },
  vitalName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vitalUnit: {
    fontSize: 14,
    opacity: 0.7,
  },
  vitalStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  alertsSection: {
    marginTop: 20,
  },
  alertCard: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    opacity: 0.8,
  },
  alertTime: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  acknowledgeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 10,
  },
  acknowledgeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendsSection: {
    marginTop: 20,
  },
  trendCard: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  trendValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trendDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendItem: {
    alignItems: 'center',
  },
  trendLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  trendData: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default function VitalsScreen() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  
  const safeTheme = theme || {
    colors: {
      primary: '#007AFF',
      background: '#F8F9FA',
      card: '#FFFFFF',
      text: '#000000',
      textSecondary: '#6C757D',
      border: '#E9ECEF',
    },
  };

  const [latestVitals, setLatestVitals] = useState<VitalSigns | null>(null);
  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    temperature: '',
    heartRate: '',
    systolic: '',
    diastolic: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    bloodSugar: '',
    weight: '',
    height: '',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [showDevicesModal, setShowDevicesModal] = useState(false);

  useEffect(() => {
    loadVitalSigns();
    loadHealthAlerts();
  }, []);

  const loadVitalSigns = async () => {
    try {
      const vitals = await HealthDataService.getLatestVitalSigns();
      setLatestVitals(vitals);
    } catch (error) {
      console.error('Erreur lors du chargement des vitaux:', error);
    }
  };

  const loadHealthAlerts = async () => {
    try {
      const alerts = await HealthDataService.getHealthAlerts();
      setHealthAlerts(alerts.filter(alert => !alert.acknowledged));
    } catch (error) {
      console.error('Erreur lors du chargement des alertes:', error);
    }
  };

  const handleAddVitalSigns = async () => {
    try {
      const vitalSigns = {
        temperature: parseFloat(formData.temperature) || 0,
        heartRate: parseInt(formData.heartRate) || 0,
        bloodPressure: {
          systolic: parseInt(formData.systolic) || 0,
          diastolic: parseInt(formData.diastolic) || 0,
        },
        oxygenSaturation: parseInt(formData.oxygenSaturation) || 0,
        respiratoryRate: parseInt(formData.respiratoryRate) || 0,
        bloodSugar: parseFloat(formData.bloodSugar) || undefined,
        weight: parseFloat(formData.weight) || undefined,
        height: parseFloat(formData.height) || undefined,
      };

      await HealthDataService.saveVitalSigns(vitalSigns);
      
      // Recharger les données
      await loadVitalSigns();
      await loadHealthAlerts();
      
      setShowAddModal(false);
      setFormData({
        temperature: '',
        heartRate: '',
        systolic: '',
        diastolic: '',
        oxygenSaturation: '',
        respiratoryRate: '',
        bloodSugar: '',
        weight: '',
        height: '',
      });

      Alert.alert('Succès', 'Signes vitaux enregistrés avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des vitaux:', error);
      Alert.alert('Erreur', 'Impossible d\'enregistrer les signes vitaux');
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      await HealthDataService.acknowledgeAlert(alertId);
      await loadHealthAlerts();
    } catch (error) {
      console.error('Erreur lors de la reconnaissance d\'alerte:', error);
    }
  };

  const getVitalStatus = (value: number, type: string) => {
    const thresholds = {
      temperature: { min: 36.0, max: 37.5 },
      heartRate: { min: 60, max: 100 },
      oxygenSaturation: { min: 95, max: 100 },
    };

    const threshold = thresholds[type as keyof typeof thresholds];
    if (!threshold) return { status: 'normal', color: '#4CAF50' };

    if (value < threshold.min) return { status: 'bas', color: '#FF9800' };
    if (value > threshold.max) return { status: 'élevé', color: '#F44336' };
    return { status: 'normal', color: '#4CAF50' };
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#F44336';
      case 'high': return '#FF9800';
      case 'medium': return '#FFC107';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Ajout de la logique Bluetooth
  const handleScanDevices = async () => {
    setDevices([]);
    setScanning(true);
    setShowDevicesModal(true);
    BluetoothService.scanForDevices((device) => {
      setDevices((prev) => {
        if (!prev.find((d) => d.id === device.id)) {
          return [...prev, device];
        }
        return prev;
      });
    }, 8000);
    setTimeout(() => setScanning(false), 8000);
  };

  const handleConnectToDevice = async (device: Device) => {
    setShowDevicesModal(false);
    const connected = await BluetoothService.connectToDevice(device.id);
    if (connected) {
      setIsConnected(true);
      Alert.alert('Connecté', `Bracelet ${device.name || device.id} connecté !`);
      // Exemple : lire les données (UUIDs à adapter selon l'ESP32)
      BluetoothService.readVitalData(
        '0000181a-0000-1000-8000-00805f9b34fb', // Service UUID (exemple)
        '00002a6e-0000-1000-8000-00805f9b34fb', // Characteristic UUID (exemple)
        (data: VitalData) => {
          // Ici, on peut sauvegarder les données automatiquement
          if (data.temperature || data.heartRate || data.oxygenSaturation) {
            HealthDataService.saveVitalSigns({
              temperature: data.temperature || 0,
              heartRate: data.heartRate || 0,
              bloodPressure: data.bloodPressure || { systolic: 0, diastolic: 0 },
              oxygenSaturation: data.oxygenSaturation || 0,
              respiratoryRate: 0,
            });
            loadVitalSigns();
          }
        }
      );
    } else {
      setIsConnected(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}> 
      {/* Bouton de connexion Bluetooth */}
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: isConnected ? '#4CAF50' : safeTheme.colors.primary }]}
          onPress={handleScanDevices}
          disabled={scanning || isConnected}
        >
          <Ionicons name={isConnected ? 'bluetooth' : 'bluetooth-outline'} size={20} color="white" />
          <Text style={styles.addButtonText}>
            {isConnected ? 'Bracelet connecté' : scanning ? 'Scan en cours...' : 'Connecter le bracelet'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de sélection des périphériques BLE */}
      <Modal
        visible={showDevicesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDevicesModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: safeTheme.colors.card }]}> 
            <Text style={[styles.modalTitle, { color: safeTheme.colors.text }]}>Sélectionnez un bracelet</Text>
            <ScrollView>
              {devices.length === 0 && (
                <Text style={{ color: safeTheme.colors.textSecondary, textAlign: 'center', marginVertical: 20 }}>
                  Aucun périphérique trouvé
                </Text>
              )}
              {devices.map((device) => (
                <TouchableOpacity
                  key={device.id}
                  style={{ padding: 15, borderBottomWidth: 1, borderColor: safeTheme.colors.border }}
                  onPress={() => handleConnectToDevice(device)}
                >
                  <Text style={{ color: safeTheme.colors.text }}>{device.name || device.id}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.submitButton, { marginTop: 20 }]}
              onPress={() => setShowDevicesModal(false)}
            >
              <Text style={styles.submitButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content}>
        <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
          <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>{t('vitalSigns')}</Text>
          <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
            Suivez vos constantes vitales en temps réel
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Derniers signes vitaux</Text>
          
          {latestVitals ? (
            <>
              {/* Température */}
              <View style={[styles.vitalCard, { backgroundColor: safeTheme.colors.card }]}>
                <View style={styles.vitalHeader}>
                  <View style={[styles.vitalIcon, { backgroundColor: '#FF5722' }]}>
                    <Ionicons name="thermometer" size={20} color="white" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={[styles.vitalName, { color: safeTheme.colors.text }]}>Température</Text>
                    <Text style={[styles.vitalValue, { color: safeTheme.colors.text }]}>
                      {latestVitals.temperature}°C
                    </Text>
                    <Text style={[styles.vitalStatus, { 
                      backgroundColor: getVitalStatus(latestVitals.temperature, 'temperature').color + '20',
                      color: getVitalStatus(latestVitals.temperature, 'temperature').color,
                    }]}>
                      {getVitalStatus(latestVitals.temperature, 'temperature').status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Fréquence cardiaque */}
              <View style={[styles.vitalCard, { backgroundColor: safeTheme.colors.card }]}>
                <View style={styles.vitalHeader}>
                  <View style={[styles.vitalIcon, { backgroundColor: '#E91E63' }]}>
                    <Ionicons name="heart" size={20} color="white" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={[styles.vitalName, { color: safeTheme.colors.text }]}>Fréquence cardiaque</Text>
                    <Text style={[styles.vitalValue, { color: safeTheme.colors.text }]}>
                      {latestVitals.heartRate} bpm
                    </Text>
                    <Text style={[styles.vitalStatus, { 
                      backgroundColor: getVitalStatus(latestVitals.heartRate, 'heartRate').color + '20',
                      color: getVitalStatus(latestVitals.heartRate, 'heartRate').color,
                    }]}>
                      {getVitalStatus(latestVitals.heartRate, 'heartRate').status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Tension artérielle */}
              <View style={[styles.vitalCard, { backgroundColor: safeTheme.colors.card }]}>
                <View style={styles.vitalHeader}>
                  <View style={[styles.vitalIcon, { backgroundColor: '#9C27B0' }]}>
                    <Ionicons name="pulse" size={20} color="white" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={[styles.vitalName, { color: safeTheme.colors.text }]}>Tension artérielle</Text>
                    <Text style={[styles.vitalValue, { color: safeTheme.colors.text }]}>
                      {latestVitals.bloodPressure.systolic}/{latestVitals.bloodPressure.diastolic} mmHg
                    </Text>
                    <Text style={[styles.vitalUnit, { color: safeTheme.colors.textSecondary }]}>
                      Systolique/Diastolique
                    </Text>
                  </View>
                </View>
              </View>

              {/* Saturation en oxygène */}
              <View style={[styles.vitalCard, { backgroundColor: safeTheme.colors.card }]}>
                <View style={styles.vitalHeader}>
                  <View style={[styles.vitalIcon, { backgroundColor: '#2196F3' }]}>
                    <Ionicons name="water" size={20} color="white" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={[styles.vitalName, { color: safeTheme.colors.text }]}>Saturation O₂</Text>
                    <Text style={[styles.vitalValue, { color: safeTheme.colors.text }]}>
                      {latestVitals.oxygenSaturation}%
                    </Text>
                    <Text style={[styles.vitalStatus, { 
                      backgroundColor: getVitalStatus(latestVitals.oxygenSaturation, 'oxygenSaturation').color + '20',
                      color: getVitalStatus(latestVitals.oxygenSaturation, 'oxygenSaturation').color,
                    }]}>
                      {getVitalStatus(latestVitals.oxygenSaturation, 'oxygenSaturation').status}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.vitalTime, { color: safeTheme.colors.textSecondary, textAlign: 'center', marginTop: 10 }]}>
                Dernière mise à jour: {formatDate(latestVitals.timestamp)}
              </Text>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={[styles.emptyText, { color: safeTheme.colors.textSecondary }]}>
                Aucune donnée de signes vitaux disponible
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: safeTheme.colors.primary }]}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addButtonText}>Ajouter des signes vitaux</Text>
          </TouchableOpacity>
        </View>

        {/* Alertes de santé */}
        {healthAlerts.length > 0 && (
          <View style={styles.alertsSection}>
            <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Alertes de santé</Text>
            {healthAlerts.map((alert) => (
              <View
                key={alert.id}
                style={[
                  styles.alertCard,
                  { backgroundColor: getAlertSeverityColor(alert.severity) + '20' }
                ]}
              >
                <Ionicons
                  name="warning"
                  size={24}
                  color={getAlertSeverityColor(alert.severity)}
                  style={styles.alertIcon}
                />
                <View style={styles.alertContent}>
                  <Text style={[styles.alertTitle, { color: safeTheme.colors.text }]}>
                    {alert.message}
                  </Text>
                  <Text style={[styles.alertMessage, { color: safeTheme.colors.textSecondary }]}>
                    Valeur: {alert.value} (Seuil: {alert.threshold})
                  </Text>
                  <Text style={[styles.alertTime, { color: safeTheme.colors.textSecondary }]}>
                    {formatDate(alert.timestamp)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.acknowledgeButton,
                    { backgroundColor: getAlertSeverityColor(alert.severity) }
                  ]}
                  onPress={() => handleAcknowledgeAlert(alert.id)}
                >
                  <Text style={[styles.acknowledgeButtonText, { color: 'white' }]}>
                    Vu
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal pour ajouter des signes vitaux */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: safeTheme.colors.text }]}>
                Ajouter des signes vitaux
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddModal(false)}
              >
                <Ionicons name="close" size={24} color={safeTheme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Température (°C)</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 36.8"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.temperature}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, temperature: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Fréquence cardiaque (bpm)</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 72"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.heartRate}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, heartRate: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Tension systolique (mmHg)</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 120"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.systolic}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, systolic: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Tension diastolique (mmHg)</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 80"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.diastolic}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, diastolic: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Saturation O₂ (%)</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 98"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.oxygenSaturation}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, oxygenSaturation: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Fréquence respiratoire (resp/min)</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 16"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.respiratoryRate}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, respiratoryRate: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Glycémie (mg/dL) - Optionnel</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 100"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.bloodSugar}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, bloodSugar: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Poids (kg) - Optionnel</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 70"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.weight}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, weight: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Taille (cm) - Optionnel</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: 175"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.height}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, height: text }))}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddVitalSigns}
              >
                <Text style={styles.submitButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
} 