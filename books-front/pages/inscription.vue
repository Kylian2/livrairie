<template>
    <Header/>
    <div  class="flex flex-col items-center justify-center gap-4 w-screen my-[11vh] ">
        <h2 class="text-4xl font-bold">Inscription</h2>
        <label for="nom">Nom :</label>
        <input v-model="lastname" type="text" id="nom" name="nom" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label for="prenom">Prénom :</label>
        <input v-model="firstname" type="text" id="prenom" name="prenom" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label for="email">Adresse e-mail :</label>
        <input v-model="email" type="email" id="email" name="email" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label for="password">Mot de passe :</label>
        <input v-model="password" type="password" id="password" name="password" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <button @click="verifieRequete" class="bg-orange-400 rounded-md border-orange-400 px-10 py-2 cursor-pointer my-5 block">S'inscrire</button>

    </div>
</template>
<script setup lang="ts">
let email : Ref<string> = useState('email', () => '');
let password : Ref<string> = useState('password', () => '');
let lastname : Ref<string> = useState('lastname', () => '');
let firstname : Ref<string> = useState('firstname', () => '');

function isEmail(str: string): boolean {
  // Expression régulière pour vérifier le format d'une adresse e-mail
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

const verifieRequete = () => {
    if(isEmail(email.value) && password.value.length >= 4 && firstname.value.length > 2 && lastname.value.length > 2){
        connexion()
    }else{
        console.error("Verifiez ID's d'inscription")
    }
}

const config = useRuntimeConfig()

const connexion = async () => {
    await $fetch(`${config.public.baseUrl}/register`, {
        method: 'POST',
        body: {
            'email': email.value,
            'password': password.value,
            'firstname': firstname.value,
            'lastname': lastname.value
        }
    }).then(()=>{
        navigateTo('/connexion')
    }).catch((error) => {
        console.log(error)
    })
    
}
</script>