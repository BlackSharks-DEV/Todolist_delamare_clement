# 1. Image de base Node.js légère
FROM node:18-alpine

# 2. Répertoire de travail de l'application dans le conteneur
WORKDIR /app

# 3. Copie des fichiers package.json pour installer les dépendances
COPY package*.json ./

# 4. Installation des dépendances de production uniquement
RUN npm ci --only=production

# 5. Copie de l'intégralité du code source
COPY . .

# 6. Documentation du port d'écoute interne
EXPOSE 3000

# 7. Commande d'exécution au démarrage du conteneur
CMD ["node", "server.js"]