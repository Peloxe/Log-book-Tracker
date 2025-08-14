<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const auth = {
  loading: false,
  error: null
};


const handleSubmit = () => {
  // Handle login logic here
  console.log('Email:', email.value);
  console.log('Password:', password.value);
};

</script>



<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-sm mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded" required />
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
          class="w-full p-3 border rounded" required />
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="showPassword" />
          <span class="text-sm">Show password</span>
        </label>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          :disabled="auth.loading">
          {{ auth.loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="auth.error" class="text-red-500 text-sm mt-2">{{ auth.error }}</p>
      </form>
    </div>
  </div>
</template>