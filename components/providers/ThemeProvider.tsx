'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isLightTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isLightTheme: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to Dark-First Cyber-Noir
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('ray_theme');
    if (saved === 'light') {
      setIsLightTheme(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsLightTheme((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ray_theme', next ? 'light' : 'dark');
      }
      return next;
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (isLightTheme) {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
