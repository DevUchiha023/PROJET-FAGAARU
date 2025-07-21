import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Vérifier si on est dans Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Configuration des notifications (seulement si pas dans Expo Go)
if (!isExpoGo) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export interface HealthNotification {
  id: string;
  title: string;
  body: string;
  data?: any;
  trigger?: any;
  type: 'reminder' | 'alert' | 'info' | 'emergency';
  priority: 'low' | 'medium' | 'high';
}

class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Demander les permissions
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
          console.log('Permissions de notification non accordées');
          return;
        }
      }

      // Configuration pour Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });

        // Canal pour les urgences
        await Notifications.setNotificationChannelAsync('emergency', {
          name: 'Urgences',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 500, 250, 500],
          lightColor: '#FF0000',
          sound: 'default',
        });

        // Canal pour les rappels
        await Notifications.setNotificationChannelAsync('reminders', {
          name: 'Rappels médicaux',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4CAF50',
        });
      }

      this.isInitialized = true;
      console.log('Service de notifications initialisé');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des notifications:', error);
    }
  }

  async scheduleNotification(notification: HealthNotification): Promise<string> {
    try {
      await this.initialize();

      const notificationContent = {
        title: notification.title,
        body: notification.body,
        data: notification.data || {},
        sound: notification.type === 'emergency' ? 'default' : undefined,
        priority: notification.priority === 'high' ? 'high' : 'default',
      };

      const trigger = notification.trigger || null;
      
      const identifier = await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger,
      });

      console.log(`Notification programmée: ${identifier}`);
      return identifier;
    } catch (error) {
      console.error('Erreur lors de la programmation de notification:', error);
      throw error;
    }
  }

  async scheduleReminder(
    id: string,
    title: string,
    body: string,
    date: Date,
    recurring?: 'daily' | 'weekly' | 'monthly'
  ): Promise<string> {
    const trigger = {
      date,
      repeats: !!recurring,
    };

    if (recurring) {
      // Configuration pour les rappels récurrents
      const now = new Date();
      const timeUntilDate = date.getTime() - now.getTime();
      
      if (recurring === 'daily') {
        trigger.date = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      } else if (recurring === 'weekly') {
        trigger.date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      } else if (recurring === 'monthly') {
        trigger.date = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      }
    }

    return this.scheduleNotification({
      id,
      title,
      body,
      type: 'reminder',
      priority: 'medium',
      trigger,
    });
  }

  async scheduleHealthAlert(
    title: string,
    body: string,
    data?: any
  ): Promise<string> {
    return this.scheduleNotification({
      id: `alert_${Date.now()}`,
      title,
      body,
      data,
      type: 'alert',
      priority: 'high',
    });
  }

  async scheduleEmergencyNotification(
    title: string,
    body: string,
    data?: any
  ): Promise<string> {
    return this.scheduleNotification({
      id: `emergency_${Date.now()}`,
      title,
      body,
      data,
      type: 'emergency',
      priority: 'high',
    });
  }

  async cancelNotification(identifier: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
      console.log(`Notification annulée: ${identifier}`);
    } catch (error) {
      console.error('Erreur lors de l\'annulation de notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('Toutes les notifications annulées');
    } catch (error) {
      console.error('Erreur lors de l\'annulation de toutes les notifications:', error);
    }
  }

  async getPendingNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      return [];
    }
  }

  // Méthodes pour les notifications intelligentes basées sur les données de santé
  async scheduleVitalSignsAlert(
    vitalType: 'temperature' | 'heartRate' | 'bloodPressure' | 'oxygen',
    value: number,
    threshold: number
  ): Promise<string> {
    const alerts = {
      temperature: {
        high: 'Température élevée détectée',
        low: 'Température basse détectée',
      },
      heartRate: {
        high: 'Fréquence cardiaque élevée',
        low: 'Fréquence cardiaque basse',
      },
      bloodPressure: {
        high: 'Tension artérielle élevée',
        low: 'Tension artérielle basse',
      },
      oxygen: {
        low: 'Niveau d\'oxygène bas',
      },
    };

    const alert = alerts[vitalType];
    const isHigh = value > threshold;
    const title = isHigh ? alert.high : alert.low;
    const body = `${vitalType}: ${value} (seuil: ${threshold})`;

    return this.scheduleHealthAlert(title, body, {
      vitalType,
      value,
      threshold,
      timestamp: new Date().toISOString(),
    });
  }

  async scheduleMedicationReminder(
    medicationName: string,
    dosage: string,
    time: string,
    date: Date
  ): Promise<string> {
    const title = 'Rappel de médicament';
    const body = `Prenez ${medicationName} - ${dosage} à ${time}`;

    return this.scheduleReminder(
      `med_${medicationName}_${Date.now()}`,
      title,
      body,
      date
    );
  }

  async scheduleAppointmentReminder(
    doctorName: string,
    specialty: string,
    date: Date,
    location: string
  ): Promise<string> {
    const title = 'Rappel de rendez-vous';
    const body = `Rendez-vous avec ${doctorName} (${specialty}) - ${location}`;

    return this.scheduleReminder(
      `appointment_${Date.now()}`,
      title,
      body,
      date
    );
  }
}

export default NotificationService.getInstance(); 