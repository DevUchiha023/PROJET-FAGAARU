import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  price: number;
  available: boolean;
  description: string;
  sideEffects: string[];
  alternatives: string[];
}

export default function PharmacyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Paracétamol 500mg',
      genericName: 'Acétaminophène',
      dosage: '1-2 comprimés toutes les 4-6 heures',
      price: 2500,
      available: true,
      description: 'Antidouleur et antipyrétique pour fièvre et douleurs légères',
      sideEffects: ['Nausées légères', 'Allergies rares'],
      alternatives: ['Ibuprofène 400mg', 'Aspirine 500mg']
    },
    {
      id: '2',
      name: 'Amoxicilline 500mg',
      genericName: 'Amoxicilline',
      dosage: '1 comprimé 3 fois par jour pendant 7 jours',
      price: 8500,
      available: true,
      description: 'Antibiotique pour infections bactériennes',
      sideEffects: ['Diarrhée', 'Nausées', 'Allergies'],
      alternatives: ['Pénicilline V', 'Érythromycine']
    },
    {
      id: '3',
      name: 'Artémisinine 100mg',
      genericName: 'Artémisinine',
      dosage: '4 comprimés matin et soir pendant 3 jours',
      price: 12000,
      available: false,
      description: 'Antipaludéen pour traitement du paludisme',
      sideEffects: ['Vertiges', 'Nausées', 'Maux de tête'],
      alternatives: ['Quinine', 'Méfloquine']
    },
    {
      id: '4',
      name: 'Fer + Acide folique',
      genericName: 'Sulfate ferreux + Acide folique',
      dosage: '1 comprimé par jour pendant 3 mois',
      price: 3500,
      available: true,
      description: 'Complément pour traitement de l\'anémie',
      sideEffects: ['Constipation', 'Selles noires'],
      alternatives: ['Fer seul', 'Multivitamines']
    }
  ];

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderMedication = (medication: Medication) => {
    Alert.alert(
      'Commande de médicament',
      `Commander ${medication.name} ?\n\nPrix: ${medication.price} FCFA\n\nLivraison disponible dans 2-4 heures.`,
      [
        { text: 'Commander', onPress: () => handleOrder(medication) },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const handleOrder = (medication: Medication) => {
    Alert.alert(
      'Paiement',
      'Choisissez votre méthode de paiement :',
      [
        { text: 'Orange Money', onPress: () => simulatePayment(medication, 'Orange Money') },
        { text: 'WAVE', onPress: () => simulatePayment(medication, 'WAVE') },
        { text: 'Free Money', onPress: () => simulatePayment(medication, 'Free Money') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const simulatePayment = (medication: Medication, method: string) => {
    Alert.alert(
      'Commande confirmée',
      `Paiement de ${medication.price} FCFA via ${method} réussi !\n\nVotre médicament sera livré dans 2-4 heures.\n\nOrdonnance numérique disponible.`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💊 Pharmacie Numérique</Text>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un médicament..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.medicationsSection}>
        <Text style={styles.sectionTitle}>Médicaments disponibles :</Text>
        {filteredMedications.map((medication) => (
          <TouchableOpacity
            key={medication.id}
            style={[
              styles.medicationCard,
              !medication.available && styles.unavailableMedication
            ]}
            onPress={() => setSelectedMedication(medication)}
          >
            <View style={styles.medicationHeader}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationPrice}>{medication.price} FCFA</Text>
            </View>
            <Text style={styles.medicationGeneric}>Générique: {medication.genericName}</Text>
            <Text style={styles.medicationDosage}>Posologie: {medication.dosage}</Text>
            <View style={styles.availabilityContainer}>
              <Text style={[
                styles.availabilityText,
                medication.available ? styles.available : styles.unavailable
              ]}>
                {medication.available ? '✅ Disponible' : '❌ Rupture de stock'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMedication && (
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>📋 Détails du médicament</Text>
          <Text style={styles.detailName}>{selectedMedication.name}</Text>
          <Text style={styles.detailDescription}>{selectedMedication.description}</Text>
          
          <Text style={styles.detailSubtitle}>Effets secondaires :</Text>
          {selectedMedication.sideEffects.map((effect, index) => (
            <Text key={index} style={styles.detailText}>• {effect}</Text>
          ))}
          
          <Text style={styles.detailSubtitle}>Alternatives :</Text>
          {selectedMedication.alternatives.map((alternative, index) => (
            <Text key={index} style={styles.detailText}>• {alternative}</Text>
          ))}
          
          {selectedMedication.available && (
            <Button
              title="Commander ce médicament"
              onPress={() => orderMedication(selectedMedication)}
              color="#4caf50"
            />
          )}
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Informations importantes :</Text>
        <Text style={styles.infoText}>• Livraison à domicile disponible</Text>
        <Text style={styles.infoText}>• Ordonnance numérique acceptée</Text>
        <Text style={styles.infoText}>• Équivalents génériques proposés</Text>
        <Text style={styles.infoText}>• Paiement sécurisé mobile money</Text>
        <Text style={styles.infoText}>• Conseils pharmacie inclus</Text>
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
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  medicationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  medicationCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  unavailableMedication: {
    opacity: 0.6,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  medicationPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4caf50',
  },
  medicationGeneric: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  availabilityContainer: {
    alignItems: 'flex-end',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  available: {
    color: '#4caf50',
  },
  unavailable: {
    color: '#ff4d4d',
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
  detailName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  detailSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
    lineHeight: 18,
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