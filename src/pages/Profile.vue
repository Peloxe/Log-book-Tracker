<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
      <!-- Profile Picture -->
      <div class="flex flex-col items-center">
        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 flex items-center justify-center">
          <img
            v-if="supervisor.profilePicture"
            :src="supervisor.profilePicture"
            alt="Profile Picture"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-4xl font-bold text-gray-500">
            {{ supervisor.name.charAt(0) }}
          </span>
        </div>

        <!-- Hidden File Input -->
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />

        <!-- Styled Buttons -->
        <div class="mt-4 flex gap-3">
          <label
            for="fileInput"
            class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
          >
            Choose Picture
          </label>

          <button
            v-if="supervisor.profilePicture"
            @click="removeProfilePicture"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="mt-6 text-center">
        <h2 class="text-xl font-semibold text-gray-800">{{ supervisor.name }}</h2>
        <p class="text-gray-600">{{ supervisor.department }}</p>
        <p class="text-gray-500 text-sm">{{ supervisor.university }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSupervisorStore } from '../stores/supervisorStore';
import { storeToRefs } from 'pinia';

const supervisorStore = useSupervisorStore();
const { currentSupervisor: supervisor } = storeToRefs(supervisorStore);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    supervisorStore.updateProfilePicture(file);
  }
};

const removeProfilePicture = () => {
  supervisorStore.removeProfilePicture();
};
</script>