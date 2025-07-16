import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  fr: {
    translation: {
      welcome: 'Bienvenue sur FagaaruVital',
      vitals: 'Signes Vitaux',
      scanIA: 'Scan IA',
      consultation: 'Consultation',
      pharmacy: 'Pharmacie',
      geolocation: 'Géolocalisation',
      history: 'Historique',
      notifications: 'Notifications',
      user: 'Compte',
      // Ajoute d'autres clés ici
    },
  },
  en: {
    translation: {
      welcome: 'Welcome to FagaaruVital',
      vitals: 'Vital Signs',
      scanIA: 'AI Scan',
      consultation: 'Consultation',
      pharmacy: 'Pharmacy',
      geolocation: 'Geolocation',
      history: 'History',
      notifications: 'Notifications',
      user: 'Account',
      // Add more keys here
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale ? Localization.locale.split('-')[0] : 'fr',
    fallbackLng: 'fr',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 