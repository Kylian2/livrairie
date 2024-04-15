<template>
    <div class="border-2 border-gray-950 w-72 flex flex-col p-2">
        <img :src="`${$attrs.book.cover}`" alt="book-cover">
        <div class="my-2">
            <h3 class="text-xl font-medium">{{$attrs.book.title}}</h3>
            <h4 class="text-lg font-normal">{{$attrs.book.author}}</h4>
        </div>
        <NuxtLink class="w-full bg-green-500 cursor-pointer px-4 py-2 transition-all duration-700 hover:bg-green-600" to="">Voir en details</NuxtLink>
    </div>
</template>
<script setup lang="ts">
const book = useAttrs().book
</script>