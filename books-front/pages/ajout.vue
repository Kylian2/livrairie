<template>
    <HeaderLog/>
    <div>
        <form action="http://localhost:3333/books/ajout" method="post" class="flex justify-center h-96 items-center gap-32">
            <div class="flex flex-col justify-start gap-2">
                <label for="title">Titre:</label>
                <input type="text" id="title" name="title" required  maxlength="255" class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md"> 
                
                <label for="author">Auteur:</label>
                <input type="text" id="author" name="author" maxlength="255" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                
                <label for="cover">Couverture (URL):</label>
                <input  type="text" id="cover" name="cover"  maxlength="255" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                
                <label for="category">Catégorie:</label>
                <select id="category" name="category" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">
                    <option value="">Sélectionner une catégorie</option>
                    <option v-for="category in categories" :value="`${category.name}`">{{category.name}}</option>
                </select>
            </div>

            <div class="flex flex-col justify-start gap-6">
                <label for="resume">Résumé:</label>
                <textarea id="resume" name="resume" rows="9" cols="30" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md"></textarea>
            
                <input type="submit" value="Ajouter" class="bg-orange-400 rounded-md border-orange-400 px-10 py-2 cursor-pointer mx-5 block">
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">

definePageMeta({
    middleware: ["auth"]
})

const categories: Array<object> = await $fetch('http://localhost:3333/categories')
console.log(categories[0].name)
</script>