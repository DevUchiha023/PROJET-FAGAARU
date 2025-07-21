import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  available: boolean;
  nextSlot: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < full ? 'star' : 'star-outline'}
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={{ flexDirection: 'row', marginLeft: 4 }}>{stars}</View>;
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle" size={44} color="#007AFF" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.ratingRow}>{renderStars(doctor.rating)}</View>
        </View>
        <View style={[styles.badge, { backgroundColor: doctor.available ? '#4CAF50' : '#FF9800' }] }>
          <Text style={styles.badgeText}>{doctor.available ? 'Disponible' : 'Occupé'}</Text>
        </View>
      </View>
      <Text style={styles.slot}>Prochain créneau : {doctor.nextSlot}</Text>
      <TouchableOpacity
        style={[styles.bookBtn, { opacity: doctor.available ? 1 : 0.5 }]}
        onPress={() => onBook(doctor)}
        disabled={!doctor.available}
      >
        <Text style={styles.bookBtnText}>{doctor.available ? 'Prendre RDV' : 'Indisponible'}</Text>
      </TouchableOpacity>
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
  avatar: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  slot: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
    marginLeft: 4,
  },
  bookBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  bookBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 