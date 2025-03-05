<template>
  <div v-if="!checkingAuth">
    <h1>Welcome To The Dashboard</h1>
    <button @click="logout" class="btn-logout">Logout</button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const logout = () => {

  if (process.client) {
    // Clear the token from localStorage
    localStorage.removeItem("token");

  }

  // Redirect to the login page
   navigateTo("/login");
};
</script>

<style scoped>
.btn-logout {
  @apply mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600;
}
</style>