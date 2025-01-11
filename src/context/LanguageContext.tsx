"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "tr" | "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  tr: {
    "menu.title": "Menü",
    "cart.empty": "Sepetiniz boş",
    // ... diğer çeviriler
  },
  en: {
    "menu.title": "Menu",
    "cart.empty": "Your cart is empty",
    // ... diğer çeviriler
  },
  ar: {
    "menu.title": "القائمة",
    "cart.empty": "عربة التسوق فارغة",
    // ... diğer çeviriler
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
