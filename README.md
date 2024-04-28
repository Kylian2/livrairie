# Mini projet Livrairie

## Le but
Le but de ce petit projet était de découvrir AdonisJs (en version 6) et Docker. 
Pour cela j'ai réalisé une mini application bibliothèque dans laquelle on peut ajouter des livres, consulter leurs informations et les supprimer. 
L'application est construite avec une API en Adonis 6 pour le back-end et un front-end en NuxtJs (et le framework CSS Tailwind), le style de l'application n'était pas la priorité. 
Pour ce projet je voulais découvrir le système d'authentification (ici avec des tokens API, ce qui s'est révélé ne pas être le plus optimal..., le système de session aurait été plus adapté), la gestion/interrogation d'une base de données (ici avec l'ORM Lucid)
et la mise en place de la communication entre le "back" et le "front". 
Dans un second temps, j'ai hébergé l'application sur un serveur (droplet de DigitalOcean) à l'aide de Docker et je lui ai attribué un nom de domaine. 
La base de données MySQL (MariaDB) était contenue dans un conteneur Docker. 

## Les technologies 

- AdonisJS 6
- Nuxt3
- Docker
- Tailwind
