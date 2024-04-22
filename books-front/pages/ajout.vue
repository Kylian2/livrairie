<template>
    <HeaderLog/>
    <div>
        <div class="flex justify-center h-96 items-center gap-32">
            <div class="flex flex-col justify-start gap-2">
                <label  for="title">Titre:</label>
                <input v-model="title" type="text" id="title" name="title" required  maxlength="255" class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md"> 
                
                <label for="author">Auteur:</label>
                <input v-model="author" type="text" id="author" name="author" maxlength="255" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                
                <label for="cover">Couverture (URL):</label>
                <input v-model="cover" type="text" id="cover" name="cover"  maxlength="255" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                
                <label for="category">Catégorie:</label>
                <select v-model="categorie" id="category" name="category" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                    <option value="">Sélectionner une catégorie</option>
                    <option v-for="category in categories" :value="`${category.name}`">{{category.name}}</option>
                </select>
            </div>

            <div class="flex flex-col justify-start gap-6">
                <label for="resume">Résumé:</label>
                <textarea v-model="resume" id="resume" name="resume" rows="9" cols="30" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md"></textarea>
            
                <input @click="submit" type="submit" value="Ajouter" class="bg-orange-400 rounded-md border-orange-400 px-10 py-2 cursor-pointer mx-5 block text-center">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getToken } from '~/composable/token';


definePageMeta({
    middleware: ["auth"]
})

const config = useRuntimeConfig()

const categories: Array<object> = await $fetch(`${config.public.baseUrl}/categories`)

let title : Ref<string> = useState('title',  () => '')
let cover : Ref<string> = useState('cover',  () => '')
let author : Ref<string> = useState('author',  () => '')
let categorie : Ref<string> = useState('categorie', () => '')
let resume : Ref<string> = useState('resume', () => '')

let token:string | null;
if(process.client){
    token = getToken()
}

const verifieData = () => {
    return title.value.length > 0 && title.value.length < 255 &&
           cover.value.length > 0 && cover.value.length < 255 &&
           author.value.length > 0 && author.value.length < 255 &&
           categorie.value !== '' &&
           resume.value.length > 0;
}

const submit = async () => {
    if(token !== null && verifieData()){
        await $fetch(`${config.public.baseUrl}/books/ajout`, {
            method: 'POST',
            headers : {
                Authorization: `Bearer ${token}`,
            },    
            body: {
                "title":title.value,
                "author": author.value,
                "cover":cover.value,
                "categorie":categorie.value,
                "resume": resume.value,
            }
        })
        .then((response) => {
            if(response == 'true'){
                navigateTo('/meslivres')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

</script>