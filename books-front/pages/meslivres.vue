<template>
    <HeaderLog/>
    <h1 class="text-3xl font-bold my-12 mx-20">Ma Collection</h1>
    <div class="flex gap-8 mx-auto flex-wrap w-10/12 justify-center">
        <Book v-if="books" v-for="book in books" :key="book.id" :book="book"/>
        <p class="self-start" v-if="books && books.length == 0">Vous n'avez pas encore de livres, vous pouvez en 
            <NuxtLink class="underline italic" to="/ajout">ajouter un</NuxtLink> </p>
    </div>
</template>
<script setup lang="ts">

import { getToken } from '~/composable/token';

definePageMeta({
    middleware: ["auth"]
})

let books: Array<Object>;

const config = useRuntimeConfig()

if(process.client){

    const token = getToken()

    await $fetch(`${config.public.baseUrl}/books`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        books = response
    })

}
</script>