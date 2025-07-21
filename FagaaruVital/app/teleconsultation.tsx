import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
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
  doctorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  doctorCard: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 12,
    textAlign: 'center',
  },
  doctorRating: {
    fontSize: 12,
    marginTop: 4,
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
  videoCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 8,
  },
  videoCallButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default function TeleconsultationScreen() {
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

  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const doctors = [
    {
      id: '1',
      name: 'Dr. Marie Diallo',
      specialty: 'Cardiologie',
      rating: 4.8,
      available: true,
      avatar: '👩‍⚕️',
      color: '#E3F2FD',
    },
    {
      id: '2',
      name: 'Dr. Amadou Ba',
      specialty: 'Dermatologie',
      rating: 4.9,
      available: true,
      avatar: '👨‍⚕️',
      color: '#E8F5E8',
    },
    {
      id: '3',
      name: 'Dr. Fatou Sall',
      specialty: 'Pédiatrie',
      rating: 4.7,
      available: false,
      avatar: '👩‍⚕️',
      color: '#FFF3E0',
    },
    {
      id: '4',
      name: 'Dr. Mamadou Diop',
      specialty: 'Gynécologie',
      rating: 4.6,
      available: true,
      avatar: '👨‍⚕️',
      color: '#FCE4EC',
    },
  ];

  const requestCameraPermission = async () => {
    // Camera permissions are simplified for now
    return true;
  };

  const handleVideoCall = async (doctor: any) => {
    if (!doctor.available) {
      Alert.alert('Médecin indisponible', 'Ce médecin n\'est pas disponible pour le moment.');
      return;
    }

    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowCamera(true);
      Alert.alert(
        'Appel en cours',
        `Connexion avec ${doctor.name}...`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Permission refusée',
        'L\'accès à la caméra est nécessaire pour la téléconsultation.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBookAppointment = (doctor: any) => {
    Alert.alert(
      'Prendre rendez-vous',
      `Voulez-vous prendre rendez-vous avec ${doctor.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => Alert.alert('Rendez-vous confirmé', 'Vous recevrez une notification de confirmation.') },
      ]
    );
  };

  const handleChatWithDoctor = (doctor: any) => {
    Alert.alert(
      'Chat avec le médecin',
      `Ouvrir le chat avec ${doctor.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir', onPress: () => Alert.alert('Chat ouvert', 'Chat en cours de chargement...') },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <ScrollView style={styles.content}>
        <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
          <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>{t('onlineConsultation')}</Text>
          <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
            Consultez des médecins en ligne depuis chez vous
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>{t('availableDoctors')}</Text>
          
          <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>{t('specialties')}</Text>
            <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
              Médecins disponibles pour consultation en ligne
            </Text>
            
            <View style={styles.doctorGrid}>
              {doctors.map((doctor) => (
                <View
                  key={doctor.id}
                  style={[styles.doctorCard, { backgroundColor: doctor.color }]}
                >
                  <View style={[styles.doctorAvatar, { backgroundColor: safeTheme.colors.card }]}>
                    <Text style={{ fontSize: 24 }}>{doctor.avatar}</Text>
                  </View>
                  <Text style={[styles.doctorName, { color: safeTheme.colors.text }]}>
                    {doctor.name}
                  </Text>
                  <Text style={[styles.doctorSpecialty, { color: safeTheme.colors.textSecondary }]}>
                    {doctor.specialty}
                  </Text>
                  <Text style={[styles.doctorRating, { color: safeTheme.colors.textSecondary }]}>
                    ⭐ {doctor.rating}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                      style={[styles.videoCallButton, { backgroundColor: '#4CAF50' }]}
                      onPress={() => handleVideoCall(doctor)}
                    >
                      <Ionicons name="videocam" size={12} color="white" />
                      <Text style={styles.videoCallButtonText}>Appel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.videoCallButton, { backgroundColor: '#2196F3', marginLeft: 5 }]}
                      onPress={() => handleChatWithDoctor(doctor)}
                    >
                      <Ionicons name="chatbubble" size={12} color="white" />
                      <Text style={styles.videoCallButtonText}>Chat</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: safeTheme.colors.primary }]}
                    onPress={() => handleBookAppointment(doctor)}
                  >
                    <Ionicons name="calendar" size={16} color="white" />
                    <Text style={styles.actionButtonText}>Rendez-vous</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: safeTheme.colors.text }]}>{t('videoCall')}</Text>
          
          <View style={[styles.card, { backgroundColor: safeTheme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: safeTheme.colors.text }]}>Appel vidéo</Text>
            <Text style={[styles.cardDescription, { color: safeTheme.colors.textSecondary }]}>
              Consultez un médecin en visioconférence
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  Consultation en temps réel
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  Partage d'écran pour analyses
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: safeTheme.colors.textSecondary }]}>
                  Ordonnance électronique
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
              onPress={() => setShowCamera(true)}
            >
              <Ionicons name="videocam" size={20} color="white" />
              <Text style={styles.actionButtonText}>Démarrer l'appel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de la caméra pour l'appel vidéo */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraModal}>
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={[styles.cameraButton, { backgroundColor: '#F44336' }]}
                onPress={() => {
                  setShowCamera(false);
                  Alert.alert('Appel terminé', 'L\'appel a été terminé.');
                }}
              >
                <Ionicons name="call" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 