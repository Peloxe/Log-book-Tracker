<script setup>
import Navbar from '@/components/Navbar.vue';
</script>


<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-4xl font-bold mb-4">Welcome to SIWES Logbook Tracker</h1>
    <p class="text-lg mb-6">Digitally manage and track your internship logbook with ease.</p>
    <div class="space-x-4">
      <RouterLink to="/login" class="btn-primary">Login
      </RouterLink>
      <RouterLink to="/register" class="btn-primary bg-white border text-blue-600 hover:bg-blue-100">Register
      </RouterLink>
    </div>
  </div>
</template>