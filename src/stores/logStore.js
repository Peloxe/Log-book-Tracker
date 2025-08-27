import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLogStore = defineStore('log', () => {
  const logs = ref([]);

  // Initialize logs for all students
  const initLogs = (students) => {
    logs.value = []; // clear previous logs on dev server restart

    students.forEach(student => {
      if (!student.submittedTasks) return;

      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

        const taskObj = student.submittedTasks[i] || { 
          title: `Task ${i + 1}`, 
          details: `Details for task ${i + 1}` 
        };

        logs.value.push({
          id: `${student.id}-${i + 1}`,
          studentId: student.id,
          date: dateStr,
          task: taskObj.title,
          description: taskObj.details,
          status: 'Pending' // reset to Pending every dev server restart
        });
      }
    });
  };

  // Get logs for a specific student
  const getLogsByStudent = (studentId) => logs.value.filter(l => l.studentId === studentId);

  // Update status for a specific log
  const updateStatus = (logId, status) => {
    const log = logs.value.find(l => l.id === logId);
    if (log) log.status = status;
  };

  return { logs, initLogs, getLogsByStudent, updateStatus };
});