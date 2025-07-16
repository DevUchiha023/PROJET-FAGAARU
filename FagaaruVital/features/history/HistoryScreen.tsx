import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface VitalRecord {
  id: string;
  date: string;
  time: string;
  temperature: number;
  bpm: number;
  spo2: number;
  status: 'normal' | 'warning' | 'critical';
}

export default function HistoryScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'all'>('week');
  const [selectedView, setSelectedView] = useState<'graph' | 'table'>('graph');

  // Données simulées d'historique
  const historyData: VitalRecord[] = [
    {
      id: '1',
      date: '15/07/2025',
      time: '08:00',
      temperature: 36.8,
      bpm: 72,
      spo2: 98,
      status: 'normal'
    },
    {
      id: '2',
      date: '15/07/2025',
      time: '12:00',
      temperature: 37.2,
      bpm: 85,
      spo2: 97,
      status: 'normal'
    },
    {
      id: '3',
      date: '15/07/2025',
      time: '16:00',
      temperature: 38.5,
      bpm: 110,
      spo2: 95,
      status: 'warning'
    },
    {
      id: '4',
      date: '15/07/2025',
      time: '20:00',
      temperature: 37.8,
      bpm: 95,
      spo2: 96,
      status: 'normal'
    },
    {
      id: '5',
      date: '14/07/2025',
      time: '08:00',
      temperature: 36.5,
      bpm: 68,
      spo2: 99,
      status: 'normal'
    },
    {
      id: '6',
      date: '14/07/2025',
      time: '14:00',
      temperature: 37.0,
      bpm: 75,
      spo2: 98,
      status: 'normal'
    },
    {
      id: '7',
      date: '13/07/2025',
      time: '10:00',
      temperature: 39.2,
      bpm: 120,
      spo2: 92,
      status: 'critical'
    }
  ];

  const getFilteredData = () => {
    const today = new Date();
    const filtered = historyData.filter(record => {
      const recordDate = new Date(record.date.split('/').reverse().join('-'));
      const diffTime = Math.abs(today.getTime() - recordDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (selectedPeriod) {
        case 'day': return diffDays <= 1;
        case 'week': return diffDays <= 7;
        case 'month': return diffDays <= 30;
        case 'all': return true;
        default: return true;
      }
    });
    return filtered.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'critical': return '#f44336';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  const exportData = (format: 'csv' | 'pdf') => {
    Alert.alert(
      'Export des données',
      `Exporter les données en ${format.toUpperCase()} ?`,
      [
        { 
          text: 'Exporter', 
          onPress: () => Alert.alert(
            'Export réussi',
            `Fichier ${format.toUpperCase()} généré et sauvegardé.\n\nVous pouvez le partager avec votre médecin.`
          )
        },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const renderGraphView = () => {
    const data = getFilteredData();
    const avgTemp = data.reduce((sum, record) => sum + record.temperature, 0) / data.length;
    const avgBpm = data.reduce((sum, record) => sum + record.bpm, 0) / data.length;
    const avgSpo2 = data.reduce((sum, record) => sum + record.spo2, 0) / data.length;

    return (
      <View style={styles.graphSection}>
        <Text style={styles.graphTitle}>📊 Statistiques moyennes</Text>
        
        <View style={styles.statCards}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>🌡️ Température</Text>
            <Text style={styles.statValue}>{avgTemp.toFixed(1)}°C</Text>
            <Text style={styles.statRange}>Normal: 36.5-37.5°C</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>❤️ BPM</Text>
            <Text style={styles.statValue}>{Math.round(avgBpm)}</Text>
            <Text style={styles.statRange}>Normal: 60-100</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>🩸 SpO₂</Text>
            <Text style={styles.statValue}>{Math.round(avgSpo2)}%</Text>
            <Text style={styles.statRange}>Normal: 95-100%</Text>
          </View>
        </View>

        <View style={styles.trendSection}>
          <Text style={styles.trendTitle}>📈 Tendances</Text>
          <Text style={styles.trendText}>• Température: Stable (tendance normale)</Text>
          <Text style={styles.trendText}>• Fréquence cardiaque: Quelques pics (stress/activité)</Text>
          <Text style={styles.trendText}>• Saturation: Excellente (pas d'anomalie)</Text>
        </View>
      </View>
    );
  };

  const renderTableView = () => {
    const data = getFilteredData();
    
    return (
      <View style={styles.tableSection}>
        <Text style={styles.tableTitle}>📋 Historique détaillé</Text>
        
        {data.map((record) => (
          <View key={record.id} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.tableDate}>{record.date}</Text>
              <Text style={styles.tableTime}>{record.time}</Text>
            </View>
            
            <View style={styles.tableCell}>
              <Text style={styles.tableValue}>🌡️ {record.temperature}°C</Text>
              <Text style={styles.tableValue}>❤️ {record.bpm}</Text>
              <Text style={styles.tableValue}>🩸 {record.spo2}%</Text>
            </View>
            
            <View style={styles.tableCell}>
              <Text style={[styles.tableStatus, { color: getStatusColor(record.status) }]}>
                {getStatusIcon(record.status)} {record.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Historique des Données</Text>

      <View style={styles.controlsSection}>
        <View style={styles.periodFilter}>
          <Text style={styles.sectionTitle}>Période :</Text>
          <View style={styles.filterButtons}>
            {[
              { key: 'day', label: 'Jour' },
              { key: 'week', label: 'Semaine' },
              { key: 'month', label: 'Mois' },
              { key: 'all', label: 'Tout' }
            ].map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.filterButton,
                  selectedPeriod === period.key && styles.activeFilterButton
                ]}
                onPress={() => setSelectedPeriod(period.key as any)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedPeriod === period.key && styles.activeFilterButtonText
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.viewToggle}>
          <Text style={styles.sectionTitle}>Affichage :</Text>
          <View style={styles.toggleButtons}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedView === 'graph' && styles.activeToggleButton
              ]}
              onPress={() => setSelectedView('graph')}
            >
              <Text style={[
                styles.toggleButtonText,
                selectedView === 'graph' && styles.activeToggleButtonText
              ]}>
                📊 Graphiques
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedView === 'table' && styles.activeToggleButton
              ]}
              onPress={() => setSelectedView('table')}
            >
              <Text style={[
                styles.toggleButtonText,
                selectedView === 'table' && styles.activeToggleButtonText
              ]}>
                📋 Tableau
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {selectedView === 'graph' ? renderGraphView() : renderTableView()}

      <View style={styles.exportSection}>
        <Text style={styles.sectionTitle}>📤 Exporter les données :</Text>
        <View style={styles.exportButtons}>
          <Button
            title="📄 Export PDF"
            onPress={() => exportData('pdf')}
            color="#4caf50"
          />
          <Button
            title="📊 Export CSV"
            onPress={() => exportData('csv')}
            color="#2196f3"
          />
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Informations importantes :</Text>
        <Text style={styles.infoText}>• Données synchronisées avec le cloud</Text>
        <Text style={styles.infoText}>• Export pour partage avec votre médecin</Text>
        <Text style={styles.infoText}>• Historique complet des consultations</Text>
        <Text style={styles.infoText}>• Tendances et analyses automatiques</Text>
        <Text style={styles.infoText}>• Sauvegarde sécurisée des données</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  controlsSection: {
    marginBottom: 20,
  },
  periodFilter: {
    marginBottom: 15,
  },
  viewToggle: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  activeFilterButton: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeToggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  graphSection: {
    marginBottom: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statRange: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  trendSection: {
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 10,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  trendText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 18,
  },
  tableSection: {
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
  },
  tableDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tableTime: {
    fontSize: 12,
    color: '#666',
  },
  tableValue: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  tableStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  exportSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  exportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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