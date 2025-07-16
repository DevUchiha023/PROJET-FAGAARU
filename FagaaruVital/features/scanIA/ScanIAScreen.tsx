import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
}

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
}

export default function ScanIAScreen() {
  const [symptoms, setSymptoms] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms: Symptom[] = [
    { id: '1', name: 'Fièvre', severity: 'high' },
    { id: '2', name: 'Maux de tête', severity: 'medium' },
    { id: '3', name: 'Fatigue', severity: 'medium' },
    { id: '4', name: 'Toux', severity: 'medium' },
    { id: '5', name: 'Douleurs musculaires', severity: 'low' },
    { id: '6', name: 'Nausées', severity: 'medium' },
    { id: '7', name: 'Douleurs abdominales', severity: 'high' },
    { id: '8', name: 'Difficultés respiratoires', severity: 'high' },
  ];

  const analyzeSymptoms = (symptomText: string) => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse IA
    setTimeout(() => {
      const lowerText = symptomText.toLowerCase();
      let result: Diagnosis;

      if (lowerText.includes('fièvre') && lowerText.includes('toux')) {
        result = {
          condition: 'Grippe ou COVID-19',
          probability: 85,
          description: 'Symptômes typiques d\'une infection virale respiratoire',
          recommendations: [
            'Repos et hydratation',
            'Surveillance de la température',
            'Consultation médicale si aggravation',
            'Test COVID-19 recommandé'
          ]
        };
      } else if (lowerText.includes('fièvre') && lowerText.includes('frissons')) {
        result = {
          condition: 'Paludisme suspecté',
          probability: 75,
          description: 'Symptômes compatibles avec le paludisme',
          recommendations: [
            'Test de diagnostic rapide',
            'Consultation médicale urgente',
            'Traitement antipaludéen si confirmé'
          ]
        };
      } else if (lowerText.includes('fatigue') && lowerText.includes('pâleur')) {
        result = {
          condition: 'Anémie possible',
          probability: 70,
          description: 'Symptômes suggérant une anémie',
          recommendations: [
            'Bilan sanguin',
            'Supplémentation en fer',
            'Consultation médicale'
          ]
        };
      } else {
        result = {
          condition: 'Symptômes non spécifiques',
          probability: 50,
          description: 'Symptômes nécessitant une évaluation médicale',
          recommendations: [
            'Consultation médicale',
            'Surveillance des symptômes',
            'Retour si aggravation'
          ]
        };
      }

      setDiagnosis(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const addSymptom = (symptom: string) => {
    setSymptoms(prev => prev ? `${prev}, ${symptom}` : symptom);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔍 Scan Intelligent des Symptômes</Text>
      
      <View style={styles.inputSection}>
        <Text style={styles.label}>Décrivez vos symptômes :</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Ex: fièvre, maux de tête, fatigue..."
          value={symptoms}
          onChangeText={setSymptoms}
        />
      </View>

      <View style={styles.symptomsSection}>
        <Text style={styles.label}>Symptômes courants :</Text>
        <View style={styles.symptomsGrid}>
          {commonSymptoms.map((symptom) => (
            <Button
              key={symptom.id}
              title={symptom.name}
              onPress={() => addSymptom(symptom.name)}
              color={symptom.severity === 'high' ? '#ff4d4d' : symptom.severity === 'medium' ? '#ffa500' : '#4caf50'}
            />
          ))}
        </View>
      </View>

      <Button
        title={isAnalyzing ? "Analyse en cours..." : "Analyser avec IA"}
        onPress={() => symptoms ? analyzeSymptoms(symptoms) : Alert.alert('Erreur', 'Veuillez décrire vos symptômes')}
        disabled={isAnalyzing || !symptoms}
        color="#4caf50"
      />

      {diagnosis && (
        <View style={styles.diagnosisSection}>
          <Text style={styles.diagnosisTitle}>📋 Pré-diagnostic IA</Text>
          <Text style={styles.condition}>{diagnosis.condition}</Text>
          <Text style={styles.probability}>Probabilité : {diagnosis.probability}%</Text>
          <Text style={styles.description}>{diagnosis.description}</Text>
          
          <Text style={styles.recommendationsTitle}>Recommandations :</Text>
          {diagnosis.recommendations.map((rec, index) => (
            <Text key={index} style={styles.recommendation}>• {rec}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  symptomsSection: {
    marginBottom: 20,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  diagnosisSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  diagnosisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  condition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4caf50',
    marginBottom: 5,
  },
  probability: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  recommendation: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 18,
  },
}); 