import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface Notification {
  id: string;
  type: 'vital' | 'medication' | 'appointment' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function NotificationsScreen() {
  const [vitalAlerts, setVitalAlerts] = useState(true);
  const [medicationReminders, setMedicationReminders] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [generalNotifications, setGeneralNotifications] = useState(false);

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'vital',
      title: '🚨 Alerte Vitale',
      message: 'Température élevée détectée (38.5°C). Surveillez vos symptômes.',
      time: 'Il y a 2 heures',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'medication',
      title: '💊 Rappel Médicament',
      message: 'Il est temps de prendre votre Paracétamol 500mg.',
      time: 'Il y a 30 minutes',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'appointment',
      title: '👨‍⚕️ Rendez-vous',
      message: 'Rappel: Consultation avec Dr. Diallo demain à 14h00.',
      time: 'Il y a 1 heure',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'vital',
      title: '✅ Signes Vitaux Normaux',
      message: 'Toutes vos mesures sont dans les normes. Continuez ainsi !',
      time: 'Il y a 4 heures',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'general',
      title: '📱 Mise à jour App',
      message: 'Nouvelle version de FagaaruVital disponible avec améliorations.',
      time: 'Il y a 1 jour',
      read: true,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vital': return '❤️';
      case 'medication': return '💊';
      case 'appointment': return '👨‍⚕️';
      case 'general': return '📱';
      default: return '📢';
    }
  };

  const markAsRead = (notificationId: string) => {
    Alert.alert(
      'Marquer comme lu',
      'Marquer cette notification comme lue ?',
      [
        { text: 'Marquer', onPress: () => Alert.alert('Notification marquée comme lue') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const deleteNotification = (notificationId: string) => {
    Alert.alert(
      'Supprimer',
      'Supprimer cette notification ?',
      [
        { text: 'Supprimer', onPress: () => Alert.alert('Notification supprimée') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const testNotification = (type: string) => {
    let message = '';
    switch (type) {
      case 'vital':
        message = 'Test d\'alerte vitale - Simulation d\'anomalie détectée';
        break;
      case 'medication':
        message = 'Test de rappel médicament - Heure de prise';
        break;
      case 'appointment':
        message = 'Test de rappel rendez-vous - Consultation dans 1 heure';
        break;
      default:
        message = 'Test de notification générale';
    }
    
    Alert.alert(
      'Test de notification',
      message,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔔 Notifications Intelligentes</Text>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>⚙️ Paramètres de notifications :</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>🚨 Alertes vitales</Text>
            <Text style={styles.settingDescription}>Notifications en cas d'anomalie</Text>
          </View>
          <Switch
            value={vitalAlerts}
            onValueChange={setVitalAlerts}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={vitalAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>💊 Rappels médicaments</Text>
            <Text style={styles.settingDescription}>Rappels de prise de médicaments</Text>
          </View>
          <Switch
            value={medicationReminders}
            onValueChange={setMedicationReminders}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={medicationReminders ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>👨‍⚕️ Rappels rendez-vous</Text>
            <Text style={styles.settingDescription}>Rappels de consultations</Text>
          </View>
          <Switch
            value={appointmentReminders}
            onValueChange={setAppointmentReminders}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={appointmentReminders ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>📱 Notifications générales</Text>
            <Text style={styles.settingDescription}>Mises à jour et informations</Text>
          </View>
          <Switch
            value={generalNotifications}
            onValueChange={setGeneralNotifications}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={generalNotifications ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🧪 Tests de notifications :</Text>
        <View style={styles.testButtons}>
          <Button
            title="🚨 Test Alerte Vitale"
            onPress={() => testNotification('vital')}
            color="#f44336"
          />
          <Button
            title="💊 Test Rappel Médicament"
            onPress={() => testNotification('medication')}
            color="#ff9800"
          />
          <Button
            title="👨‍⚕️ Test Rendez-vous"
            onPress={() => testNotification('appointment')}
            color="#2196f3"
          />
        </View>
      </View>

      <View style={styles.notificationsSection}>
        <Text style={styles.sectionTitle}>📋 Historique des notifications :</Text>
        {notifications.map((notification) => (
          <View key={notification.id} style={[
            styles.notificationCard,
            !notification.read && styles.unreadNotification
          ]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationIcon}>{getTypeIcon(notification.type)}</Text>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <View style={styles.notificationPriority}>
                <View style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(notification.priority) }
                ]} />
              </View>
            </View>
            
            <View style={styles.notificationActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => markAsRead(notification.id)}
              >
                <Text style={styles.actionText}>Marquer lu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteNotification(notification.id)}
              >
                <Text style={[styles.actionText, styles.deleteText]}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Informations importantes :</Text>
        <Text style={styles.infoText}>• Notifications push en temps réel</Text>
        <Text style={styles.infoText}>• Alertes vitales prioritaires</Text>
        <Text style={styles.infoText}>• Rappels personnalisés</Text>
        <Text style={styles.infoText}>• Notifications SMS disponibles</Text>
        <Text style={styles.infoText}>• Paramètres personnalisables</Text>
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
  settingsSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  testSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 10,
  },
  testButtons: {
    gap: 10,
  },
  notificationsSection: {
    marginBottom: 20,
  },
  notificationCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  unreadNotification: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e8',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  notificationIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  notificationPriority: {
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  notificationActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  actionText: {
    fontSize: 12,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ffe6e6',
  },
  deleteText: {
    color: '#f44336',
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