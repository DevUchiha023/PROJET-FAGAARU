import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export default function UserScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Amadou Diallo',
    email: 'amadou.diallo@email.com',
    phone: '+221 77 123 45 67',
    age: 35,
    gender: 'male',
    bloodType: 'O+',
    allergies: ['Pénicilline', 'Poussière'],
    chronicConditions: ['Hypertension légère'],
    emergencyContact: {
      name: 'Fatou Diallo',
      phone: '+221 77 987 65 43',
      relationship: 'Épouse'
    }
  });

  const [editProfile, setEditProfile] = useState<UserProfile>({ ...profile });

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    setIsLoggedIn(true);
    Alert.alert('Connexion réussie', 'Bienvenue sur FagaaruVital !');
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Déconnecter', onPress: () => setIsLoggedIn(false) },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const saveProfile = () => {
    setProfile(editProfile);
    setIsEditing(false);
    Alert.alert('Profil mis à jour', 'Vos informations ont été sauvegardées.');
  };

  const exportData = () => {
    Alert.alert(
      'Export des données',
      'Exporter toutes vos données médicales ?',
      [
        { 
          text: 'Exporter', 
          onPress: () => Alert.alert('Export réussi', 'Vos données ont été exportées et sauvegardées.') 
        },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront supprimées.',
      [
        { text: 'Supprimer', style: 'destructive', onPress: () => Alert.alert('Compte supprimé') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  if (!isLoggedIn) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>👤 Connexion FagaaruVital</Text>
        
        <View style={styles.loginSection}>
          <Text style={styles.sectionTitle}>🔐 Authentification :</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email :</Text>
            <TextInput
              style={styles.input}
              placeholder="votre.email@exemple.com"
              value={loginData.email}
              onChangeText={(text) => setLoginData({...loginData, email: text})}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe :</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              value={loginData.password}
              onChangeText={(text) => setLoginData({...loginData, password: text})}
              secureTextEntry={!showPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Masquer' : 'Afficher'} le mot de passe
            </Text>
          </TouchableOpacity>

          <Button
            title="Se connecter"
            onPress={handleLogin}
            color="#4caf50"
          />

          <View style={styles.alternativeLogin}>
            <Text style={styles.alternativeText}>Ou se connecter avec :</Text>
            <View style={styles.alternativeButtons}>
              <Button title="📱 SMS" onPress={() => Alert.alert('SMS envoyé')} color="#2196f3" />
              <Button title="👆 Empreinte" onPress={() => Alert.alert('Authentification biométrique')} color="#ff9800" />
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Informations importantes :</Text>
          <Text style={styles.infoText}>• Connexion sécurisée par chiffrement</Text>
          <Text style={styles.infoText}>• Authentification biométrique disponible</Text>
          <Text style={styles.infoText}>• Connexion par SMS (OTP)</Text>
          <Text style={styles.infoText}>• Données synchronisées avec le cloud</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👤 Mon Compte</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Text style={styles.sectionTitle}>📋 Profil personnel :</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Annuler' : 'Modifier'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom complet :</Text>
          <TextInput
            style={styles.input}
            value={isEditing ? editProfile.name : profile.name}
            onChangeText={(text) => setEditProfile({...editProfile, name: text})}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email :</Text>
          <TextInput
            style={styles.input}
            value={isEditing ? editProfile.email : profile.email}
            onChangeText={(text) => setEditProfile({...editProfile, email: text})}
            editable={isEditing}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Téléphone :</Text>
          <TextInput
            style={styles.input}
            value={isEditing ? editProfile.phone : profile.phone}
            onChangeText={(text) => setEditProfile({...editProfile, phone: text})}
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Âge :</Text>
          <TextInput
            style={styles.input}
            value={isEditing ? editProfile.age.toString() : profile.age.toString()}
            onChangeText={(text) => setEditProfile({...editProfile, age: parseInt(text) || 0})}
            editable={isEditing}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Groupe sanguin :</Text>
          <TextInput
            style={styles.input}
            value={isEditing ? editProfile.bloodType : profile.bloodType}
            onChangeText={(text) => setEditProfile({...editProfile, bloodType: text})}
            editable={isEditing}
          />
        </View>

        {isEditing && (
          <Button
            title="Sauvegarder"
            onPress={saveProfile}
            color="#4caf50"
          />
        )}
      </View>

      <View style={styles.medicalSection}>
        <Text style={styles.sectionTitle}>🏥 Informations médicales :</Text>
        
        <View style={styles.medicalInfo}>
          <Text style={styles.medicalLabel}>Allergies :</Text>
          <Text style={styles.medicalValue}>{profile.allergies.join(', ')}</Text>
        </View>

        <View style={styles.medicalInfo}>
          <Text style={styles.medicalLabel}>Conditions chroniques :</Text>
          <Text style={styles.medicalValue}>{profile.chronicConditions.join(', ')}</Text>
        </View>

        <View style={styles.emergencyContact}>
          <Text style={styles.medicalLabel}>Contact d'urgence :</Text>
          <Text style={styles.medicalValue}>{profile.emergencyContact.name}</Text>
          <Text style={styles.medicalValue}>{profile.emergencyContact.phone}</Text>
          <Text style={styles.medicalValue}>{profile.emergencyContact.relationship}</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>⚙️ Paramètres :</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>🔐 Authentification biométrique</Text>
            <Text style={styles.settingDescription}>Empreinte digitale ou Face ID</Text>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={biometricEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>☁️ Synchronisation cloud</Text>
            <Text style={styles.settingDescription}>Sauvegarde automatique des données</Text>
          </View>
          <Switch
            value={dataSync}
            onValueChange={setDataSync}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={dataSync ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>🔔 Notifications</Text>
            <Text style={styles.settingDescription}>Alertes et rappels</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>📤 Actions :</Text>
        
        <View style={styles.actionButtons}>
          <Button
            title="📄 Exporter mes données"
            onPress={exportData}
            color="#2196f3"
          />
          <Button
            title="🗑️ Supprimer mon compte"
            onPress={deleteAccount}
            color="#f44336"
          />
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Sécurité et confidentialité :</Text>
        <Text style={styles.infoText}>• Données chiffrées et sécurisées</Text>
        <Text style={styles.infoText}>• Conformité RGPD et standards médicaux</Text>
        <Text style={styles.infoText}>• Sauvegarde automatique dans le cloud</Text>
        <Text style={styles.infoText}>• Contrôle total de vos données</Text>
        <Text style={styles.infoText}>• Export et suppression disponibles</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f44336',
    borderRadius: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loginSection: {
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
  showPasswordButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  showPasswordText: {
    color: '#2196f3',
    fontSize: 14,
  },
  alternativeLogin: {
    marginTop: 20,
  },
  alternativeText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  alternativeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4caf50',
    borderRadius: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  medicalSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 10,
  },
  medicalInfo: {
    marginBottom: 10,
  },
  medicalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  medicalValue: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  emergencyContact: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  settingsSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
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
  actionsSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 10,
  },
  actionButtons: {
    gap: 10,
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