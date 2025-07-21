import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface HealthGoal {
  name: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  icon: string;
  color: string;
}

const { width } = Dimensions.get('window');

export default function HealthStatsScreen() {
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

  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const healthMetrics: HealthMetric[] = [
    {
      name: 'Tension artérielle',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'stable',
      icon: 'heart',
      color: '#4CAF50',
    },
    {
      name: 'Fréquence cardiaque',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      trend: 'down',
      icon: 'pulse',
      color: '#2196F3',
    },
    {
      name: 'Température',
      value: '36.8',
      unit: '°C',
      status: 'normal',
      trend: 'stable',
      icon: 'thermometer',
      color: '#FF9800',
    },
    {
      name: 'Saturation O2',
      value: '98',
      unit: '%',
      status: 'normal',
      trend: 'up',
      icon: 'airplane',
      color: '#9C27B0',
    },
    {
      name: 'Glycémie',
      value: '95',
      unit: 'mg/dL',
      status: 'warning',
      trend: 'up',
      icon: 'water',
      color: '#FF5722',
    },
    {
      name: 'Poids',
      value: '70',
      unit: 'kg',
      status: 'normal',
      trend: 'down',
      icon: 'scale',
      color: '#607D8B',
    },
  ];

  const healthGoals: HealthGoal[] = [
    {
      name: 'Pas quotidiens',
      current: 8500,
      target: 10000,
      unit: 'pas',
      progress: 85,
      icon: 'footsteps',
      color: '#4CAF50',
    },
    {
      name: 'Heures de sommeil',
      current: 7.5,
      target: 8,
      unit: 'heures',
      progress: 94,
      icon: 'moon',
      color: '#2196F3',
    },
    {
      name: 'Verres d\'eau',
      current: 6,
      target: 8,
      unit: 'verres',
      progress: 75,
      icon: 'water',
      color: '#00BCD4',
    },
    {
      name: 'Calories brûlées',
      current: 450,
      target: 500,
      unit: 'kcal',
      progress: 90,
      icon: 'flame',
      color: '#FF5722',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'danger': return '#F44336';
      default: return safeTheme.colors.primary;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      case 'stable': return 'remove';
      default: return 'remove';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      case 'stable': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const renderMetricCard = (metric: HealthMetric) => (
    <View key={metric.name} style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
          <Ionicons name={metric.icon as any} size={24} color={metric.color} />
        </View>
        <View style={styles.metricInfo}>
          <Text style={styles.metricName}>{metric.name}</Text>
          <View style={styles.metricValueContainer}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricUnit}>{metric.unit}</Text>
          </View>
        </View>
        <View style={styles.metricStatus}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(metric.status) }]} />
          <Ionicons 
            name={getTrendIcon(metric.trend) as any} 
            size={16} 
            color={getTrendColor(metric.trend)} 
          />
        </View>
      </View>
    </View>
  );

  const renderGoalCard = (goal: HealthGoal) => (
    <View key={goal.name} style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
          <Ionicons name={goal.icon as any} size={24} color={goal.color} />
        </View>
        <View style={styles.goalInfo}>
          <Text style={styles.goalName}>{goal.name}</Text>
          <Text style={styles.goalProgress}>
            {goal.current} / {goal.target} {goal.unit}
          </Text>
        </View>
        <Text style={styles.goalPercentage}>{goal.progress}%</Text>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${goal.progress}%`,
              backgroundColor: goal.color,
            }
          ]} 
        />
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: safeTheme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
      backgroundColor: safeTheme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: safeTheme.colors.border,
    },
    backButton: {
      marginRight: 15,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: safeTheme.colors.card,
      borderRadius: 15,
      padding: 4,
      marginBottom: 20,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 12,
    },
    periodButtonActive: {
      backgroundColor: safeTheme.colors.primary,
    },
    periodText: {
      fontSize: 14,
      fontWeight: '600',
      color: safeTheme.colors.textSecondary,
    },
    periodTextActive: {
      color: 'white',
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
      marginBottom: 15,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    metricCard: {
      width: (width - 60) / 2 - 10,
      backgroundColor: safeTheme.colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    metricHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    metricIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    metricInfo: {
      flex: 1,
    },
    metricName: {
      fontSize: 14,
      color: safeTheme.colors.textSecondary,
      marginBottom: 5,
    },
    metricValueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    metricValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
      marginRight: 5,
    },
    metricUnit: {
      fontSize: 12,
      color: safeTheme.colors.textSecondary,
    },
    metricStatus: {
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginBottom: 5,
    },
    goalCard: {
      backgroundColor: safeTheme.colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    goalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    goalIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    goalInfo: {
      flex: 1,
    },
    goalName: {
      fontSize: 16,
      fontWeight: '600',
      color: safeTheme.colors.text,
      marginBottom: 5,
    },
    goalProgress: {
      fontSize: 14,
      color: safeTheme.colors.textSecondary,
    },
    goalPercentage: {
      fontSize: 18,
      fontWeight: 'bold',
      color: safeTheme.colors.primary,
    },
    progressBar: {
      height: 8,
      backgroundColor: safeTheme.colors.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    summaryCard: {
      backgroundColor: safeTheme.colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: safeTheme.colors.text,
      marginBottom: 15,
    },
    summaryGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    summaryItem: {
      alignItems: 'center',
    },
    summaryValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: safeTheme.colors.primary,
      marginBottom: 5,
    },
    summaryLabel: {
      fontSize: 12,
      color: safeTheme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  const averageMetrics = healthMetrics.filter(m => m.status === 'normal').length;
  const totalGoals = healthGoals.length;
  const completedGoals = healthGoals.filter(g => g.progress >= 100).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={safeTheme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistiques de Santé</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'day' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('day')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'day' && styles.periodTextActive]}>
              Jour
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>
              Semaine
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>
              Mois
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Résumé de la semaine</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{averageMetrics}</Text>
                <Text style={styles.summaryLabel}>Métriques normales</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{completedGoals}</Text>
                <Text style={styles.summaryLabel}>Objectifs atteints</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>85%</Text>
                <Text style={styles.summaryLabel}>Score global</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métriques de santé</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map(renderMetricCard)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objectifs quotidiens</Text>
          {healthGoals.map(renderGoalCard)}
        </View>
      </ScrollView>
    </View>
  );
} 
 