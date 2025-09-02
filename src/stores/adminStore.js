// src/stores/adminStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/axios'

export const useAdminStore = defineStore('admin', () => {
  const departments = ref([])
  const supervisors = ref([])
  const students = ref([])

  const fetchDepartments = async (schoolId) => {
    const { data } = await api.get(`/api/v1/school/${schoolId}/departments`)
    departments.value = data
  }

  const fetchSupervisors = async () => {
    const { data } = await api.get('/api/v1/users/list-supervisors/')
    supervisors.value = data
  }

  const fetchStudents = async () => {
    const { data } = await api.get('/api/v1/users/list-students/')
    students.value = data
  }

  const createDepartment = async (name, schoolId) => {
    await api.post('/api/v1/school/register-department/', { name, id: schoolId })
    await fetchDepartments(schoolId)
  }

  return { departments, supervisors, students, fetchDepartments, fetchSupervisors, fetchStudents, createDepartment }
})
