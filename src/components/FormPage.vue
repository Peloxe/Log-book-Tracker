<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';  

const name = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const auth = ref({ loading: false, error: null });

const handleSignup = () => {
  auth.value.loading = true;
  // Simulate API call
  setTimeout(() => {
    auth.value.loading = false;
    if (Math.random() > 0.5) {
      // Simulate success
      alert('Signup successful!');
    } else {
      // Simulate error
      auth.value.error = 'Signup failed. Please try again.';
    }
  }, 1000);
};

</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="max-w-sm mx-auto bg-gray-50 p-6 rounded-lg shadow mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center">Signup</h2>
    <form @submit.prevent="handleSignup" class="space-y-4">
      <input v-model="name" type="text" placeholder="Full Name" class="w-full p-3 border rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded" required />
      <input v-model="username" type="text" placeholder="Username" class="w-full p-3 border rounded" required />
      <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full p-3 border rounded" required />
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="showPassword" />
        <span class="text-sm">Show password</span>
      </label>
      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" :disabled="auth.loading">
        {{ auth.loading ? 'Registering...' : 'Register' }}
      </button>
      <p v-if="auth.error" class="text-red-500 text-sm mt-2">{{ auth.error }}</p>
    </form>
  </div>
  </div>
</template>