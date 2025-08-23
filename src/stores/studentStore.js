import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStudentStore = defineStore('student', () => {
  const students = ref([
    { id: 1, name: 'John Doe', status: 'Pending', supervisorId: 1 },
    { id: 2, name: 'Jane Smith', status: 'Pending', supervisorId: 2 },
    { id: 3, name: 'Alice Johnson', status: 'Pending', supervisorId: 1 },
    { id: 4, name: 'Bob Lee', status: 'Pending', supervisorId: 1 },
    { id: 5, name: 'Charlie Brown', status: 'Pending', supervisorId: 1 },
    { id: 6, name: 'Diana Ross', status: 'Pending', supervisorId: 1 },
    { id: 7, name: 'Evan White', status: 'Pending', supervisorId: null },
    { id: 8, name: 'Fiona Green', status: 'Pending', supervisorId: 1 },
    { id: 9, name: 'George Black', status: 'Pending', supervisorId: null },
    { id: 10, name: 'Hannah Blue', status: 'Pending', supervisorId: 1 },
    { id: 11, name: 'Ian Grey', status: 'Pending', supervisorId: null },
    { id: 12, name: 'Jill Yellow', status: 'Pending', supervisorId: null },
    { id: 13, name: 'Kevin Orange', status: 'Pending', supervisorId: 1 },
    { id: 14, name: 'Lily Purple', status: 'Pending', supervisorId: null },
    { id: 15, name: 'Mike Pink', status: 'Pending', supervisorId: null },
    { id: 16, name: 'Nina Red', status: 'Pending', supervisorId: 1 },
    { id: 17, name: 'Oscar Cyan', status: 'Pending', supervisorId: 1 },
    { id: 18, name: 'Paula Magenta', status: 'Pending', supervisorId: null },
    { id: 19, name: 'Quinn Lime', status: 'Pending', supervisorId: null },
    { id: 20, name: 'Rita Teal', status: 'Pending', supervisorId: null }
  ]);

  // Fetch all students
  const fetchAllStudents = () => students.value;

  // Update student status (Approved / Rejected)
  const updateStatus = (id, status) => {
    const student = students.value.find(s => s.id === id);
    if (student) student.status = status;
  };

  // Assign student to supervisor
  const assignStudent = (studentId, supervisorId) => {
    const student = students.value.find(s => s.id === studentId);
    if (student) student.supervisorId = supervisorId;
  };

  // Load students (for backend later)
  const loadStudents = (data) => {
    students.value = data.map(student => ({
      ...student,
      status: student.status || 'Pending',
    }));
  };

  return {
    students,
    fetchAllStudents,
    updateStatus,
    assignStudent,
    loadStudents
  };
});