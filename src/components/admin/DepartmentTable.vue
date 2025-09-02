<template>
  <div class="bg-white shadow rounded-lg p-4">
    <h3 class="text-lg font-semibold mb-4">Departments</h3>

    <!-- If no department -->
    <div v-if="!departments?.length" class="text-center py-6 text-gray-500">
      <p class="mb-2">No department yet.</p>
    </div>

    <!-- If departments exist -->
    <table v-else class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">#</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(dept, i) in departments"
          :key="dept.id"
          class="hover:bg-gray-50 cursor-pointer"
          @click="$router.push({ name: 'DeptSupervisors', params: { deptId: dept.id } })"
        >
          <td class="px-6 py-3">{{ i + 1 }}</td>
          <td class="px-6 py-3 text-blue-600 underline">{{ dept.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({ departments: Array })
</script>
