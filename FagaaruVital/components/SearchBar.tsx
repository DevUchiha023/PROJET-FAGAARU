import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../contexts/ThemeContext';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'doctor' | 'facility' | 'medication' | 'symptom' | 'test';
  icon: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  showFilters?: boolean;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 5,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  filterText: {
    fontSize: 12,
  },
  filterTextActive: {
    color: 'white',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 12,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  suggestionSubtitle: {
    fontSize: 12,
  },
});

export default function SearchBar({
  placeholder,
  onSearch,
  onResultSelect,
  showFilters = true,
  filters = [],
  onFilterChange,
}: SearchBarProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

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

  const availableFilters = [
    { key: 'all', label: t('all'), icon: 'grid' },
    { key: 'doctors', label: t('doctors'), icon: 'medical' },
    { key: 'facilities', label: t('facilities'), icon: 'business' },
    { key: 'medications', label: t('medications'), icon: 'medical-outline' },
    { key: 'symptoms', label: t('symptoms'), icon: 'warning' },
    { key: 'tests', label: t('tests'), icon: 'flask' },
  ];

  // Données simulées pour les suggestions
  const mockSuggestions: SearchResult[] = [
    {
      id: '1',
      title: 'Dr. Ahmed Diallo',
      subtitle: 'Cardiologue - Hôpital Principal',
      type: 'doctor',
      icon: 'medical',
    },
    {
      id: '2',
      title: 'Centre Médical Saint-Louis',
      subtitle: 'Médecine générale, Gynécologie',
      type: 'facility',
      icon: 'business',
    },
    {
      id: '3',
      title: 'Paracétamol 500mg',
      subtitle: 'Antidouleur, Antipyrétique',
      type: 'medication',
      icon: 'medical-outline',
    },
    {
      id: '4',
      title: 'Fièvre',
      subtitle: 'Symptôme - Température élevée',
      type: 'symptom',
      icon: 'warning',
    },
    {
      id: '5',
      title: 'Analyse sanguine',
      subtitle: 'Test - Numération formule',
      type: 'test',
      icon: 'flask',
    },
  ];

  useEffect(() => {
    if (showSuggestions) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showSuggestions]);

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch?.(text);

    if (text.length > 2) {
      // Filtrer les suggestions basées sur la recherche
      const filtered = mockSuggestions.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleFilterSelect = (filterKey: string) => {
    setSelectedFilter(filterKey);
    onFilterChange?.(filterKey);
  };

  const handleResultSelect = (result: SearchResult) => {
    setQuery(result.title);
    setShowSuggestions(false);
    onResultSelect?.(result);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'doctor': return '#4CAF50';
      case 'facility': return '#2196F3';
      case 'medication': return '#FF9800';
      case 'symptom': return '#F44336';
      case 'test': return '#9C27B0';
      default: return safeTheme.colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: safeTheme.colors.card }]}>
        <Ionicons name="search" size={20} style={[styles.searchIcon, { color: safeTheme.colors.textSecondary }]} />
        <TextInput
          style={[styles.input, { color: safeTheme.colors.text }]}
          placeholder={placeholder || t('searchPlaceholder')}
          placeholderTextColor={safeTheme.colors.textSecondary}
          value={query}
          onChangeText={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setQuery('');
              setShowSuggestions(false);
            }}
          >
            <Ionicons name="close-circle" size={20} color={safeTheme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          {availableFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                { borderColor: safeTheme.colors.border, backgroundColor: safeTheme.colors.card },
                selectedFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => handleFilterSelect(filter.key)}
            >
              <Ionicons
                name={filter.icon as any}
                size={12}
                color={selectedFilter === filter.key ? 'white' : safeTheme.colors.textSecondary}
                style={styles.filterIcon}
              />
              <Text
                style={[
                  styles.filterText,
                  { color: safeTheme.colors.textSecondary },
                  selectedFilter === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <Animated.View style={[styles.suggestionsContainer, { backgroundColor: safeTheme.colors.card, borderBottomColor: safeTheme.colors.border }, { opacity: fadeAnim }]}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.suggestionItem, { borderBottomColor: safeTheme.colors.border }]}
                onPress={() => handleResultSelect(item)}
              >
                <View style={[styles.suggestionIcon, { backgroundColor: getTypeColor(item.type) + '20' }]}>
                  <Ionicons name={item.icon as any} size={16} color={getTypeColor(item.type)} />
                </View>
                <View style={styles.suggestionContent}>
                  <Text style={[styles.suggestionTitle, { color: safeTheme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.suggestionSubtitle, { color: safeTheme.colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      )}
    </View>
  );
} 