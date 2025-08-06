<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const submitted = ref(false);

const submitForm = () => {
  // Handle form submission logic here
  console.log('Form submitted:', form.value);
  submitted.value = true;
};



// import { reactive, ref } from 'vue'

// // Define form data using reactive
// const form = reactive({
//   name: '',
//   email: '',
//   message: ''
// })

// // Submission feedback
// const submitted = ref(false)

// // Submit handler
// function submitForm() {
//   // Example logic: you can replace this with an API call or something fancier
//   console.log('Form submitted:', form)
//   submitted.value = true

//   // Reset form if needed
//   form.name = ''
//   form.email = ''
//   form.message = ''
// }


</script>

<template>
    <section id="contact" class="bg-white py-16 px-4 text-center" data-aos="fade-up">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-3xl font-bold mb-4">Contact Us</h3>
        <p class="text-gray-600 mb-8">Have questions or feedback? Reach out to us.</p>
        <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
          <input v-model="form.name" type="text" placeholder="Your Name" class="border p-3 rounded" />
          <input v-model="form.email" type="email" placeholder="Your Email" class="border p-3 rounded" />
          <textarea v-model="form.message" placeholder="Your Message" rows="4" class="border p-3 rounded"></textarea>
          <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Send Message</button>
        </form>
        <p v-if="submitted" class="text-green-600 mt-4">Thank you! We'll be in touch soon.</p>
      </div>
    </section>
</template>




<!-- <script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)
const loading = ref(false)

function submitForm() {
  if (!form.name || !form.email || !form.message) {
    alert('Please fill in all fields.')
    return
  }

  loading.value = true

  // Simulate API call delay
  setTimeout(() => {
    console.log('Form submitted:', form)
    submitted.value = true
    loading.value = false

    form.name = ''
    form.email = ''
    form.message = ''
  }, 2000)
}
</script> -->

<!-- Make sure you place this spinner just beneath the submit button for visibility. -->
<!-- <div v-if="loading" class="flex justify-center items-center mt-4">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
</div> -->


<!-- Optional: Improve UX Further -->
<!-- Disable the button while loading: -->



<!-- <button :disabled="loading" type="submit" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50">
  {{ loading ? 'Sending...' : 'Send Message' }}
</button> -->
