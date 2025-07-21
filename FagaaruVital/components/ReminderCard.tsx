import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import AnimatedCard from './AnimatedCard';

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'medication' | 'appointment' | 'test' | 'exercise' | 'measurement';
  time: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
}

interface ReminderCardProps {
  reminder: Reminder;
  onComplete?: (id: string) => void;
  onSnooze?: (id: string) => void;
  onEdit?: (reminder: Reminder) => void;
  onDelete?: (id: string) => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeIcon: {
    marginRight: 6,
  },
  timeText: {
    fontSize: 12,
  },
  overdueText: {
    color: '#F44336',
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  recurringBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  recurringText: {
    fontSize: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  actionIcon: {
    marginRight: 4,
    fontSize: 14,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  completeText: {
    color: 'white',
  },
  snoozeButton: {
    backgroundColor: '#FF9800',
  },
  snoozeText: {
    color: 'white',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  editText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  deleteText: {
    color: 'white',
  },
  expandButton: {
    padding: 8,
  },
});

export default function ReminderCard({
  reminder,
  onComplete,
  onSnooze,
  onEdit,
  onDelete,
}: ReminderCardProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleComplete = () => {
    Alert.alert(
      t('completeReminder'),
      t('completeReminderConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('complete'), onPress: () => onComplete?.(reminder.id) },
      ]
    );
  };

  const handleSnooze = () => {
    Alert.alert(
      t('snoozeReminder'),
      t('snoozeReminderConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('snooze'), onPress: () => onSnooze?.(reminder.id) },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      t('deleteReminder'),
      t('deleteReminderConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('delete'), style: 'destructive', onPress: () => onDelete?.(reminder.id) },
      ]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return 'medical';
      case 'appointment': return 'calendar';
      case 'test': return 'flask';
      case 'exercise': return 'fitness';
      case 'measurement': return 'analytics';
      default: return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return '#E91E63';
      case 'appointment': return '#2196F3';
      case 'test': return '#9C27B0';
      case 'exercise': return '#4CAF50';
      case 'measurement': return '#FF9800';
      default: return '#607D8B';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#607D8B';
    }
  };

  const formatTime = (date: Date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '--:--';
    }
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '--/--/----';
    }
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const isOverdue = () => {
    if (!reminder.time || !(reminder.time instanceof Date) || isNaN(reminder.time.getTime())) {
      return false;
    }
    return new Date() > reminder.time && !reminder.completed;
  };

  return (
    <AnimatedCard
      delay={0}
      style={[
        styles.container,
        { backgroundColor: safeTheme.colors.card },
        isOverdue() && { borderLeftWidth: 4, borderLeftColor: '#F44336' },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.typeIcon, { backgroundColor: getTypeColor(reminder.type) + '20' }]}>
          <Ionicons name={getTypeIcon(reminder.type) as any} size={20} color={getTypeColor(reminder.type)} />
        </View>
        
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: safeTheme.colors.text }]}>{reminder.title}</Text>
          <Text style={[styles.description, { color: safeTheme.colors.textSecondary }]}>{reminder.description}</Text>
          
          <View style={styles.timeContainer}>
            <Ionicons name="time" size={12} style={[styles.timeIcon, { color: safeTheme.colors.textSecondary }]} />
            <Text style={[styles.timeText, { color: safeTheme.colors.textSecondary }, isOverdue() && styles.overdueText]}>
              {formatTime(reminder.time)} - {formatDate(reminder.time)}
            </Text>
            
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(reminder.priority) }]}>
              <Text style={styles.priorityText}>{t(reminder.priority)}</Text>
            </View>
            
            {reminder.recurring && (
              <View style={[styles.recurringBadge, { backgroundColor: safeTheme.colors.primary + '20' }]}>
                <Text style={[styles.recurringText, { color: safeTheme.colors.primary }]}>{t('recurring')}</Text>
              </View>
            )}
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={safeTheme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={[styles.actionsContainer, { borderTopColor: safeTheme.colors.border }]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={handleComplete}
          >
            <Ionicons name="checkmark" size={14} color="white" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.completeText]}>{t('complete')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.snoozeButton]}
            onPress={handleSnooze}
          >
            <Ionicons name="time" size={14} color="white" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.snoozeText]}>{t('snooze')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit?.(reminder)}
          >
            <Ionicons name="create" size={14} color="white" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.editText]}>{t('edit')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={14} color="white" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.deleteText]}>{t('delete')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </AnimatedCard>
  );
} 