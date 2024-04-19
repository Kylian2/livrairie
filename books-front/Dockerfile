# Étape de construction
FROM node:21 AS build

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie de tout le contenu actuel dans le répertoire de travail du conteneur
COPY . .

# Installation des dépendances
RUN npm install

# Construction de l'application Nuxt.js en mode production
RUN npm run build

# Étape de production
FROM node:21

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des artefacts de construction depuis l'étape précédente
COPY --from=build /app .

# Exposition du port 3000 pour accéder à l'application
EXPOSE 3000

# Commande pour démarrer l'application Nuxt.js en mode production
CMD [ "npm", "run", "start" ]
