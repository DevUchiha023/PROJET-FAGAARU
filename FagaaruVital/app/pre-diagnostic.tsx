import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
  Platform,
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
  chatInput: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    fontSize: 16,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  cameraModal: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
  scanOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  scanOption: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  scanOptionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default function PreDiagnosticScreen() {
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

  const [chatMessage, setChatMessage] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState<'symptoms' | 'wounds'>('symptoms');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestCameraPermission = async () => {
    // Camera permissions are no longer handled here as per the edit hint.
    // This function will be removed or its logic will change.
    // For now, we'll just return true to allow the camera to be shown.
    // In a real scenario, you'd need to implement actual permission handling.
    return true; 
  };

  const handleScanSymptoms = async () => {
    setCameraType('symptoms');
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowCamera(true);
    } else {
      Alert.alert(
        'Permission refusée',
        'L\'accès à la caméra est nécessaire pour scanner les symptômes.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleScanWounds = async () => {
    setCameraType('wounds');
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowCamera(true);
    } else {
      Alert.alert(
        'Permission refusée',
        'L\'accès à la caméra est nécessaire pour scanner les plaies.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleTakePicture = async (camera: any) => {
    if (camera) {
      // This function is no longer used as per the edit hint.
      // The camera logic is simplified.
      Alert.alert('Photo prise', 'Analyse en cours...');
      setShowCamera(false);
      
      // Simuler l'analyse
      setTimeout(() => {
        Alert.alert(
          'Analyse terminée',
          cameraType === 'symptoms' 
            ? 'Analyse des symptômes en cours... Résultats disponibles dans quelques secondes.'
            : 'Analyse de la plaie terminée. Recommandations de traitement disponibles.',
          [{ text: 'OK' }]
        );
      }, 2000);
    }
  };

  const handlePickImage = async () => {
    // This function is no longer used as per the edit hint.
    // The camera logic is simplified.
    Alert.alert('Galerie', 'La fonctionnalité de galerie est en cours de développement.');
  };

  const handleChatAI = () => {
    if (chatMessage.trim()) {
      Alert.alert(
        'Assistant médical',
        'Votre message a été envoyé à l\'assistant médical. Réponse en cours...',
        [{ text: 'OK' }]
      );
      setChatMessage('');
    } else {
      Alert.alert('Erreur', 'Veuillez saisir un message.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <ScrollView style={styles.content}>
        <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
          <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>{t('preDiagnosticAI')}</Text>
          <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
            {t('analyzingSymptoms')} et obtenez des conseils médicaux
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>Scanner médical</Text>
          
          <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>{t('scanSymptoms')}</Text>
            <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
              Analysez vos symptômes pour obtenir un pré-diagnostic
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('analyzingSymptoms')}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('treatmentSuggestions')}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('preventionAdvice')}
                </Text>
              </View>
            </View>
            
            <View style={styles.scanOptions}>
              <TouchableOpacity
                style={[styles.scanOption, { borderColor: safeTheme.colors.border }]}
                onPress={handleScanSymptoms}
              >
                <Ionicons name="camera" size={20} color={safeTheme.colors.primary} />
                <Text style={[styles.scanOptionText, { color: safeTheme.colors.textSecondary }]}>Caméra</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scanOption, { borderColor: safeTheme.colors.border }]}
                onPress={handlePickImage}
              >
                <Ionicons name="images" size={20} color={safeTheme.colors.primary} />
                <Text style={[styles.scanOptionText, { color: safeTheme.colors.textSecondary }]}>Galerie</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>{t('scanWounds')}</Text>
            <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
              Analysez vos plaies et brûlures pour trouver le bon traitement
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('woundIdentification')}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('ointmentRecommendation')}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('careAdvice')}
                </Text>
              </View>
            </View>
            
            <View style={styles.scanOptions}>
              <TouchableOpacity
                style={[styles.scanOption, { borderColor: safeTheme.colors.border }]}
                onPress={handleScanWounds}
              >
                <Ionicons name="camera" size={20} color={safeTheme.colors.primary} />
                <Text style={[styles.scanOptionText, { color: safeTheme.colors.textSecondary }]}>Caméra</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scanOption, { borderColor: safeTheme.colors.border }]}
                onPress={handlePickImage}
              >
                <Ionicons name="images" size={20} color={safeTheme.colors.primary} />
                <Text style={[styles.scanOptionText, { color: safeTheme.colors.textSecondary }]}>Galerie</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>{t('medicalAssistant')}</Text>
          
          <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Chat avec l'IA médicale</Text>
            <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
              Posez vos questions médicales à notre assistant IA
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('instantResponses')}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('personalizedAdvice')}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  {t('reliableInformation')}
                </Text>
              </View>
            </View>
            <TextInput
              style={[styles.chatInput, { 
                borderColor: safeTheme.colors.border,
                color: safeTheme.colors.text,
                backgroundColor: safeTheme.colors.background
              }]}
              placeholder={t('askQuestion')}
              placeholderTextColor={safeTheme.colors.textSecondary}
              value={chatMessage}
              onChangeText={setChatMessage}
              multiline
            />
            <TouchableOpacity
              style={[styles.chatButton, { backgroundColor: '#00BCD4' }]}
              onPress={handleChatAI}
            >
              <Ionicons name="send" size={16} color="white" />
              <Text style={styles.chatButtonText}>{t('send')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de la caméra */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraModal}>
          {/* Camera logic is simplified, so this modal will always show */}
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => {
                  // Take picture logic
                  setShowCamera(false);
                  Alert.alert('Photo prise', 'Analyse en cours...');
                }}
              >
                <Ionicons name="camera" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 