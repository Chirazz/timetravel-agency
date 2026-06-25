# URL de la webapp déployée

https://timetravel-agency-bice.vercel.app

# TimeTravel Agency - Webapp Interactive

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

## Description

**TimeTravel Agency** est une webapp immersive présentant une agence fictive de voyages
dans le temps. L'utilisateur explore trois époques (Paris 1889, Florence 1504,
Crétacé -65M), discute avec un assistant IA local, répond à un quiz pour obtenir une
recommandation personnalisée, puis réserve son expédition via un formulaire complet et
validé. L'interface adopte un style **luxe futuriste** en dark mode (noir, doré, blanc
cassé), entièrement responsive et animée avec Framer Motion.

## Objectif pédagogique

Ce projet répond à la consigne de réalisation d'une **webapp interactive intégrant de
l'IA** dans un parcours utilisateur complet :

- **IA conversationnelle** : un chatbot (Chronos) répond en langage naturel à partir
  d'une base de connaissances locale (aucune API externe), avec une FAQ automatisée.
- **Personnalisation intelligente** : un quiz analyse les réponses de l'utilisateur et
  calcule un score pour recommander la destination la plus adaptée.
- **Réservation** : un formulaire professionnel avec validation, calcul dynamique du prix
  et sauvegarde temporaire des données.

Il démontre la maîtrise de React, du routing, de la gestion d'état, des animations
avancées, de la persistance côté client (LocalStorage) et de l'intégration d'un
assistant IA dans une expérience utilisateur cohérente.

## Stack technique

- **React** — bibliothèque UI (composants, hooks)
- **Vite** — bundler et serveur de développement (HMR)
- **Tailwind CSS** — styles utilitaires, design system dark/doré
- **React Router** — navigation entre les pages (SPA)
- **Framer Motion** — animations et transitions premium
- **Lucide React** — bibliothèque d'icônes
- **LocalStorage** — sauvegarde temporaire du brouillon de réservation

## Fonctionnalités implémentées

- Landing page immersive
- Hero section animée (titre mot à mot, zoom de fond, scroll fluide)
- Galerie de 3 destinations temporelles (cartes interactives, hover premium)
- Pages détails destinations
- Chatbot Chronos (widget flottant, historique, indicateur de saisie, horodatage)
- FAQ automatisée (prix, sécurité, durée, famille, réservation…)
- Quiz de recommandation personnalisée (4 questions, barre de progression, résultat animé)
- Formulaire de réservation complet (9 champs, formules Standard / Premium / Luxe)
- Validation du formulaire (e-mail, téléphone, champs obligatoires, date future, 1 à 8 voyageurs)
- Sauvegarde LocalStorage (brouillon restauré au rechargement, effacé après confirmation)
- Responsive design mobile-first
- Animations premium (fade-in au scroll, transitions de page, glow doré, navbar animée)
- Respect de `prefers-reduced-motion` (accessibilité)

## Destinations

| Époque | Thème | Prix indicatif |
| --- | --- | --- |
| **Paris 1889** | Belle Époque, Tour Eiffel, Exposition Universelle | 8 900 € |
| **Florence 1504** | Renaissance, Michel-Ange, art et architecture | 10 200 € |
| **Crétacé -65M** | Dinosaures, nature préhistorique, aventure extrême | 14 500 € |

## Architecture du projet

```
src/
 ├── components/   # Navbar, Footer, Hero, DestinationCard, ChatBot, TravelQuiz, Layout…
 ├── pages/        # Home, Destinations, DestinationDetails, Reservation, About, NotFound
 ├── data/         # destinations.js, chatbotKnowledge.js
 ├── hooks/        # useScrollReveal.js
 ├── assets/
 ├── App.jsx
 └── main.jsx
```

## Installation

Prérequis : **Node.js 18+** et **npm**.

```bash
npm install
npm run dev
```

L'application est ensuite disponible sur l'URL locale affichée par Vite
(par défaut `http://localhost:5173`).

## Build production

```bash
npm run build      # génère le dossier dist/
npm run preview    # prévisualise le build de production en local
```

Vérification de la qualité du code :

```bash
npm run lint       # ESLint
```

## Déploiement

Le projet est une application statique (SPA) qui se déploie facilement sur **Vercel** ou
**Netlify** :

- **Vercel** : importer le dépôt, framework détecté automatiquement (Vite).
  Build command : `npm run build` — Output directory : `dist`.
- **Netlify** : Build command : `npm run build` — Publish directory : `dist`.

Pour une SPA avec React Router, penser à rediriger toutes les routes vers `index.html`
(Netlify : fichier `_redirects` avec `/* /index.html 200` ; Vercel gère les rewrites
automatiquement).

## Outils IA utilisés

- **Claude Sonnet** — génération et amélioration du code
- **Prompts IA** — génération de code, amélioration de l'UI, conception du chatbot, du
  quiz et du formulaire de réservation

## Auteurs

- Chiraz BELLARA
- Mohamed Ali SGHAGHI

## Licence

Projet pédagogique — M1/M2 Digital & IA.
Voyage temporel fictif, à des fins de démonstration uniquement.
