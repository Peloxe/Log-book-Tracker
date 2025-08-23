<template>
  <nav class="bg-blue-500 shadow-md w-full fixed top-0 left-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
      <div class="text-white text-2xl font-bold">SUPERVISOR'S DASHBOARD</div>
      <div class="space-x-6">
        <router-link to="/" class="text-white hover:text-blue-200 font-medium transition">Home</router-link>
        <router-link to="/assign" class="text-white hover:text-blue-200 font-medium transition">Assign</router-link>
        <router-link to="/profile" class="text-white hover:text-blue-200 font-medium transition">Profile</router-link>
      </div>
    </div>
  </nav>
  <div class="h-16"></div> <!-- Spacer for fixed navbar -->
</template>