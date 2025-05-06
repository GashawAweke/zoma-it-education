'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Theme options
const themes = {
  light: {
    name: 'light',
    background: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200',
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
    accent: 'bg-amber-500',
  },
  dark: {
    name: 'dark',
    background: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-700',
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500',
    accent: 'bg-amber-400',
  },
  highContrast: {
    name: 'highContrast',
    background: 'bg-black',
    text: 'text-white',
    border: 'border-yellow-400',
    primary: 'bg-yellow-400',
    secondary: 'bg-cyan-400',
    accent: 'bg-white',
  },
};

export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or use system preference
  const [currentTheme, setCurrentTheme] = useState('light'); // Default to light initially

  // Initialize theme after component mounts (client-side only)
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('zoma-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // Check system preference
      setCurrentTheme('dark');
    }
  }, []);

  // Apply theme immediately on first render
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(currentTheme);
    root.setAttribute('data-theme', currentTheme);
  }, []); // Empty dependency array means this runs once on mount

  // Update theme when it changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('zoma-theme', currentTheme);

    // Update document class
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast');
    root.classList.add(currentTheme);

    // Also update data-theme attribute for components that use it
    root.setAttribute('data-theme', currentTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        currentTheme === 'dark'
          ? '#1f2937'
          : currentTheme === 'highContrast'
          ? '#000000'
          : '#ffffff'
      );
    }
  }, [currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('zoma-theme')) {
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Theme switching function
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  // Context value
  const value = {
    theme: themes[currentTheme],
    themeName: currentTheme,
    setTheme,
    themes: Object.keys(themes),
    themeDetails: themes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
