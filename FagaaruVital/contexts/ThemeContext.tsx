import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  resetToSystem: () => void;
  isManualOverride: boolean;
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#007AFF',
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#6C757D',
    border: '#E9ECEF',
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    if (!isManualOverride) {
      setIsDark(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, isManualOverride]);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
    setIsManualOverride(true);
  };

  const resetToSystem = () => {
    setIsManualOverride(false);
    setIsDark(systemColorScheme === 'dark');
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    resetToSystem,
    isManualOverride,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
} 