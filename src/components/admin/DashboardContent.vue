<template>
  <div class="p-6 space-y-6">
    <!-- Profile + Create Dept -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img v-if="user?.profile.photo" :src="baseURL + user.profile.photo" class="w-16 h-16 rounded-full object-cover" />
        <img v-else src="https://www.gravatar.com/avatar/?d=mp&s=200" class="w-16 h-16 rounded-full object-cover" />
        <div>
          <h2 class="font-bold text-lg">{{ user?.full_name || 'Admin' }}</h2>
          <p class="text-sm text-gray-600">{{ user?.profile.position }}</p>
        </div>
      </div>
      <button @click="showDeptForm = true" class="bg-green-600 text-white px-4 py-2 rounded">
        Create Department
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard color="blue" title="Departments" :count="departments.length" />
      <StatCard color="yellow" title="Supervisors" :count="supervisors.length" />
      <StatCard color="green" title="Students" :count="students.length" />
    </div>

    <!-- Departments Table -->
    <DepartmentTable :departments="departments" />
    
    <!-- Create Department Modal -->
    <div v-if="showDeptForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-lg font-bold mb-4">Create Department</h3>
        <form @submit.prevent="createDepartment">
          <input v-model="deptName" placeholder="Department Name" class="border rounded px-3 py-2 w-full mb-3" />
          <button class="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
        <button class="mt-3 text-gray-500" @click="showDeptForm = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAdminStore } from '@/stores/adminStore'
import StatCard from '@/components/admin/StatCard.vue'
import DepartmentTable from '@/components/admin/DepartmentTable.vue'

const baseURL = import.meta.env.VITE_API_BASE_URL
const auth = useAuthStore()
const adminStore = useAdminStore()

const user = computed(() => auth.user)
const departments = computed(() => adminStore.departments)
const supervisors = computed(() => adminStore.supervisors)
const students = computed(() => adminStore.students)

const showDeptForm = ref(false)
const deptName = ref('')

const createDepartment = async () => {
  await adminStore.createDepartment(deptName.value, user.value.profile.school)
  deptName.value = ''
  showDeptForm.value = false
}

onMounted(() => {
  adminStore.fetchDepartments(user.value.profile.school)
  adminStore.fetchSupervisors()
  adminStore.fetchStudents()
})
</script>
