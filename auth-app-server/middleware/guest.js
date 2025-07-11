export default defineNuxtRouteMiddleware((to, from) => {
  // const token = localStorage.getItem("token");

  if (process.server) return;

  if (process.client) {
    const token = localStorage.getItem("token");

    if (token) {
      // if the user is authenticated, redirect them to the dashboard
      return navigateTo("/dashboard");
    }
  }
});
