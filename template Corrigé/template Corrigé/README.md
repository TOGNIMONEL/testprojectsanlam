# vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates.

However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can run `Volar: Switch TS Plugin on/off` from VS Code command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
### Projet de connexion Vue.js avec Vuetify  

Ce projet est une application web d'authentification construite avec **Vue.js 3**, **Vuetify**. Il comprend une **page de connexion** et une **page d'inscription**, utilisant `localStorage` pour stocker les utilisateurs.


####  Fonctionnalités  ajoutées 


## Inscription (Register.vue)

Affichage d'un formulaire de connexion avec email et mot de passe.

Vérification des identifiants saisis par l'utilisateur.

Gestion des erreurs en cas de mauvais identifiants.

Stockage du token d'authentification dans localStorage après connexion réussie.

Redirection automatique vers la page d'accueil après connexion.

Gestion du bouton "Se souvenir de moi" (optionnel).

## Connexion (Login.vue)

Formulaire permettant aux nouveaux utilisateurs de s'inscrire.

Validation des champs (email, mot de passe, confirmation du mot de passe).

Gestion des erreurs en cas de mot de passe non valide.

Enregistrement des données dans un backend (optionnel).

Redirection vers la page de connexion après une inscription réussie.

## Guard de Navigation (/plugin/1.router.ts/index.ts)

Empêche l'accès aux routes protégées tant que l'utilisateur n'est pas authentifié.

Vérification du token d'authentification dans localStorage.

Redirection automatique vers /login si l'utilisateur n'est pas connecté.

Autorise l'accès à /login et /register même sans authentification.

## Débogage

Si l'inscription ou la connexion échoue :

Ouvre la console (F12 > Console) et regarde les erreurs.

Ouvre l'onglet "Application" > "Local Storage" pour voir les données enregistrées.

Assure-toi que les données sont bien sauvegardées sous "users".

---

## Installation & Exécution  

### 1️⃣ Prérequis  
- **Node.js** (v16+ recommandé)  
- **npm** ou **yarn** installé  
