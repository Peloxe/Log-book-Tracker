<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const submitting = ref(false)
const formError = ref('')

const emailError = computed(() => {
  if (!email.value) return 'Email is required'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.value) ? '' : 'Enter a valid email address'
})
const passwordError = computed(() => (password.value ? '' : 'Password is required'))
const isValid = computed(() => !emailError.value && !passwordError.value)

async function handleLogin() {
  if (!isValid.value) return
  submitting.value = true
  formError.value = ''
  try {
    await auth.login({ email: email.value, password: password.value })
    const redirect = route.query.redirect || '/profile-setup'
    router.push(String(redirect))
    // Optionally, redirect based on user role
    if (auth.user?.role) {
      router.push(`/${auth.user.role.toLowerCase()}`)
    }
    // If no specific role, redirect to dashboard
    router.push('/dashboard')
  } catch (e) {
    formError.value = auth.error || 'Login failed'
  } finally {
    submitting.value = false
  }
}

</script>



<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h1>
      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <div>
          <label for="email" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input id="email" v-model.trim="email" type="email" autocomplete="email" :aria-invalid="!!emailError"
            class="w-full px-3 py-2 border rounded-lg">
          <p v-if="emailError" class="text-xs text-red-600 mt-1">{{ emailError }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input id="password" v-model="password" type="password" autocomplete="current-password"
            :aria-invalid="!!passwordError" class="w-full px-3 py-2 border rounded-lg">
          <p v-if="passwordError" class="text-xs text-red-600 mt-1">{{ passwordError }}</p>
        </div>
        <button :disabled="submitting || !isValid"
          class="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
          <span v-if="submitting">Signing in...</span><span v-else>Login</span>
        </button>
        <p v-if="formError" class="text-sm text-red-600 text-center">{{ formError }}</p>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
        No account? <router-link to="/register" class="text-indigo-600">Register</router-link>
      </p>
    </div>
  </div>
</template>