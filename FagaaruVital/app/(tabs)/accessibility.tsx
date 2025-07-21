import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  voiceOver: boolean;
  darkMode: boolean;
  reduceMotion: boolean;
  textSize: number;
  soundEffects: boolean;
  hapticFeedback: boolean;
}

// Styles pour CustomSwitch
const switchStyles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
  },
});

// Composant Switch personnalisé
const CustomSwitch = ({ value, onValueChange, disabled = false }: { 
  value: boolean; 
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}) => {
  const { theme } = useAppTheme();
  
  // Vérification de sécurité pour le thème
  const safeTheme = theme || {
    colors: {
      primary: '#007AFF',
      border: '#E9ECEF',
    },
  };
  
  return (
    <TouchableOpacity
      style={[
        switchStyles.switchContainer,
        {
          backgroundColor: value ? safeTheme.colors.primary : safeTheme.colors.border,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.7}
    >
      <View
        style={[
          switchStyles.switchThumb,
          {
            transform: [{ translateX: value ? 20 : 2 }],
            backgroundColor: 'white',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  testButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 10,
  },
  testButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  textSizeContainer: {
    marginTop: 10,
  },
  textSizeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  textSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textSizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 60,
    alignItems: 'center',
  },
  textSizeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  textSizeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textSizeButtonTextActive: {
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default function AccessibilityScreen() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useAppTheme();
  
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
  
  const [settings, setSettings] = useState<AccessibilitySettings>({
    largeText: false,
    highContrast: false,
    voiceOver: false,
    darkMode: false,
    reduceMotion: false,
    textSize: 1.0,
    soundEffects: true,
    hapticFeedback: true,
  });

  const handleSettingChange = (key: keyof AccessibilitySettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'darkMode') {
      toggleTheme();
    }
  };

  const handleTextSizeChange = (size: number) => {
    handleSettingChange('textSize', size);
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Réinitialiser l\'accessibilité',
      'Êtes-vous sûr de vouloir réinitialiser tous les paramètres d\'accessibilité ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            setSettings({
              largeText: false,
              highContrast: false,
              voiceOver: false,
              darkMode: false,
              reduceMotion: false,
              textSize: 1.0,
              soundEffects: true,
              hapticFeedback: true,
            });
          },
        },
      ]
    );
  };

  const handleTestVoiceOver = () => {
    Alert.alert('Test VoiceOver', 'VoiceOver est maintenant actif. Testez la navigation avec les gestes.');
  };

  const handleTestHaptic = () => {
    Alert.alert('Test haptique', 'Retour haptique testé. Vous devriez sentir une vibration.');
  };

  const textSizeOptions = [
    { value: 0.8, label: 'Petit' },
    { value: 1.0, label: 'Normal' },
    { value: 1.2, label: 'Grand' },
    { value: 1.5, label: 'Très grand' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
          <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Accessibilité</Text>
          <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
            Personnalisez l'application selon vos besoins d'accessibilité
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: safeTheme.colors.card, borderLeftColor: safeTheme.colors.primary }]}>
          <Text style={[styles.infoTitle, { color: safeTheme.colors.text }]}>Informations sur l'accessibilité</Text>
          <Text style={[styles.infoText, { color: safeTheme.colors.textSecondary }]}>
            Ces paramètres vous aident à utiliser l'application plus facilement selon vos besoins visuels, auditifs et moteurs.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Affichage</Text>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Texte agrandi</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Augmente la taille du texte pour faciliter la lecture</Text>
              </View>
              <CustomSwitch
                value={settings.largeText}
                onValueChange={(value) => handleSettingChange('largeText', value)}
              />
            </View>
          </View>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Contraste élevé</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Améliore la visibilité des éléments à l'écran</Text>
              </View>
              <CustomSwitch
                value={settings.highContrast}
                onValueChange={(value) => handleSettingChange('highContrast', value)}
              />
            </View>
          </View>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Mode sombre</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Réduit la fatigue oculaire et économise la batterie</Text>
              </View>
              <CustomSwitch
                value={settings.darkMode}
                onValueChange={(value) => handleSettingChange('darkMode', value)}
              />
            </View>
          </View>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Taille du texte</Text>
            <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Ajustez la taille du texte selon vos préférences</Text>
            <View style={styles.textSizeContainer}>
              <Text style={[styles.textSizeLabel, { color: safeTheme.colors.textSecondary }]}>
                Taille actuelle: {Math.round(settings.textSize * 100)}%
              </Text>
              <View style={styles.textSizeButtons}>
                {textSizeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.textSizeButton,
                      { borderColor: safeTheme.colors.border },
                      settings.textSize === option.value && styles.textSizeButtonActive,
                    ]}
                    onPress={() => handleTextSizeChange(option.value)}
                  >
                    <Text
                      style={[
                        styles.textSizeButtonText,
                        { color: safeTheme.colors.textSecondary },
                        settings.textSize === option.value && styles.textSizeButtonTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Audio et retour haptique</Text>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>VoiceOver</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Lit le contenu à haute voix pour les utilisateurs malvoyants</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomSwitch
                  value={settings.voiceOver}
                  onValueChange={(value) => handleSettingChange('voiceOver', value)}
                />
                <TouchableOpacity style={[styles.testButton, { backgroundColor: safeTheme.colors.primary }]} onPress={handleTestVoiceOver}>
                  <Text style={styles.testButtonText}>Tester</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Effets sonores</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Active les sons de l'interface utilisateur</Text>
              </View>
              <CustomSwitch
                value={settings.soundEffects}
                onValueChange={(value) => handleSettingChange('soundEffects', value)}
              />
            </View>
          </View>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Retour haptique</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Vibrations tactiles lors des interactions</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomSwitch
                  value={settings.hapticFeedback}
                  onValueChange={(value) => handleSettingChange('hapticFeedback', value)}
                />
                <TouchableOpacity style={[styles.testButton, { backgroundColor: safeTheme.colors.primary }]} onPress={handleTestHaptic}>
                  <Text style={styles.testButtonText}>Tester</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Mouvement</Text>

          <View style={[styles.settingCard, { backgroundColor: safeTheme.colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: safeTheme.colors.text }]}>Réduire les mouvements</Text>
                <Text style={[styles.settingDescription, { color: safeTheme.colors.textSecondary }]}>Limite les animations pour les utilisateurs sensibles</Text>
              </View>
              <CustomSwitch
                value={settings.reduceMotion}
                onValueChange={(value) => handleSettingChange('reduceMotion', value)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetSettings}>
          <Text style={styles.resetButtonText}>Réinitialiser l'accessibilité</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
} 