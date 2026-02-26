import { createContext } from "react";
import { TranslationKey } from "../lib/i18n";

export type LanguageContextType = {
  language: "en" | "fr";
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);
