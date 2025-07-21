import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ScanResultProps {
  symptoms: string;
  onBack: () => void;
}

export default function ScanResult({ symptoms, onBack }: ScanResultProps) {
  // Diagnostic simulé
  const fakeDiagnosis =
    symptoms.toLowerCase().includes('fièvre')
      ? 'Diagnostic : Symptômes de fièvre détectés. Il est conseillé de surveiller la température et de consulter un médecin si cela persiste.'
      : 'Diagnostic : Symptômes bénins détectés. Repose-toi et surveille l’évolution.';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultat de l’analyse</Text>
      <Text style={styles.diagnosis}>{fakeDiagnosis}</Text>
      <Button title="Revenir" onPress={onBack} color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
  },
  diagnosis: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
}); 