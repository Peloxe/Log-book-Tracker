<template>
  <div>
    <button
      @click="generatePDF"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Export Logbook to PDF
    </button>

    <!-- Hidden PDF content area -->
    <div ref="pdfContent" class="hidden">
      <div class="p-4 w-full text-sm">
        <h2 class="text-2xl font-bold mb-4 text-center">Logbook Entries</h2>
        <table class="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr class="bg-gray-200">
              <th class="border px-2 py-1">Date</th>
              <th class="border px-2 py-1">Activities</th>
              <th class="border px-2 py-1">Hours</th>
              <th class="border px-2 py-1">Challenges</th>
              <th class="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id">
              <td class="border px-2 py-1">{{ log.date }}</td>
              <td class="border px-2 py-1">{{ truncate(log.activities) }}</td>
              <td class="border px-2 py-1 text-center">{{ log.hours }}</td>
              <td class="border px-2 py-1">{{ truncate(log.challenges || '-') }}</td>
              <td class="border px-2 py-1 text-center">{{ log.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const props = defineProps({
  logs: {
    type: Array,
    required: true
  }
})

const pdfContent = ref(null)

function truncate(text, max = 50) {
  return text.length > max ? text.slice(0, max) + '...' : text
}

const generatePDF = async () => {
  const content = pdfContent.value

  // Temporarily show content for screenshot
  content.classList.remove('hidden')

  const canvas = await html2canvas(content, {
    scale: 2,
    useCORS: true,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('Logbook.pdf')

  // Re-hide content after generation
  content.classList.add('hidden')
}
</script>