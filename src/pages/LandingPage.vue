<script setup>
import { ref } from "vue";
import Button from "@/components/Button.vue";

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Back To Top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>



<template>
  <div class="font-sans text-gray-800">
    <!-- Navbar -->
    <header class="bg-white shadow fixed w-full z-50">
      <nav class="flex items-center justify-between p-4">
        <div class="text-2xl font-bold text-blue-600">SIWES Tracker</div>
        <ul class="hidden md:flex space-x-6">
          <li><a href="#home" class="hover:text-blue-600">Home</a></li>
          <li><a href="#about" class="hover:text-blue-600">About</a></li>
          <li><a href="#features" class="hover:text-blue-600">Features</a></li>
          <li><a href="#FAQ" class="hover:text-blue-600">FAQ</a></li>
          <li><a href="#testimonials" class="hover:text-blue-600">Testimonials</a></li>
          <li><a href="#contact" class="hover:text-blue-600">Contact</a></li>
          <li><a href="/login" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</a></li>

        </ul>
        <button class="md:hidden" @click="toggleMenu">
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
        </ul>
      </div>
    </header>

    <!-- Hero -->
    <section id="home" class="min-h-screen flex items-center justify-center bg-white">
      <div class="text-center md:text-left md:justify-center md:flex flex-wrap md:items-center ">
        <div class="flex flex-col items-center lg:items-start pt-18 px-4 lg:px-0 lg:py-0">
          <h1 class="text-3xl lg:w-185 md:text-6xl my-6 font-bold text-blue-600 mb-4">Welcome to SIWES Tracker</h1>
          <h2 class="text-xl tracking-wide font-semibold text-gray-800 mb-4 lg:w-190">Empowering Students & Supervisors
            with Digital Logbooks
          </h2>
          <p class="text-lg text-gray-600 mb-6  lg:w-180">Digitally manage and track your internship logbook with ease.
            A digital
            logbook for students, supervisors, and institutions.</p>
          <div class="flex gap-4">
            <a href="#about" class="border border-blue-600 px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-50">Learn
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
        <h2 class="text-blue-600 text-xl text-center md:text-5xl font-bold">About SIWES Tracker</h2>
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
          <a href="#contact" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Contact Us</a>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-16 bg-white">
      <div class="mb-8">
        <h2 class="text-blue-600 text-xl text-center md:text-5xl font-bold">Features</h2>
      </div>
      <div class="container mx-auto px-4 md:flex items-center">
        <div class="md:mr-10">
          <img src="@/assets/images/image3.svg" alt="Features" class="rounded-lg h-95 " />
        </div>
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
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="py-16 bg-white">
      <div class="mb-8">
        <h2 class="text-blue-600 text-xl text-center md:text-5xl font-bold">How It Works</h2>
      </div>
      <div class="container mx-auto px-4">
        <p class="text-gray-600 lg:text-lg">The SIWES Tracker streamlines the internship documentation process through a
          user-friendly interface and powerful features:</p>
        <ol class="list-decimal list-inside space-y-2 mt-4">
          <li class="text-gray-600">Create an account and set up your profile.</li>
          <li class="text-gray-600">Log your daily activities and tasks in the digital logbook.</li>
          <li class="text-gray-600">Receive real-time feedback from your supervisor.</li>
          <li class="text-gray-600">Track your progress and stay organized throughout your internship.</li>
        </ol>
      </div>
    </section>

    <!-- FAQ -->
    <section id="FAQ" class="py-16 bg-white scroll-mt-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg shadow">
            <h3 class="font-semibold">What is SIWES Tracker?</h3>
            <p class="text-gray-600">SIWES Tracker is a digital platform designed to streamline the documentation and
              monitoring of students' industrial training experiences.</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg shadow">
            <h3 class="font-semibold">How do I get started?</h3>
            <p class="text-gray-600">Getting started is easy! Simply sign up for an account, and you can begin
              documenting your internship experience right away.</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg shadow">
            <h3 class="font-semibold">Is my data secure?</h3>
            <p class="text-gray-600">Yes, we take data security seriously. All information is encrypted and stored
              securely to protect your privacy.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- Testimonials -->
    <section id="testimonials" class="py-16 bg-gray-50 scroll-mt-20">
      <div class="mb-8">
        <h2 class="text-blue-600 text-xl text-center md:text-5xl font-bold">Testimonials</h2>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p class="text-gray-600 mb-4">"SIWES Tracker has transformed my internship experience. The digital logbook
              is so easy to use!"</p>
            <p class="font-semibold">John Doe</p>
            <p class="text-gray-500">Intern at XYZ Company</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p class="text-gray-600 mb-4">"As a supervisor, I love the real-time feedback feature. It keeps everything
              organized."</p>
            <p class="font-semibold">Jane Smith</p>
            <p class="text-gray-500">Supervisor at ABC Corp</p>
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
    <section id="contact" class="py-16 bg-white scroll-mt-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-8">Contact Us</h2>
        <p class="text-gray-600 mb-4">Have questions or feedback? We'd love to hear from you!</p>
        <form class="max-w-lg mx-auto">
          <div class="mb-4">
            <input type="text" placeholder="Your Name" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <input type="email" placeholder="Your Email" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <textarea placeholder="Your Message" class="w-full p-2 border border-gray-300 rounded" rows="4"></textarea>
          </div>
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded">Send Message</button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 bg-gray-800 text-white text-center">
      <p>&copy; 2025 SIWES Tracker. All rights reserved.</p>
    </footer>

    <!-- Back to Top Button -->
    <button @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
      ↑
    </button>
  </div>
</template>