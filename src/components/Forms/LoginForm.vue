<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const email = ref('')
const password = ref('')
const submitting = ref(false)
const formError = ref('')

// Validation
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
    // just call store login → it handles navigation
    await auth.login({
      email: email.value,
      password: password.value
    })

    if (auth.error) {
      formError.value = auth.error
    }
  } catch (e) {
    formError.value = 'Login failed. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 ">
    <div class="w-full max-w-md bg-white  rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-center text-gray-900">Login</h1>
      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <div>
          <label for="email" class="block text-sm mb-1 text-gray-700 ">Email</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            autocomplete="email"
            :aria-invalid="!!emailError"
            class="w-full px-3 py-2 border rounded-lg"
          >
          <p v-if="emailError" class="text-xs text-red-600 mt-1">{{ emailError }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm mb-1 text-gray-700 ">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            :aria-invalid="!!passwordError"
            class="w-full px-3 py-2 border rounded-lg"
          >
          <p v-if="passwordError" class="text-xs text-red-600 mt-1">{{ passwordError }}</p>
        </div>

        <button
          :disabled="submitting || !isValid"
          class="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <span v-if="submitting">Signing in...</span>
          <span v-else>Login</span>
        </button>

        <p v-if="formError" class="text-sm text-red-600 text-center">{{ formError }}</p>
      </form>

      <p class="mt-4 text-sm text-center text-gray-600 ">
        No account? <router-link to="/signup/student" class="text-indigo-600">Register</router-link>
      </p>
      <router-link to="/" class="text-sm text-slate-400 ">
          ← Back 
      </router-link>
    </div>
  </div>
</template>
