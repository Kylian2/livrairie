export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log(from)
    console.log(to)
    console.log('hello from redirect.ts')
})
