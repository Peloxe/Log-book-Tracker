<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Button from "@/components/Button.vue";

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

//contact
const name = ref('')
const email = ref('')
const message = ref('')
const loading = ref(false)
const sent = ref(false)

function submit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    sent.value = true
  }, 800)
}

// Back To Top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


//frequently asked questions
const openIndex = ref(null);

const faqs = [
  {
    question: "What is your service about?",
    answer:
      "We provide an online platform to help users track and manage their tasks easily.",
  },
  {
    question: "How can I sign up?",
    answer:
      "You can sign up using your email address or social accounts via our registration page.",
  },
  {
    question: "What is SIWES Tracker?",
    answer: "SIWES Tracker is a digital platform designed to streamline the documentation and monitoring of students' industrial training experiences.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for an account, and you can begin documenting your internship experience right away.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security seriously. All information is encrypted and stored securely to protect your privacy.",
  },
];

const toggleFAQ = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};


</script>

<style>
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>



<template>
  <div class="font-sans text-gray-800">
    <!-- Navbar -->
    <header class="bg-[#1e3a8a] shadow fixed w-full z-50">
      <nav class="flex items-center justify-between p-4">
        <div class="text-2xl font-bold text-white">SIWES Tracker</div>
        <ul class="hidden md:flex space-x-6">
          <li>
            <a href="#home" class="text-white hover:text-blue-600">Home</a>
          </li>
          <li>
            <a href="#about" class="text-white hover:text-blue-600">About</a>
          </li>
          <li>
            <a href="#features" class="text-white hover:text-blue-600">Features</a>
          </li>
          <li>
            <a href="#FAQ" class="text-white hover:text-blue-600">FAQ</a>
          </li>
          <li>
            <a href="#testimonials" class="text-white hover:text-blue-600">Testimonials</a>
          </li>
          <li>
            <a href="#contact" class="text-white hover:text-blue-600">Contact</a>
          </li>
          <li>
            <RouterLink to="/login" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login
            </RouterLink>
          </li>
        </ul>
        <button class="text-white md:hidden" @click="toggleMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="bg-white border-t md:hidden">
        <ul class="flex flex-col p-4 space-y-2">
          <li><a href="#home" @click="toggleMenu">Home</a></li>
          <li><a href="#about" @click="toggleMenu">About</a></li>
          <li><a href="#features" @click="toggleMenu">Features</a></li>
          <li><a href="#FAQ" @click="toggleMenu">FAQ</a></li>
          <li><a href="#testimonials" @click="toggleMenu">Testimonials</a></li>
          <li><a href="#contact" @click="toggleMenu">Contact</a></li>
          <li>
            <RouterLink to="/login" @click="toggleMenu">Login</RouterLink>
          </li>
        </ul>
      </div>
    </header>

    <!-- Hero -->
    <section id="home" class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center md:text-left md:justify-center md:flex flex-wrap lg:flex-nowrap md:items-center ">
        <div class="flex flex-col items-center lg:items-start pt-18 px-4 lg:px-0 lg:py-0">
          <h1 class="text-3xl lg:w-185 md:text-6xl my-6 font-bold text-[#374151] mb-4">Welcome to SIWES Tracker</h1>
          <h2 class="text-xl tracking-wide font-semibold text-[#374151] mb-4 lg:w-190">Empowering Students & Supervisors
            with Digital Logbooks
          </h2>
          <p class="text-lg text-gray-600 mb-6  lg:w-160">Digitally manage and track your internship logbook with ease.
            A digital
            logbook for students, supervisors, and institutions.</p>
          <div class="flex gap-4">
            <a href="#about" class="border bg-blue-700 px-6 py-3 rounded-lg text-[#ffffff] hover:bg-[#1e3a8a]">Learn
              More</a>
            <Button />
          </div>
        </div>
        <div class=" mt-10 md:mt-0">
          <img src="@/assets/images/image3.svg" alt="Hero" class="rounded-lg h-110 lg:h-160 mx-auto" />
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="py-16 bg-gray-50 scroll-mt-20">
      <div class="mb-8">
        <h2 class="text-[#374151] text-xl text-center md:text-5xl font-bold">About SIWES Tracker</h2>
      </div>
      <div class="container mx-auto px-4 md:flex items-center">
        <img src="@/assets/images/image2.svg" alt="About" class="rounded-lg h-95 " />
        <div class=" md:ml-10  md:mt-8">
          <p class="text-gray-600 lg:text-lg ">The SIWES Logbook Tracker is a digital platform designed to simplify
            internship
            documentation for students, supervisors, and institutions.</p>
          <p class="my-4 text-gray-600 lg:text-lg">Our goal is to eliminate paper logbooks and offer a
            modern, efficient, and trackable solution for industrial training records,SIWES Tracker simplifies the
            Industrial Training experience for students and supervisors by offering tools for recording, reviewing, and
            submitting internship logs digitally.</p>
          <p class="mb-6 text-gray-600 lg:text-lg">SIWES Tracker is designed to simplify internship management for
            students and supervisors, making the
            process transparent and efficient.</p>
          <a href="#contact" class="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-[#1e3a8a]">Contact Us</a>
        </div>
      </div>
    </section>

    <!-- Features -->
    <!-- <section id="features" class="py-16 bg-gray-50">
      <div class="mb-8">
        <h2 class="text-[#374151] text-xl text-center md:text-5xl font-bold">Features</h2>
      </div>
      <div class="container mx-auto px-4 md:flex items-center">
        <div class="md:mt-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Key Features:</h3>
          <ul class="list-disc list-inside space-y-2">
            <li class="text-gray-600">Digital Logbook Management</li>
            <li class="text-gray-600">Real-time Collaboration</li>
            <li class="text-gray-600">Automated Progress Tracking</li>
            <li class="text-gray-600">Secure Document Storage</li>
            <li class="text-gray-600">User-friendly Interface</li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-600 mb-4">"Digital Logbook"</h3>
            <p class="text-gray-500">Easily record your daily activities and tasks during your internship.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-600 mb-4">"Supervisor Feedback"</h3>
            <p class="text-gray-500">Get real-time feedback and comments from your supervisor.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-600 mb-4">"Progress Tracking"</h3>
            <p class="text-gray-500">Visualize your performance and stay on track with your goals.</p>
          </div>
        </div>
      </div>
    </section> -->

    <section id="features" class="py-16 bg-gray-50 dark:bg-gray-950 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-[#374151] dark:text-white text-center">Features</h2>
        <p class="text-gray-600 dark:text-gray-400 text-center mt-2">Everything you need for SIWES tracking.</p>

        <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 class="font-semibold text-gray-900 dark:text-white">Weekly Log Entries</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Add, edit, and submit weekly activity logs with
              attachments.
            </p>
          </div>
          <div class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 class="font-semibold text-gray-900 dark:text-white">Supervisor Reviews</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Supervisors can review and score submissions with comments.
            </p>
          </div>
          <div class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 class="font-semibold text-gray-900 dark:text-white">Progress Dashboard</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Track completion and deadlines with a clean dashboard.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="py-16 bg-gray-50">
      <div class="mb-8">
        <h2 class="text-[#374151] text-xl text-center md:text-5xl font-bold">How It Works</h2>
      </div>
      <div class="container mx-auto px-4">
        <p class="text-gray-600 lg:text-lg">The SIWES Tracker streamlines the internship documentation process through a
          user-friendly interface and powerful features:</p>
      </div>
      <div class="px-8">
        <div class="container-xl lg:container m-auto">
          <div class="flex flex-col md:grid-cols-2 gap-4 p-4 rounded-lg">
            <card class="border-1 border-gray-300 rounded-lg p-3">
              <h2 class="text-2xl font-bold">Signup</h2>
              <p class="mt-2 mb-4">
                Create an account and set up your profile.
              </p>
            </card>
            <card class="border-1 border-gray-300 rounded-lg p-3">
              <h2 class="text-2xl font-bold">Log/ Review Works</h2>
              <p class="mt-2 mb-4">
                Log your daily activities and tasks in the digital logbook.
              </p>
            </card>
            <card class="border-1 border-gray-300 rounded-lg p-3">
              <h2 class="text-2xl font-bold">Feedback</h2>
              <p class="mt-2 mb-4">
                Receive real-time feedback from your supervisor.
              </p>
            </card>
            <card class="border-1 border-gray-300 rounded-lg p-3">
              <h2 class="text-2xl font-bold">Track/Approve</h2>
              <p class="mt-2 mb-4">
                Track your progress and stay organized throughout your internship.
              </p>
            </card>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="FAQ" class=" mx-auto bg-gray-50 px-4 px-12 py-16 scroll-mt-20">
      <h2 class="text-3xl text-[#374151] font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 rounded-lg">
        <button @click="toggleFAQ(index)"
          class="w-full flex justify-between items-center py-4 text-left focus:outline-none">
          <span class="text-lg font-medium">{{ faq.question }}</span>
          <svg :class="{ 'rotate-180': openIndex === index }"
            class="w-5 h-5 text-gray-500 transform transition-transform duration-300" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Slide transition -->
        <transition name="slide">
          <div v-if="openIndex === index" class="pb-4 text-gray-600">
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </section>



    <!-- Testimonials -->
    <section id="testimonials" class="py-16 bg-gray-50 scroll-mt-20">
      <div class="mb-8">
        <h2 class="text-[#374151] text-xl text-center md:text-5xl font-bold">Testimonials</h2>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p class="text-gray-600 mb-4">"SIWES Tracker has transformed my internship experience. The digital logbook
              is so easy to use!"</p>
            <p class="font-semibold">John Doe</p>
            <p class="text-gray-500">Intern at Pavilion Tech</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p class="text-gray-600 mb-4">"As a supervisor, I love the real-time feedback feature. It keeps everything
              organized."</p>
            <p class="font-semibold">Jane Smith</p>
            <p class="text-gray-500">Supervisor at Pavilion Tech</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p class="text-gray-600 mb-4">"A game-changer for our institution! The automated reports save us so much
              time."</p>
            <p class="font-semibold">Dr. Emily Johnson</p>
            <p class="text-gray-500">Admin at University of Tech</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-16 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-[#374151] dark:text-white text-center">Contact</h2>
        <p class="text-gray-600 dark:text-gray-400 text-center mt-2">Have questions? Reach out to us.</p>

        <form @submit.prevent="submit" class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <label for="name" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Name</label>
            <input id="name" v-model="name" type="text" required class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="sm:col-span-1">
            <label for="email" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input id="email" v-model="email" type="email" required class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Message</label>
            <textarea id="message" v-model="message" rows="4" required
              class="w-full px-3 py-2 border rounded-lg"></textarea>
          </div>
          <div class="sm:col-span-2 flex items-center gap-3">
            <button :disabled="loading" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <span v-if="loading">Sending...</span><span v-else>Send</span>
            </button>
            <p v-if="sent" class="text-green-600 text-sm">Sent! We’ll get back to you soon.</p>
          </div>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 bg-[#1e3a8a] text-white text-center">
      <p>&copy; 2025 SIWES Tracker. All rights reserved.</p>
    </footer>

    <!-- Back to Top Button -->
    <button @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
      ↑
    </button>
  </div>
</template>
