import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export interface VitalItem {
  label: string;
  value: number;
  unit: string;
  date: string;
}

interface VitalsHistoryProps {
  vitals: VitalItem[];
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  empty: {
    color: '#F44336',
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default function VitalsHistory({ vitals }: VitalsHistoryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des mesures</Text>
      <FlatList
        data={vitals}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value} {item.unit}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune mesure enregistrée.</Text>}
      />
    </View>
  );
} 