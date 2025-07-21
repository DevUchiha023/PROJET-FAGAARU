import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  interactions: string[];
  precautions: string[];
  image: string;
}

export default function PharmacyScreen() {
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const categories = [
    { key: 'all', label: 'Tous', icon: 'apps' },
    { key: 'pain', label: 'Douleurs', icon: 'medical' },
    { key: 'fever', label: 'Fièvre', icon: 'thermometer' },
    { key: 'cough', label: 'Toux', icon: 'medical-outline' },
    { key: 'vitamins', label: 'Vitamines', icon: 'leaf' },
    { key: 'prescription', label: 'Ordonnance', icon: 'document-text' },
  ];

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Paracétamol 500mg',
      genericName: 'Acétaminophène',
      category: 'pain',
      description: 'Antidouleur et antipyrétique pour fièvre et douleurs légères à modérées',
      dosage: '1-2 comprimés toutes les 4-6 heures, maximum 4g par jour',
      sideEffects: ['Nausées', 'Réactions allergiques', 'Problèmes hépatiques en cas de surdosage'],
      interactions: ['Anticoagulants', 'Alcool', 'Autres médicaments contenant du paracétamol'],
      precautions: ['Ne pas dépasser la dose recommandée', 'Consulter un médecin si fièvre persiste plus de 3 jours'],
      image: '💊',
    },
    {
      id: '2',
      name: 'Ibuprofène 400mg',
      genericName: 'Ibuprofène',
      category: 'pain',
      description: 'Anti-inflammatoire non stéroïdien pour douleurs et inflammation',
      dosage: '1 comprimé toutes les 6-8 heures, maximum 1200mg par jour',
      sideEffects: ['Brûlures d\'estomac', 'Saignements', 'Problèmes rénaux'],
      interactions: ['Aspirine', 'Anticoagulants', 'Corticoïdes'],
      precautions: ['À prendre avec de la nourriture', 'Éviter en cas d\'ulcère gastrique'],
      image: '💊',
    },
    {
      id: '3',
      name: 'Vitamine C 1000mg',
      genericName: 'Acide ascorbique',
      category: 'vitamins',
      description: 'Complément vitaminique pour renforcer le système immunitaire',
      dosage: '1 comprimé par jour, de préférence le matin',
      sideEffects: ['Diarrhée', 'Nausées', 'Calculs rénaux à forte dose'],
      interactions: ['Fer', 'Vitamine B12', 'Anticoagulants'],
      precautions: ['Ne pas dépasser 2000mg par jour', 'Boire beaucoup d\'eau'],
      image: '💊',
    },
    {
      id: '4',
      name: 'Amoxicilline 500mg',
      genericName: 'Amoxicilline',
      category: 'prescription',
      description: 'Antibiotique pour traiter les infections bactériennes',
      dosage: '1 comprimé 3 fois par jour pendant 7-10 jours',
      sideEffects: ['Diarrhée', 'Réactions allergiques', 'Candidose'],
      interactions: ['Contraceptifs oraux', 'Méthotrexate', 'Probenécide'],
      precautions: ['Terminer complètement le traitement', 'Ne pas partager avec d\'autres'],
      image: '💊',
    },
  ];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication(medication);
  };

  const handleBackToList = () => {
    setSelectedMedication(null);
  };

  const renderMedication = ({ item }: { item: Medication }) => (
    <TouchableOpacity
      style={[styles.medicationCard, { backgroundColor: safeTheme.colors.card }]}
      onPress={() => handleMedicationSelect(item)}
    >
      <View style={styles.medicationHeader}>
        <Text style={styles.medicationImage}>{item.image}</Text>
        <View style={styles.medicationInfo}>
          <Text style={[styles.medicationName, { color: safeTheme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.medicationGeneric, { color: safeTheme.colors.textSecondary }]}>{item.genericName}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={safeTheme.colors.textSecondary} />
      </View>
      
      <Text style={[styles.medicationDescription, { color: safeTheme.colors.textSecondary }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderMedicationDetail = () => {
    if (!selectedMedication) return null;

    return (
      <ScrollView style={styles.detailContainer}>
        <View style={[styles.detailHeader, { backgroundColor: safeTheme.colors.card }]}>
          <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={safeTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.detailTitle, { color: safeTheme.colors.text }]}>{selectedMedication.name}</Text>
        </View>

        <View style={[styles.detailCard, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.detailSectionTitle, { color: safeTheme.colors.text }]}>Informations générales</Text>
          <Text style={[styles.detailText, { color: safeTheme.colors.textSecondary }]}>
            <Text style={[styles.detailLabel, { color: safeTheme.colors.text }]}>Nom générique:</Text> {selectedMedication.genericName}
          </Text>
          <Text style={[styles.detailText, { color: safeTheme.colors.textSecondary }]}>
            <Text style={[styles.detailLabel, { color: safeTheme.colors.text }]}>Description:</Text> {selectedMedication.description}
          </Text>
        </View>

        <View style={[styles.detailCard, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.detailSectionTitle, { color: safeTheme.colors.text }]}>Posologie</Text>
          <Text style={[styles.detailText, { color: safeTheme.colors.textSecondary }]}>
            {selectedMedication.dosage}
          </Text>
        </View>

        <View style={[styles.detailCard, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.detailSectionTitle, { color: safeTheme.colors.text }]}>Effets secondaires</Text>
          {selectedMedication.sideEffects.map((effect, index) => (
            <Text key={index} style={[styles.detailText, { color: safeTheme.colors.textSecondary }]}>
              • {effect}
            </Text>
          ))}
        </View>

        <View style={[styles.detailCard, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.detailSectionTitle, { color: safeTheme.colors.text }]}>Interactions médicamenteuses</Text>
          {selectedMedication.interactions.map((interaction, index) => (
            <Text key={index} style={[styles.detailText, { color: safeTheme.colors.textSecondary }]}>
              • {interaction}
            </Text>
          ))}
        </View>

        <View style={[styles.detailCard, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.detailSectionTitle, { color: safeTheme.colors.text }]}>Précautions</Text>
          {selectedMedication.precautions.map((precaution, index) => (
            <Text key={index} style={[styles.detailText, { color: safeTheme.colors.textSecondary }]}>
              • {precaution}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      lineHeight: 22,
    },
    searchContainer: {
      padding: 20,
    },
    searchInput: {
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
    },
    categoriesContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    categoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
    },
    categoryButtonActive: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    categoryButtonText: {
      fontSize: 12,
      fontWeight: '500',
      marginLeft: 4,
    },
    categoryButtonTextActive: {
      color: 'white',
    },
    medicationsList: {
      flex: 1,
      paddingHorizontal: 20,
    },
    medicationCard: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medicationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    medicationImage: {
      fontSize: 24,
      marginRight: 12,
    },
    medicationInfo: {
      flex: 1,
    },
    medicationName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    medicationGeneric: {
      fontSize: 14,
    },
    medicationDescription: {
      fontSize: 14,
      lineHeight: 20,
    },
    detailContainer: {
      flex: 1,
    },
    detailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
    },
    backButton: {
      marginRight: 15,
    },
    detailTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    detailCard: {
      borderRadius: 12,
      padding: 16,
      margin: 20,
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    detailSectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
    },
    detailText: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 5,
    },
    detailLabel: {
      fontWeight: '600',
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      {selectedMedication ? (
        renderMedicationDetail()
      ) : (
        <>
          <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Informations médicamenteuses</Text>
            <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
              Consultez les informations détaillées sur les médicaments
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput, { 
                borderColor: safeTheme.colors.border,
                color: safeTheme.colors.text,
                backgroundColor: safeTheme.colors.card
              }]}
              placeholder="Rechercher un médicament..."
              placeholderTextColor={safeTheme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.categoryButton,
                    { borderColor: safeTheme.colors.border },
                    selectedCategory === category.key && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.key)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={14}
                    color={selectedCategory === category.key ? 'white' : safeTheme.colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      { color: safeTheme.colors.textSecondary },
                      selectedCategory === category.key && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <FlatList
            data={filteredMedications}
            renderItem={renderMedication}
            keyExtractor={(item) => item.id}
            style={styles.medicationsList}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
} 