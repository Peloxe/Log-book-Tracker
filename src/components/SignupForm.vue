<script setup>
import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router'

const route = useRoute()

// This is your hidden role value
const role = ref(route.params.role)

// Example form data
const formData = ref({
  name: '',
  email: '',
  role: role.value // set from route
})

onMounted(() => {
  console.log("Form role is:", role.value)
})
</script>

<template>
  <div>
    <h1>Form for {{ role }}</h1>
    <form @submit.prevent="submitForm">
      <input v-model="formData.name" placeholder="Name" />
      <input v-model="formData.email" placeholder="Email" />
      <!-- Role is hidden but still submitted -->
      <input type="hidden" v-model="formData.role" />
      <button type="submit">Submit</button>
    </form>
  </div>
  <div v-if="role">
    <p>Role: {{ role }}</p>
  </div>  
</template>