import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { router } from 'expo-router';

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
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  featureList: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  profileInfo: {
    marginTop: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
  },
});

export default function MedicalRecordScreen() {
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

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionPress = (section: string) => {
    setSelectedSection(section);
  };

  const handleBackToList = () => {
    setSelectedSection(null);
  };

  const renderDossierMedical = () => (
    <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
      <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Dossier Médical</Text>
      <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
        Consultez votre dossier médical complet
      </Text>
      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
          <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
            Historique des consultations
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
          <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
            Résultats d'analyses
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
          <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
            Ordonnances et traitements
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: safeTheme.colors.primary }]}
        onPress={() => handleSectionPress('dossier')}
      >
        <Ionicons name="document-text" size={20} color="white" />
        <Text style={styles.actionButtonText}>Voir le dossier</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStatistiques = () => (
    <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
      <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Statistiques</Text>
      <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
        Suivez vos statistiques de santé
      </Text>
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
          <Text style={[styles.statValue, { color: '#1976D2' }]}>12</Text>
          <Text style={[styles.statLabel, { color: '#1976D2' }]}>Consultations</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
          <Text style={[styles.statValue, { color: '#388E3C' }]}>8</Text>
          <Text style={[styles.statLabel, { color: '#388E3C' }]}>Analyses</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={[styles.statValue, { color: '#F57C00' }]}>15</Text>
          <Text style={[styles.statLabel, { color: '#F57C00' }]}>Ordonnances</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FCE4EC' }]}>
          <Text style={[styles.statValue, { color: '#C2185B' }]}>3</Text>
          <Text style={[styles.statLabel, { color: '#C2185B' }]}>Urgences</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#795548' }]}
        onPress={() => handleSectionPress('statistiques')}
      >
        <Ionicons name="analytics" size={20} color="white" />
        <Text style={styles.actionButtonText}>Voir les statistiques</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfilMedical = () => (
    <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
      <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Profil Médical</Text>
      <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
        Votre profil santé personnalisé
      </Text>
      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
          <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
            Informations personnelles
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
          <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
            Antécédents médicaux
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
          <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
            Allergies et contre-indications
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#3F51B5' }]}
        onPress={() => handleSectionPress('profil')}
      >
        <Ionicons name="person" size={20} color="white" />
        <Text style={styles.actionButtonText}>Voir le profil</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDossierDetail = () => (
    <ScrollView style={styles.content}>
      <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity onPress={handleBackToList} style={{ marginRight: 15 }}>
            <Ionicons name="arrow-back" size={24} color={safeTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Dossier Médical</Text>
        </View>
        
        <View style={styles.profileInfo}>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Nom complet</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>Jean Dupont</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Date de naissance</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>15/03/1985</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Groupe sanguin</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>A+</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Médecin traitant</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>Dr. Martin</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderStatistiquesDetail = () => (
    <ScrollView style={styles.content}>
      <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity onPress={handleBackToList} style={{ marginRight: 15 }}>
            <Ionicons name="arrow-back" size={24} color={safeTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Statistiques de santé</Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
            <Text style={[styles.statValue, { color: '#1976D2' }]}>72</Text>
            <Text style={[styles.statLabel, { color: '#1976D2' }]}>Battements/min</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
            <Text style={[styles.statValue, { color: '#388E3C' }]}>120/80</Text>
            <Text style={[styles.statLabel, { color: '#388E3C' }]}>Tension (mmHg)</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.statValue, { color: '#F57C00' }]}>36.8</Text>
            <Text style={[styles.statLabel, { color: '#F57C00' }]}>Température (°C)</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FCE4EC' }]}>
            <Text style={[styles.statValue, { color: '#C2185B' }]}>98%</Text>
            <Text style={[styles.statLabel, { color: '#C2185B' }]}>Saturation O2</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderProfilDetail = () => (
    <ScrollView style={styles.content}>
      <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity onPress={handleBackToList} style={{ marginRight: 15 }}>
            <Ionicons name="arrow-back" size={24} color={safeTheme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Profil Médical</Text>
        </View>
        
        <View style={styles.profileInfo}>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Allergies</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>Pénicilline, Pollen</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Médicaments actuels</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>Vitamine D, Oméga-3</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Antécédents</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>Appendicite (2010)</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.infoLabel, { color: safeTheme.colors.text }]}>Mode de vie</Text>
            <Text style={[styles.infoValue, { color: safeTheme.colors.textSecondary }]}>Non-fumeur, Sportif</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      {selectedSection ? (
        selectedSection === 'dossier' ? renderDossierDetail() :
        selectedSection === 'statistiques' ? renderStatistiquesDetail() :
        selectedSection === 'profil' ? renderProfilDetail() : null
      ) : (
        <>
          <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
            <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Dossier Médical</Text>
            <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
              Votre dossier, statistiques et profil médical
            </Text>
          </View>

          <ScrollView style={styles.content}>
            {renderDossierMedical()}
            {renderStatistiques()}
            {renderProfilMedical()}
          </ScrollView>
        </>
      )}
    </View>
  );
} 