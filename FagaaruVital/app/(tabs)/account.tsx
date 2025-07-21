import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
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
  
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Amadou Diallo',
    email: 'amadou.diallo@fagaaru.com',
    phone: '+221 77 123 45 67',
    location: 'Dakar, Sénégal',
    bloodType: 'O+',
    emergencyContact: 'Mariama Diallo (+221 77 987 65 43)',
    insurance: 'CNSS',
    memberSince: '2023',
  });

  const handleEditProfile = () => {
    Alert.alert(t('editProfile'), t('editProfileMessage'));
  };

  const handleChangePassword = () => {
    Alert.alert(t('changePassword'), t('changePasswordMessage'));
  };

  const handlePrivacySettings = () => {
    Alert.alert(t('privacySettings'), t('privacySettingsMessage'));
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logoutConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('logout'), style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: theme.colors.primary,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    avatarText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    section: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 15,
    },
    infoCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      flex: 1,
    },
    infoValue: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
      flex: 2,
      textAlign: 'right',
    },
    actionButton: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    actionIcon: {
      marginRight: 15,
    },
    actionText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
      flex: 1,
    },
    logoutButton: {
      backgroundColor: '#ff4757',
      borderRadius: 12,
      padding: 15,
      marginTop: 20,
      marginBottom: 30,
      alignItems: 'center',
    },
    logoutText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header avec avatar */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AD</Text>
          </View>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.email}>{userProfile.email}</Text>
        </View>

        {/* Informations personnelles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('personalInfo')}</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('phone')}</Text>
              <Text style={styles.infoValue}>{userProfile.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('location')}</Text>
              <Text style={styles.infoValue}>{userProfile.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('bloodType')}</Text>
              <Text style={styles.infoValue}>{userProfile.bloodType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('emergencyContact')}</Text>
              <Text style={styles.infoValue}>{userProfile.emergencyContact}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('insurance')}</Text>
              <Text style={styles.infoValue}>{userProfile.insurance}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('memberSince')}</Text>
              <Text style={styles.infoValue}>{userProfile.memberSince}</Text>
            </View>
          </View>
        </View>

        {/* Actions du compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('accountActions')}</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Ionicons 
              name="person-outline" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{t('editProfile')}</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleChangePassword}>
            <Ionicons 
              name="lock-closed-outline" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{t('changePassword')}</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handlePrivacySettings}>
            <Ionicons 
              name="shield-outline" 
              size={24} 
              color={theme.colors.primary} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{t('privacySettings')}</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Bouton de déconnexion */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 