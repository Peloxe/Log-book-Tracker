import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useStudentStore = defineStore('student', () => {
  // Default students with tasks (tasks are NOT persisted)
  const defaultStudents = [
    {
      id: 1,
      name: 'Alice Johnson',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Updated UI', details: 'Worked on dashboard UI components' },
        { title: 'Fixed Login', details: 'Corrected validation errors' },
      ]
    },
    {
      id: 2,
      name: 'Jane Doe',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Research Paper', details: 'Completed literature review' },
        { title: 'Prototype Development', details: 'Built initial prototype' },
      ]
    },
    {
      id: 3,
      name: 'Bob Smith',
      supervisorId: 1,
      submittedTasks: [
        { title: 'Created Forms', details: 'Designed student registration forms' },
        { title: 'Bug Fix', details: 'Resolved styling issues in login page' },
      ]
    },
    { id: 4, name: 'Charlie Brown', supervisorId: 2, submittedTasks: [] },
    { id: 5, name: 'Diana Prince', supervisorId: null, submittedTasks: [] },
    { id: 6, name: 'George Martin', supervisorId: null, submittedTasks: [] },
    { id: 7, name: 'Hannah Baker', supervisorId: null, submittedTasks: [] },
    { id: 8, name: 'Ian Curtis', supervisorId: 1, submittedTasks: [
      { title: 'Research Paper', details: 'Completed literature review' },
      { title: 'Prototype Development', details: 'Built initial prototype' },
    ]}
  ];

  // Load only supervisor assignments from localStorage
  const savedAssignments = JSON.parse(localStorage.getItem('students')) || [];

  const students = ref(
    defaultStudents.map(d => {
      const saved = savedAssignments.find(s => s.id === d.id);
      return {
        ...d,
        supervisorId: saved?.supervisorId ?? d.supervisorId
        // submittedTasks remain in memory → reset on dev server restart
      };
    })
  );

  // Watch students and persist only id + supervisorId
  watch(
    students,
    (newVal) => {
      const assignedData = newVal.map(s => ({
        id: s.id,
        supervisorId: s.supervisorId ?? null
      }));
      localStorage.setItem('students', JSON.stringify(assignedData));
    },
    { deep: true }
  );

  // Assign student to supervisor
  const assignToSupervisor = (studentId, supervisorId) => {
    const student = students.value.find(s => s.id === studentId);
    if (student) {
      student.supervisorId = supervisorId;
    }
  };

  // Update student fully
  const updateStudent = (student) => {
    const index = students.value.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students.value[index] = { ...students.value[index], ...student };
    }
  };

  return { students, assignToSupervisor, updateStudent };
});