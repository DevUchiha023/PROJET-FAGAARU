import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      welcome: 'Bienvenue sur Fagaaru Vital',
      home: 'Accueil',
      scanIA: 'Scan IA',
      scan: 'Scan intelligent',
      vitals: 'Signes vitaux',
      teleconsultation: 'Téléconsultation',
      geolocation: 'Géolocalisation',
      medicalRecord: 'Dossier médical',
      pharmacy: 'Pharmacie',
      accessibility: 'Accessibilité',
      history: 'Historique',
      notifications: 'Notifications',
      userAccount: 'Compte utilisateur',
      user: 'Compte utilisateur',
    },
  },
  en: {
    translation: {
      welcome: 'Welcome to Fagaaru Vital',
      home: 'Home',
      scanIA: 'AI Scan',
      scan: 'Smart Scan',
      vitals: 'Vitals',
      teleconsultation: 'Teleconsultation',
      geolocation: 'Geolocation',
      medicalRecord: 'Medical Record',
      pharmacy: 'Pharmacy',
      accessibility: 'Accessibility',
      history: 'History',
      notifications: 'Notifications',
      userAccount: 'User Account',
      user: 'User Account',
    },
  },
  wo: {
    translation: {
      welcome: 'Nanga def ci Fagaaru Vital',
      home: 'Kër gi',
      scanIA: 'Scan IA',
      scan: 'Scan bu xam-xam',
      vitals: 'Tànk yu am solo',
      teleconsultation: 'Teleconsultation',
      geolocation: 'Gisinu bopp',
      medicalRecord: 'Dossier bi',
      pharmacy: 'Farmasi',
      accessibility: 'Yombal',
      history: 'Jàmm',
      notifications: 'Xibaar',
      userAccount: 'Jëfandikukat',
      user: 'Jëfandikukat',
    },
  },
};

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'fr',
      fallbackLng: 'fr',
      resources,
      interpolation: { escapeValue: false },
    });
}

export default i18next; 