import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useStudentStore = defineStore('student', () => {
  const defaultStudents = [
    { id: 1, name: 'Alice Johnson', supervisorId: 1 },
    { id: 2, name: 'Jane Doe', supervisorId: 1 },
    { id: 3, name: 'Bob Smith', supervisorId: 1 },
    { id: 4, name: 'Charlie Brown', supervisorId: 2 },
    { id: 5, name: 'Diana Prince', supervisorId: null },
    { id: 6, name: 'George Martin', supervisorId: null },
    { id: 7, name: 'Hannah Baker', supervisorId: null },
    { id: 8, name: 'Ian Curtis', supervisorId: 1 },
    { id: 9, name: 'Jack Daniels', supervisorId: null }
  ];

  // Load saved supervisor assignments from localStorage
  const savedAssignments = JSON.parse(localStorage.getItem('students')) || [];

  const students = ref(
    defaultStudents.map(d => {
      const saved = savedAssignments.find(s => s.id === d.id);
      return { ...d, supervisorId: saved?.supervisorId ?? d.supervisorId };
    })
  );

  // Watch for assignments and persist
  watch(students, (newVal) => {
    const dataToSave = newVal.map(s => ({
      id: s.id,
      supervisorId: s.supervisorId ?? null
    }));
    localStorage.setItem('students', JSON.stringify(dataToSave));
  }, { deep: true });

  const assignToSupervisor = (studentId, supervisorId) => {
    const student = students.value.find(s => s.id === studentId);
    if (student) student.supervisorId = supervisorId;
  };

  const updateStudent = (student) => {
    const index = students.value.findIndex(s => s.id === student.id);
    if (index !== -1) students.value[index] = { ...students.value[index], ...student };
  };

  return { students, assignToSupervisor, updateStudent };
});