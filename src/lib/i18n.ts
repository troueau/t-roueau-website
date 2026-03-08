export type Language = "en" | "fr";

export const translations = {
  en: {
    // Header nav
    "header.projects": "Projects",
    "header.photos": "Photos",
    "header.about": "About",

    // Index cards
    "index.hero.title": "Hello.",
    "index.hero.name": "Tom Rousseau",
    "index.hero.subtitle":
      "I build things for the web and take photos. Scroll to explore.",
    "index.projects.title": "Projects",
    "index.projects.description":
      "Side projects, experiments & things I built.",
    "index.projects.label": "View projects",
    "index.photos.title": "Photos",
    "index.photos.description":
      "A collection of moments captured along the way.",
    "index.photos.label": "Browse photos gallery",
    "index.about.title": "About",
    "index.about.description": "A few words about who I am.",
    "index.about.label": "Learn more",

    // Projects page
    "projects.title": "Projects",
    "projects.subtitle": "A selection of recent projects.",
    "projects.flavie.description": "Website of Flavie Herbreteau.",
    "projects.shana.description": "Website of Shana Herbreteau.",
    "projects.martin.description": "Website of Martin Adeline.",
    "projects.github.description": "My Github profile.",

    // About page
    "about.title": "About",
    "about.p1":
      "I create simple, refined digital experiences, with close attention to detail and aesthetics.",
    "about.p2":
      "Passionate about photography, I love capturing moments and telling stories through images.",
    "about.p3":
      "I always strive to build things that are useful, beautiful, and well thought out.",
    "about.job.label": "Front-end Developer",
    "about.based.label": "Based in Paris",
  },
  fr: {
    // Header nav
    "header.projects": "Projets",
    "header.photos": "Photos",
    "header.about": "À propos",

    // Index cards
    "index.hero.title": "Hello.",
    "index.hero.name": "Tom Rousseau",
    "index.hero.subtitle":
      "Je crée des choses pour le web et je prends des photos. Défilez pour explorer.",
    "index.projects.title": "Projets",
    "index.projects.description": "Projets perso, expériences & créations.",
    "index.projects.label": "Voir les projets",
    "index.photos.title": "Photos",
    "index.photos.description": "Une collection de moments capturés en chemin.",
    "index.photos.label": "Voir la galerie photos",
    "index.about.title": "À propos",
    "index.about.description": "Quelques mots sur qui je suis.",
    "index.about.label": "En savoir plus",

    // Projects page
    "projects.title": "Projets",
    "projects.subtitle": "Une sélection de projets récents.",
    "projects.flavie.description": "Site de Flavie Herbreteau.",
    "projects.shana.description": "Site de Shana Herbreteau.",
    "projects.martin.description": "Site de Martin Adeline.",
    "projects.github.description": "Mon profil Github.",

    // About page
    "about.title": "À propos",
    "about.p1":
      "Je crée des expériences numériques simples et soignées, avec une attention particulière portée aux détails et à l'esthétique.",
    "about.p2":
      "Passionné de photographie, j'aime capturer des moments et raconter des histoires à travers l'image.",
    "about.p3":
      "Je cherche toujours à créer des projets utiles, beaux et bien pensés.",
    "about.job.label": "Développeur front-end",
    "about.based.label": "Basé à Paris",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)["en"];
