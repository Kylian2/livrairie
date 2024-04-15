<template>
    <HeaderLog/>
    <h1 class="text-3xl font-bold my-12 mx-20">Ma Collection</h1>
    <div class="flex gap-8 mx-auto flex-wrap w-10/12 justify-center">
        <Book v-if="books !== null" v-for="book in books" :key="book.id" :book="book"/>
    </div>
</template>
<script setup lang="ts">

import { getToken } from '~/composable/token';

definePageMeta({
    middleware: ["auth", "redirect"]
})

let books;

if(process.client){

    const token = getToken()

    await $fetch(`http://localhost:3333/books`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        books = response
        console.log(books)
    })

}
</script>