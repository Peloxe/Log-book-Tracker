<template>
  <div class="p-4 space-y-6">
    <button @click="$router.back()" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
      ← Back to Dashboard
    </button>

    <h2 class="text-2xl font-semibold text-gray-800">Logs for {{ studentName }}</h2>
    <LogTable :logs="logs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentStore } from '@/stores/studentStore';
import { useLogStore } from '@/stores/logStore';
import LogTable from '@/components/LogTable.vue';

const route = useRoute();
const studentId = parseInt(route.params.studentId);

const studentStore = useStudentStore();
const logStore = useLogStore();

const studentName = ref('');
const logs = ref([]);

const loadData = () => {
  const student = studentStore.students.find(s => s.id === studentId);
  studentName.value = student ? student.name : 'Unknown Student';
  logs.value = logStore.fetchLogsByStudent(studentId);
};

onMounted(() => loadData());
</script>