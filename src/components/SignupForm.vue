<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'   // <-- import Pinia store

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()   // <-- use store

// Form fields
const full_name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const role = ref(route.params.role || '') // fallback if param missing

const submitting = ref(false)
const formError = ref('')

// Validation
const emailError = computed(() => {
  if (!email.value) return 'Email is required'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.value) ? '' : 'Enter a valid email address'
})

const passwordError = computed(() => {
  if (!password.value) return 'Password is required'
  if (password.value.length < 8) return 'Use at least 8 characters'
  return ''
})

const confirmError = computed(() =>
  confirm.value === password.value ? '' : 'Passwords do not match'
)

const isValid = computed(() =>
  full_name.value && email.value && password.value && confirm.value &&
  !emailError.value && !passwordError.value && !confirmError.value
)

// Submit handler using AuthStore
async function handleSignup() {
  if (!isValid.value) return
  submitting.value = true
  formError.value = ''

  try {
    await auth.signup({
      full_name: full_name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value,
    })

    // redirect to verify page
    router.push('/verify')
  } catch (error) {
    formError.value = error.response?.data?.message || 'Registration failed'
    console.error('Signup error:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Account</h1>
      <form @submit.prevent="handleSignup" class="mt-6 space-y-4">
        <div>
          <label for="Full Name" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input v-model="full_name" type="text" placeholder="Full Name" class="w-full p-3 py-2 border rounded-lg" required />
        </div>
        <div>
          <label for="Username" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Username</label>
          <input v-model="username" type="text" placeholder="Username" class="w-full p-3 py-2 border rounded-lg" required />
        </div>
        <div>
          <label for="email" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input id="email" v-model.trim="email" type="email" placeholder="Email" autocomplete="email"
            :aria-invalid="!!emailError" class="w-full px-3 py-2 border rounded-lg">
          <p v-if="emailError" class="text-xs text-red-600 mt-1">{{ emailError }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input id="password" v-model="password" type="password" autocomplete="new-password"
            :aria-invalid="!!passwordError" class="w-full px-3 py-2 border rounded-lg">
          <p v-if="passwordError" class="text-xs text-red-600 mt-1">{{ passwordError }}</p>
        </div>
        <div>
          <label for="confirm" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input id="confirm" v-model="confirm" type="password" autocomplete="new-password"
            :aria-invalid="!!confirmError" class="w-full px-3 py-2 border rounded-lg">
          <p v-if="confirmError" class="text-xs text-red-600 mt-1">{{ confirmError }}</p>
        </div>
        <button :disabled="submitting || !isValid"
          class="w-full py-2 rounded-lg bg-blue-700 text-white hover:bg-[#1e3a8a] disabled:opacity-60">
          <span v-if="submitting">Creating...</span><span v-else>Register</span>
        </button>
        <p v-if="formError" class="text-sm text-red-600 text-center">{{ formError }}</p>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
        Have an account? <router-link to="/login" class="text-indigo-600">Login</router-link>
      </p>
      <router-link to="/" class="text-sm text-slate-400 ">
          ← Back 
      </router-link>
    </div>
  </div>
</template>