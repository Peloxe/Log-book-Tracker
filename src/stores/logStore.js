import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStudentStore } from './studentStore';

export const useLogStore = defineStore('log', () => {
  const logs = ref([
    { id: 1, studentId: 1, task: 'Updated UI', date: '2025-08-15', status: 'Pending' },
    { id: 2, studentId: 1, task: 'Fixed login bug', date: '2025-08-16', status: 'Pending' },
    { id: 3, studentId: 2, task: 'Worked on dashboard', date: '2025-08-17', status: 'Pending' }
  ]);

  const studentStore = useStudentStore();

  const fetchLogsByStudent = (studentId) => logs.value.filter(log => log.studentId === studentId);

  const approveLog = (id) => {
    const log = logs.value.find(l => l.id === id);
    if (log) {
      log.status = 'Approved';
      const student = studentStore.students.find(s => s.id === log.studentId);
      if (student) student.status = 'Approved';
    }
  };

  const rejectLog = (id) => {
    const log = logs.value.find(l => l.id === id);
    if (log) {
      log.status = 'Rejected';
      const student = studentStore.students.find(s => s.id === log.studentId);
      if (student) student.status = 'Rejected';
    }
  };

  const loadLogs = (data) => logs.value = data;

  return { logs, fetchLogsByStudent, approveLog, rejectLog, loadLogs };
});