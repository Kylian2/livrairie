<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

body {
  background: rgb(224, 224, 224);
  background: linear-gradient(136deg, rgba(224, 224, 224, 1) 0%, rgb(59, 186, 63) 35%, rgba(255, 0, 71, 1) 100%); 
  background-size: 200% 200%;
  height: 100vh;
  animation: gradientAnimation 20s linear infinite;
}
</style>
