import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'medication' | 'appointment' | 'test' | 'vaccination';
  date: Date;
  time: string;
  recurring: boolean;
  recurringType?: 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  snoozed: boolean;
}

interface AddReminderForm {
  title: string;
  description: string;
  type: 'medication' | 'appointment' | 'test' | 'vaccination';
  date: string;
  time: string;
  recurring: boolean;
  recurringType: 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high';
}

export default function RemindersScreen() {
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

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Prendre Vitamine D',
      description: '1 comprimé de vitamine D 1000 UI',
      type: 'medication',
      date: new Date(),
      time: '08:00',
      recurring: true,
      recurringType: 'daily',
      priority: 'medium',
      completed: false,
      snoozed: false,
    },
    {
      id: '2',
      title: 'Rendez-vous cardiologue',
      description: 'Consultation de suivi - Dr. Ahmed Diallo',
      type: 'appointment',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // +2 jours
      time: '14:30',
      recurring: false,
      priority: 'high',
      completed: false,
      snoozed: false,
    },
    {
      id: '3',
      title: 'Analyse sanguine',
      description: 'Prise de sang à jeun - Laboratoire Central',
      type: 'test',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 jours
      time: '09:00',
      recurring: false,
      priority: 'medium',
      completed: false,
      snoozed: false,
    },
    {
      id: '4',
      title: 'Vaccin grippe',
      description: 'Vaccin contre la grippe saisonnière',
      type: 'vaccination',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 jours
      time: '10:00',
      recurring: false,
      priority: 'low',
      completed: false,
      snoozed: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [formData, setFormData] = useState<AddReminderForm>({
    title: '',
    description: '',
    type: 'medication',
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    recurring: false,
    recurringType: 'daily',
    priority: 'medium',
  });

  const reminderTypes = [
    { key: 'medication', label: 'Médicament', icon: 'medical' },
    { key: 'appointment', label: 'Rendez-vous', icon: 'calendar' },
    { key: 'test', label: 'Analyse', icon: 'flask' },
    { key: 'vaccination', label: 'Vaccination', icon: 'shield-checkmark' },
  ];

  const priorityLevels = [
    { key: 'low', label: 'Faible', color: '#4CAF50' },
    { key: 'medium', label: 'Moyenne', color: '#FF9800' },
    { key: 'high', label: 'Élevée', color: '#F44336' },
  ];

  const recurringTypes = [
    { key: 'daily', label: 'Quotidien' },
    { key: 'weekly', label: 'Hebdomadaire' },
    { key: 'monthly', label: 'Mensuel' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return 'medical';
      case 'appointment': return 'calendar';
      case 'test': return 'flask';
      case 'vaccination': return 'shield-checkmark';
      default: return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return '#4CAF50';
      case 'appointment': return '#2196F3';
      case 'test': return '#FF9800';
      case 'vaccination': return '#9C27B0';
      default: return safeTheme.colors.primary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return safeTheme.colors.primary;
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Demain';
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  const handleCompleteReminder = (id: string) => {
    Alert.alert(
      'Marquer comme terminé',
      'Voulez-vous marquer ce rappel comme terminé ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Terminer',
          onPress: () => {
            setReminders(prev => prev.map(r => 
              r.id === id ? { ...r, completed: true } : r
            ));
          },
        },
      ]
    );
  };

  const handleSnoozeReminder = (id: string) => {
    Alert.alert(
      'Reporter le rappel',
      'Voulez-vous reporter ce rappel de 15 minutes ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Reporter',
          onPress: () => {
            setReminders(prev => prev.map(r => 
              r.id === id ? { ...r, snoozed: true } : r
            ));
          },
        },
      ]
    );
  };

  const handleDeleteReminder = (id: string) => {
    Alert.alert(
      'Supprimer le rappel',
      'Êtes-vous sûr de vouloir supprimer ce rappel ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setReminders(prev => prev.filter(r => r.id !== id));
          },
        },
      ]
    );
  };

  const handleAddReminder = () => {
    if (!formData.title.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour le rappel.');
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      date: new Date(formData.date),
      time: formData.time,
      recurring: formData.recurring,
      recurringType: formData.recurringType,
      priority: formData.priority,
      completed: false,
      snoozed: false,
    };

    setReminders(prev => [newReminder, ...prev]);
    setShowAddModal(false);
    resetForm();
    
    Alert.alert('Succès', 'Rappel ajouté avec succès !');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'medication',
      date: new Date().toISOString().split('T')[0],
      time: '08:00',
      recurring: false,
      recurringType: 'daily',
      priority: 'medium',
    });
  };

  const filteredReminders = reminders.filter(reminder => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'today') {
      const today = new Date();
      return reminder.date.toDateString() === today.toDateString();
    }
    if (selectedFilter === 'upcoming') {
      const today = new Date();
      return reminder.date > today && !reminder.completed;
    }
    if (selectedFilter === 'completed') {
      return reminder.completed;
    }
    return reminder.type === selectedFilter;
  });

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
    addButton: {
      backgroundColor: safeTheme.colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    filtersContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      borderWidth: 1,
    },
    filterButtonActive: {
      backgroundColor: safeTheme.colors.primary,
      borderColor: safeTheme.colors.primary,
    },
    filterButtonText: {
      fontSize: 12,
      fontWeight: '500',
    },
    filterButtonTextActive: {
      color: 'white',
    },
    reminderCard: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    reminderHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    reminderIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    reminderInfo: {
      flex: 1,
    },
    reminderTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    reminderDescription: {
      fontSize: 14,
      lineHeight: 20,
    },
    reminderMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    reminderDate: {
      fontSize: 12,
    },
    reminderActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 8,
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: safeTheme.colors.card,
      borderRadius: 20,
      padding: 20,
      width: '90%',
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 5,
    },
    formGroup: {
      marginBottom: 20,
    },
    formLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    formInput: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
    },
    typeSelector: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    typeButton: {
      width: '48%',
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
      marginBottom: 8,
    },
    typeButtonActive: {
      backgroundColor: safeTheme.colors.primary,
      borderColor: safeTheme.colors.primary,
    },
    typeButtonText: {
      fontSize: 14,
      fontWeight: '500',
    },
    typeButtonTextActive: {
      color: 'white',
    },
    prioritySelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priorityButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    priorityButtonActive: {
      backgroundColor: safeTheme.colors.primary,
      borderColor: safeTheme.colors.primary,
    },
    priorityButtonText: {
      fontSize: 12,
      fontWeight: '500',
    },
    priorityButtonTextActive: {
      color: 'white',
    },
    recurringSection: {
      marginTop: 10,
    },
    recurringRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    recurringTypeSelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recurringTypeButton: {
      flex: 1,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 6,
      borderWidth: 1,
      alignItems: 'center',
      marginHorizontal: 2,
    },
    recurringTypeButtonActive: {
      backgroundColor: safeTheme.colors.primary,
      borderColor: safeTheme.colors.primary,
    },
    recurringTypeButtonText: {
      fontSize: 10,
      fontWeight: '500',
    },
    recurringTypeButtonTextActive: {
      color: 'white',
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: safeTheme.colors.border,
    },
    saveButton: {
      backgroundColor: safeTheme.colors.primary,
    },
    modalButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButtonText: {
      color: safeTheme.colors.text,
    },
    saveButtonText: {
      color: 'white',
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Rappels</Text>
        <Text style={[styles.headerSubtitle, { color: safeTheme.colors.textSecondary }]}>
          Gérez vos rappels médicaux
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Ajouter un rappel</Text>
        </TouchableOpacity>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'Tous' },
              { key: 'today', label: 'Aujourd\'hui' },
              { key: 'upcoming', label: 'À venir' },
              { key: 'completed', label: 'Terminés' },
              { key: 'medication', label: 'Médicaments' },
              { key: 'appointment', label: 'Rendez-vous' },
              { key: 'test', label: 'Analyses' },
              { key: 'vaccination', label: 'Vaccinations' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  { borderColor: safeTheme.colors.border },
                  selectedFilter === filter.key && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    { color: safeTheme.colors.textSecondary },
                    selectedFilter === filter.key && styles.filterButtonTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredReminders.map((reminder) => (
            <View
              key={reminder.id}
              style={[
                styles.reminderCard,
                { backgroundColor: safeTheme.colors.card },
                reminder.completed && { opacity: 0.6 },
              ]}
            >
              <View style={styles.reminderHeader}>
                <View
                  style={[
                    styles.reminderIcon,
                    { backgroundColor: getTypeColor(reminder.type) + '20' },
                  ]}
                >
                  <Ionicons
                    name={getTypeIcon(reminder.type) as any}
                    size={20}
                    color={getTypeColor(reminder.type)}
                  />
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={[styles.reminderTitle, { color: safeTheme.colors.text }]}>
                    {reminder.title}
                  </Text>
                  <Text style={[styles.reminderDescription, { color: safeTheme.colors.textSecondary }]}>
                    {reminder.description}
                  </Text>
                </View>
              </View>

              <View style={styles.reminderMeta}>
                <View>
                  <Text style={[styles.reminderDate, { color: safeTheme.colors.textSecondary }]}>
                    {formatDate(reminder.date)} à {reminder.time}
                  </Text>
                  {reminder.recurring && (
                    <Text style={[styles.reminderDate, { color: safeTheme.colors.textSecondary }]}>
                      Répétitif: {reminder.recurringType}
                    </Text>
                  )}
                </View>
                <View style={styles.reminderActions}>
                  {!reminder.completed && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                        onPress={() => handleCompleteReminder(reminder.id)}
                      >
                        <Text style={[styles.actionButtonText, { color: 'white' }]}>Terminer</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
                        onPress={() => handleSnoozeReminder(reminder.id)}
                      >
                        <Text style={[styles.actionButtonText, { color: 'white' }]}>Reporter</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#F44336' }]}
                    onPress={() => handleDeleteReminder(reminder.id)}
                  >
                    <Text style={[styles.actionButtonText, { color: 'white' }]}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: safeTheme.colors.text }]}>Nouveau rappel</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <Ionicons name="close" size={24} color={safeTheme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Titre *</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  placeholder="Ex: Prendre médicament"
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.title}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Description</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background,
                    height: 80,
                    textAlignVertical: 'top'
                  }]}
                  placeholder="Détails du rappel..."
                  placeholderTextColor={safeTheme.colors.textSecondary}
                  value={formData.description}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                  multiline
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Type</Text>
                <View style={styles.typeSelector}>
                  {reminderTypes.map((type) => (
                    <TouchableOpacity
                      key={type.key}
                      style={[
                        styles.typeButton,
                        { borderColor: safeTheme.colors.border },
                        formData.type === type.key && styles.typeButtonActive,
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, type: type.key as any }))}
                    >
                      <Ionicons
                        name={type.icon as any}
                        size={16}
                        color={formData.type === type.key ? 'white' : getTypeColor(type.key)}
                        style={{ marginBottom: 4 }}
                      />
                      <Text
                        style={[
                          styles.typeButtonText,
                          { color: safeTheme.colors.textSecondary },
                          formData.type === type.key && styles.typeButtonTextActive,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Date</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  value={formData.date}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Heure</Text>
                <TextInput
                  style={[styles.formInput, { 
                    borderColor: safeTheme.colors.border,
                    color: safeTheme.colors.text,
                    backgroundColor: safeTheme.colors.background
                  }]}
                  value={formData.time}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, time: text }))}
                  placeholder="HH:MM"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Priorité</Text>
                <View style={styles.prioritySelector}>
                  {priorityLevels.map((priority) => (
                    <TouchableOpacity
                      key={priority.key}
                      style={[
                        styles.priorityButton,
                        { borderColor: safeTheme.colors.border },
                        formData.priority === priority.key && styles.priorityButtonActive,
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, priority: priority.key as any }))}
                    >
                      <Text
                        style={[
                          styles.priorityButtonText,
                          { color: safeTheme.colors.textSecondary },
                          formData.priority === priority.key && styles.priorityButtonTextActive,
                        ]}
                      >
                        {priority.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.recurringRow}>
                  <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Répétitif</Text>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      { width: 40, height: 24, justifyContent: 'center' },
                      { borderColor: safeTheme.colors.border },
                      formData.recurring && styles.typeButtonActive,
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, recurring: !prev.recurring }))}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        { color: safeTheme.colors.textSecondary },
                        formData.recurring && styles.typeButtonTextActive,
                      ]}
                    >
                      {formData.recurring ? 'Oui' : 'Non'}
                    </Text>
                  </TouchableOpacity>
                </View>
                
                {formData.recurring && (
                  <View style={styles.recurringSection}>
                    <Text style={[styles.formLabel, { color: safeTheme.colors.text }]}>Type de répétition</Text>
                    <View style={styles.recurringTypeSelector}>
                      {recurringTypes.map((type) => (
                        <TouchableOpacity
                          key={type.key}
                          style={[
                            styles.recurringTypeButton,
                            { borderColor: safeTheme.colors.border },
                            formData.recurringType === type.key && styles.recurringTypeButtonActive,
                          ]}
                          onPress={() => setFormData(prev => ({ ...prev, recurringType: type.key as any }))}
                        >
                          <Text
                            style={[
                              styles.recurringTypeButtonText,
                              { color: safeTheme.colors.textSecondary },
                              formData.recurringType === type.key && styles.recurringTypeButtonTextActive,
                            ]}
                          >
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddReminder}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 