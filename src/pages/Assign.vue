<template>
  <div class="p-4">
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search student by name..."
        class="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>

    <!-- Assign Table -->
    <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm w-full">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(student, index) in displayedStudents"
            :key="student.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-3 font-medium">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ student.full_name }}</td>
            <td class="px-6 py-3">{{ student.supervisor_name || 'Unassigned' }}</td>
            <td class="px-6 py-3">
              <button
                v-if="!student.supervisor_name"
                @click="assignStudent(student)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Assign
              </button>
              <span v-else class="text-gray-500 font-medium">Assigned</span>
            </td>
          </tr>

          <tr v-if="displayedStudents.length === 0">
            <td colspan="4" class="px-6 py-3 text-center text-gray-500">
              No students found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/utils/axios'

const students = ref([]);
const searchTerm = ref('');
const loading = ref(false);

// Fetch students from API
const fetchStudents = async () => {
  try {
    loading.value = true;
    const res = await api.get('/api/v1/users/list-students/');
    students.value = res.data;
  } catch (err) {
    console.error('Failed to fetch students:', err);
  } finally {
    loading.value = false;
  }
};

// Filtered students
const displayedStudents = computed(() => {
  return students.value.filter(s =>
    s.full_name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Assign supervisor
const assignStudent = async (student) => {
  try {
    await api.post(`/api/v1/users/assign-supervisor/${student.student_id}/`);
    // ✅ update UI immediately
    student.supervisor_name = "You"; // or fetch logged-in supervisor’s name dynamically
  } catch (err) {
    console.error(`Failed to assign student ${student.id}:`, err);
  }
};

// Load students on mount
onMounted(fetchStudents);
</script>
