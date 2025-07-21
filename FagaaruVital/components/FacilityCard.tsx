import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'pharmacy' | 'clinic';
  distance: string;
  address: string;
  phone: string;
  open: boolean;
  emergency: boolean;
  rating: number;
}

interface FacilityCardProps {
  facility: Facility;
  onCall: (facility: Facility) => void;
  onDirections: (facility: Facility) => void;
}

const TYPE_ICONS = {
  hospital: 'medkit',
  pharmacy: 'medkit',
  clinic: 'medkit',
};

export default function FacilityCard({ facility, onCall, onDirections }: FacilityCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name={TYPE_ICONS[facility.type]} size={32} color="#007AFF" style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.name}>{facility.name}</Text>
          <Text style={styles.type}>{facility.type === 'hospital' ? 'Hôpital' : facility.type === 'pharmacy' ? 'Pharmacie' : 'Centre de santé'}</Text>
          <Text style={styles.distance}>{facility.distance}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: facility.open ? '#4CAF50' : '#F44336' }] }>
          <Text style={styles.statusText}>{facility.open ? 'Ouvert' : 'Fermé'}</Text>
        </View>
      </View>
      <Text style={styles.address}>{facility.address}</Text>
      <Text style={styles.phone}>{facility.phone}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onCall(facility)}>
          <Ionicons name="call" size={18} color="#007AFF" />
          <Text style={styles.actionText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.directionsBtn]} onPress={() => onDirections(facility)}>
          <Ionicons name="navigate" size={18} color="#4CAF50" />
          <Text style={[styles.actionText, { color: '#4CAF50' }]}>Itinéraire</Text>
        </TouchableOpacity>
        {facility.emergency && (
          <View style={styles.emergencyBadge}>
            <Text style={styles.emergencyText}>Urgences</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 13,
    color: '#888',
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  address: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
    marginLeft: 4,
  },
  phone: {
    fontSize: 13,
    color: '#007AFF',
    marginBottom: 8,
    marginLeft: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  directionsBtn: {
    backgroundColor: '#E8F5E9',
  },
  actionText: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
  },
  emergencyBadge: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  emergencyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 