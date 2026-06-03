# Todo API

API de gestion de tâches simple en Node.js avec Express.

## Description

Ce service expose une API REST pour créer, lire, mettre à jour et supprimer des tâches.
Il s’exécute dans un conteneur Docker et utilise PostgreSQL pour stocker les tâches de façon persistante.

## Structure du projet

- `Dockerfile` : image Node.js légère pour le service
- `docker-compose.yml` : configuration Docker Compose pour lancer l’API et le service PostgreSQL
- `server.js` : point d’entrée de l’application
- `src/app.js` : configuration Express, middleware et routes
- `src/routes/tasks.js` : routes CRUD pour les tâches et connexion PostgreSQL
- `src/middleware/errorHandler.js` : gestion des erreurs

## Prérequis

- Docker
- Docker Compose

> Optionnel si vous exécutez localement : Node.js 18+ et npm

## Lancer le service avec Docker Compose

1. Ouvrir un terminal dans le dossier `todo-api`
2. Exécuter :

```bash
docker compose up --build
```

3. L’API sera disponible sur :

```text
http://localhost:3000
```

## Docker Compose

La configuration démarre deux services :

- `api` : votre application Express
- `db` : PostgreSQL

Le service PostgreSQL utilise un volume nommé `postgres-data` pour conserver les données entre les redémarrages.

## Points d’accès principaux

### Health check

```http
GET /health
```

Réponse JSON :

```json
{ "status": "ok", "timestamp": "..." }
```

### Gestion des tâches

- `GET /api/tasks` : lister toutes les tâches
- `GET /api/tasks/:id` : récupérer une tâche par son identifiant
- `POST /api/tasks` : créer une nouvelle tâche
- `PUT /api/tasks/:id` : mettre à jour une tâche existante
- `DELETE /api/tasks/:id` : supprimer une tâche

### Corps JSON attendu pour `POST` et `PUT`

```json
{
  "title": "Mon titre",
  "description": "Description de la tâche",
  "status": "todo"
}
```

`description` est requis pour créer une tâche.

## Configuration PostgreSQL

Les variables de connexion utilisées sont :

- `DB_HOST` (par défaut `db`)
- `POSTGRES_DB` (par défaut `todo_db`)
- `POSTGRES_USER` (par défaut `todo_user`)
- `POSTGRES_PASSWORD` (par défaut `todo_pass`)

Ces valeurs sont déjà configurées dans `docker-compose.yml`.

## Exécution locale sans Docker

1. Installer les dépendances

```bash
npm install
```

2. Démarrer l’application

```bash
node server.js
```

3. Accéder à l’API sur `http://localhost:3000`

## Remarques

- Les tâches sont désormais persistées dans PostgreSQL.
- Le service expose le port `3000`.
- La base de données PostgreSQL est accessible sur le port `5432` du système hôte via Docker Compose.

---

Bonne utilisation !