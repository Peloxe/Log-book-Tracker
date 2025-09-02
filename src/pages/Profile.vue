<template>
  <div class="p-8">
    <!-- Profile Info -->
    <div class="flex items-center gap-6 mb-6">
      <!-- Profile Picture / Avatar -->
      <<!-- Profile Picture / Avatar -->
        <div class="w-35 h-35 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img v-if="user?.profile.photo" :src="baseURL + user.profile.photo" alt="Profile Picture"
            class="w-full h-full object-cover" />
          <!-- Default avatar if no picture -->
          <img v-else src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="Default Avatar"
            class="w-full h-full object-cover" />
        </div>
        <!-- Supervisor Info -->
        <div>
          <h2 class="text-2xl">Name: {{ user?.full_name }}</h2>
          <p class="text-gray-600">School: {{ user?.school_name }}</p>
          <p class="text-gray-600">{{ user?.department }}</p>
          <div v-if="user?.role === 'student'" class="text-gray-700 mt-1">
            <p>
            Supervisor: <span class="font-medium">
              {{ user?.supervisor_name || 'Unassigned' }}
            </span></p>
            <p>
            Matric-number: <span>{{ user?.profile?.matric_number || 'Unassigned' }}</span></p>
          </div>
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
      <button @click="openPasswordModal"
        class="block  text-left px-4 py-2 bg-gray-100 text-center rounded-xl hover:bg-gray-200">
        Change Password
      </button>

      <button @click.prevent="handleLogout"
        class="block rounded-xl w-45 text-center px-4 py-2 bg-red-100 text-red-600  hover:bg-red-200">
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
import { computed } from "vue"
import api from '@/utils/axios'
import { useSupervisorStore } from '@/stores/supervisorStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore();

const baseURL = import.meta.env.VITE_API_BASE_URL;
const user = computed(() => auth.user);
const supervisorStore = useSupervisorStore();
const { currentSupervisor: supervisor } = storeToRefs(supervisorStore);

const router = useRouter();

// Upload profile picture

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('photo', file);

  try {
    const res = await api.post('/api/v1/users/profile/photo/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Update local auth store so UI reflects new photo
    auth.user.profile.photo = res.data.photo;

    alert('Profile picture updated successfully!');
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Failed to upload profile picture.');
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

function handleLogout() {
  auth.logout();       // clear tokens and user
  router.push('/login'); // ✅ use router, not route
}

</script>