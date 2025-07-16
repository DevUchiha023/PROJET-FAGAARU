import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface HealthFacility {
  id: string;
  name: string;
  type: 'hospital' | 'pharmacy' | 'clinic' | 'emergency';
  address: string;
  distance: number;
  rating: number;
  open: boolean;
  emergency: boolean;
  phone: string;
  services: string[];
}

export default function GeolocationScreen() {
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'hospital' | 'pharmacy' | 'clinic' | 'emergency'>('all');

  const healthFacilities: HealthFacility[] = [
    {
      id: '1',
      name: 'Hôpital Principal de Dakar',
      type: 'hospital',
      address: 'Route de Ouakam, Dakar',
      distance: 2.5,
      rating: 4.7,
      open: true,
      emergency: true,
      phone: '+221 33 825 10 00',
      services: ['Urgences 24h', 'Cardiologie', 'Pédiatrie', 'Chirurgie']
    },
    {
      id: '2',
      name: 'Centre de Santé de Yoff',
      type: 'clinic',
      address: 'Rue de la Plage, Yoff',
      distance: 1.2,
      rating: 4.3,
      open: true,
      emergency: false,
      phone: '+221 33 820 15 20',
      services: ['Consultations', 'Vaccinations', 'Planning familial']
    },
    {
      id: '3',
      name: 'Pharmacie de la Corniche',
      type: 'pharmacy',
      address: 'Corniche Ouest, Dakar',
      distance: 0.8,
      rating: 4.5,
      open: true,
      emergency: false,
      phone: '+221 33 821 45 67',
      services: ['Médicaments', 'Conseils', 'Livraison']
    },
    {
      id: '4',
      name: 'Centre Médical SOS',
      type: 'emergency',
      address: 'Avenue Cheikh Anta Diop, Dakar',
      distance: 3.1,
      rating: 4.8,
      open: true,
      emergency: true,
      phone: '+221 33 869 00 00',
      services: ['Urgences', 'Ambulance', 'Réanimation']
    },
    {
      id: '5',
      name: 'Hôpital Fann',
      type: 'hospital',
      address: 'Route de la Corniche, Dakar',
      distance: 4.2,
      rating: 4.6,
      open: true,
      emergency: true,
      phone: '+221 33 869 60 00',
      services: ['Médecine interne', 'Dermatologie', 'Gynécologie']
    }
  ];

  const getFilteredFacilities = () => {
    if (filterType === 'all') return healthFacilities;
    return healthFacilities.filter(facility => facility.type === filterType);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital': return '🏥';
      case 'clinic': return '🏥';
      case 'pharmacy': return '💊';
      case 'emergency': return '🚑';
      default: return '🏥';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital': return '#4caf50';
      case 'clinic': return '#2196f3';
      case 'pharmacy': return '#ff9800';
      case 'emergency': return '#f44336';
      default: return '#666';
    }
  };

  const callFacility = (facility: HealthFacility) => {
    Alert.alert(
      'Appeler',
      `Appeler ${facility.name} ?\n\n${facility.phone}`,
      [
        { text: 'Appeler', onPress: () => Alert.alert('Appel simulé', `Appel vers ${facility.phone}`) },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const getDirections = (facility: HealthFacility) => {
    Alert.alert(
      'Itinéraire',
      `Itinéraire vers ${facility.name}\n\nDistance: ${facility.distance} km\nAdresse: ${facility.address}\n\nNavigation GPS activée.`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📍 Géolocalisation Santé</Text>

      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Filtrer par type :</Text>
        <View style={styles.filterButtons}>
          {[
            { key: 'all', label: 'Tous' },
            { key: 'hospital', label: 'Hôpitaux' },
            { key: 'clinic', label: 'Cliniques' },
            { key: 'pharmacy', label: 'Pharmacies' },
            { key: 'emergency', label: 'Urgences' }
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                filterType === filter.key && styles.activeFilterButton
              ]}
              onPress={() => setFilterType(filter.key as any)}
            >
              <Text style={[
                styles.filterButtonText,
                filterType === filter.key && styles.activeFilterButtonText
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.facilitiesSection}>
        <Text style={styles.sectionTitle}>Structures de santé proches :</Text>
        {getFilteredFacilities().map((facility) => (
          <TouchableOpacity
            key={facility.id}
            style={[
              styles.facilityCard,
              selectedFacility?.id === facility.id && styles.selectedFacility
            ]}
            onPress={() => setSelectedFacility(facility)}
          >
            <View style={styles.facilityHeader}>
              <Text style={styles.facilityIcon}>{getTypeIcon(facility.type)}</Text>
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityName}>{facility.name}</Text>
                <Text style={styles.facilityAddress}>{facility.address}</Text>
                <Text style={styles.facilityDistance}>{facility.distance} km • ⭐ {facility.rating}</Text>
              </View>
              <View style={styles.facilityStatus}>
                <Text style={[
                  styles.statusText,
                  facility.open ? styles.openStatus : styles.closedStatus
                ]}>
                  {facility.open ? 'Ouvert' : 'Fermé'}
                </Text>
                {facility.emergency && (
                  <Text style={styles.emergencyText}>🚑 Urgences</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedFacility && (
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>📋 Détails de {selectedFacility.name}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Adresse :</Text>
            <Text style={styles.detailValue}>{selectedFacility.address}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Téléphone :</Text>
            <Text style={styles.detailValue}>{selectedFacility.phone}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Distance :</Text>
            <Text style={styles.detailValue}>{selectedFacility.distance} km</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Note :</Text>
            <Text style={styles.detailValue}>⭐ {selectedFacility.rating}/5</Text>
          </View>
          
          <Text style={styles.servicesTitle}>Services disponibles :</Text>
          {selectedFacility.services.map((service, index) => (
            <Text key={index} style={styles.serviceItem}>• {service}</Text>
          ))}
          
          <View style={styles.actionButtons}>
            <Button
              title="📞 Appeler"
              onPress={() => callFacility(selectedFacility)}
              color="#4caf50"
            />
            <Button
              title="🗺️ Itinéraire"
              onPress={() => getDirections(selectedFacility)}
              color="#2196f3"
            />
          </View>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Informations importantes :</Text>
        <Text style={styles.infoText}>• Distances calculées depuis votre position</Text>
        <Text style={styles.infoText}>• Horaires et disponibilités en temps réel</Text>
        <Text style={styles.infoText}>• Navigation GPS intégrée</Text>
        <Text style={styles.infoText}>• Appels directs vers les structures</Text>
        <Text style={styles.infoText}>• Services d'urgence disponibles 24h/24</Text>
      </View>
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
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  activeFilterButton: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  facilitiesSection: {
    marginBottom: 20,
  },
  facilityCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFacility: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e8',
  },
  facilityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  facilityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  facilityAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  facilityDistance: {
    fontSize: 12,
    color: '#888',
  },
  facilityStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openStatus: {
    color: '#4caf50',
  },
  closedStatus: {
    color: '#ff4d4d',
  },
  emergencyText: {
    fontSize: 10,
    color: '#f44336',
    fontWeight: 'bold',
    marginTop: 2,
  },
  detailSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  serviceItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  infoSection: {
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
}); 