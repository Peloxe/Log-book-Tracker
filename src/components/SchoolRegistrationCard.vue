<template>
  <div
    class="flex flex-col items-center justify-center h-96 bg-white border border-gray-200 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Register School</h2>

    <form @submit.prevent="handleRegister" class="w-full max-w-md space-y-4">
      <!-- School Name Input -->
      <input v-model="schoolName" type="text" placeholder="Enter School Name"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />

      <!-- Register Button -->
      <button type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200">
        Register
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const schoolName = ref('');

const emit = defineEmits(['register']);

const handleRegister = () => {
  if (!schoolName.value) return;
  emit('register', schoolName.value); // emit the school name
  schoolName.value = ''; // reset input
};
</script>