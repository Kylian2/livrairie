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
                    <a @click="supprime" class="bg-orange-200 hover:bg-orange-500 py-2 px-4 w-48 text-center rounded cursor-pointer transition-all duration-750">Retirer le livre</a>
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

let book: {
    title:string,
    cover:string,
    resume:string,
    author:string,
    };
let categories: Array<string> = []
let token : string | null = null;
if(process.client){

    token = getToken()

}

const config = useRuntimeConfig()

if(token){
    await $fetch(`${config.public.baseUrl}/books/${route.params.id}`, {
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

const supprime = async () => {
    await $fetch(`http://localhost:3333/books/${route.params.id}/destroy`, {
        method: 'post',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then(() => {
        navigateTo('/meslivres')
    })
}

let categoriesString = categories.join(', ')

</script>