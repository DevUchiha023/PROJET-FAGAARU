import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AuthService from '../services/AuthService';
import { useAppTheme } from '../contexts/ThemeContext';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', backgroundColor: 'white', borderRadius: 16, padding: 24, elevation: 4 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#007AFF', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  switchText: { color: '#007AFF', marginTop: 16, textAlign: 'center' },
});

export default function LoginScreen() {
  const { theme } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        await AuthService.signIn(email, password);
        Alert.alert('Connexion réussie', 'Bienvenue !');
      } else {
        await AuthService.signUp(email, password);
        Alert.alert('Inscription réussie', 'Votre compte a été créé.');
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme?.colors?.background || '#F8F9FA' }]}> 
      <View style={styles.card}>
        <Text style={[styles.title, { color: theme?.colors?.primary || '#007AFF' }]}> {isLogin ? 'Connexion' : 'Inscription'} </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>{isLogin ? 'Se connecter' : 'Créer un compte'}</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 