import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../contexts/ThemeContext';
import NotificationService from '../../services/NotificationService';

// Protection globale contre les objets undefined
const safe = (obj: any) => obj || {};

interface VitalData {
  type: string;
  value: string;
  unit: string;
  normalRange: string;
  timestamp: Date;
}

const vitalTypes = [
  { key: 'temperature', label: 'Température', unit: '°C', normalRange: '36.1-37.2' },
  { key: 'bloodPressure', label: 'Tension artérielle', unit: 'mmHg', normalRange: '120/80' },
  { key: 'heartRate', label: 'Fréquence cardiaque', unit: 'bpm', normalRange: '60-100' },
  { key: 'oxygenSaturation', label: 'Saturation O₂', unit: '%', normalRange: '95-100' },
  { key: 'bloodSugar', label: 'Glycémie', unit: 'mg/dL', normalRange: '70-140' },
  { key: 'weight', label: 'Poids', unit: 'kg', normalRange: 'Variable' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  unitText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default function AddVitalForm({ onSave }: { onSave: (vital: VitalData) => void }) {
  const { theme } = useAppTheme();
  const [selectedType, setSelectedType] = useState('');
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');

  const checkVitalAlert = (type: string, value: string, normalRange: string): boolean => {
    const vitalType = vitalTypes.find(v => v.key === type);
    if (!vitalType) return false;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return false;

    switch (type) {
      case 'temperature':
        return numValue < 36.1 || numValue > 37.2;
      case 'heartRate':
        return numValue < 60 || numValue > 100;
      case 'oxygenSaturation':
        return numValue < 95;
      case 'bloodSugar':
        return numValue < 70 || numValue > 140;
      case 'bloodPressure':
        // Pour la tension, on vérifie juste si c'est un format valide
        const bpMatch = value.match(/^(\d+)\/(\d+)$/);
        if (bpMatch) {
          const systolic = parseInt(bpMatch[1]);
          const diastolic = parseInt(bpMatch[2]);
          return systolic > 140 || diastolic > 90 || systolic < 90 || diastolic < 60;
        }
        return false;
      default:
        return false;
    }
  };

  const handleSave = async () => {
    if (!selectedType || !value.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const vitalType = vitalTypes.find(v => v.key === selectedType);
    if (!vitalType) {
      Alert.alert('Erreur', 'Type de vital invalide.');
      return;
    }

    const vitalData: VitalData = {
      type: vitalType.label,
      value: value.trim(),
      unit: vitalType.unit,
      normalRange: vitalType.normalRange,
      timestamp: new Date(),
    };

    // Vérifier si le vital est anormal et envoyer une alerte
    const isAbnormal = checkVitalAlert(selectedType, value, vitalType.normalRange);
    
    if (isAbnormal) {
      try {
        await NotificationService.sendVitalAlert(
          vitalType.label,
          `${value}${vitalType.unit}`,
          vitalType.normalRange
        );
        Alert.alert(
          'Alerte Vital',
          `Valeur anormale détectée ! ${vitalType.label}: ${value}${vitalType.unit} (Normal: ${vitalType.normalRange})`,
          [{ text: 'OK' }]
        );
      } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'alerte:', error);
      }
    }

    onSave(vitalData);
    setSelectedType('');
    setValue('');
    setNote('');
    
    Alert.alert('Succès', 'Vital enregistré avec succès !');
  };

  const renderVitalTypeButton = (vitalType: typeof vitalTypes[0]) => (
    <TouchableOpacity
      key={vitalType.key}
      style={[
        styles.typeButton,
        selectedType === vitalType.key && { backgroundColor: theme.colors.primary }
      ]}
      onPress={() => setSelectedType(vitalType.key)}
    >
      <Text style={[
        styles.typeButtonText,
        { color: selectedType === vitalType.key ? theme.colors.card : theme.colors.text }
      ]}>
        {vitalType.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Ajouter un vital</Text>
      
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Type de vital</Text>
        <View style={styles.typeButtonsContainer}>
          {vitalTypes.map(renderVitalTypeButton)}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Valeur</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          value={value}
          onChangeText={setValue}
          placeholder="Entrez la valeur..."
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
        {selectedType && (
          <Text style={[styles.unitText, { color: theme.colors.textSecondary }]}>
            Unité: {vitalTypes.find(v => v.key === selectedType)?.unit}
          </Text>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Note (optionnel)</Text>
        <TextInput
          style={[styles.textArea, { 
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          value={note}
          onChangeText={setNote}
          placeholder="Ajoutez une note..."
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleSave}
      >
        <Ionicons name="save" size={20} color={theme.colors.card} />
        <Text style={[styles.saveButtonText, { color: theme.colors.card }]}>
          Enregistrer
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
} 