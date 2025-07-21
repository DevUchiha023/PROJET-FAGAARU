import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../contexts/ThemeContext';

// Styles pour CustomSwitch
const switchStyles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 20,
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
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

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'health' | 'appointment' | 'reminder' | 'alert';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  controlsSection: {
    padding: 20,
    marginBottom: 10,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  filterSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  testButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default function NotificationsScreen() {
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

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Rappel de médicament',
      message: 'Il est temps de prendre votre médicament du matin',
      type: 'reminder',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: 'high',
    },
    {
      id: '2',
      title: 'Rendez-vous confirmé',
      message: 'Votre rendez-vous avec Dr. Diallo est confirmé pour demain à 14h',
      type: 'appointment',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Résultats d\'analyse',
      message: 'Vos résultats d\'analyse sanguine sont disponibles',
      type: 'health',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: false,
      priority: 'high',
    },
    {
      id: '4',
      title: 'Alerte santé',
      message: 'Votre tension artérielle est élevée, consultez votre médecin',
      type: 'alert',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      read: false,
      priority: 'high',
    },
  ]);

  const [permissionsEnabled, setPermissionsEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      'Supprimer la notification',
      'Êtes-vous sûr de vouloir supprimer cette notification ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => setNotifications(prev => prev.filter(n => n.id !== id))
        },
      ]
    );
  };

  const handleTestNotification = () => {
    Alert.alert(
      'Test de notification',
      'Une notification de test a été envoyée. Vérifiez votre centre de notifications.',
      [{ text: 'OK' }]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simuler un rafraîchissement
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'health': return 'medical';
      case 'appointment': return 'calendar';
      case 'reminder': return 'notifications';
      case 'alert': return 'warning';
      default: return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'health': return '#4CAF50';
      case 'appointment': return '#2196F3';
      case 'reminder': return '#FF9800';
      case 'alert': return '#F44336';
      default: return safeTheme.colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <ScrollView 
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec statistiques */}
        <View style={[styles.header, { backgroundColor: safeTheme.colors.card }]}>
          <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>{t('notifications')}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: safeTheme.colors.primary }]}>{notifications.length}</Text>
              <Text style={[styles.statLabel, { color: safeTheme.colors.textSecondary }]}>{t('total')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: safeTheme.colors.primary }]}>{unreadCount}</Text>
              <Text style={[styles.statLabel, { color: safeTheme.colors.textSecondary }]}>{t('unread')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: safeTheme.colors.primary }]}>{highPriorityCount}</Text>
              <Text style={[styles.statLabel, { color: safeTheme.colors.textSecondary }]}>{t('priority')}</Text>
            </View>
          </View>
        </View>

        {/* Contrôles et filtres */}
        <View style={[styles.controlsSection, { backgroundColor: safeTheme.colors.card }]}>
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, { color: safeTheme.colors.text }]}>{t('notificationsEnabled')}</Text>
            <CustomSwitch
              value={permissionsEnabled}
              onValueChange={setPermissionsEnabled}
            />
          </View>

          <View style={styles.filterSection}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                { borderColor: safeTheme.colors.primary },
                filter === 'all' && styles.filterButtonActive,
              ]}
              onPress={() => setFilter('all')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  { color: safeTheme.colors.primary },
                  filter === 'all' && styles.filterButtonTextActive,
                ]}
              >
                {t('all')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                { borderColor: safeTheme.colors.primary },
                filter === 'unread' && styles.filterButtonActive,
              ]}
              onPress={() => setFilter('unread')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  { color: safeTheme.colors.primary },
                  filter === 'unread' && styles.filterButtonTextActive,
                ]}
              >
                {t('unread')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                { borderColor: safeTheme.colors.primary },
                filter === 'high' && styles.filterButtonActive,
              ]}
              onPress={() => setFilter('high')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  { color: safeTheme.colors.primary },
                  filter === 'high' && styles.filterButtonTextActive,
                ]}
              >
                {t('highPriority')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.testButton, { backgroundColor: safeTheme.colors.primary }]} 
            onPress={handleTestNotification}
          >
            <Text style={styles.testButtonText}>{t('testNotification')}</Text>
          </TouchableOpacity>
        </View>

        {/* Liste des notifications */}
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border },
                !notification.read && { backgroundColor: safeTheme.colors.primary + '10' }
              ]}
              onPress={() => handleMarkAsRead(notification.id)}
              onLongPress={() => handleDeleteNotification(notification.id)}
            >
              <View style={[styles.notificationIcon, { backgroundColor: getTypeColor(notification.type) + '20' }]}>
                <Ionicons name={getTypeIcon(notification.type) as any} size={20} color={getTypeColor(notification.type)} />
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, { color: safeTheme.colors.text }]}>
                  {notification.title}
                </Text>
                <Text style={[styles.notificationMessage, { color: safeTheme.colors.textSecondary }]}>
                  {notification.message}
                </Text>
                <Text style={[styles.notificationTime, { color: safeTheme.colors.textSecondary }]}>
                  {notification.timestamp.toLocaleString('fr-FR')}
                </Text>
              </View>

              {!notification.read && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>!</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons 
              name="notifications-off" 
              size={64} 
              color={safeTheme.colors.textSecondary} 
              style={styles.emptyIcon}
            />
            <Text style={[styles.emptyText, { color: safeTheme.colors.textSecondary }]}>
              {t('noNotifications')}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
} 