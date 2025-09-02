<!-- <script setup>
import { RouterView } from 'vue-router';
</script> -->




<template>
  <!-- <RouterView /> -->
    <Navbar />
    <main class="">
      <router-view />
    </main>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
</script>
