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
  locationCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  locationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationStatus: {
    fontSize: 16,
    marginBottom: 20,
  },
  locationButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  facilityCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  facilityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  facilityType: {
    fontSize: 14,
    marginBottom: 5,
  },
  facilityDistance: {
    fontSize: 14,
    marginBottom: 5,
  },
  facilityRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
  },
  facilityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusOpen: {
    backgroundColor: '#4CAF50',
  },
  statusClosed: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  specialtiesContainer: {
    marginTop: 15,
  },
  specialtiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  specialtyText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  navigateButton: {
    backgroundColor: '#007AFF',
  },
  callButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
  },
});

export default function GeolocationScreen() {
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

  const [facilities] = useState([
    {
      id: 1,
      name: 'Hôpital Principal',
      type: 'Hôpital',
      distance: '2.3 km',
      rating: 4.6,
      open: true,
      specialties: ['Urgences', 'Cardiologie', 'Pédiatrie'],
      icon: '🏥',
    },
    {
      id: 2,
      name: 'Centre Médical Saint-Louis',
      type: 'Centre médical',
      distance: '1.8 km',
      rating: 4.4,
      open: true,
      specialties: ['Médecine générale', 'Gynécologie'],
      icon: '🏥',
    },
    {
      id: 3,
      name: 'Pharmacie Centrale',
      type: 'Pharmacie',
      distance: '0.5 km',
      rating: 4.8,
      open: true,
      specialties: ['Médicaments', 'Conseils'],
      icon: '💊',
    },
    {
      id: 4,
      name: 'Clinique du Plateau',
      type: 'Clinique',
      distance: '3.1 km',
      rating: 4.7,
      open: false,
      specialties: ['Chirurgie', 'Radiologie'],
      icon: '🏥',
    },
  ]);

  const handleNavigate = (facility: any) => {
    Alert.alert(
      'Navigation',
      `Voulez-vous naviguer vers ${facility.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Naviguer', onPress: () => router.back() },
      ]
    );
  };

  const handleCall = (facility: any) => {
    Alert.alert(
      'Appeler',
      `Voulez-vous appeler ${facility.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => router.back() },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={safeTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Géolocalisation</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.locationCard, { backgroundColor: safeTheme.colors.card }]}>
          <View style={[styles.locationIcon, { backgroundColor: safeTheme.colors.primary + '20' }]}>
            <Ionicons name="location" size={40} color={safeTheme.colors.primary} />
          </View>
          <Text style={[styles.locationTitle, { color: safeTheme.colors.text }]}>Votre position</Text>
          <Text style={[styles.locationStatus, { color: safeTheme.colors.textSecondary }]}>
            Saint-Louis, Sénégal
          </Text>
          <TouchableOpacity style={[styles.locationButton, { backgroundColor: safeTheme.colors.primary }]}>
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.locationButtonText}>Actualiser</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Établissements à proximité</Text>

        {facilities.map((facility) => (
          <View key={facility.id} style={[styles.facilityCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.facilityHeader}>
              <View style={[styles.facilityIcon, { backgroundColor: safeTheme.colors.primary + '20' }]}>
                <Text style={{ fontSize: 24 }}>{facility.icon}</Text>
              </View>
              <View style={styles.facilityInfo}>
                <Text style={[styles.facilityName, { color: safeTheme.colors.text }]}>{facility.name}</Text>
                <Text style={[styles.facilityType, { color: safeTheme.colors.textSecondary }]}>{facility.type}</Text>
                <Text style={[styles.facilityDistance, { color: safeTheme.colors.textSecondary }]}>{facility.distance}</Text>
                <View style={styles.facilityRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={[styles.ratingText, { color: safeTheme.colors.textSecondary }]}>{facility.rating}</Text>
                  <View style={[
                    styles.facilityStatus,
                    facility.open ? styles.statusOpen : styles.statusClosed
                  ]}>
                    <Text style={styles.statusText}>
                      {facility.open ? 'Ouvert' : 'Fermé'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.specialtiesContainer}>
              <Text style={[styles.specialtiesTitle, { color: safeTheme.colors.text }]}>Spécialités :</Text>
              <View style={styles.specialtiesList}>
                {facility.specialties.map((specialty, index) => (
                  <View
                    key={index}
                    style={[styles.specialtyTag, { backgroundColor: safeTheme.colors.primary + '20' }]}
                  >
                    <Text style={[styles.specialtyText, { color: safeTheme.colors.primary }]}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.navigateButton]}
                onPress={() => handleNavigate(facility)}
              >
                <Text style={styles.buttonText}>Naviguer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}
                onPress={() => handleCall(facility)}
              >
                <Text style={styles.buttonText}>Appeler</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 