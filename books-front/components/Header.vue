<template>
    <div class="font-bold flex justify-between items-center gap-2 mx-20 my-10">
        <NuxtLink to="/">Livrairie</NuxtLink>
        <div class="flex justify-between items-center gap-5">
            <NuxtLink to="/meslivres">Mes livres</NuxtLink> 
            <NuxtLink to="/ajout">Ajouter un livre</NuxtLink> 
            <NuxtLink>A propos</NuxtLink> 
        </div>
        <div class="flex justify-between items-center gap-5">
            <NuxtLink to='/connexion' class="">Se connecter</NuxtLink> 
            <NuxtLink to="/inscription"  class="bg-orange-400 border rounded-full border-orange-400 px-4 py-2">S'inscrire</NuxtLink> 
        </div>
    </div>
</template>
