# Utilisation de l'image node:21 comme base
FROM node:21

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie de tout le contenu actuel dans le répertoire de travail du conteneur
COPY . .

# Installation des dépendances
RUN npm install

# Construction de l'application Nuxt.js en mode production
RUN npm run build

# Exposition du port 3000 pour accéder à l'application
EXPOSE 3000

# Commande pour démarrer l'application Nuxt.js en mode production
CMD [ "npm","run", "start" ]
