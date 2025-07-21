import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ScanFormProps {
  onSubmit: (symptoms: string) => void;
}

export default function ScanForm({ onSubmit }: ScanFormProps) {
  const [symptoms, setSymptoms] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Décris tes symptômes :</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex : fièvre, toux, maux de tête..."
        value={symptoms}
        onChangeText={setSymptoms}
        multiline
      />
      <Button
        title="Analyser"
        onPress={() => onSubmit(symptoms)}
        disabled={symptoms.trim().length === 0}
        color="#007AFF"
      />
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
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 60,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
}); 