# Projet InfluxDB IoT

Ce projet est une application IoT basée sur InfluxDB, NestJS. Il utilise InfluxDB pour stocker les données de capteurs simulées générées par l'application. Ces données sont ensuite récupérées et affichées dans un tableau de bord web.

## Caractéristiques

- Génération et envoi de fausses données de capteurs à InfluxDB.
- Récupération des données de capteurs depuis InfluxDB.
- Affichage des données de capteurs dans un tableau de bord web.
- Utilisation de Chart.js pour visualiser les données de capteurs dans des graphiques.

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```bash
# build and run the application
$ docker compose up --build
```

## Lancer l'application en local

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
