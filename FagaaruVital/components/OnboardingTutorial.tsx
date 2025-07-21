import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface OnboardingTutorialProps {
  visible: boolean;
  onComplete: () => void;
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  stepContainer: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    maxWidth: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  progressDotActive: {
    backgroundColor: '#007AFF',
  },
  progressDotInactive: {
    backgroundColor: '#E9ECEF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  skipButtonText: {
    color: '#6C757D',
  },
  nextButtonText: {
    color: 'white',
  },
});

export default function OnboardingTutorial({ visible, onComplete }: OnboardingTutorialProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [currentStep, setCurrentStep] = useState(0);

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

  const steps: TutorialStep[] = [
    {
      id: 1,
      title: t('welcomeToFagaaru'),
      description: t('yourHealthCompanion'),
      icon: 'heart',
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: t('scanIA'),
      description: 'Analysez vos symptômes avec l\'intelligence artificielle',
      icon: 'scan',
      color: '#4ECDC4',
    },
    {
      id: 3,
      title: t('vitals'),
      description: 'Suivez vos constantes vitales en temps réel',
      icon: 'pulse',
      color: '#45B7D1',
    },
    {
      id: 4,
      title: t('teleconsultation'),
      description: 'Consultez des médecins en ligne',
      icon: 'videocam',
      color: '#96CEB4',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleSkip}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={[styles.stepContainer, { backgroundColor: safeTheme.colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: currentStepData.color + '20' }]}>
              <Ionicons name={currentStepData.icon as any} size={50} color={currentStepData.color} />
            </View>
            
            <Text style={[styles.title, { color: safeTheme.colors.text }]}>{currentStepData.title}</Text>
            <Text style={[styles.description, { color: safeTheme.colors.textSecondary }]}>{currentStepData.description}</Text>
            
            <View style={styles.progressContainer}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    index === currentStep ? styles.progressDotActive : styles.progressDotInactive,
                  ]}
                />
              ))}
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.skipButton, { borderColor: safeTheme.colors.border }]} 
                onPress={handleSkip}
              >
                <Text style={[styles.buttonText, styles.skipButtonText]}>{t('skip')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
                <Text style={[styles.buttonText, styles.nextButtonText]}>
                  {currentStep === steps.length - 1 ? t('finish') : t('next')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
} 