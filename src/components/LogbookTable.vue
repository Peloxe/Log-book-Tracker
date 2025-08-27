<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLogbookStore } from "@/stores/logbookStore";

const store = useLogbookStore();
const router = useRouter();

async function del(id) {
  if (confirm("Delete this entry?")) {
    try {
      await store.deleteLog(id); // ✅ use store method instead of api.delete
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
}

function edit(entry) {
  router.push({ path: "/add-log", query: { editId: entry.id } });
}

function statusClass(s) {
  return s === "approved"
    ? "text-green-700 font-semibold"
    : s === "rejected"
      ? "text-red-700 font-semibold"
      : "text-yellow-700 font-semibold";
}

onMounted(() => {
  store.fetchLogs();
});
</script>


<template>
  <div>
    <table class="min-w-full border-1 border-gray-200 rounded-xl divide-y divide-gray-200 shadow-lg ">
      <thead class="bg-gray-50">
        <tr>
          <th class="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Date</th>
          <th class="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">Activity</th>
          <th class="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
          <th class="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="store.logs.length === 0">
          <td colspan="5" class="p-4 text-center text-slate-500">No entries yet.</td>
        </tr>
        <tr v-for="entry in store.logs" :key="entry.id" class="hover:bg-gray-50">
          <td class="py-4 px-4 text-sm md:text-base">{{ entry.date }}</td>
          <td class="py-4 px-4 hidden lg:block">{{ entry.content }}</td>
          <td class="py-4 px-4 text-center text-left ">{{ entry.hours_worked }}</td>
          <td class="py-4 px-4 text-center text-left text-sm md:text-base">
            <span :class="statusClass(entry.status)">{{ entry.status }}</span>
          </td>
          <td class="py-4 px-4  text-left space-x-2">
            <template v-if="entry.status !== 'approved'" class="">
              <button @click="edit(entry)" class="px-3 py-1 bg-yellow-500 text-white my-2 md:my-0 rounded">
                Edit
              </button>
              <button @click="del(entry.id)" class="px-3 py-1 bg-gradient-to-r from-red-400 to-red-600  text-white rounded">
                Delete
              </button>
            </template>
            <template v-else>
              <span class="text-gray-500 italic">Can't edit or delete</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
