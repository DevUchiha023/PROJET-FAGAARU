import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'emergency' | 'personal' | 'medical';
  icon: string;
  color: string;
}

interface EmergencyService {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: string;
  color: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F44336',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sosContainer: {
    backgroundColor: '#F44336',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sosTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sosDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  sosButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sosButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginLeft: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  serviceCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 14,
    marginBottom: 5,
  },
  contactType: {
    fontSize: 12,
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 10,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default function EmergencyScreen() {
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

  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyServices: EmergencyService[] = [
    {
      id: '1',
      name: 'SAMU',
      number: '15',
      description: 'Service d\'Aide Médicale d\'Urgence',
      icon: 'medical',
      color: '#F44336',
    },
    {
      id: '2',
      name: 'Pompiers',
      number: '18',
      description: 'Sapeurs-pompiers',
      icon: 'flame',
      color: '#FF5722',
    },
    {
      id: '3',
      name: 'Police',
      number: '17',
      description: 'Police nationale',
      icon: 'shield',
      color: '#2196F3',
    },
    {
      id: '4',
      name: 'Urgences européennes',
      number: '112',
      description: 'Numéro d\'urgence européen',
      icon: 'call',
      color: '#9C27B0',
    },
  ];

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Diallo',
      number: '+221 77 123 4567',
      type: 'medical',
      icon: 'medical',
      color: '#4CAF50',
    },
    {
      id: '2',
      name: 'Fatou Diallo',
      number: '+221 77 234 5678',
      type: 'personal',
      icon: 'person',
      color: '#2196F3',
    },
    {
      id: '3',
      name: 'Centre Médical Saint-Louis',
      number: '+221 33 961 2345',
      type: 'medical',
      icon: 'business',
      color: '#FF9800',
    },
  ];

  const handleEmergencyCall = (service: EmergencyService) => {
    Alert.alert(
      `Appeler ${service.name}`,
      `Voulez-vous appeler le ${service.name} (${service.number}) ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Appeler', 
          onPress: () => {
            Linking.openURL(`tel:${service.number}`);
            setIsEmergencyActive(true);
          }
        },
      ]
    );
  };

  const handleContactCall = (contact: EmergencyContact) => {
    Alert.alert(
      `Appeler ${contact.name}`,
      `Voulez-vous appeler ${contact.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Appeler', 
          onPress: () => Linking.openURL(`tel:${contact.number}`)
        },
      ]
    );
  };

  const handleSOS = () => {
    Alert.alert(
      'SOS - Urgence médicale',
      'Voulez-vous déclencher une alerte SOS ? Cela enverra votre position et vos informations médicales aux services d\'urgence.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déclencher SOS', 
          style: 'destructive',
          onPress: () => {
            setIsEmergencyActive(true);
            // Simuler l'envoi d'alerte
            setTimeout(() => {
              Alert.alert(
                'Alerte envoyée',
                'Votre position et vos informations médicales ont été envoyées aux services d\'urgence. Aidez-vous !'
              );
            }, 2000);
          }
        },
      ]
    );
  };

  const renderEmergencyService = (service: EmergencyService) => (
    <TouchableOpacity
      key={service.id}
      style={[styles.serviceCard, { backgroundColor: safeTheme.colors.card }]}
      onPress={() => handleEmergencyCall(service)}
    >
      <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
        <Ionicons name={service.icon as any} size={32} color={service.color} />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={[styles.serviceName, { color: safeTheme.colors.text }]}>{service.name}</Text>
        <Text style={[styles.serviceNumber, { color: safeTheme.colors.primary }]}>{service.number}</Text>
        <Text style={[styles.serviceDescription, { color: safeTheme.colors.textSecondary }]}>{service.description}</Text>
      </View>
      <View style={[styles.callButton, { backgroundColor: service.color }]}>
        <Ionicons name="call" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );

  const renderEmergencyContact = (contact: EmergencyContact) => (
    <TouchableOpacity
      key={contact.id}
      style={[styles.contactCard, { backgroundColor: safeTheme.colors.card }]}
      onPress={() => handleContactCall(contact)}
    >
      <View style={[styles.contactIcon, { backgroundColor: contact.color + '20' }]}>
        <Ionicons name={contact.icon as any} size={24} color={contact.color} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: safeTheme.colors.text }]}>{contact.name}</Text>
        <Text style={[styles.contactNumber, { color: safeTheme.colors.primary }]}>{contact.number}</Text>
        <Text style={[styles.contactType, { color: safeTheme.colors.textSecondary }]}>
          {contact.type === 'medical' ? 'Médecin' : 
           contact.type === 'personal' ? 'Contact personnel' : 'Établissement'}
        </Text>
      </View>
      <View style={[styles.callButton, { backgroundColor: contact.color }]}>
        <Ionicons name="call" size={16} color="white" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Urgences</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sosContainer}>
          <Text style={styles.sosTitle}>🚨 SOS URGENCE</Text>
          <Text style={styles.sosDescription}>
            En cas d'urgence vitale, appuyez sur le bouton ci-dessous pour déclencher une alerte SOS
          </Text>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Ionicons name="warning" size={24} color="#F44336" />
            <Text style={styles.sosButtonText}>DÉCLENCHER SOS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Important</Text>
          <Text style={[styles.warningText, { color: safeTheme.colors.textSecondary }]}>
            Ces numéros sont réservés aux véritables urgences. En cas de doute, contactez votre médecin traitant ou le 15 pour un conseil médical.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Services d'urgence</Text>
          {emergencyServices.map(renderEmergencyService)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Contacts d'urgence</Text>
          {emergencyContacts.map(renderEmergencyContact)}
        </View>
      </ScrollView>
    </View>
  );
} 
 