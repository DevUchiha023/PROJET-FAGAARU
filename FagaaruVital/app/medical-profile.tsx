import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface MedicalProfile {
  personalInfo: {
    name: string;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    height: number;
    weight: number;
    emergencyContact: string;
    emergencyPhone: string;
  };
  medicalHistory: {
    conditions: string[];
    surgeries: string[];
    allergies: string[];
    medications: string[];
  };
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
    diet: string;
    occupation: string;
  };
  familyHistory: {
    conditions: string[];
    relationships: string[];
  };
}

export default function MedicalProfileScreen() {
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

  const [profile, setProfile] = useState<MedicalProfile>({
    personalInfo: {
      name: 'Amadou Diallo',
      dateOfBirth: '15/03/1985',
      gender: 'Homme',
      bloodType: 'O+',
      height: 175,
      weight: 70,
      emergencyContact: 'Fatou Diallo',
      emergencyPhone: '+221 77 123 4567',
    },
    medicalHistory: {
      conditions: ['Hypertension légère', 'Diabète type 2'],
      surgeries: ['Appendicectomie (2010)'],
      allergies: ['Pénicilline', 'Poussière'],
      medications: ['Vitamine D 1000 UI', 'Oméprazole 20mg'],
    },
    lifestyle: {
      smoking: false,
      alcohol: false,
      exercise: 'Marche quotidienne 30 min',
      diet: 'Méditerranéen',
      occupation: 'Ingénieur informatique',
    },
    familyHistory: {
      conditions: ['Diabète (père)', 'Hypertension (mère)'],
      relationships: ['Père', 'Mère'],
    },
  });

  const [selectedSection, setSelectedSection] = useState('personal');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState('');

  const handleEditField = (section: string, field: string) => {
    setEditingField(`${section}.${field}`);
    setShowEditModal(true);
  };

  const handleSaveField = (value: string) => {
    const [section, field] = editingField.split('.');
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof MedicalProfile],
        [field]: value,
      },
    }));
    setShowEditModal(false);
    setEditingField('');
  };

  const calculateBMI = () => {
    const heightInMeters = profile.personalInfo.height / 100;
    const bmi = profile.personalInfo.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Insuffisance pondérale', color: '#FF9800' };
    if (bmi < 25) return { category: 'Poids normal', color: '#4CAF50' };
    if (bmi < 30) return { category: 'Surpoids', color: '#FF9800' };
    return { category: 'Obésité', color: '#F44336' };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiInfo = getBMICategory(bmi);

  const renderPersonalInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create" size={20} color={safeTheme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Nom complet</Text>
          <Text style={styles.infoValue}>{profile.personalInfo.name}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Date de naissance</Text>
          <Text style={styles.infoValue}>{profile.personalInfo.dateOfBirth}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Groupe sanguin</Text>
          <Text style={styles.infoValue}>{profile.personalInfo.bloodType}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Taille</Text>
          <Text style={styles.infoValue}>{profile.personalInfo.height} cm</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Poids</Text>
          <Text style={styles.infoValue}>{profile.personalInfo.weight} kg</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>IMC</Text>
          <Text style={[styles.infoValue, { color: bmiInfo.color }]}>
            {calculateBMI()} ({bmiInfo.category})
          </Text>
        </View>
      </View>

      <View style={styles.emergencyCard}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="warning" size={20} color="#F44336" />
          <Text style={styles.emergencyTitle}>Contact d'urgence</Text>
        </View>
        <Text style={styles.emergencyName}>{profile.personalInfo.emergencyContact}</Text>
        <Text style={styles.emergencyPhone}>{profile.personalInfo.emergencyPhone}</Text>
      </View>
    </View>
  );

  const renderMedicalHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Antécédents médicaux</Text>
      
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Ionicons name="medical" size={20} color="#4CAF50" />
          <Text style={styles.historyTitle}>Conditions médicales</Text>
        </View>
        {profile.medicalHistory.conditions.map((condition, index) => (
          <Text key={index} style={styles.historyItem}>• {condition}</Text>
        ))}
      </View>

      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Ionicons name="cut" size={20} color="#2196F3" />
          <Text style={styles.historyTitle}>Chirurgies</Text>
        </View>
        {profile.medicalHistory.surgeries.map((surgery, index) => (
          <Text key={index} style={styles.historyItem}>• {surgery}</Text>
        ))}
      </View>

      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Ionicons name="alert-circle" size={20} color="#FF9800" />
          <Text style={styles.historyTitle}>Allergies</Text>
        </View>
        {profile.medicalHistory.allergies.map((allergy, index) => (
          <Text key={index} style={styles.historyItem}>• {allergy}</Text>
        ))}
      </View>
    </View>
  );

  const renderLifestyle = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mode de vie</Text>
      
      <View style={styles.lifestyleGrid}>
        <View style={styles.lifestyleCard}>
          <Ionicons name="cigarette" size={24} color={profile.lifestyle.smoking ? "#F44336" : "#4CAF50"} />
          <Text style={styles.lifestyleLabel}>Tabac</Text>
          <Text style={styles.lifestyleValue}>
            {profile.lifestyle.smoking ? 'Oui' : 'Non'}
          </Text>
        </View>
        
        <View style={styles.lifestyleCard}>
          <Ionicons name="wine" size={24} color={profile.lifestyle.alcohol ? "#F44336" : "#4CAF50"} />
          <Text style={styles.lifestyleLabel}>Alcool</Text>
          <Text style={styles.lifestyleValue}>
            {profile.lifestyle.alcohol ? 'Oui' : 'Non'}
          </Text>
        </View>
        
        <View style={styles.lifestyleCard}>
          <Ionicons name="fitness" size={24} color="#4CAF50" />
          <Text style={styles.lifestyleLabel}>Exercice</Text>
          <Text style={styles.lifestyleValue}>{profile.lifestyle.exercise}</Text>
        </View>
        
        <View style={styles.lifestyleCard}>
          <Ionicons name="restaurant" size={24} color="#FF9800" />
          <Text style={styles.lifestyleLabel}>Régime</Text>
          <Text style={styles.lifestyleValue}>{profile.lifestyle.diet}</Text>
        </View>
      </View>
    </View>
  );

  const renderFamilyHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Antécédents familiaux</Text>
      
      <View style={styles.familyCard}>
        <View style={styles.familyHeader}>
          <Ionicons name="people" size={20} color="#9C27B0" />
          <Text style={styles.familyTitle}>Conditions familiales</Text>
        </View>
        {profile.familyHistory.conditions.map((condition, index) => (
          <Text key={index} style={styles.familyItem}>• {condition}</Text>
        ))}
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: safeTheme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
      backgroundColor: safeTheme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: safeTheme.colors.border,
    },
    backButton: {
      marginRight: 15,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: safeTheme.colors.card,
      borderRadius: 15,
      padding: 4,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 12,
    },
    tabButtonActive: {
      backgroundColor: safeTheme.colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: safeTheme.colors.textSecondary,
    },
    tabTextActive: {
      color: 'white',
    },
    section: {
      marginBottom: 30,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
    },
    editButton: {
      padding: 8,
    },
    infoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    infoCard: {
      width: '48%',
      backgroundColor: safeTheme.colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    infoLabel: {
      fontSize: 12,
      color: safeTheme.colors.textSecondary,
      marginBottom: 5,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '600',
      color: safeTheme.colors.text,
    },
    emergencyCard: {
      backgroundColor: '#FFF3E0',
      borderRadius: 12,
      padding: 20,
      marginTop: 15,
      borderLeftWidth: 4,
      borderLeftColor: '#F44336',
    },
    emergencyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    emergencyTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F44336',
      marginLeft: 10,
    },
    emergencyName: {
      fontSize: 16,
      fontWeight: '600',
      color: safeTheme.colors.text,
      marginBottom: 5,
    },
    emergencyPhone: {
      fontSize: 14,
      color: safeTheme.colors.textSecondary,
    },
    historyCard: {
      backgroundColor: safeTheme.colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    historyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    historyTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
      marginLeft: 10,
    },
    historyItem: {
      fontSize: 14,
      color: safeTheme.colors.textSecondary,
      marginBottom: 8,
      lineHeight: 20,
    },
    lifestyleGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    lifestyleCard: {
      width: '48%',
      backgroundColor: safeTheme.colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lifestyleLabel: {
      fontSize: 14,
      color: safeTheme.colors.textSecondary,
      marginTop: 10,
      marginBottom: 5,
    },
    lifestyleValue: {
      fontSize: 14,
      fontWeight: '600',
      color: safeTheme.colors.text,
      textAlign: 'center',
    },
    familyCard: {
      backgroundColor: safeTheme.colors.card,
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    familyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    familyTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
      marginLeft: 10,
    },
    familyItem: {
      fontSize: 14,
      color: safeTheme.colors.textSecondary,
      marginBottom: 8,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={safeTheme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Médical</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedSection === 'personal' && styles.tabButtonActive]}
            onPress={() => setSelectedSection('personal')}
          >
            <Text style={[styles.tabText, selectedSection === 'personal' && styles.tabTextActive]}>
              Personnel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedSection === 'medical' && styles.tabButtonActive]}
            onPress={() => setSelectedSection('medical')}
          >
            <Text style={[styles.tabText, selectedSection === 'medical' && styles.tabTextActive]}>
              Médical
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedSection === 'lifestyle' && styles.tabButtonActive]}
            onPress={() => setSelectedSection('lifestyle')}
          >
            <Text style={[styles.tabText, selectedSection === 'lifestyle' && styles.tabTextActive]}>
              Mode de vie
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedSection === 'family' && styles.tabButtonActive]}
            onPress={() => setSelectedSection('family')}
          >
            <Text style={[styles.tabText, selectedSection === 'family' && styles.tabTextActive]}>
              Famille
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedSection === 'personal' && renderPersonalInfo()}
          {selectedSection === 'medical' && renderMedicalHistory()}
          {selectedSection === 'lifestyle' && renderLifestyle()}
          {selectedSection === 'family' && renderFamilyHistory()}
        </ScrollView>
      </View>
    </View>
  );
} 
 