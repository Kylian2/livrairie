<template>
    <HeaderLog/>
    <div class="px-20 flex justify-between items-center">
        <h1 class="text-3xl font-bold my-12">Ma Collection</h1>
        <p>{{ ((searchCategorie !== 'all') ? searchCategorie : '' )  }}</p>
        <select @change="searchBooksByCategorie" v-model="searchCategorie" id="category" name="category" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                    <option value="all">Toutes les categories</option>
                    <option v-for="category in categories" :value="`${category}`">{{category}}</option>
        </select>
    </div>
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

const removeAccents = (string : string): string => {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
    


let searchCategorie: Ref<string> = useState('searchCategorie', () => '')

//let books: Array<Object>;
let books: Ref<Array<Object>> = useState('books');

let categories: Array<string>;

let token: string | null;

const config = useRuntimeConfig()

if(process.client){

    token = getToken()

    await $fetch(`${config.public.baseUrl}/books`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        books.value = response
        console.log(books)
    })

    categories = await $fetch(`${config.public.baseUrl}/categories/user`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    })
}

const searchBooksByCategorie = async () => {
    await $fetch(`${config.public.baseUrl}/books/categorie/${removeAccents(searchCategorie.value)}`, {
        method: 'get',
        headers : {
            Authorization: `Bearer ${token}`,
        }
    }).then((response)=>{
        books.value = response
        console.log(books)
    })
}
</script>