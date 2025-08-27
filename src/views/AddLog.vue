<template>
  <div class="max-w-3xl mx-auto bg-white rounded shadow p-6">
    <h1 class="text-2xl font-semibold mb-4">
      {{ isEdit ? 'Edit Log Entry' : 'Add New Log Entry' }}
    </h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm">Date</label>
        <input type="date" v-model="form.date" class="w-full border rounded p-2" required />
      </div>

      <div>
        <label class="block text-sm">Activities done</label>
        <textarea v-model="form.activities" rows="4" class="w-full border rounded p-2" maxlength="1000"
          required></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-sm">Hours worked</label>
          <input type="number" v-model.number="form.hours" min="0" max="24" class="w-full border rounded p-2"
            required />
        </div>

      </div>

      <div class="flex justify-between items-center pt-4">
        <router-link to="/" class="text-sm text-slate-600">
          ← Back to dashboard
        </router-link>
        <div class="space-x-2">
          <button type="button" @click="saveDraft" class="px-4 py-2 bg-gray-300 text-slate-800 rounded">
            Save Draft
          </button>
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            {{ isEdit ? 'Update' : 'Submit' }}
          </button>
        </div>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLogbookStore } from "../stores/logbookStore";

const route = useRoute();
const router = useRouter();
const store = useLogbookStore();

const editId = route.query.editId ? Number(route.query.editId) : null;
const isEdit = computed(() => !!editId);

const form = ref({
  date: new Date().toISOString().slice(0, 10),
  activities: "",
  hours: 0,
  challenges: "",
});

onMounted(() => {
  if (isEdit.value) {
    const e = store.logs.find((x) => x.id === editId);
    if (!e) {
      alert("Entry not found");
      router.push("/");
      return;
    }
    if (e.status === "approved") {
      alert("Approved entries cannot be edited");
      router.push("/");
      return;
    }
    form.value = {
      date: e.date,
      activities: e.content,
      hours: e.hours_worked,
    };
  }
});

async function onSubmit() {
  if (!form.value.activities || form.value.hours === "" || form.value.hours === null) {
    alert("Please fill required fields");
    return;
  }

  const payload = {
    content: form.value.activities,
    date: form.value.date,
    hours_worked: form.value.hours,
  };

  try {
    if (isEdit.value) {
      const entry = store.logs.find((x) => x.id === editId);
      if (entry?.status === "approved") {
        alert("Approved entries cannot be updated.");
        return;
      }
      await store.updateLog(editId, payload);
    } else {
      await store.addLog(payload);
    }
    router.push("/");
  } catch (err) {
    alert("Something went wrong while saving the entry.");
    console.error(err);
  }
}
</script>
