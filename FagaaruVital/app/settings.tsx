import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { router } from 'expo-router';

// Styles pour CustomSwitch
const switchStyles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
  },
});

// Composant Switch personnalisé
const CustomSwitch = ({ value, onValueChange, disabled = false }: { 
  value: boolean; 
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}) => {
  const { theme } = useAppTheme();
  
  // Vérification de sécurité pour le thème
  const safeTheme = theme || {
    colors: {
      primary: '#007AFF',
      border: '#E9ECEF',
    },
  };
  
  return (
    <TouchableOpacity
      style={[
        switchStyles.switchContainer,
        {
          backgroundColor: value ? safeTheme.colors.primary : safeTheme.colors.border,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.7}
    >
      <View
        style={[
          switchStyles.switchThumb,
          {
            transform: [{ translateX: value ? 20 : 2 }],
            backgroundColor: 'white',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

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
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  emergencyCard: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  emergencyIcon: {
    marginBottom: 8,
  },
  emergencyLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useAppTheme();
  
  // Vérification de sécurité pour le thème
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

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationServices: true,
    dataSync: true,
    privacyMode: false,
  });

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'darkMode') {
      toggleTheme();
    }
  };

  const handleSectionPress = (section: string) => {
    setSelectedSection(section);
  };

  const handleBackToList = () => {
    setSelectedSection(null);
  };

  const handleEmergencyCall = (service: string) => {
    Alert.alert(
      `Appel ${service}`,
      `Voulez-vous appeler les ${service} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => Alert.alert('Appel', `Appel vers ${service} en cours...`) },
      ]
    );
  };

  const renderParametres = () => (
    <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
      <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Paramètres de l'application</Text>
      <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
        Configurez l'application selon vos préférences
      </Text>
      
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Notifications</Text>
          <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
            Recevoir les notifications importantes
          </Text>
        </View>
        <CustomSwitch
          value={settings.notifications}
          onValueChange={(value) => handleSettingChange('notifications', value)}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Mode sombre</Text>
          <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
            Activer le thème sombre
          </Text>
        </View>
        <CustomSwitch
          value={settings.darkMode}
          onValueChange={(value) => handleSettingChange('darkMode', value)}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Services de localisation</Text>
          <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
            Autoriser l'accès à la localisation
          </Text>
        </View>
        <CustomSwitch
          value={settings.locationServices}
          onValueChange={(value) => handleSettingChange('locationServices', value)}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Synchronisation des données</Text>
          <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
            Synchroniser avec le cloud
          </Text>
        </View>
        <CustomSwitch
          value={settings.dataSync}
          onValueChange={(value) => handleSettingChange('dataSync', value)}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Mode privé</Text>
          <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
            Masquer les informations sensibles
          </Text>
        </View>
        <CustomSwitch
          value={settings.privacyMode}
          onValueChange={(value) => handleSettingChange('privacyMode', value)}
        />
      </View>
    </View>
  );

  const renderUrgences = () => (
    <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
      <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Services d'urgence</Text>
      <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
        Accès rapide aux services d'urgence
      </Text>
      
      <View style={styles.emergencyGrid}>
        <TouchableOpacity
          style={[styles.emergencyCard, { backgroundColor: '#FFEBEE' }]}
          onPress={() => handleEmergencyCall('SAMU')}
        >
          <Ionicons name="medical" size={24} color="#D32F2F" style={styles.emergencyIcon} />
          <Text style={[styles.emergencyLabel, { color: '#D32F2F' }]}>SAMU</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.emergencyCard, { backgroundColor: '#E3F2FD' }]}
          onPress={() => handleEmergencyCall('Police')}
        >
          <Ionicons name="shield" size={24} color="#1976D2" style={styles.emergencyIcon} />
          <Text style={[styles.emergencyLabel, { color: '#1976D2' }]}>Police</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.emergencyCard, { backgroundColor: '#FFF3E0' }]}
          onPress={() => handleEmergencyCall('Pompiers')}
        >
          <Ionicons name="flame" size={24} color="#F57C00" style={styles.emergencyIcon} />
          <Text style={[styles.emergencyLabel, { color: '#F57C00' }]}>Pompiers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.emergencyCard, { backgroundColor: '#E8F5E8' }]}
          onPress={() => handleEmergencyCall('Médecin')}
        >
          <Ionicons name="person" size={24} color="#388E3C" style={styles.emergencyIcon} />
          <Text style={[styles.emergencyLabel, { color: '#388E3C' }]}>Médecin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.emergencyButton, { backgroundColor: '#F44336' }]}
        onPress={() => handleEmergencyCall('Urgences')}
      >
        <Ionicons name="call" size={20} color="white" />
        <Text style={styles.emergencyButtonText}>Appel d'urgence</Text>
      </TouchableOpacity>
    </View>
  );

  const renderParametresDetail = () => (
    <ScrollView style={styles.content}>
      <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity onPress={handleBackToList} style={{ marginRight: 15 }}>
            <Ionicons name="arrow-back" size={24} color={safeTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Paramètres avancés</Text>
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Langue</Text>
            <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
              Français
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={safeTheme.colors.textSecondary} />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Taille du texte</Text>
            <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
              Normal
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={safeTheme.colors.textSecondary} />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Sauvegarde</Text>
            <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>
              Dernière sauvegarde: Aujourd'hui
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={safeTheme.colors.textSecondary} />
        </View>
      </View>
    </ScrollView>
  );

  const renderUrgencesDetail = () => (
    <ScrollView style={styles.content}>
      <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity onPress={handleBackToList} style={{ marginRight: 15 }}>
            <Ionicons name="arrow-back" size={24} color={safeTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Services d'urgence</Text>
        </View>
        
        <View style={styles.emergencyGrid}>
          <TouchableOpacity
            style={[styles.emergencyCard, { backgroundColor: '#FFEBEE' }]}
            onPress={() => handleEmergencyCall('SAMU')}
          >
            <Ionicons name="medical" size={24} color="#D32F2F" style={styles.emergencyIcon} />
            <Text style={[styles.emergencyLabel, { color: '#D32F2F' }]}>SAMU (15)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.emergencyCard, { backgroundColor: '#E3F2FD' }]}
            onPress={() => handleEmergencyCall('Police')}
          >
            <Ionicons name="shield" size={24} color="#1976D2" style={styles.emergencyIcon} />
            <Text style={[styles.emergencyLabel, { color: '#1976D2' }]}>Police (17)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.emergencyCard, { backgroundColor: '#FFF3E0' }]}
            onPress={() => handleEmergencyCall('Pompiers')}
          >
            <Ionicons name="flame" size={24} color="#F57C00" style={styles.emergencyIcon} />
            <Text style={[styles.emergencyLabel, { color: '#F57C00' }]}>Pompiers (18)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.emergencyCard, { backgroundColor: '#E8F5E8' }]}
            onPress={() => handleEmergencyCall('Médecin')}
          >
            <Ionicons name="person" size={24} color="#388E3C" style={styles.emergencyIcon} />
            <Text style={[styles.emergencyLabel, { color: '#388E3C' }]}>Médecin</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.emergencyButton, { backgroundColor: '#F44336' }]}
          onPress={() => handleEmergencyCall('Urgences')}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text style={styles.emergencyButtonText}>Appel d'urgence</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      {selectedSection ? (
        selectedSection === 'parametres' ? renderParametresDetail() :
        selectedSection === 'urgences' ? renderUrgencesDetail() : null
      ) : (
        <>
          <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Paramètres</Text>
            <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
              Configurez l'application et accédez aux services d'urgence
            </Text>
          </View>

          <ScrollView style={styles.content}>
            {renderParametres()}
            {renderUrgences()}
          </ScrollView>
        </>
      )}
    </View>
  );
} 