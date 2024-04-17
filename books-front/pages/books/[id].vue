<template>
    <HeaderLog/>
    <div v-if="book" class="mx-20 my-20 flex">
        <div>
            <h1 class="text-3xl font-bold mb-12 mx-20">{{book.title}}</h1>
            <div class="flex gap-12">
                <div class="w-96 overflow-hidden">
                    <img :src="`${book.cover}`" alt="cover">
                </div>
                <div class="flex flex-col gap-10">
                    <p class="text-xl"><span class="font-semibold">Auteur :</span> <span> {{ book.author }}</span></p>
                    <p class="text-xl"><span class="font-semibold">Catégories :</span> <span>{{ categoriesString }}</span></p>
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
let categories: Array<string> = []
let token : string | null = null;
if(process.client){

    token = getToken()

}
if(token){
    await $fetch(`http://localhost:3333/books/${route.params.id}`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if(typeof response === "object" && response !== null){
            book = response[0][0]
            for (let i = 0; i < response[0].length; i++){
                categories.push(response[0][i].name)
            }
        }else if(response === 'false'){
            navigateTo('/introuvable')
        }
    })
}

let categoriesString = categories.join(', ')

</script>