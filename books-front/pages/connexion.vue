<template>
    <Header/>
    <div  class="flex flex-col items-center justify-center gap-4 w-screen my-[20vh] ">
        <h2 class="text-4xl font-bold">Connexion</h2>
        <label for="email">Adresse e-mail:</label>
        <input v-model="email" type="email" id="email" name="email" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label for="password">Mot de passe:</label>
        <input v-model="password" type="password" id="password" name="password" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <button @click="verifieRequete" class="bg-orange-400 rounded-md border-orange-400 px-10 py-2 cursor-pointer mx-5 block">Connexion</button>

    </div>
</template>
<script setup lang="ts">
let email : Ref<string> = useState('email', () => '');
let password : Ref<string> = useState('password', () => '');

function isEmail(str: string): boolean {
  // Expression régulière pour vérifier le format d'une adresse e-mail
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

const verifieRequete = () => {
    if(isEmail(email.value) && password.value.length >= 4){
        connexion()
    }else{
        console.error("Verifiez ID's de connexion")
    }
}

const config = useRuntimeConfig()

const connexion = async () => {
    await $fetch(`${config.public.baseUrl}/login`, {
        method: 'POST',
        body: {
            'email': email.value,
            'password': password.value,
        }
    }).then((response)=>{
        if(response !== undefined){
            localStorage.setItem('token', response['token'])
            navigateTo('/meslivres')
        }else{
            localStorage.removeItem('token')
        }
    }).catch((error) => {
        console.log("There is an error : "+error)
    })
    
}
</script>