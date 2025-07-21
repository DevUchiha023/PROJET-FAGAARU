import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scanContainer: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scanIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scanDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  scanButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  symptomsContainer: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  symptomsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  symptomsList: {
    marginBottom: 15,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  symptomIcon: {
    marginRight: 10,
  },
  symptomText: {
    fontSize: 16,
  },
});

export default function ScanScreen() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  
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

  const [scanning, setScanning] = useState(false);
  const [symptoms, setSymptoms] = useState('');

  const handleScan = () => {
    setScanning(true);
    // Simulation du scan IA
    setTimeout(() => {
      setScanning(false);
      Alert.alert(
        'Analyse IA terminée',
        'Basé sur vos symptômes, voici les recommandations :\n\n• Repos recommandé\n• Hydratation importante\n• Surveiller la température\n• Consulter si aggravation',
        [
          { text: 'OK', onPress: () => router.back() },
          { text: 'Consulter', onPress: () => router.back() },
        ]
      );
    }, 3000);
  };

  const commonSymptoms = [
    'Fièvre',
    'Toux',
    'Fatigue',
    'Maux de tête',
    'Douleurs musculaires',
    'Perte d\'appétit',
  ];

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={safeTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Scan IA</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.scanContainer, { backgroundColor: safeTheme.colors.card }]}>
          <View style={[styles.scanIcon, { backgroundColor: safeTheme.colors.primary + '20' }]}>
            <Ionicons 
              name={scanning ? "scan-circle" : "scan"} 
              size={50} 
              color={safeTheme.colors.primary} 
            />
          </View>
          
          <Text style={[styles.scanTitle, { color: safeTheme.colors.text }]}>
            {scanning ? 'Analyse en cours...' : 'Analysez vos symptômes'}
          </Text>
          
          <Text style={[styles.scanDescription, { color: safeTheme.colors.textSecondary }]}>
            Notre intelligence artificielle analyse vos symptômes pour vous donner des recommandations personnalisées.
          </Text>
          
          <TouchableOpacity 
            style={[styles.scanButton, { backgroundColor: safeTheme.colors.primary }]} 
            onPress={handleScan}
            disabled={scanning}
          >
            <Ionicons name="scan" size={20} color="white" />
            <Text style={styles.scanButtonText}>
              {scanning ? 'Analyse...' : 'Commencer le scan'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.symptomsContainer, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.symptomsTitle, { color: safeTheme.colors.text }]}>Symptômes courants</Text>
          <View style={styles.symptomsList}>
            {commonSymptoms.map((symptom, index) => (
              <View key={index} style={styles.symptomItem}>
                <Ionicons name="checkmark-circle" size={20} style={[styles.symptomIcon, { color: safeTheme.colors.primary }]} />
                <Text style={[styles.symptomText, { color: safeTheme.colors.text }]}>{symptom}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 
 