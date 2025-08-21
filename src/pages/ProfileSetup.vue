<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import api from '@/utils/axios'; // Adjust the import path as necessary


const auth = useAuthStore();
const router = useRouter();

const fullName = ref('')
const role = ref('')
const institution = ref('')
const avatar = ref(null)
const preview = ref('')
const submitting = ref(false)
const message = ref('')

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (file) {
    avatar.value = file
    preview.value = URL.createObjectURL(file)
  }
}

async function handleProfileSetup() {
  submitting.value = true
  message.value = ''
  try {
    await api.saveProfile({
      name: fullName.value,
      role: role.value,
      institution: institution.value,
      avatar: avatar.value
    })



    await auth.fetchUser(); // refresh store user data
    router.push(auth.user?.role === "student" ? "/student" : "/supervisor" || "/admin");


    // Optionally upload the avatar if it exists
    if (avatar.value) {
      const formData = new FormData()
      formData.append('file', avatar.value)
      await api.uploadAvatar(formData)
    }
    // Redirect to the dashboard or home page after setup
    router.push('/dashboard')

    //     router.push(
    //   auth.role === "student"
    //     ? "/student"
    //     : auth.role === "supervisor"
    //     ? "/supervisor"
    //     : auth.role === "admin"
    //     ? "/admin"
    //     : "/"
    // );


    // Show success message
    preview.value = ''
    message.value = 'Profile saved!'
  } catch (e) {
    message.value = auth.error || 'Could not save profile'
  } finally {
    submitting.value = false
  }
}
</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Complete Your Profile</h1>
      <form @submit.prevent="handleProfileSetup" class="mt-6 space-y-4">
        <div>
          <label for="name" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input id="name" v-model.trim="fullName" type="text" required class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label for="role" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Role</label>
          <select id="role" v-model="role" required class="w-full px-3 py-2 border rounded-lg">
            <option value="" disabled>Select Role</option>
            <option value="Student">Student</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label for="inst" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Institution</label>
          <input id="inst" v-model.trim="institution" type="text" required class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Profile Picture</label>
          <input type="file" accept="image/*" @change="onFileChange">
          <img v-if="preview" :src="preview" class="mt-2 w-24 h-24 rounded-full object-cover border">
        </div>
        <button :disabled="submitting"
          class="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
          <span v-if="submitting">Saving...</span><span v-else>Save Profile</span>
        </button>
        <p v-if="message" class="text-center text-green-600 text-sm">{{ message }}</p>
      </form>
    </div>
  </div>
</template>