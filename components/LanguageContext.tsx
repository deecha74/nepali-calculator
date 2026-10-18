'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (enText: string, neText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (enText: string) => enText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is default as explicitly requested by user
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Read from localStorage if user previously chose a language
    try {
      const saved = localStorage.getItem('nepalcalc_lang') as Language;
      if (saved === 'en' || saved === 'ne') {
        setLanguageState(saved);
      }
    } catch (e) {
      // Ignore localStorage access restrictions
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('nepalcalc_lang', lang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ne' : 'en';
    setLanguage(next);
  };

  const t = (enText: string, neText: string) => {
    return language === 'ne' ? neText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Exact Language Switch Toggle matching the user screenshot
 * Pill shape, 'ने' on left, 'EN' on right, circular green indicator with smooth transition
 */
export function LanguageSwitchToggle() {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleLanguage}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLanguage();
        }
      }}
      title={language === 'en' ? "नेपाली भाषामा स्विच गर्नुहोस्" : "Switch to English"}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#faf6ee',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '9999px',
        padding: '3px 4px',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        boxShadow: 'inset 2px 2px 5px rgba(44, 34, 20, 0.08), inset -2px -2px 5px rgba(255, 255, 255, 0.95), 2px 2px 6px rgba(44, 34, 20, 0.05)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Nepali Option 'ने' */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          setLanguage('ne');
        }}
        style={{
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          fontSize: '14px',
          fontWeight: 800,
          fontFamily: 'var(--font-devanagari-serif), serif',
          backgroundColor: language === 'ne' ? '#0b2b5c' : 'transparent',
          color: language === 'ne' ? '#ffffff' : '#6e665d',
          boxShadow: language === 'ne' ? '3px 3px 8px rgba(11, 43, 92, 0.35), -1px -1px 3px rgba(255, 255, 255, 0.4)' : 'none',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        ने
      </span>

      {/* English Option 'EN' */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          setLanguage('en');
        }}
        style={{
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          fontSize: '12px',
          fontWeight: 800,
          fontFamily: 'var(--font-serif), serif',
          letterSpacing: '0.04em',
          backgroundColor: language === 'en' ? '#0b2b5c' : 'transparent',
          color: language === 'en' ? '#ffffff' : '#6e665d',
          boxShadow: language === 'en' ? '3px 3px 8px rgba(11, 43, 92, 0.35), -1px -1px 3px rgba(255, 255, 255, 0.4)' : 'none',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        EN
      </span>
    </div>
  );
}
