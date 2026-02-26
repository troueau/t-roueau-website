import { useState, ReactNode } from "react";
import { Language, TranslationKey, translations } from "../lib/i18n";
import { LanguageContext } from "./languageContext";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) ?? "en";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "fr" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
