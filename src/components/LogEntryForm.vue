<template>
  <form @submit.prevent="submitForm" class="bg-white p-6 rounded-lg shadow max-w-lg mx-auto space-y-4">
    <h2 class="text-xl font-bold">New Log Entry</h2>

    <div>
      <label>Date*</label>
      <input type="date" v-model="form.date" :max="today" class="input" required />
    </div>

    <div>
      <label>Activities Done* (max 500 chars)</label>
      <textarea v-model="form.summary" class="input h-24" maxlength="500" required></textarea>
      <p v-if="form.summary.length > 450" class="text-sm text-red-500">Approaching limit</p>
    </div>

    <div>
      <label>Hours Worked*</label>
      <input type="number" v-model="form.hours" min="0" max="24" class="input" required />
    </div>

    <div>
      <label>Challenges (optional)</label>
      <textarea v-model="form.challenges" class="input h-20"></textarea>
    </div>

    <div class="flex justify-end gap-4 mt-4">
      <button type="button" @click="saveDraft" class="btn-gray">Save Draft</button>
      <button type="submit" class="btn-blue">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['submitted']);
const today = new Date().toISOString().slice(0,10);
const form = ref({ date: today, summary: '', hours: '', challenges: '', status: 'Pending' });

function submitForm() {
  if (!form.value.summary || form.value.hours === '') return;
  emit('submitted', { ...form.value });
  form.value = { date: today, summary: '', hours: '', challenges: '', status: 'Pending' };
}

function saveDraft() {
  localStorage.setItem('draftLog', JSON.stringify(form.value));
  alert('Draft saved!');
}
</script>

<!-- <style scoped>
.input { @apply w-full border border-gray-300 rounded px-3 py-2; }
.btn-blue { @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded; }
.btn-gray { @apply bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded; }
</style> -->