# Todo API

API de gestion de tâches simple en Node.js avec Express.

## Description

Ce service expose une API REST pour créer, lire, mettre à jour et supprimer des tâches.
Il s’exécute dans un conteneur Docker et utilise un stockage en mémoire : les données ne sont pas persistantes.

## Structure du projet

- `Dockerfile` : image Node.js légère pour le service
- `docker-compose.yml` : configuration Docker Compose pour lancer l’API
- `server.js` : point d’entrée de l’application
- `src/app.js` : configuration Express, middleware et routes
- `src/routes/tasks.js` : routes CRUD pour les tâches
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

- Le service stocke les tâches en mémoire, donc les données sont perdues au redémarrage du conteneur ou du serveur.
- Le conteneur expose le port `3000`.

---

Bonne utilisation !