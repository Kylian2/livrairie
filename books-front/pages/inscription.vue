<template>
    <Header/>
    <div  class="flex flex-col items-center justify-center gap-4 w-screen my-[11vh] ">
        <h2 class="text-4xl font-bold">Inscription</h2>
        <label id="nom-label" for="nom">Nom :</label>
        <input v-model="lastname" type="text" id="nom" name="nom" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label id="prenom-label" for="prenom">Prénom :</label>
        <input v-model="firstname" type="text" id="prenom" name="prenom" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label id="email-label" >Adresse e-mail :</label>
        <input v-model="email" type="email" id="email" name="email" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <label id="password-label" for="password">Mot de passe :</label>
        <input @keydown.enter="verifieRequete" v-model="password" type="password" id="password" name="password" required class="px-5 py-2 bg-slate-300 border-black border-2 rounded-md">

        <button @click="verifieRequete" class="bg-orange-400 rounded-md border-orange-400 px-10 py-2 cursor-pointer my-5 block">S'inscrire</button>
        <p>Ou <NuxtLink class="italic underline" to="/inscription">connectez-vous</NuxtLink></p>
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

const verifieEmail = () => {
    const correct = isEmail(email.value)
    if(!correct){
        const inputField = document.getElementById('email') as HTMLInputElement;
        inputField?.classList.add('border-red-600')
        const label = document.getElementById('email-label')
        label?.classList.add('border-red-600')
        label?.classList.add('text-red-600')
        if (label) {
            label.textContent = 'Adresse e-mail : Entrez une adresse';
        }
        if (inputField instanceof HTMLInputElement) {
            inputField.value = '';
        }
    }else{
        document.getElementById('email')?.classList.remove('border-red-600')
        const label = document.getElementById('email-label')
        label?.classList.remove('border-red-600')
        label?.classList.remove('text-red-600')
        if (label) {
            label.textContent = 'Adresse e-mail :';
        }
    }
    return correct
}

const verifieFirstName = () => {
    const correct = firstname.value.length > 2
    if(!correct){
        document.getElementById('prenom')?.classList.add('border-red-600')
        document.getElementById('prenom-label')?.classList.add('text-red-600')
    }else{
        document.getElementById('prenom')?.classList.remove('border-red-600')
        document.getElementById('prenom-label')?.classList.remove('text-red-600')
    }
    return correct
}

const verifieLastName = () => {
    const correct = lastname.value.length > 2
    if(!correct){
        document.getElementById('nom')?.classList.add('border-red-600')
        document.getElementById('nom-label')?.classList.add('text-red-600')
    }else{
        document.getElementById('nom')?.classList.remove('border-red-600')
        document.getElementById('nom-label')?.classList.remove('text-red-600')
    }
    return correct
}

const verifiePassword = () => {
    const correct = password.value.length >= 4
    if(!correct){
        const inputField = document.getElementById('password') as HTMLInputElement;
        inputField?.classList.add('border-red-600')
        const label = document.getElementById('password-label')
        label?.classList.add('border-red-600')
        label?.classList.add('text-red-600')
        if (label) {
            label.textContent = 'Mot de passe : Au moins 4 caractères';
        }
        if (inputField instanceof HTMLInputElement) {
            inputField.value = '';
        }
    }else{
        document.getElementById('password')?.classList.remove('border-red-600')
        const label = document.getElementById('password-label')
        label?.classList.remove('border-red-600')
        label?.classList.remove('text-red-600')
        if (label) {
            label.textContent = 'Mot de passe :';
        }
    }
    return correct
}

const verifieRequete = () => {
    const email = verifieEmail()
    const lastname = verifieLastName()
    const firstname = verifieFirstName()
    const password = verifiePassword()
    if(email && lastname && firstname && password){
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