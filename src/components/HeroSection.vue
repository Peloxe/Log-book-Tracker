<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Welcome to SIWES Logbook Tracker'
    },
    subtitle: {
        type: String,
        default: 'Empowering Students & Supervisors with Digital Logbooks'
    },
    description: {
        type: String,
        default: 'Digitally manage and track your internship logbook with ease.'
    },
});
</script>


<template>
  <section class="relative overflow-hidden bg-white dark:bg-gray-900">
    <!-- Background Image Fading with Overlay -->
    <div class="absolute inset-0">
      <img
        src="@/assets/images/image1.png"
        alt="Hero Background"
        class="w-full h-full object-cover opacity-20 md:opacity-30"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
    </div>
  </section>
  <section class="bg-blue-50 py-20 text-center px-4 overflow-hidden" data-aos="fade-up">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <h2 class="text-4xl font-bold mb-4">{{ subtitle }}</h2>
      <p class="text-lg text-gray-600 mb-6">{{ description }}</p>
      <div class="space-x-4">
        <button class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Get Started</button>
        <button class="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100">Learn More</button>
      </div>
    </div>
  </section>
</template>



<!-- <section class="bg-blue-50 py-20 text-center px-4 overflow-hidden" data-aos="fade-up">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">Welcome to SIWES Logbook Tracker</h1>
        <h2 class="text-4xl font-bold mb-4">Empowering Students & Supervisors with Digital Logbooks</h2>
        <p class="text-lg text-gray-600 mb-6">Digitally manage and track your internship logbook with ease.</p>
        <p class="text-lg text-gray-600 mb-6">Easily manage your SIWES activities, approvals, and reporting with our streamlined platform.</p>
        <div class="space-x-4">
          <button class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Get Started</button>
          <button class="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100">Learn More</button>
        </div>
      </div>
    </section> -->