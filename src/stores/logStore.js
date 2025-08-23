import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useLogStore = defineStore('log', () => {
  const logs = reactive(JSON.parse(localStorage.getItem('logs') || '[]'));

  function initLogs(students) {
    students.forEach(student => {
      if (!student.submittedTasks) return; // skip if missing

      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

        // Check if log exists
        const exists = logs.find(l => l.studentId === student.id && l.date === dateStr);
        if (exists) continue;

        const taskObj = student.submittedTasks[i] || { 
          title: `Task ${i + 1}`, 
          details: `Details for task ${i + 1}` 

          };

        logs.push({
          id: `${student.id}-${i + 1}`,
          studentId: student.id,
          date: dateStr,
          task: taskObj.title,
          description: taskObj.details,
          status: 'Pending'
        });
      }
    });
    persistLogs();
  }

  function getLogsByStudent(studentId) {
    return logs.filter(l => l.studentId === studentId);
  }

  function updateStatus(logId, status) {
    const log = logs.find(l => l.id === logId);
    if (log) {
      log.status = status;
      persistLogs();
    }
  }

  function persistLogs() {
    localStorage.setItem('logs', JSON.stringify(logs));
  }

  return { logs, initLogs, getLogsByStudent, updateStatus };
});