import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from './NotificationService';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export interface VitalSigns {
  id: string;
  timestamp: Date;
  temperature: number;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation: number;
  respiratoryRate: number;
  bloodSugar?: number;
  weight?: number;
  height?: number;
  bmi?: number;
}

export interface HealthAlert {
  id: string;
  type: 'temperature' | 'heartRate' | 'bloodPressure' | 'oxygen' | 'bloodSugar';
  severity: 'low' | 'medium' | 'high' | 'critical';
  value: number;
  threshold: number;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface HealthTrend {
  period: 'daily' | 'weekly' | 'monthly';
  vitalType: string;
  average: number;
  min: number;
  max: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  dataPoints: number;
}

class HealthDataService {
  private static instance: HealthDataService;
  private vitalSignsThresholds = {
    temperature: { min: 36.0, max: 37.5, critical: { min: 35.0, max: 38.5 } },
    heartRate: { min: 60, max: 100, critical: { min: 50, max: 120 } },
    bloodPressure: { 
      systolic: { min: 90, max: 140, critical: { min: 80, max: 160 } },
      diastolic: { min: 60, max: 90, critical: { min: 50, max: 110 } }
    },
    oxygenSaturation: { min: 95, max: 100, critical: { min: 90, max: 100 } },
    respiratoryRate: { min: 12, max: 20, critical: { min: 8, max: 25 } },
    bloodSugar: { min: 70, max: 140, critical: { min: 50, max: 200 } },
  };

  static getInstance(): HealthDataService {
    if (!HealthDataService.instance) {
      HealthDataService.instance = new HealthDataService();
    }
    return HealthDataService.instance;
  }

