<template>
  <div class="p-8">
    <!-- Profile Info -->
    <div class="flex items-center gap-6 mb-6">
      <!-- Profile Picture / Avatar -->
      <<!-- Profile Picture / Avatar -->
<div class="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
  <img
    v-if="supervisor?.profilePicture"
    :src="supervisor.profilePicture"
    alt="Profile Picture"
    class="w-full h-full object-cover"
  />
  <!-- Default avatar if no picture -->
  <img
    v-else
    src="https://www.gravatar.com/avatar/?d=mp&s=200"
    alt="Default Avatar"
    class="w-full h-full object-cover"
  />
</div>
      <!-- Supervisor Info -->
      <div>
        <h2 class="text-2xl font-bold">{{ supervisor?.name }}</h2>
        <p class="text-gray-600">{{ supervisor?.department }}</p>
        <p class="text-gray-600">{{ supervisor?.university }}</p>

        <!-- Upload Profile Picture -->
        <label class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          Upload picture
          <input type="file" class="hidden" @change="handleFileUpload" />
        </label>
      </div>
    </div>

    <!-- Divider -->
    <hr class="mb-6" />

    <!-- Account Settings -->
    <div class="space-y-4">
      <button @click="openPasswordModal" class="block w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
        Change Password
      </button>

      <button @click="signOut"
        class="block w-full text-left px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
        Sign Out
      </button>
    </div>

    <!-- Password Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-lg font-bold mb-4">Change Password</h3>

        <input v-model="passwordForm.current" type="password" placeholder="Current Password"
          class="w-full mb-3 border rounded px-3 py-2" />

        <input v-model="passwordForm.new" type="password" placeholder="New Password"
          class="w-full mb-3 border rounded px-3 py-2" />

        <input v-model="passwordForm.confirm" type="password" placeholder="Confirm New Password"
          class="w-full mb-3 border rounded px-3 py-2" />

        <div class="flex justify-end gap-2">
          <button @click="closePasswordModal" class="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button @click="submitPasswordChange" class="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSupervisorStore } from '@/stores/supervisorStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const supervisorStore = useSupervisorStore();
const { currentSupervisor: supervisor } = storeToRefs(supervisorStore);

const router = useRouter();

// Upload profile picture
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    supervisorStore.updateProfilePicture(file);
  }
};

// Password modal
const showPasswordModal = ref(false);
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

const openPasswordModal = () => (showPasswordModal.value = true);
const closePasswordModal = () => {
  showPasswordModal.value = false;
  passwordForm.value = { current: '', new: '', confirm: '' };
};

const submitPasswordChange = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('New passwords do not match!');
    return;
  }
  alert('Password changed successfully!');
  closePasswordModal();
};

// Sign out
const signOut = () => {
  localStorage.removeItem('currentSupervisor');
  supervisorStore.currentSupervisor = null;
  router.push('/login');
};
</script>