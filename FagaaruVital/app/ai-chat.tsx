import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'suggestion' | 'alert';
}

interface Suggestion {
  id: string;
  text: string;
  icon: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  aiStatus: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 15,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 5,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#000000',
  },
  messageTime: {
    fontSize: 11,
    color: '#6C757D',
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  typingDots: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 3,
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionIcon: {
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#F44336',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default function AIChatScreen() {
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

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant médical IA. Comment puis-je vous aider aujourd\'hui ?',
      isUser: false,
      timestamp: new Date(),
      type: 'text',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const suggestions: Suggestion[] = [
    { id: '1', text: 'J\'ai mal à la tête', icon: 'medical' },
    { id: '2', text: 'Je me sens fatigué', icon: 'bed' },
    { id: '3', text: 'J\'ai de la fièvre', icon: 'thermometer' },
    { id: '4', text: 'Je tousse beaucoup', icon: 'medical-outline' },
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simuler la réponse de l'IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('mal à la tête') || input.includes('céphalée')) {
      return 'Les maux de tête peuvent avoir plusieurs causes. Avez-vous d\'autres symptômes comme de la fièvre, des nausées ou une sensibilité à la lumière ? Il est recommandé de consulter un médecin si la douleur est intense ou persistante.';
    }
    
    if (input.includes('fatigué') || input.includes('fatigue')) {
      return 'La fatigue peut être liée au stress, au manque de sommeil ou à une carence. Combien d\'heures dormez-vous par nuit ? Avez-vous changé vos habitudes récemment ?';
    }
    
    if (input.includes('fièvre') || input.includes('température')) {
      return 'Quelle est votre température ? Une fièvre au-dessus de 38°C nécessite une attention médicale. Avez-vous d\'autres symptômes comme des frissons ou des courbatures ?';
    }
    
    if (input.includes('tousse') || input.includes('toux')) {
      return 'La toux peut être sèche ou grasse. Depuis combien de temps toussez-vous ? Avez-vous de la fièvre ou des difficultés respiratoires ?';
    }
    
    if (input.includes('douleur') || input.includes('mal')) {
      return 'Pouvez-vous me décrire plus précisément la douleur ? Où se situe-t-elle ? Est-elle constante ou intermittente ?';
    }
    
    return 'Je comprends votre préoccupation. Pour vous donner des conseils plus précis, pourriez-vous me donner plus de détails sur vos symptômes ? N\'oubliez pas que je ne remplace pas une consultation médicale.';
  };

  const handleSuggestionPress = (suggestion: Suggestion) => {
    handleSendMessage(suggestion.text);
  };

  const handleEmergency = () => {
    Alert.alert(
      'Urgence médicale',
      'Si vous êtes en situation d\'urgence, appelez immédiatement le 15 (SAMU) ou le 112 (Urgences européennes).',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler 15', onPress: () => console.log('Call emergency') },
      ]
    );
  };

  const renderMessage = (message: Message) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.aiText
        ]}>
          {message.text}
        </Text>
        <Text style={styles.messageTime}>
          {message.timestamp.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={safeTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: safeTheme.colors.text }]}>Assistant IA Médical</Text>
        <View style={styles.aiStatus}>
          <View style={styles.statusDot} />
          <Text style={[styles.statusText, { color: safeTheme.colors.textSecondary }]}>IA en ligne</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.chatContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.messagesContainer}>
            {messages.map(renderMessage)}
            
            {isTyping && (
              <View style={[styles.typingIndicator, { backgroundColor: safeTheme.colors.card }]}>
                <Ionicons name="medical" size={20} color={safeTheme.colors.primary} />
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, { backgroundColor: safeTheme.colors.textSecondary }]} />
                  <View style={[styles.typingDot, { backgroundColor: safeTheme.colors.textSecondary }]} />
                  <View style={[styles.typingDot, { backgroundColor: safeTheme.colors.textSecondary }]} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.suggestionsContainer}>
            <Text style={[styles.suggestionsTitle, { color: safeTheme.colors.text }]}>Suggestions rapides :</Text>
            <View style={styles.suggestionsList}>
              {suggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion.id}
                  style={[styles.suggestionButton, { backgroundColor: safeTheme.colors.card }]}
                  onPress={() => handleSuggestionPress(suggestion)}
                >
                  <Ionicons 
                    name={suggestion.icon as any} 
                    size={16} 
                    color={safeTheme.colors.primary}
                    style={styles.suggestionIcon}
                  />
                  <Text style={[styles.suggestionText, { color: safeTheme.colors.text }]}>{suggestion.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={{ padding: 20 }}>
          <View style={[styles.inputContainer, { backgroundColor: safeTheme.colors.card }]}>
            <TextInput
              style={[styles.textInput, { color: safeTheme.colors.text }]}
              placeholder="Tapez votre message..."
              placeholderTextColor={safeTheme.colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: safeTheme.colors.primary }]}
              onPress={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
        <Ionicons name="warning" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
} 
 