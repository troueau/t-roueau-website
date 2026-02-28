export type Language = "en" | "fr";

export const translations = {
  en: {
    // Header nav
    "header.projects": "Projects",
    "header.photos": "Photos",

    // Index cards
    "index.projects.title": "Projects",
    "index.projects.description":
      "Side projects, experiments & things I built.",
    "index.projects.label": "View projects",
    "index.photos.title": "Photos",
    "index.photos.description":
      "A collection of moments captured along the way.",
    "index.photos.label": "Browse photos gallery",

    // Projects page
    "projects.title": "Projects",
    "projects.subtitle": "A selection of recent projects.",
    "projects.flavie.description": "Website of Flavie Herbreteau.",
    "projects.shana.description": "Website of Shana Herbreteau.",
    "projects.martin.description": "Website of Martin Adeline.",
    "projects.github.description": "My Github profile.",
  },
  fr: {
    // Header nav
    "header.projects": "Projets",
    "header.photos": "Photos",

    // Index cards
    "index.projects.title": "Projets",
    "index.projects.description": "Projets perso, expériences & créations.",
    "index.projects.label": "Voir les projets",
    "index.photos.title": "Photos",
    "index.photos.description": "Une collection de moments capturés en chemin.",
    "index.photos.label": "Voir la galerie photos",

    // Projects page
    "projects.title": "Projets",
    "projects.subtitle": "Une sélection de projets récents.",
    "projects.flavie.description": "Site de Flavie Herbreteau.",
    "projects.shana.description": "Site de Shana Herbreteau.",
    "projects.martin.description": "Site de Martin Adeline.",
    "projects.github.description": "Mon profil Github.",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)["en"];
