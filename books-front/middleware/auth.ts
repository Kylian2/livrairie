import { getToken } from "~/composable/token";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig()
    
    if (process.client) {

        const token = getToken();

        // Verification de l'existence du token
        if (!token) {
        // Handle missing token (redirect to login, etc.)
        console.error("Missing token for authorized access.");
        return navigateTo('/connexion'); // Replace with your login route
        }

        try {
        //verification de la validiter du token
        const response = await $fetch(`${config.public.baseUrl}/islogged`, {
            method: 'get',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        if (response === 'true') { 
            console.log("Authorized access granted");
            navigateTo(to);
        } else {
            console.log("Unauthorized access");
            return navigateTo('/connexion');
        }
        } catch (error) {
        console.error("Error during authorization check:", error);
        }
    }
});
