<script setup>
import { ref } from 'vue';


const name = ref('');
const email = ref('');
const phone = ref('');
const role = ref('');
const department = ref('');
const profilePicture = ref(null);
const preview = ref(null);
const loading = ref(false);
const error = ref('');
const success = ref('');

const saveProfile = () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    success.value = 'Profile updated successfully!';
  }, 2000);
};

const resetForm = () => {
  name.value = '';
  email.value = '';
  phone.value = '';
  role.value = '';
  department.value = '';
  profilePicture.value = null;
  preview.value = null;
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    profilePicture.value = file;
  }
};
</script>


<template>
  <div>
    <div class="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 class="text-2xl font-bold mb-4 text-center">Complete Your Profile</h2>
      <form @submit.prevent="saveProfile" class="space-y-4">
        <input v-model="name" type="text" placeholder="Full Name" class="w-full p-3 border rounded" required />
        
        <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded" required />
        <input v-model="phone" type="tel" placeholder="Phone Number" class="w-full p-3 border rounded" required />
        <select v-model="role" class="w-full p-3 border rounded" required>
          <option disabled value="">Select Role</option>
          <option value="student">Student</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
        <input v-model="department" type="text" placeholder="Department" class="w-full p-3 border rounded" required />
        <div>
          <label class="block mb-1 font-semibold">Profile Picture</label>
          <input type="file" @change="onFileChange" />
          <div v-if="preview" class="mt-2">
            <img :src="preview" class="w-20 h-20 rounded-full object-cover" />
          </div>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save Profile' }}
        </button>
        <button type="button" @click="resetForm"
          class="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
          Reset
        </button>

        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm mt-2">{{ success }}</p>
        <p v-if="loading" class="text-blue-500 text-sm mt-2">Loading...</p>
        <p v-if="!error && !success && !loading" class="text-gray-500 text-sm mt-2">Fill out the form to update your
          profile.</p>
      </form>
    </div>
  </div>
</template>