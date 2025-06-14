"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Language, type TranslationKey } from "@/lib/translations";
import React from "react";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && isLanguage(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: TranslationKey): string => {
    const langTranslations = translations[language];
    const defaultTranslations = translations.en;
    return langTranslations?.[key] || defaultTranslations[key] || key;
  };

  return (
    React.createElement(
      LanguageContext.Provider,
      {
        value: {
          language,
          setLanguage: handleSetLanguage,
          t
        }
      },
      children
    )
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Type guard for Language
function isLanguage(value: string): value is Language {
  return value in translations;
}