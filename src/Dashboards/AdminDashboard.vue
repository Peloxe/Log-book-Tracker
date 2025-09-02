<template>
  <div v-if="auth.loadingUser" class="flex justify-center items-center min-h-screen text-gray-600">
    Loading admin dashboard…
  </div>

  <div v-else>
    <!-- If no school -->
    <NoSchool v-if="!user?.profile.school" />

    <!-- If school exists -->
    <DashboardContent v-else :schoolId="user.profile.school" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import NoSchool from '@/components/admin/NoSchool.vue'
import DashboardContent from '@/components/admin/DashboardContent.vue'

const auth = useAuthStore()
const user = computed(() => auth.user)

onMounted(() => {
  if (!auth.user) auth.fetchUser()
})
</script>
