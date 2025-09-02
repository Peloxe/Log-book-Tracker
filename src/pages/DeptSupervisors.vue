<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-bold">
      Supervisors in {{ deptName || "Department" }}
    </h2>

    <!-- Supervisors Table -->
    <div class="bg-white shadow rounded-lg p-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">#</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">Supervisor</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">Phone</th>
          </tr>
        </thead>
        <tbody>
          <!-- Supervisors List -->
          <tr
            v-for="(sup, i) in supervisors"
            :key="sup.id"
            class="hover:bg-gray-50 cursor-pointer"
            @click="selectSupervisor(sup)"
          >
            <td class="px-6 py-3">{{ i + 1 }}</td>
            <td class="px-6 py-3 text-blue-600 underline">{{ sup.full_name }}</td>
            <td class="px-6 py-3">{{ sup.email }}</td>
            <td class="px-6 py-3">{{ sup.profile.phone_number }}</td>
          </tr>

          <!-- Unassigned Students Row -->
          <tr
            class="hover:bg-gray-50 cursor-pointer bg-yellow-50"
            @click="showUnassigned = true; selectedSupervisor = null"
          >
            <td class="px-6 py-3">*</td>
            <td class="px-6 py-3 text-red-600 underline">Unassigned Students</td>
            <td class="px-6 py-3" colspan="2">Click to view students without supervisor</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Students Table -->
    <div v-if="selectedSupervisor || showUnassigned" class="bg-white shadow rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-4">
        {{ showUnassigned ? "Unassigned Students" : selectedSupervisor.full_name + "'s Students" }}
      </h3>

      <!-- No Students Message -->
      <div v-if="!filteredStudents.length" class="p-4 text-gray-500 italic">
        {{ showUnassigned ? "No unassigned students." : "No students assigned yet." }}
      </div>

      <!-- Students Table -->
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">#</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">Student</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">Matric Number</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, i) in filteredStudents"
            :key="student.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-3">{{ i + 1 }}</td>
            <td class="px-6 py-3">{{ student.full_name }}</td>
            <td class="px-6 py-3">{{ student.profile.matric_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useAdminStore } from "@/stores/adminStore"

const route = useRoute()
const deptId = route.params.deptId
const deptName = ref("")

const adminStore = useAdminStore()

const supervisors = computed(() =>
  adminStore.supervisors.filter((s) => s.profile.department === parseInt(deptId))
)

const selectedSupervisor = ref(null)
const showUnassigned = ref(false)

const filteredStudents = computed(() => {
  if (showUnassigned.value) {
    return adminStore.students.filter(
      (s) =>
        s.profile.department === parseInt(deptId) &&
        !s.supervisor_name
    )
  }
  if (selectedSupervisor.value) {
    return adminStore.students.filter(
      (s) =>
        s.profile.department === parseInt(deptId) &&
        s.supervisor_name &&
        s.supervisor_name.toLowerCase() === selectedSupervisor.value.full_name.toLowerCase()
    )
  }
  return []
})

const selectSupervisor = (sup) => {
  selectedSupervisor.value = sup
  showUnassigned.value = false
}

onMounted(async () => {
  if (!adminStore.supervisors.length) await adminStore.fetchSupervisors()
  if (!adminStore.students.length) await adminStore.fetchStudents()

  // fetch dept name from departments store if already loaded
  const dept = adminStore.departments.find((d) => d.id === parseInt(deptId))
  if (dept) deptName.value = dept.name
})
</script>
