import { useAppTheme } from '../contexts/ThemeContext';

export interface Theme {
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

export function useTheme() {
  const { theme } = useAppTheme();
  return theme;
} 