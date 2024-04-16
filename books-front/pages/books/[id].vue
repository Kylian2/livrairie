<template>
    <HeaderLog/>
    <div v-if="book" class="mx-20 my-20 flex">
        <div>
            <h1 class="text-3xl font-bold mb-12 mx-20">{{book.title}}</h1>
            <div class="flex gap-12">
                <div class="w-96 overflow-hidden">
                    <img :src="`${book.cover}`" alt="cover" class="h-full">
                </div>
                <div class="flex flex-col gap-10">
                    <p class="text-xl"><span class="font-semibold">Auteur :</span> <span> {{ book.author }}</span></p>
                    <p class="text-xl max-w-3xl">{{book.resume}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { getToken } from '~/composable/token';

definePageMeta({
    middleware: ["auth"]
})

const route = useRoute();

let book: object;

if(process.client){

    const token = getToken()

    await $fetch(`http://localhost:3333/books/${route.params.id}`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if(typeof response === "object" && response !== null){
            book = response[0]
        }else if(response === 'false'){
            navigateTo('/introuvable')
        }
    })

}
</script>