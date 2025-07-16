import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  available: boolean;
  price: number;
}

interface Appointment {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}

export default function TeleconsultationScreen() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Amadou Diallo',
      specialty: 'Médecin généraliste',
      rating: 4.8,
      available: true,
      price: 15000
    },
    {
      id: '2',
      name: 'Dr. Fatou Sall',
      specialty: 'Cardiologue',
      rating: 4.9,
      available: true,
      price: 25000
    },
    {
      id: '3',
      name: 'Dr. Mamadou Ba',
      specialty: 'Pédiatre',
      rating: 4.7,
      available: false,
      price: 20000
    },
    {
      id: '4',
      name: 'Dr. Aissatou Diop',
      specialty: 'Gynécologue',
      rating: 4.6,
      available: true,
      price: 22000
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const bookAppointment = () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !reason) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctor);
    Alert.alert(
      'Rendez-vous confirmé',
      `Rendez-vous avec ${doctor?.name} le ${appointmentDate} à ${appointmentTime}\n\nPrix: ${doctor?.price} FCFA\n\nLes données vitales seront envoyées automatiquement.`,
      [
        { text: 'Payer maintenant', onPress: () => handlePayment() },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const handlePayment = () => {
    Alert.alert(
      'Paiement',
      'Choisissez votre méthode de paiement :',
      [
        { text: 'Orange Money', onPress: () => simulatePayment('Orange Money') },
        { text: 'WAVE', onPress: () => simulatePayment('WAVE') },
        { text: 'Free Money', onPress: () => simulatePayment('Free Money') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const simulatePayment = (method: string) => {
    Alert.alert(
      'Paiement simulé',
      `Paiement de ${doctors.find(d => d.id === selectedDoctor)?.price} FCFA via ${method} réussi !\n\nConsultation vidéo disponible.`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👨‍⚕️ Téléconsultation Médicale</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Médecins disponibles :</Text>
        {doctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={[
              styles.doctorCard,
              selectedDoctor === doctor.id && styles.selectedDoctor,
              !doctor.available && styles.unavailableDoctor
            ]}
            onPress={() => doctor.available && setSelectedDoctor(doctor.id)}
            disabled={!doctor.available}
          >
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorRating}>⭐ {doctor.rating}</Text>
              <Text style={styles.doctorPrice}>{doctor.price} FCFA</Text>
            </View>
            <View style={styles.doctorStatus}>
              <Text style={[
                styles.statusText,
                doctor.available ? styles.available : styles.unavailable
              ]}>
                {doctor.available ? 'Disponible' : 'Indisponible'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedDoctor && (
        <View style={styles.appointmentSection}>
          <Text style={styles.sectionTitle}>Prendre rendez-vous :</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date :</Text>
            <TextInput
              style={styles.input}
              placeholder="JJ/MM/AAAA"
              value={appointmentDate}
              onChangeText={setAppointmentDate}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Heure :</Text>
            <View style={styles.timeSlots}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    appointmentTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => setAppointmentTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    appointmentTime === time && styles.selectedTimeText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Motif de consultation :</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              placeholder="Décrivez vos symptômes..."
              value={reason}
              onChangeText={setReason}
            />
          </View>

          <Button
            title="Confirmer le rendez-vous"
            onPress={bookAppointment}
            color="#4caf50"
          />
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Informations importantes :</Text>
        <Text style={styles.infoText}>• Les données vitales seront automatiquement envoyées au médecin</Text>
        <Text style={styles.infoText}>• Consultation vidéo ou audio disponible</Text>
        <Text style={styles.infoText}>• Paiement sécurisé via mobile money</Text>
        <Text style={styles.infoText}>• Ordonnance numérique disponible après consultation</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  doctorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDoctor: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e8',
  },
  unavailableDoctor: {
    opacity: 0.6,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  doctorRating: {
    fontSize: 12,
    color: '#ffa500',
    marginTop: 2,
  },
  doctorPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
    marginTop: 2,
  },
  doctorStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  available: {
    color: '#4caf50',
  },
  unavailable: {
    color: '#ff4d4d',
  },
  appointmentSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
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