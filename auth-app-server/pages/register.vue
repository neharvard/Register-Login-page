<!-- <template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="container bg-white p-8 max-w-md border border-black rounded-lg">
      <h2 class="text-3xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <input
            v-model="username"
            type="text"
            placeholder="Enter Username"
            class="input-field"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter Email"
            class="input-field"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Enter Password"
            class="input-field"
          />
        </div>
        <div class="mb-6">
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="input-field"
          />
        </div>
        <button type="submit" class="btn-primary">Register</button>
      </form>
      <p class="mt-4 text-center">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-500">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");


const register = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
      }),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    if (res.ok) {
      alert('Sign up successful!');
      router.push("/login");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

definePageMeta({
  middleware: "guest",
})
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md mb-3;
}
.btn-primary {
  @apply w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600;
}
</style> -->



























<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="register">
          <div class="top">
            <div class="title">Create an Account</div>
            <div class="subtitle">
              Already have an account?
              <NuxtLink to="/login" class="subtitle-action">Login</NuxtLink>
            </div>
          </div>
          <form @submit.prevent="register">
            <div class="form">
              <input
                type="text"
                placeholder="Username"
                autofocus
                v-model="username"
                class="w100"
              />
              <input
                type="email"
                placeholder="Email"
                v-model="email"
                class="w100"
              />
              <input
                type="password"
                placeholder="Password"
                v-model="password"
                class="w100"
                @input="validatePassword"
              />
              <!-- Display password error message -->
              <div v-if="passwordError" class="error-message">
                {{ passwordError }}
              </div>
            </div>
            <button
              type="submit"
              class="action"
              :class="{ 'action-disabled': !registerValid }"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast(); // Initialize toast
const username = ref("");
const email = ref("");
const password = ref("");
const passwordError = ref(""); // For password validation errors

// Validate password
const validatePassword = () => {
  if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters long.";
    return false;
  } else if (!/[A-Z]/.test(password.value)) {
    passwordError.value = "Password must contain at least one capital letter.";
    return false;
  } else if (!/[^A-Za-z0-9]/.test(password.value)) {
    passwordError.value = "Password must contain at least one special character.";
    return false;
  } else {
    passwordError.value = ""; // Clear error if password is valid
    return true;
  }
};

// Check if registration form is valid
const registerValid = computed(() => {
  return (
    username.value.length > 0 &&
    /^[\w\.-]+@[\w\.-]+\.\w+$/.test(email.value) &&
    password.value.length > 0 &&
    validatePassword() // Ensure password is valid
  );
});

// Handle registration
// const register = async () => {
//   if (!registerValid.value) return;

//   try {
//     const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: username.value,
//         email: email.value,
//         password: password.value,
//       }),
//     });

//     const responseText = await res.text(); // Log raw response for debugging
//     console.log("Raw response:", responseText);

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status} - ${responseText}`);
//     }

//     const data = JSON.parse(responseText);

//     if (res.ok) {
//       alert("Sign up successful!");
//       router.push("/dashboard");
//     } else {
//       alert(data.message);
//     }
//     // toast.success("Sign up successful!", { autoClose: 1000 }); // Show success toast
//     // router.push("/dashboard");
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error(error.message); // Show error toast
//   }
// };

const register = async () => {
  if (!registerValid.value) return;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();
    console.log("Server response:", data); // Debugging

    if (!res.ok) {
      throw new Error(data.msg || `HTTP error! Status: ${res.status}`);
    }

    // ✅ Store token in localStorage
    localStorage.setItem("token", data.token);
    
    // ✅ Redirect to dashboard
    toast.success("Sign up successful!");
    router.push("/dashboard");
  } catch (error) {
    console.error("Error:", error);
    toast.error(error.message);
  }
};


definePageMeta({
  middleware: "guest",
});
</script>


<style scoped>
@mixin box {
  box-shadow: 1px 1px 2px 1px #ccc;
}

@mixin field {
  border: 1px solid #aaa;
  height: 40px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  @include field;
}

.invalid {
  border: 2px solid red !important;
  &::placeholder {
    color: red;
  }
}

.w100 {
  width: 100%;
}

.logo {
  width: 300px;
  margin-bottom: 10px;
}

.action {
  height: 40px;
  text-transform: uppercase;
  border-radius: 25px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: green;
  margin-top: 20px;
  color: #fff;
  font-size: 1.2rem;
  @include box;
}

.action-disabled {
  color: #eee;
  background: #aaa;
  cursor: auto;
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.title {
  width: 100%;
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  .subtitle-action {
    color: green;
    font-weight: bold;
    cursor: pointer;
  }
}

.loginBox {
  background: #fff;
  border-radius: 15px;
  max-width: 400px;
  padding: 25px 55px;
  animation: slideInTop 1s;
}

/* Error message styling */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9rem;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }
  to {
    opacity: 100;
    transform: translateY(0%);
  }
}

@media screen and (max-width: 440px) {
  .loginBox {
    padding: 25px 25px;
    max-width: 100vw;
  }
}
</style>



















