import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Général
      welcome: 'Bienvenue',
      welcomeToFagaaru: 'Fagaaru Vital',
      yourHealthCompanion: 'Votre compagnon santé intelligent',
      selectLanguage: 'Choisir la langue',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      close: 'Fermer',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      ok: 'OK',

      // Navigation
      home: 'Accueil',
      vitals: 'Vitaux',
      teleconsultation: 'Téléconsultation',
      geolocation: 'Géolocalisation',
      pharmacy: 'Pharmacie',
      medicalRecord: 'Dossier Médical',
      reminders: 'Rappels',
      settings: 'Paramètres',
      accessibility: 'Accessibilité',
      notifications: 'Notifications',

      // Pre-Diagnostic AI
      preDiagnosticAI: 'Pre-Diagnostique AI',
      scanSymptoms: 'Scanner les symptômes',
      scanWounds: 'Scanner les plaies',
      medicalAssistant: 'Assistant médical',
      askQuestion: 'Posez votre question médicale...',
      send: 'Envoyer',
      analyzingSymptoms: 'Analyse des symptômes courants',
      treatmentSuggestions: 'Suggestions de traitements',
      preventionAdvice: 'Conseils de prévention',
      woundIdentification: 'Identification du type de plaie',
      ointmentRecommendation: 'Recommandation de pommades',
      careAdvice: 'Conseils de soins',
      instantResponses: 'Réponses instantanées',
      personalizedAdvice: 'Conseils personnalisés',
      reliableInformation: 'Informations fiables',

      // Vitaux
      healthVitals: 'Vos constantes vitales',
      heartRate: 'Fréquence cardiaque',
      bloodPressure: 'Tension artérielle',
      temperature: 'Température',
      oxygenSaturation: 'Saturation en oxygène',
      bloodSugar: 'Glycémie',
      weight: 'Poids',
      height: 'Taille',
      bmi: 'IMC',
      lastUpdate: 'Dernière mise à jour',
      addVital: 'Ajouter une constante',
      vitalHistory: 'Historique',
      normal: 'Normal',
      high: 'Élevé',
      low: 'Faible',
      critical: 'Critique',

      // Téléconsultation
      onlineConsultation: 'Consultation en ligne',
      bookAppointment: 'Prendre rendez-vous',
      availableDoctors: 'Médecins disponibles',
      specialties: 'Spécialités',
      cardiology: 'Cardiologie',
      dermatology: 'Dermatologie',
      pediatrics: 'Pédiatrie',
      gynecology: 'Gynécologie',
      psychiatry: 'Psychiatrie',
      emergency: 'Urgence',
      videoCall: 'Appel vidéo',
      chatWithDoctor: 'Chat avec le médecin',
      uploadDocuments: 'Télécharger des documents',
      prescription: 'Ordonnance',
      medicalCertificate: 'Certificat médical',

      // Géolocalisation
      findCare: 'Trouver des soins',
      nearbyHospitals: 'Hôpitaux à proximité',
      clinics: 'Cliniques',
      pharmacies: 'Pharmacies',
      laboratories: 'Laboratoires',
      emergencyServices: 'Services d\'urgence',
      distance: 'Distance',
      rating: 'Note',
      openNow: 'Ouvert maintenant',
      closed: 'Fermé',
      directions: 'Itinéraire',
      call: 'Appeler',

      // Pharmacie
      medicationInfo: 'Informations médicamenteuses',
      searchMedication: 'Rechercher un médicament...',
      categories: 'Catégories',
      pain: 'Douleurs',
      fever: 'Fièvre',
      cough: 'Toux',
      vitamins: 'Vitamines',
      prescription: 'Ordonnance',
      genericName: 'Nom générique',
      dosage: 'Posologie',
      sideEffects: 'Effets secondaires',
      interactions: 'Interactions médicamenteuses',
      precautions: 'Précautions',
      contraindications: 'Contre-indications',

      // Dossier Médical
      medicalFile: 'Dossier Médical',
      personalInfo: 'Informations personnelles',
      medicalHistory: 'Antécédents médicaux',
      allergies: 'Allergies',
      currentMedications: 'Médicaments actuels',
      vaccinations: 'Vaccinations',
      testResults: 'Résultats d\'analyses',
      consultations: 'Consultations',
      statistics: 'Statistiques',
      healthProfile: 'Profil santé',
      bloodType: 'Groupe sanguin',
      emergencyContacts: 'Contacts d\'urgence',

      // Rappels
      reminders: 'Rappels',
      manageReminders: 'Gérer vos rappels',
      addReminder: 'Ajouter un rappel',
      reminderTitle: 'Titre',
      reminderDescription: 'Description',
      reminderType: 'Type',
      medication: 'Médicament',
      appointment: 'Rendez-vous',
      test: 'Analyse',
      vaccination: 'Vaccination',
      date: 'Date',
      time: 'Heure',
      priority: 'Priorité',
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée',
      recurring: 'Répétitif',
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      complete: 'Terminer',
      snooze: 'Reporter',
      completed: 'Terminé',
      upcoming: 'À venir',
      today: 'Aujourd\'hui',

      // Paramètres
      settings: 'Paramètres',
      configureApp: 'Configurer l\'app et urgences',
      notifications: 'Notifications',
      darkMode: 'Mode sombre',
      locationServices: 'Services de localisation',
      dataSync: 'Synchronisation des données',
      privacyMode: 'Mode privé',
      emergencyServices: 'Services d\'urgence',
      samu: 'SAMU',
      police: 'Police',
      firefighters: 'Pompiers',
      doctor: 'Médecin',
      emergencyCall: 'Appel d\'urgence',
      language: 'Langue',
      textSize: 'Taille du texte',
      backup: 'Sauvegarde',

      // Accessibilité
      accessibility: 'Accessibilité',
      accessibilityInfo: 'Personnalisez l\'application selon vos besoins d\'accessibilité',
      largeText: 'Texte agrandi',
      highContrast: 'Contraste élevé',
      voiceOver: 'VoiceOver',
      reduceMotion: 'Réduire les mouvements',
      textSizeSettings: 'Taille du texte',
      soundEffects: 'Effets sonores',
      hapticFeedback: 'Retour haptique',
      testVoiceOver: 'Tester VoiceOver',
      testHaptic: 'Test haptique',
      resetAccessibility: 'Réinitialiser l\'accessibilité',

      // Notifications
      notifications: 'Notifications',
      notificationSettings: 'Paramètres de notifications',
      pushNotifications: 'Notifications push',
      emailNotifications: 'Notifications par email',
      smsNotifications: 'Notifications SMS',
      reminderNotifications: 'Notifications de rappels',
      healthAlerts: 'Alertes santé',
      appointmentReminders: 'Rappels de rendez-vous',
      medicationReminders: 'Rappels de médicaments',
      testResults: 'Résultats d\'analyses',
      emergencyAlerts: 'Alertes d\'urgence',
      quietHours: 'Heures silencieuses',
      from: 'De',
      to: 'À',

      // Messages d'erreur et succès
      errorOccurred: 'Une erreur s\'est produite',
      tryAgain: 'Réessayer',
      networkError: 'Erreur de connexion',
      permissionDenied: 'Permission refusée',
      cameraAccess: 'Accès à la caméra requis',
      locationAccess: 'Accès à la localisation requis',
      dataSaved: 'Données enregistrées',
      dataDeleted: 'Données supprimées',
      reminderAdded: 'Rappel ajouté avec succès',
      appointmentBooked: 'Rendez-vous réservé',
      medicationReminder: 'Rappel de médicament',
      emergencyContact: 'Contact d\'urgence',

      // Slogans et messages
      healthFirst: 'La santé d\'abord',
      yourHealthMatters: 'Votre santé compte',
      smartHealthcare: 'Soins de santé intelligents',
      accessibleToAll: 'Accessible à tous',
      anytimeAnywhere: 'À tout moment, partout',
      professionalCare: 'Soins professionnels',
      trustedPartner: 'Partenaire de confiance',
      innovativeSolutions: 'Solutions innovantes',
      qualityCare: 'Soins de qualité',
      patientCentered: 'Centré sur le patient',
    },
  },
  en: {
    translation: {
      // General
      welcome: 'Welcome',
      welcomeToFagaaru: 'Fagaaru Vital',
      yourHealthCompanion: 'Your intelligent health companion',
      selectLanguage: 'Choose language',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',

      // Navigation
      home: 'Home',
      vitals: 'Vitals',
      teleconsultation: 'Teleconsultation',
      geolocation: 'Geolocation',
      pharmacy: 'Pharmacy',
      medicalRecord: 'Medical Record',
      reminders: 'Reminders',
      settings: 'Settings',
      accessibility: 'Accessibility',
      notifications: 'Notifications',

      // Pre-Diagnostic AI
      preDiagnosticAI: 'Pre-Diagnostic AI',
      scanSymptoms: 'Scan symptoms',
      scanWounds: 'Scan wounds',
      medicalAssistant: 'Medical assistant',
      askQuestion: 'Ask your medical question...',
      send: 'Send',
      analyzingSymptoms: 'Analyzing common symptoms',
      treatmentSuggestions: 'Treatment suggestions',
      preventionAdvice: 'Prevention advice',
      woundIdentification: 'Wound type identification',
      ointmentRecommendation: 'Ointment recommendation',
      careAdvice: 'Care advice',
      instantResponses: 'Instant responses',
      personalizedAdvice: 'Personalized advice',
      reliableInformation: 'Reliable information',

      // Vitals
      healthVitals: 'Your vital signs',
      heartRate: 'Heart rate',
      bloodPressure: 'Blood pressure',
      temperature: 'Temperature',
      oxygenSaturation: 'Oxygen saturation',
      bloodSugar: 'Blood sugar',
      weight: 'Weight',
      height: 'Height',
      bmi: 'BMI',
      lastUpdate: 'Last update',
      addVital: 'Add vital sign',
      vitalHistory: 'History',
      normal: 'Normal',
      high: 'High',
      low: 'Low',
      critical: 'Critical',

      // Teleconsultation
      onlineConsultation: 'Online consultation',
      bookAppointment: 'Book appointment',
      availableDoctors: 'Available doctors',
      specialties: 'Specialties',
      cardiology: 'Cardiology',
      dermatology: 'Dermatology',
      pediatrics: 'Pediatrics',
      gynecology: 'Gynecology',
      psychiatry: 'Psychiatry',
      emergency: 'Emergency',
      videoCall: 'Video call',
      chatWithDoctor: 'Chat with doctor',
      uploadDocuments: 'Upload documents',
      prescription: 'Prescription',
      medicalCertificate: 'Medical certificate',

      // Geolocation
      findCare: 'Find care',
      nearbyHospitals: 'Nearby hospitals',
      clinics: 'Clinics',
      pharmacies: 'Pharmacies',
      laboratories: 'Laboratories',
      emergencyServices: 'Emergency services',
      distance: 'Distance',
      rating: 'Rating',
      openNow: 'Open now',
      closed: 'Closed',
      directions: 'Directions',
      call: 'Call',

      // Pharmacy
      medicationInfo: 'Medication information',
      searchMedication: 'Search medication...',
      categories: 'Categories',
      pain: 'Pain',
      fever: 'Fever',
      cough: 'Cough',
      vitamins: 'Vitamins',
      prescription: 'Prescription',
      genericName: 'Generic name',
      dosage: 'Dosage',
      sideEffects: 'Side effects',
      interactions: 'Drug interactions',
      precautions: 'Precautions',
      contraindications: 'Contraindications',

      // Medical Record
      medicalFile: 'Medical Record',
      personalInfo: 'Personal information',
      medicalHistory: 'Medical history',
      allergies: 'Allergies',
      currentMedications: 'Current medications',
      vaccinations: 'Vaccinations',
      testResults: 'Test results',
      consultations: 'Consultations',
      statistics: 'Statistics',
      healthProfile: 'Health profile',
      bloodType: 'Blood type',
      emergencyContacts: 'Emergency contacts',

      // Reminders
      reminders: 'Reminders',
      manageReminders: 'Manage your reminders',
      addReminder: 'Add reminder',
      reminderTitle: 'Title',
      reminderDescription: 'Description',
      reminderType: 'Type',
      medication: 'Medication',
      appointment: 'Appointment',
      test: 'Test',
      vaccination: 'Vaccination',
      date: 'Date',
      time: 'Time',
      priority: 'Priority',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      recurring: 'Recurring',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      complete: 'Complete',
      snooze: 'Snooze',
      completed: 'Completed',
      upcoming: 'Upcoming',
      today: 'Today',

      // Settings
      settings: 'Settings',
      configureApp: 'Configure app and emergencies',
      notifications: 'Notifications',
      darkMode: 'Dark mode',
      locationServices: 'Location services',
      dataSync: 'Data sync',
      privacyMode: 'Privacy mode',
      emergencyServices: 'Emergency services',
      samu: 'SAMU',
      police: 'Police',
      firefighters: 'Firefighters',
      doctor: 'Doctor',
      emergencyCall: 'Emergency call',
      language: 'Language',
      textSize: 'Text size',
      backup: 'Backup',

      // Accessibility
      accessibility: 'Accessibility',
      accessibilityInfo: 'Customize the app according to your accessibility needs',
      largeText: 'Large text',
      highContrast: 'High contrast',
      voiceOver: 'VoiceOver',
      reduceMotion: 'Reduce motion',
      textSizeSettings: 'Text size',
      soundEffects: 'Sound effects',
      hapticFeedback: 'Haptic feedback',
      testVoiceOver: 'Test VoiceOver',
      testHaptic: 'Test haptic',
      resetAccessibility: 'Reset accessibility',

      // Notifications
      notifications: 'Notifications',
      notificationSettings: 'Notification settings',
      pushNotifications: 'Push notifications',
      emailNotifications: 'Email notifications',
      smsNotifications: 'SMS notifications',
      reminderNotifications: 'Reminder notifications',
      healthAlerts: 'Health alerts',
      appointmentReminders: 'Appointment reminders',
      medicationReminders: 'Medication reminders',
      testResults: 'Test results',
      emergencyAlerts: 'Emergency alerts',
      quietHours: 'Quiet hours',
      from: 'From',
      to: 'To',

      // Error and success messages
      errorOccurred: 'An error occurred',
      tryAgain: 'Try again',
      networkError: 'Network error',
      permissionDenied: 'Permission denied',
      cameraAccess: 'Camera access required',
      locationAccess: 'Location access required',
      dataSaved: 'Data saved',
      dataDeleted: 'Data deleted',
      reminderAdded: 'Reminder added successfully',
      appointmentBooked: 'Appointment booked',
      medicationReminder: 'Medication reminder',
      emergencyContact: 'Emergency contact',

      // Slogans and messages
      healthFirst: 'Health first',
      yourHealthMatters: 'Your health matters',
      smartHealthcare: 'Smart healthcare',
      accessibleToAll: 'Accessible to all',
      anytimeAnywhere: 'Anytime, anywhere',
      professionalCare: 'Professional care',
      trustedPartner: 'Trusted partner',
      innovativeSolutions: 'Innovative solutions',
      qualityCare: 'Quality care',
      patientCentered: 'Patient-centered',
    },
  },
  wo: {
    translation: {
      // Général
      welcome: 'Dalal ak jàmm',
      welcomeToFagaaru: 'Fagaaru Vital',
      yourHealthCompanion: 'Sama mbokk yi gëm',
      selectLanguage: 'Tann lakk',
      loading: 'Dëkk...',
      error: 'Jafe',
      success: 'Dëgg',
      cancel: 'Bàyyi',
      save: 'Saxal',
      delete: 'Fey',
      edit: 'Tëj',
      add: 'Yokk',
      back: 'Dellu',
      next: 'Ci gannaaw',
      previous: 'Ci gëm',
      close: 'Tëj',
      confirm: 'Dëggal',
      yes: 'Waaw',
      no: 'Déedéet',
      ok: 'OK',

      // Navigation
      home: 'Accueil',
      vitals: 'Vitaux',
      teleconsultation: 'Téléconsultation',
      geolocation: 'Géolocalisation',
      pharmacy: 'Pharmacie',
      medicalRecord: 'Dossier Médical',
      reminders: 'Rappels',
      settings: 'Paramètres',
      accessibility: 'Accessibilité',
      notifications: 'Notifications',

      // Pre-Diagnostic AI
      preDiagnosticAI: 'Pre-Diagnostique AI',
      scanSymptoms: 'Scanner les symptômes',
      scanWounds: 'Scanner les plaies',
      medicalAssistant: 'Assistant médical',
      askQuestion: 'Posez votre question médicale...',
      send: 'Envoyer',
      analyzingSymptoms: 'Analyse des symptômes courants',
      treatmentSuggestions: 'Suggestions de traitements',
      preventionAdvice: 'Conseils de prévention',
      woundIdentification: 'Identification du type de plaie',
      ointmentRecommendation: 'Recommandation de pommades',
      careAdvice: 'Conseils de soins',
      instantResponses: 'Réponses instantanées',
      personalizedAdvice: 'Conseils personnalisés',
      reliableInformation: 'Informations fiables',

      // Slogans et messages
      healthFirst: 'Sàmm dëpp',
      yourHealthMatters: 'Sama sàmm dëpp',
      smartHealthcare: 'Sàmm yi gëm',
      accessibleToAll: 'Yépp dëpp',
      anytimeAnywhere: 'Lu nekk, fan nekk',
      professionalCare: 'Sàmm yi gëm',
      trustedPartner: 'Mbokk yi gëm',
      innovativeSolutions: 'Xel yi gëm',
      qualityCare: 'Sàmm yi dëgg',
      patientCentered: 'Moytu waa',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n; 