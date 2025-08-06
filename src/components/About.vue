<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  image: String,

  title: {
    type: String,
    default: 'About SIWES Logbook Tracker',
  },
  content: {
    type: String,
    default: ' The SIWES Logbook Tracker is a digital platform designed to simplify internship documentation for students, supervisors, and institutions.Our goal is to eliminate paper logbooks and offer a modern, efficient, and trackable solution for industrial training records SIWES Tracker simplifies the Industrial Training experience for students and supervisors by offering tools for recording, reviewing, and submitting internship logs digitally.',
  },
});
import AOS from 'aos';
import 'aos/dist/aos.css';
import { defineAsyncComponent } from 'vue';
const Card = defineAsyncComponent(() => import('@/components/Card.vue'));
</script>

<template>
    <section id="about" class="py-16 px-4 bg-white text-center" data-aos="fade-up">
      <div class="max-w-4xl mx-auto">
        <h3 class="text-3xl font-semibold mb-4">{{ title }}</h3>
        <p class="text-gray-600">{{ content }}</p>
      </div>
    </section>
</template>

<!-- About SIWES Tracker

SIWES Tracker simplifies the Industrial Training experience for students and supervisors by offering tools for recording, reviewing, and submitting internship logs digitally.

<section id="about" class="py-16 px-4 bg-white text-center" data-aos="fade-up">
      <div class="max-w-4xl mx-auto">
        <h3 class="text-3xl font-semibold mb-4">{{ title }}</h3>
        <p class="text-gray-600">{{ content }}</p>
      </div>
    </section> -->


   
  <!-- <section class="bg-white dark:bg-gray-900 py-20" data-aos="fade-up">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">About the SIWES Tracker</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        The SIWES Logbook Tracker is a digital platform designed to simplify internship documentation for students,
        supervisors, and institutions. Our goal is to eliminate paper logbooks and offer a modern, efficient, and
        trackable solution for industrial training records.
      </p>
    </div>
  </section> -->



<!-- The SIWES Logbook Tracker is a digital platform designed to simplify internship documentation for students,
supervisors, and institutions. Our goal is to eliminate paper logbooks and offer a modern, efficient, and
trackable solution for industrial training records.
SIWES Tracker simplifies the Industrial Training experience for students and supervisors by offering tools for
recording, reviewing, and submitting internship logs digitally. -->