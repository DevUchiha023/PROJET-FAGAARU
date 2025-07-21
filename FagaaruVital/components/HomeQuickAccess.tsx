import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const MODULES = [
  { key: 'pre-diagnostic', label: 'Pre-Diagnostique AI', icon: 'scan', color: '#007AFF', bgColor: '#E3F2FD', description: 'Analyser symptômes et scanner plaies' },
  { key: 'vitals', label: 'Vitaux', icon: 'heart', color: '#4CAF50', bgColor: '#E8F5E8', description: 'Suivre vos constantes' },
  { key: 'teleconsultation', label: 'Téléconsultation', icon: 'videocam', color: '#FF9800', bgColor: '#FFF3E0', description: 'Consulter en ligne' },
  { key: 'geolocation', label: 'Géolocalisation', icon: 'location', color: '#9C27B0', bgColor: '#F3E5F5', description: 'Trouver des soins' },
  { key: 'pharmacy', label: 'Pharmacie', icon: 'medical', color: '#E91E63', bgColor: '#FCE4EC', description: 'Informations sur les médicaments' },
  { key: 'medical-record', label: 'Dossier Médical', icon: 'document-text', color: '#607D8B', bgColor: '#ECEFF1', description: 'Dossier, statistiques et profil' },
  { key: 'reminders', label: 'Rappels', icon: 'notifications', color: '#FF5722', bgColor: '#FBE9E7', description: 'Gérer vos rappels' },
  { key: 'settings', label: 'Paramètres', icon: 'settings', color: '#9E9E9E', bgColor: '#F5F5F5', description: 'Configurer l\'app et urgences' },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: (width - 60) / 2 - 10, // 2 cartes par ligne avec espacement
    height: 140, // Hauteur augmentée pour plus d'espace
    borderRadius: 15,
    padding: 15, // Padding augmenté
    marginBottom: 15, // Espacement vertical augmenté
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 45, // Icône plus grande
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14, // Texte plus grand
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 10, // Description plus grande
    color: '#666',
    textAlign: 'center',
    lineHeight: 12,
  },
});

interface HomeQuickAccessProps {
  onPress: (module: string) => void;
}

export default function HomeQuickAccess({ onPress }: HomeQuickAccessProps) {
  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const handleModulePress = (moduleKey: string) => {
    // Navigation vers les écrans correspondants
    switch (moduleKey) {
      case 'pre-diagnostic':
        // Navigation vers le Pre-Diagnostique AI (combine scan et chat)
        router.push('/pre-diagnostic');
        break;
      case 'vitals':
        router.push('/vitals');
        break;
      case 'teleconsultation':
        router.push('/teleconsultation');
        break;
      case 'geolocation':
        router.push('/geolocation');
        break;
      case 'pharmacy':
        router.push('/pharmacy');
        break;
      case 'medical-record':
        router.push('/medical-record');
        break;
      case 'reminders':
        router.push('/reminders');
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        console.log('Module non reconnu:', moduleKey);
    }
    
    onPress(moduleKey);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {MODULES.map((m, index) => (
          <TouchableOpacity
            key={m.key}
            style={[
              styles.card,
              { backgroundColor: m.bgColor },
            ]}
            onPress={() => handleModulePress(m.key)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: m.color + '20' }]}>
              <Ionicons name={m.icon as any} size={28} color={m.color} />
            </View>
            <Text style={[styles.label, { color: m.color }]}>{m.label}</Text>
            <Text style={styles.description}>{m.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 