

<template>
    <Navbar />
    <main class="max-w-6xl mx-auto p-6">
      <router-view />
    </main>
</template>

<script setup>
  import Navbar from './components/Navbar.vue';
</script>
