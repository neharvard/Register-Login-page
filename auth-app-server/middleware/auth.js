
export default defineNuxtRouteMiddleware((to, from) => {
    // const token = localStorage.getItem("token");
    
    // Ensure code runs only on the client
    if(process.server) return; 

    if(process.client) {
      const token = localStorage.getItem("token");

      if (!token) {
        // If no token, redirect to login
        return navigateTo("/login");
      }
    }
    
  });