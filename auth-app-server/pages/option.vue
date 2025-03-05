



<!-- previous Register.vue -->
<!-- <template>
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
              />
             
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
// import { useToast } from "vue-toastification";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// const toast = useToast(); // Initialize toast

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

// Check if registration form is valid
const registerValid = computed(() => {
  return (
    username.value.length > 0 &&
    /^[\w\.-]+@[\w\.-]+\.\w+$/.test(email.value) &&
    password.value.length > 0 
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

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const data = await res.json();
//     if (res.ok) {
//       alert("Sign up successful!");
//       // toast.success("Sign up successful!");
//       router.push("/login");
//     } else {
//       alert(data.message);
//     }
//   } catch (error) {
//     console.error("Error:", error);
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

    const responseText = await res.text(); // Log raw response for debugging
    console.log("Raw response:", responseText);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} - ${responseText}`);

       // Show error toast
    
      //  toast.error(data.message);
    }

    const data = JSON.parse(responseText);
    // alert("Sign up successful!");

    // Show success toast
    toast("Sign up successful!", {
        autoClose: 1000,
      }); // ToastOptions
    // toast.success("Sign up successful!");

    router.push("/login");
  } catch (error) {
    console.error("Error:", error);
    alert(error.message); // Display backend error message
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
</style> -->















<!-- login.vue -->
<template>
  <div id="app" v-if="!checkingAuth">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn">
          <div class="top">
            <div class="title">Login</div>
            <div class="subtitle">
              Don't have an account?
              <NuxtLink to="/register" class="subtitle-action">Create Account</NuxtLink>
            </div>
          </div>
          <form @submit.prevent="login">
            <div class="form">
              <input
                required
                aria-required="true"
                aria-invalid="false"
                aria-label="E-mail"
                type="email"
                pattern="^[\w\.-]+@[\w\.-]+\.\w+$"
                class="w100"
                :class="{ invalid: emailError }"
                placeholder="Email"
                autofocus
                v-model="email"
              />
              <input
                required
                aria-required="true"
                type="password"
                class="w100"
                :class="{ invalid: passwordError }"
                placeholder="Password"
                v-model="password"
              />
              <!-- Display backend error message -->
              <div v-if="backendError" class="error-message">
                {{ backendError }}
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              class="action"
              :class="{ 'action-disabled': !loginValid }"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "#app";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();
const email = ref("");
const password = ref("");
const checkingAuth = ref(true);
const emailError = ref(false);
const passwordError = ref(false);
const backendError = ref(""); // For backend error messages

// Check if the user is already authenticated
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard"); // Redirect immediately without flashing login page
    } else {
      checkingAuth.value = false; // Show login form if no token
    }
  }
});

// Validate email and password
const validateInputs = () => {
  emailError.value = !/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email.value);
  passwordError.value = password.value.length === 0;
};

// Check if login form is valid
const loginValid = computed(() => {
  return (
    /^[\w\.-]+@[\w\.-]+\.\w+$/.test(email.value) && password.value.length > 0
  );
});

// Handle login
const login = async () => {
  validateInputs();
  if (!loginValid.value) return;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await res.json();
    if (res.ok) {
      if (process.client) {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashboard");
    } else {
      // Display backend error message
      backendError.value = data.msg;

      // Show backend error message in a toast
      toast.error(data.msg, { timeout: 3000 });

    }
  } catch (error) {
    console.error("Error:", error);
    backendError.value = "An error occurred during login. Please try again.";

    toast.error("An error occurred during login. Please try again.", { timeout: 3000 });
  }
};
</script>

<style>
html {
  background-repeat: no-repeat;
  background: linear-gradient(
    to bottom,
    rgba(96, 108, 136, 1) 0%,
    rgba(63, 76, 107, 1) 100%
  );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
}

/* Login box styles */
.loginBox {
  background: #fff;
  border-radius: 15px;
  max-width: 400px;
  padding: 25px 55px;
  animation: slideInTop 1s;
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

/* Input field styles */
input[type="text"],
input[type="email"],
input[type="password"] {
  border: 1px solid #aaa;
  height: 40px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
}

.invalid {
  border: 2px solid red !important;
}

.invalid::placeholder {
  color: red;
}

/* Button styles */
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
  box-shadow: 1px 1px 2px 1px #ccc;
}

.action-disabled {
  color: #eee;
  background: #aaa;
  cursor: auto;
}

/* Top section styles */
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
  text-align: center;
}

.subtitle-action {
  color: green;
  font-weight: bold;
  cursor: pointer;
}

/* Logo styles */
.logo {
  width: 300px;
  margin-bottom: 10px;
}

/* Responsive styles */
@media screen and (max-width: 440px) {
  .loginBox {
    padding: 25px 25px;
    max-width: 100vw;
  }
}
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>