# Production App - Frontend React TypeScript

Cette application React en TypeScript permet d’afficher la production énergétique d’une centrale solaire photovoltaïque. Elle interagit avec un backend (ex: Ruby on Rails) qui fournit les données de production journalière et horaire.

## Fonctionnalités

- Sélection d’une date via un sélecteur de date
- Affichage de la production totale d’énergie pour la journée sélectionnée
- Affichage détaillé de la production horaire pour cette journée
- Interface simple avec styles SCSS pour une meilleure présentation

## Installation

1. Cloner ce dépôt  
git clone <url-du-repo-front>
cd production-app


2. Installer les dépendances  
npm install


3. Lancer l’application  
npm start


L’application sera accessible à l’adresse [http://localhost:3000](http://localhost:3000).

## Usage

- Sélectionner une date dans le champ date pour voir la production correspondante  
- Les données sont récupérées via une API REST exposée par le backend (par défaut `/api/production?date=YYYY-MM-DD`)

## Personnalisation

- Les styles sont gérés avec SCSS dans `src/App.scss`  
- La communication avec le backend se fait avec `fetch` dans le composant `ProductionViewer`

## Prérequis

- Node.js v14+  
- Un backend exposant une API REST compatible

## Contributions

Les pull requests sont bienvenues. Merci de bien vérifier le fonctionnement avant de proposer des modifications.
