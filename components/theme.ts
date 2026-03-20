import { Platform } from 'react-native';

export const theme = {
  colors: {
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    primary: '#3B82F6', // Blue from 'Run Pipeline'
    primaryHover: '#2563EB',
    success: '#10B981', // Green dots on nodes
    border: '#E5E7EB',
    cardBackground: '#FFFFFF',
  },
  typography: {
    fontFamily: Platform.OS === 'web' ? 'Inter, Roboto, sans-serif' : 'System',
  },
  // Apple style subtle shadows
  shadows: {
    card: '0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    button: '0 1px 2px rgba(0, 0, 0, 0.05)',
  }
};
