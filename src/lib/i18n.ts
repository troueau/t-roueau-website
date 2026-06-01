export type Language = "en" | "fr";

export const translations = {
  en: {
    // Header
    "header.about": "About",

    // Index — hero
    "index.hero.title": "Hello.",
    "index.hero.name": "Tom Rousseau",
    "index.hero.subtitle":
      "I build things for the web and take photos. Scroll to explore.",

    // Index — projects section
    "index.projects.title": "Projects",
    "index.projects.description":
      "Side projects, experiments & things I built.",

    // Index — about section
    "index.about.title": "About",
    "index.about.description": "A few words about who I am.",
    "index.about.label": "Learn more",

    // Project short descriptions (cards + detail pages)
    "projects.turcane.description":
      "Website of La Turcane - Modernization of a bed-and-breakfast website.",
    "projects.flavie.description": "Website of Flavie Herbreteau.",
    "projects.poche.description":
      "Web application for personnal finance analysis",
    "projects.shana.description": "Website of Shana Herbreteau.",
    "projects.martin.description": "Website of Martin Adeline.",
    "projects.github.description": "My Github profile.",

    // Project long descriptions (detail pages)
    "projects.turcane.long":
      "Complete redesign of La Turcane, a bed-and-breakfast in Brittany. The goal was to create a warm, elegant digital experience that reflects the authenticity of the place — refined typography, smooth interactions, and an interface that feels as welcoming as the property itself.",
    "projects.flavie.long":
      "Portfolio website for Flavie Herbreteau, photographer. The design steps out of the way and lets her visual work breathe — a minimal, clean layout with smooth navigation that keeps the focus on the images.",
    "projects.poche.long":
      "Personal finance web app for tracking and analysing income and expenses. The interface is designed for clarity above all: get a clear picture of your financial habits without friction.",
    "projects.shana.long":
      "Portfolio website for Shana Herbreteau, artist. A carefully considered minimal interface designed to showcase her creative universe without distraction.",
    "projects.martin.long":
      "Portfolio website for Martin Adeline, artist. Clean and refined — a site that presents his work with the attention to detail it deserves.",

    // About page
    "about.title": "About",
    "about.years_old": "years old",
    "about.p1":
      "I create simple, refined digital experiences, with close attention to detail and aesthetics.",
    "about.p2":
      "Passionate about photography, I love capturing moments and telling stories through images.",
    "about.p3":
      "I always strive to build things that are useful, beautiful, and well thought out.",
    "about.job.label": "Front-end Developer",
    "about.based.label": "Based in",
  },
  fr: {
    // Header
    "header.about": "À propos",

    // Index — hero
    "index.hero.title": "Hello.",
    "index.hero.name": "Tom Rousseau",
    "index.hero.subtitle":
      "Je crée des choses pour le web et je prends des photos. Défilez pour explorer.",

    // Index — projects section
    "index.projects.title": "Projets",
    "index.projects.description": "Projets perso, expériences & créations.",

    // Index — about section
    "index.about.title": "À propos",
    "index.about.description": "Quelques mots sur qui je suis.",
    "index.about.label": "En savoir plus",

    // Project short descriptions (cards + detail pages)
    "projects.turcane.description":
      "Site de La Turcane. Modernisation d'un site web de chambres d'hôtes.",
    "projects.flavie.description": "Site de Flavie Herbreteau.",
    "projects.poche.description":
      "Application web d'analyse de finances personelles",
    "projects.shana.description": "Site de Shana Herbreteau.",
    "projects.martin.description": "Site de Martin Adeline.",
    "projects.github.description": "Mon profil Github.",

    // Project long descriptions (detail pages)
    "projects.turcane.long":
      "Refonte complète du site de La Turcane, une chambre d'hôtes en Bretagne. L'objectif : créer une expérience digitale chaleureuse et élégante, à l'image de l'authenticité du lieu — typographie soignée, interactions fluides, interface aussi accueillante que l'endroit lui-même.",
    "projects.flavie.long":
      "Site portfolio pour Flavie Herbreteau, photographe. Le design s'efface pour laisser respirer le travail visuel — mise en page épurée et navigation fluide qui gardent le focus sur les images.",
    "projects.poche.long":
      "Application web de gestion de finances personnelles pour suivre et analyser revenus et dépenses. L'interface est conçue pour la clarté avant tout : un regard net sur ses habitudes financières, sans friction.",
    "projects.shana.long":
      "Site portfolio pour Shana Herbreteau, artiste. Une interface minimaliste et réfléchie pour mettre en valeur son univers créatif sans distraction.",
    "projects.martin.long":
      "Site portfolio pour Martin Adeline, artiste. Sobre et raffiné — un site qui présente son travail avec l'attention aux détails qu'il mérite.",

    // About page
    "about.title": "À propos",
    "about.years_old": "ans",
    "about.p1":
      "Je crée des expériences numériques simples et soignées, avec une attention particulière portée aux détails et à l'esthétique.",
    "about.p2":
      "Passionné de photographie, j'aime capturer des moments et raconter des histoires à travers l'image.",
    "about.p3":
      "Je cherche toujours à créer des projets utiles, beaux et bien pensés.",
    "about.job.label": "Développeur front-end",
    "about.based.label": "Basé à",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)["en"];
