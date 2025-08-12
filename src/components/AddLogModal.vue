<template>
  <div v-if="open" class="fixed inset-0 z-40 flex items-center justify-center">
    <!-- backdrop -->
    <div class="absolute inset-0 bg-black/40" @click="close"></div>

    <div
      class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 z-50"
      role="dialog"
      aria-modal="true"
    >
      <header class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Add New Log Entry</h3>
        <button @click="close" class="text-slate-600 hover:text-slate-900">
          ✕
        </button>
      </header>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm text-slate-600 dark:text-slate-300">Date</label>
          <input type="date" v-model="form.date"
            class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 bg-white dark:bg-slate-800" required />
        </div>

        <div>
          <label class="block text-sm text-slate-600 dark:text-slate-300">Activities done</label>
          <textarea v-model="form.activities" rows="4" maxlength="1000"
            class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 bg-white dark:bg-slate-800"
            placeholder="Describe your work..." required></textarea>
          <p class="text-xs text-slate-400 mt-1">{{ form.activities.length }}/1000</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-sm text-slate-600 dark:text-slate-300">Hours worked</label>
            <input type="number" min="0" max="24" v-model.number="form.hours"
              class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 bg-white dark:bg-slate-800" required />
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm text-slate-600 dark:text-slate-300">Challenges faced (optional)</label>
            <input type="text" v-model="form.challenges"
              class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 bg-white dark:bg-slate-800" />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="saveDraft" class="px-4 py-2 rounded bg-slate-200 text-slate-800">Save draft</button>
          <button type="submit" class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useLogbookStore } from '@/store/logbookStore'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const store = useLogbookStore()
const open = ref(props.modelValue)

// sync v-model
watch(() => props.modelValue, v => open.value = v)
watch(open, (v) => emit('update:modelValue', v))

const today = new Date().toISOString().slice(0, 10)
const form = ref({
  date: today,
  activities: '',
  hours: '',
  challenges: ''
})

function close() {
  open.value = false
}

function saveDraft() {
  localStorage.setItem('siwes_draft', JSON.stringify(form.value))
  alert('Draft saved in localStorage')
}

onMounted(() => {
  // load draft if any
  const d = localStorage.getItem('siwes_draft')
  if (d) {
    try {
      const parsed = JSON.parse(d)
      form.value = { ...form.value, ...parsed }
    } catch {}
  }
})

function onSubmit() {
  // basic validation
  if (!form.value.activities || form.value.hours === '' || form.value.hours === null) {
    alert('Please fill required fields')
    return
  }
  store.addLog({ ...form.value })
  // optionally clear draft
  localStorage.removeItem('siwes_draft')
  // reset form
  form.value = { date: today, activities: '', hours: '', challenges: '' }
  open.value = false
}
</script>

<style scoped>
/* small tweaks for dark mode support if you have it */
</style>