  // Sauvegarder les signes vitaux (local + Firestore)
  async saveVitalSigns(vitalSigns: Omit<VitalSigns, 'id'>): Promise<VitalSigns> {
    try {
      const id = `vital_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const vitalSignsWithId: VitalSigns = {
        ...vitalSigns,
        id,
        timestamp: new Date(),
      };

      // Calculer le BMI si poids et taille sont fournis
      if (vitalSigns.weight && vitalSigns.height) {
        const heightInMeters = vitalSigns.height / 100;
        vitalSignsWithId.bmi = vitalSigns.weight / (heightInMeters * heightInMeters);
      }

      // Sauvegarder localement
      const existingData = await this.getVitalSigns();
      existingData.push(vitalSignsWithId);
      await AsyncStorage.setItem('vitalSigns', JSON.stringify(existingData));

      // Sauvegarder dans Firestore
      try {
        await addDoc(collection(db, 'vitalSigns'), {
          ...vitalSignsWithId,
          timestamp: vitalSignsWithId.timestamp.toISOString(),
        });
      } catch (e) {
        console.warn('Erreur lors de la sauvegarde Firestore:', e);
      }

      // Analyser les alertes
      await this.analyzeVitalSigns(vitalSignsWithId);

      return vitalSignsWithId;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des signes vitaux:', error);
      throw error;
    }
  }

  // Récupérer les signes vitaux
  async getVitalSigns(limit?: number): Promise<VitalSigns[]> {
    try {
      const data = await AsyncStorage.getItem('vitalSigns');
      if (!data) return [];

      const vitalSigns: VitalSigns[] = JSON.parse(data);
      return limit ? vitalSigns.slice(-limit) : vitalSigns;
    } catch (error) {
      console.error('Erreur lors de la récupération des signes vitaux:', error);
      return [];
    }
  }

  // Récupérer les derniers signes vitaux
  async getLatestVitalSigns(): Promise<VitalSigns | null> {
    try {
      const vitalSigns = await this.getVitalSigns(1);
      return vitalSigns.length > 0 ? vitalSigns[0] : null;
    } catch (error) {
      console.error('Erreur lors de la récupération des derniers signes vitaux:', error);
      return null;
    }
  }

  // Analyser les signes vitaux pour détecter les alertes
  private async analyzeVitalSigns(vitalSigns: VitalSigns): Promise<void> {
    const alerts: HealthAlert[] = [];

    // Analyser la température
    if (vitalSigns.temperature) {
      const threshold = this.vitalSignsThresholds.temperature;
      if (vitalSigns.temperature < threshold.critical.min || vitalSigns.temperature > threshold.critical.max) {
        alerts.push({
          id: `alert_temp_${Date.now()}`,
          type: 'temperature',
          severity: 'critical',
          value: vitalSigns.temperature,
          threshold: vitalSigns.temperature < threshold.critical.min ? threshold.critical.min : threshold.critical.max,
          message: `Température critique: ${vitalSigns.temperature}°C`,
          timestamp: new Date(),
          acknowledged: false,
        });
      } else if (vitalSigns.temperature < threshold.min || vitalSigns.temperature > threshold.max) {
        alerts.push({
          id: `alert_temp_${Date.now()}`,
          type: 'temperature',
          severity: 'medium',
          value: vitalSigns.temperature,
          threshold: vitalSigns.temperature < threshold.min ? threshold.min : threshold.max,
          message: `Température anormale: ${vitalSigns.temperature}°C`,
          timestamp: new Date(),
          acknowledged: false,
        });
      }
    }

    // Analyser la fréquence cardiaque
    if (vitalSigns.heartRate) {
      const threshold = this.vitalSignsThresholds.heartRate;
      if (vitalSigns.heartRate < threshold.critical.min || vitalSigns.heartRate > threshold.critical.max) {
        alerts.push({
          id: `alert_hr_${Date.now()}`,
          type: 'heartRate',
          severity: 'critical',
          value: vitalSigns.heartRate,
          threshold: vitalSigns.heartRate < threshold.critical.min ? threshold.critical.min : threshold.critical.max,
          message: `Fréquence cardiaque critique: ${vitalSigns.heartRate} bpm`,
          timestamp: new Date(),
          acknowledged: false,
        });
      } else if (vitalSigns.heartRate < threshold.min || vitalSigns.heartRate > threshold.max) {
        alerts.push({
          id: `alert_hr_${Date.now()}`,
          type: 'heartRate',
          severity: 'medium',
          value: vitalSigns.heartRate,
          threshold: vitalSigns.heartRate < threshold.min ? threshold.min : threshold.max,
          message: `Fréquence cardiaque anormale: ${vitalSigns.heartRate} bpm`,
          timestamp: new Date(),
          acknowledged: false,
        });
      }
    }

    // Analyser la tension artérielle
    if (vitalSigns.bloodPressure) {
      const threshold = this.vitalSignsThresholds.bloodPressure;
      
      // Systolique
      if (vitalSigns.bloodPressure.systolic < threshold.systolic.critical.min || 
          vitalSigns.bloodPressure.systolic > threshold.systolic.critical.max) {
        alerts.push({
          id: `alert_bp_sys_${Date.now()}`,
          type: 'bloodPressure',
          severity: 'critical',
          value: vitalSigns.bloodPressure.systolic,
          threshold: vitalSigns.bloodPressure.systolic < threshold.systolic.critical.min ? 
            threshold.systolic.critical.min : threshold.systolic.critical.max,
          message: `Tension systolique critique: ${vitalSigns.bloodPressure.systolic} mmHg`,
          timestamp: new Date(),
          acknowledged: false,
        });
      }

      // Diastolique
      if (vitalSigns.bloodPressure.diastolic < threshold.diastolic.critical.min || 
          vitalSigns.bloodPressure.diastolic > threshold.diastolic.critical.max) {
        alerts.push({
          id: `alert_bp_dia_${Date.now()}`,
          type: 'bloodPressure',
          severity: 'critical',
          value: vitalSigns.bloodPressure.diastolic,
          threshold: vitalSigns.bloodPressure.diastolic < threshold.diastolic.critical.min ? 
            threshold.diastolic.critical.min : threshold.diastolic.critical.max,
          message: `Tension diastolique critique: ${vitalSigns.bloodPressure.diastolic} mmHg`,
          timestamp: new Date(),
          acknowledged: false,
        });
      }
    }

    // Analyser la saturation en oxygène
    if (vitalSigns.oxygenSaturation) {
      const threshold = this.vitalSignsThresholds.oxygenSaturation;
      if (vitalSigns.oxygenSaturation < threshold.critical.min) {
        alerts.push({
          id: `alert_o2_${Date.now()}`,
          type: 'oxygen',
          severity: 'critical',
          value: vitalSigns.oxygenSaturation,
          threshold: threshold.critical.min,
          message: `Saturation en oxygène critique: ${vitalSigns.oxygenSaturation}%`,
          timestamp: new Date(),
          acknowledged: false,
        });
      } else if (vitalSigns.oxygenSaturation < threshold.min) {
        alerts.push({
          id: `alert_o2_${Date.now()}`,
          type: 'oxygen',
          severity: 'medium',
          value: vitalSigns.oxygenSaturation,
          threshold: threshold.min,
          message: `Saturation en oxygène basse: ${vitalSigns.oxygenSaturation}%`,
          timestamp: new Date(),
          acknowledged: false,
        });
      }
    }

    // Analyser la glycémie
    if (vitalSigns.bloodSugar) {
      const threshold = this.vitalSignsThresholds.bloodSugar;
      if (vitalSigns.bloodSugar < threshold.critical.min || vitalSigns.bloodSugar > threshold.critical.max) {
        alerts.push({
          id: `alert_bs_${Date.now()}`,
          type: 'bloodSugar',
          severity: 'critical',
          value: vitalSigns.bloodSugar,
          threshold: vitalSigns.bloodSugar < threshold.critical.min ? threshold.critical.min : threshold.critical.max,
          message: `Glycémie critique: ${vitalSigns.bloodSugar} mg/dL`,
          timestamp: new Date(),
          acknowledged: false,
        });
      }
    }

    // Sauvegarder les alertes
    if (alerts.length > 0) {
      await this.saveHealthAlerts(alerts);
      
      // Envoyer des notifications pour les alertes critiques
      for (const alert of alerts) {
        if (alert.severity === 'critical') {
          await NotificationService.scheduleEmergencyNotification(
            alert.message,
            `Valeur: ${alert.value} (Seuil: ${alert.threshold})`
          );
        } else {
          await NotificationService.scheduleHealthAlert(
            alert.message,
            `Valeur: ${alert.value} (Seuil: ${alert.threshold})`
          );
        }
      }
    }
  }

  // Sauvegarder les alertes de santé
  async saveHealthAlerts(alerts: HealthAlert[]): Promise<void> {
    try {
      const existingAlerts = await this.getHealthAlerts();
      const updatedAlerts = [...existingAlerts, ...alerts];
      await AsyncStorage.setItem('healthAlerts', JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des alertes:', error);
    }
  }

  // Récupérer les alertes de santé
  async getHealthAlerts(): Promise<HealthAlert[]> {
    try {
      const data = await AsyncStorage.getItem('healthAlerts');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      return [];
    }
  }

  // Marquer une alerte comme reconnue
  async acknowledgeAlert(alertId: string): Promise<void> {
    try {
      const alerts = await this.getHealthAlerts();
      const updatedAlerts = alerts.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      );
      await AsyncStorage.setItem('healthAlerts', JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Erreur lors de la reconnaissance d\'alerte:', error);
    }
  }

  // Calculer les tendances de santé
  async calculateHealthTrends(
    vitalType: keyof VitalSigns,
    period: 'daily' | 'weekly' | 'monthly'
  ): Promise<HealthTrend> {
    try {
      const vitalSigns = await this.getVitalSigns();
      const now = new Date();
      const periodMs = period === 'daily' ? 24 * 60 * 60 * 1000 : 
                      period === 'weekly' ? 7 * 24 * 60 * 60 * 1000 : 
                      30 * 24 * 60 * 60 * 1000;

      const filteredData = vitalSigns.filter(vital => {
        const vitalDate = new Date(vital.timestamp);
        return (now.getTime() - vitalDate.getTime()) <= periodMs;
      });

      if (filteredData.length === 0) {
        return {
          period,
          vitalType: vitalType as string,
          average: 0,
          min: 0,
          max: 0,
          trend: 'stable',
          dataPoints: 0,
        };
      }

      const values = filteredData.map(vital => {
        const value = vital[vitalType];
        return typeof value === 'number' ? value : 
               typeof value === 'object' && value !== null ? 
               (value as any).systolic || (value as any).diastolic || 0 : 0;
      }).filter(val => val > 0);

      if (values.length === 0) {
        return {
          period,
          vitalType: vitalType as string,
          average: 0,
          min: 0,
          max: 0,
          trend: 'stable',
          dataPoints: 0,
        };
      }

      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);

      // Calculer la tendance
      const sortedData = filteredData.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
      if (sortedData.length >= 2) {
        const firstValue = sortedData[0][vitalType];
        const lastValue = sortedData[sortedData.length - 1][vitalType];
        
        if (typeof firstValue === 'number' && typeof lastValue === 'number') {
          const change = lastValue - firstValue;
          const changePercent = Math.abs(change / firstValue);
          
          if (changePercent > 0.05) { // 5% de changement
            trend = change > 0 ? 'increasing' : 'decreasing';
          }
        }
      }

      return {
        period,
        vitalType: vitalType as string,
        average: Math.round(average * 100) / 100,
        min,
        max,
        trend,
        dataPoints: values.length,
      };
    } catch (error) {
      console.error('Erreur lors du calcul des tendances:', error);
      return {
        period,
        vitalType: vitalType as string,
        average: 0,
        min: 0,
        max: 0,
        trend: 'stable',
        dataPoints: 0,
      };
    }
  }

  // Générer un rapport de santé
  async generateHealthReport(): Promise<any> {
    try {
      const vitalSigns = await this.getVitalSigns();
      const alerts = await this.getHealthAlerts();
      const latestVitals = await this.getLatestVitalSigns();

      const trends = {
        temperature: await this.calculateHealthTrends('temperature', 'weekly'),
        heartRate: await this.calculateHealthTrends('heartRate', 'weekly'),
        oxygenSaturation: await this.calculateHealthTrends('oxygenSaturation', 'weekly'),
      };

      return {
        summary: {
          totalReadings: vitalSigns.length,
          activeAlerts: alerts.filter(alert => !alert.acknowledged).length,
          lastReading: latestVitals?.timestamp || null,
        },
        latestVitals,
        trends,
        alerts: alerts.filter(alert => !alert.acknowledged),
        recommendations: this.generateRecommendations(trends, alerts),
      };
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
      return null;
    }
  }

  // Générer des recommandations basées sur les données
  private generateRecommendations(trends: any, alerts: HealthAlert[]): string[] {
    const recommendations: string[] = [];

    // Recommandations basées sur les tendances
    if (trends.temperature.trend === 'increasing' && trends.temperature.average > 37) {
      recommendations.push('Consultez un médecin si la fièvre persiste');
    }

    if (trends.heartRate.trend === 'increasing' && trends.heartRate.average > 100) {
      recommendations.push('Évitez les activités physiques intenses');
    }

    if (trends.oxygenSaturation.average < 95) {
      recommendations.push('Améliorez la ventilation de votre espace');
    }

    // Recommandations basées sur les alertes
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
    if (criticalAlerts.length > 0) {
      recommendations.push('Consultez immédiatement un professionnel de santé');
    }

    return recommendations;
  }
}

export default HealthDataService.getInstance(); 