<template>
    <div class="font-bold flex justify-between items-center gap-2 mx-20 my-10">
        <NuxtLink to="/">Livrairie</NuxtLink>
        <div class="flex justify-between items-center gap-5">
            <NuxtLink to="/meslivres">Mes livres</NuxtLink> 
            <NuxtLink>Ajouter un livre</NuxtLink> 
            <NuxtLink>A propos</NuxtLink> 
        </div>
        <div>
            <button @click="deconnexion"  class="bg-orange-400 border rounded-full border-orange-400 px-4 py-2">Déconnexion</button> 
        </div>
    </div>
</template>
<script setup lang="ts">

import { getToken } from '~/composable/token';

const deconnexion = async () => {
    const token = getToken()
    await $fetch('http://localhost:3333/logout', {
            method: 'post',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            navigateTo('/')
        })
}
</script>