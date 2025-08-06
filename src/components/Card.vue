<!-- <script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  image: String,
});
</script>

<template>
  <div class="card">
    <img :src="image" alt="Feature Image" />
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</template> -->

<!-- src/components/Card.vue -->
<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  image: String,
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff;
}
</style>
