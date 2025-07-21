import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCard from './AnimatedCard';

const { width } = Dimensions.get('window');

interface HealthStat {
  id: string;
  title: string;
  value: string | number;
  unit: string;
  icon: string;
  color: string;
  bgColor: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'danger';
}

interface HealthStatsProps {
  period?: 'day' | 'week' | 'month';
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  periodSelector: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  periodButtonActive: {
    backgroundColor: '#007AFF',
  },
  periodButtonText: {
    fontSize: 12,
  },
  periodButtonTextActive: {
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2 - 10,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statUnit: {
    fontSize: 12,
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: 4,
  },
  trendText: {
    fontSize: 10,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default function HealthStats({ period = 'week' }: HealthStatsProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  // Vérification de sécurité pour le thème
  const safeTheme = theme || {
    colors: {
      primary: '#007AFF',
      text: '#000000',
      textSecondary: '#6C757D',
      card: '#FFFFFF',
    },
  };

  const stats: HealthStat[] = [
    {
      id: '1',
      title: t('heartRate'),
      value: 72,
      unit: 'bpm',
      icon: 'heart',
      color: '#FF6B6B',
      bgColor: '#FFE8E8',
      trend: 'stable',
      status: 'good',
    },
    {
      id: '2',
      title: t('bloodPressure'),
      value: '120/80',
      unit: 'mmHg',
      icon: 'pulse',
      color: '#4ECDC4',
      bgColor: '#E8F8F5',
      trend: 'down',
      status: 'good',
    },
    {
      id: '3',
      title: t('temperature'),
      value: 36.8,
      unit: '°C',
      icon: 'thermometer',
      color: '#45B7D1',
      bgColor: '#E8F4F8',
      trend: 'stable',
      status: 'good',
    },
    {
      id: '4',
      title: t('oxygenLevel'),
      value: 98,
      unit: '%',
      icon: 'leaf',
      color: '#96CEB4',
      bgColor: '#F0F8F0',
      trend: 'up',
      status: 'good',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#4CAF50';
      case 'warning':
        return '#FF9800';
      case 'danger':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: safeTheme.colors.text }]}>
          {t('healthStats')}
        </Text>
        <View style={[styles.periodSelector, { backgroundColor: safeTheme.colors.card }]}>
          <View style={[
            styles.periodButton,
            period === 'day' && styles.periodButtonActive
          ]}>
            <Text style={[
              styles.periodButtonText,
              { color: safeTheme.colors.textSecondary },
              period === 'day' && styles.periodButtonTextActive
            ]}>
              {t('day')}
            </Text>
          </View>
          <View style={[
            styles.periodButton,
            period === 'week' && styles.periodButtonActive
          ]}>
            <Text style={[
              styles.periodButtonText,
              { color: safeTheme.colors.textSecondary },
              period === 'week' && styles.periodButtonTextActive
            ]}>
              {t('week')}
            </Text>
          </View>
          <View style={[
            styles.periodButton,
            period === 'month' && styles.periodButtonActive
          ]}>
            <Text style={[
              styles.periodButtonText,
              { color: safeTheme.colors.textSecondary },
              period === 'month' && styles.periodButtonTextActive
            ]}>
              {t('month')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <AnimatedCard key={stat.id} delay={parseInt(stat.id) * 100}>
            <View style={[styles.statCard, { backgroundColor: safeTheme.colors.card }]}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(stat.status) }]} />
              </View>
              
              <Text style={[styles.statTitle, { color: safeTheme.colors.textSecondary }]}>
                {stat.title}
              </Text>
              <Text style={[styles.statValue, { color: safeTheme.colors.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statUnit, { color: safeTheme.colors.textSecondary }]}>
                {stat.unit}
              </Text>
              
              <View style={styles.statTrend}>
                <Ionicons 
                  name={getTrendIcon(stat.trend) as any} 
                  size={12} 
                  color={getTrendColor(stat.trend)}
                  style={styles.trendIcon}
                />
                <Text style={[styles.trendText, { color: getTrendColor(stat.trend) }]}>
                  {stat.trend === 'up' ? '+2%' : stat.trend === 'down' ? '-1%' : '0%'}
                </Text>
              </View>
            </View>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );
} 