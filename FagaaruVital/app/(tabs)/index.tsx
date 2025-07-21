import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import OnboardingTutorial from '../../components/OnboardingTutorial';
import HomeQuickAccess from '../../components/HomeQuickAccess';
import HealthStats from '../../components/HealthStats';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 50,
    marginBottom: 15,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  slogan: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  languageSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  languageButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  languageButtonActive: {
    backgroundColor: '#007AFF',
  },
  languageButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  languageButtonTextActive: {
    color: 'white',
  },
  quickAccessSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [userName] = useState('Amadou'); // À remplacer par le vrai nom utilisateur si dispo

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
    isDark: false,
  };

  useEffect(() => {
    setShowOnboarding(true);
  }, []);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleQuickAccess = (screen: string) => {
    // Navigation vers les écrans principaux
    console.log('Navigation vers:', screen);
  };

  // Détection du mode sombre fallback
  const isDark = safeTheme.isDark !== undefined ? safeTheme.isDark : (safeTheme.colors.background === '#232526' || safeTheme.colors.background === '#000');

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header avec logo et message d'accueil */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoShadow}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>FV</Text>
              </View>
            </View>
            <Text style={[styles.greeting, { color: safeTheme.colors.text }]}>{t('welcome')}, {userName} 👋</Text>
            <Text style={[styles.title, { color: safeTheme.colors.primary }]}>{t('welcomeToFagaaru')}</Text>
            <Text style={[styles.subtitle, { color: safeTheme.colors.textSecondary }]}>{t('yourHealthCompanion')}</Text>
            <Text style={[styles.slogan, { color: safeTheme.colors.textSecondary }]}>
              &ldquo;{t('healthFirst')} • {t('accessibleToAll')} • {t('anytimeAnywhere')}&rdquo;
            </Text>
          </View>
        </View>

        {/* Sélecteur de langue */}
        <View style={styles.languageSection}>
          <Text style={[styles.languageTitle, { color: safeTheme.colors.text }]}>{t('selectLanguage')}</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { borderColor: safeTheme.colors.primary, backgroundColor: safeTheme.colors.card },
                currentLanguage === 'fr' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('fr')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  { color: safeTheme.colors.textSecondary },
                  currentLanguage === 'fr' && styles.languageButtonTextActive,
                ]}
              >
                🇫🇷 Français
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { borderColor: safeTheme.colors.primary, backgroundColor: safeTheme.colors.card },
                currentLanguage === 'en' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  { color: safeTheme.colors.textSecondary },
                  currentLanguage === 'en' && styles.languageButtonTextActive,
                ]}
              >
                🇺🇸 English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { borderColor: safeTheme.colors.primary, backgroundColor: safeTheme.colors.card },
                currentLanguage === 'wo' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('wo')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  { color: safeTheme.colors.textSecondary },
                  currentLanguage === 'wo' && styles.languageButtonTextActive,
                ]}
              >
                🇸🇳 Wolof
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Accès rapide aux fonctionnalités */}
        <View style={styles.quickAccessSection}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>{t('home')}</Text>
          <HomeQuickAccess onPress={handleQuickAccess} />
        </View>

        {/* Statistiques de santé */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>{t('healthVitals')}</Text>
          <HealthStats />
        </View>
      </ScrollView>

      {/* Tutoriel d'introduction */}
      {showOnboarding && (
        <OnboardingTutorial
          visible={showOnboarding}
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </View>
  );
}
