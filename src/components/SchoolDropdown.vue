<script setup>
import { ref, watch, onMounted } from "vue"
import axios from "axios"

// props + emits (so parent fit collect school & department id)
const emit = defineEmits(["update:school", "update:department"])
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const schools = ref([])
const departments = ref([])
const selectedSchool = ref(null)
const selectedDepartment = ref(null)
const loadingSchools = ref(false)
const loadingDepartments = ref(false)

onMounted(async () => {
  await fetchSchools()
})

const fetchSchools = async () => {
  loadingSchools.value = true
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/school/list-school/`)
    schools.value = res.data
  } catch (err) {
    console.error("Error fetching schools", err)
  } finally {
    loadingSchools.value = false
  }
}

const fetchDepartments = async (schoolId) => {
  if (!schoolId) {
    departments.value = []
    return
  }
  loadingDepartments.value = true
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/school/${schoolId}/departments`)
    departments.value = res.data
  } catch (err) {
    console.error("Error fetching departments", err)
  } finally {
    loadingDepartments.value = false
  }
}

// whenever school changes
watch(selectedSchool, async (newVal) => {
  emit("update:school", newVal)
  selectedDepartment.value = null // reset department
  emit("update:department", null)
  if (newVal) await fetchDepartments(newVal)
})

// whenever department changes
watch(selectedDepartment, (newVal) => {
  emit("update:department", newVal)
})
</script>

<template>
  <div class="space-y-4 flex gap-4">
    <!-- School Dropdown -->
    <label class="block text-sm">
      <span class="text-gray-700 dark:text-gray-300">Select School</span>
      <select v-model="selectedSchool"
              class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent">
        <option disabled value="">-- Select School --</option>
        <option v-if="loadingSchools" disabled>Loading schools…</option>
        <option v-for="s in schools" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </label>

    <!-- Department Dropdown -->
    <label class="block text-sm">
      <span class="text-gray-700 dark:text-gray-300">Select Department</span>
      <select v-model="selectedDepartment"
              class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent"
              :disabled="!selectedSchool">
        <option disabled value="">
          {{ !selectedSchool ? "Please select a school first" : "-- Select Department --" }}
        </option>
        <option v-if="loadingDepartments" disabled>Loading departments…</option>
        <option v-for="d in departments" :key="d.id" :value="d.id">{{ d.name }}</option>
      </select>
    </label>
  </div>
</template>
