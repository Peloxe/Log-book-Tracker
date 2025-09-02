<template>
  <div class="max-w-md mx-auto bg-white shadow rounded p-6">
    <h2 class="text-xl font-semibold mb-4">Add Log Entry</h2>

    <form @submit.prevent="submitLog" class="space-y-4">
      <!-- Content -->
      <div>
        <label class="block text-gray-700">Content</label>
        <textarea
          v-model="form.content"
          class="w-full border rounded px-3 py-2 mt-1"
          placeholder="What did you work on?"
          required
        ></textarea>
      </div>

      <!-- Date -->
      <div>
        <label class="block text-gray-700">Date</label>
        <input
          type="date"
          v-model="form.date"
          class="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </div>

      <!-- Hours Worked -->
      <div>
        <label class="block text-gray-700">Hours Worked</label>
        <input
          type="number"
          v-model.number="form.hours_worked"
          class="w-full border rounded px-3 py-2 mt-1"
          placeholder="Enter hours worked"
          min="1"
          required
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from '@/utils/axios'

const form = ref({
  content: "",
  date: "",
  hours_worked: null,
});

const submitLog = async () => {
  try {
    const response = await api.post("/logs/", {
      content: form.value.content,
      date: form.value.date,
      hours_worked: form.value.hours_worked,
    });

    console.log("Log submitted successfully:", response.data);

    // Reset form
    form.value = { content: "", date: "", hours_worked: null };

  } catch (error) {
    console.error("Error submitting log:", error);
  }
};
</script>
