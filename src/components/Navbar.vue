<script setup>
import { ref } from 'vue'
</script>

<template>
  <header class="bg-white shadow sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center ">
        <h1 class="text-2xl font-bold text-blue-600">SIWES Tracker</h1>
        <div class="hidden md:flex items-center space-x-6">
          <a href="#about" class="hover:text-blue-600">About</a>
          <a href="#features" class="hover:text-blue-600">Features</a>
          <a href="#howItWork" class="hover:text-blue-600">FAQ</a>
          <a href="#testimonials" class="hover:text-blue-600">Testimonials</a>
          <a href="#contact" class="hover:text-blue-600">Contact</a>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
        </div>
      </nav>
  </header>


  <!-- <nav class="bg-[#1e3a8a] border-b border-[#f4f5f7]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"> -->
          <!-- Logo -->
          <!-- <a class="flex flex-shrink-0 items-center mr-4" href="">
              <img class="h-10 w-auto" :src="logo" alt=" " />
          <span class="hidden md:block text-white text-2xl font-bold ml-2">SIWES Logbook Tracker</span>
          </a>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <a href="" class="text-white  hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">About Us</a>
              <a href="" class="text-white  hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">Contact</a>
              <a href="" class="text-white  hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">Features</a>
              <a href="" class="text-white  hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">How It Works</a>
              <a href="" class="text-white  hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">Signup</a>
              <a href="" class="text-white  hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav> -->
</template>









<!-- <script setup>
import { ref } from 'vue'

const menu = ref([
  { name: 'About Us', href: 'About Us' },
  { name: 'Contact', href: 'Contact' },
  { name: 'Features', href: 'Features' },
  { name: 'How It Works', href: 'How It Works' },
  { name: 'Signup', href: 'Signup' },
  { name: 'Login', href: 'Login' },
]);

const isMenuOpen = ref(false)
const scrollToSection = (href) => {
  isMenuOpen.value = false;
  const section = Document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>

<template>
  <nav :class="['fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#1e3a8a] md:relative md:bg-transparent md:flex md:justify-between md:flex-row', isMenuOpen ? 'block' : 'hidden'
  ]">
    <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
      <li v-for="item in Menu" :key="item.name">
        <a href="item.href" class="block text-white transition hover:text-#f4f5f7 ease-linear text-2xl md:text-lg"
          @click="scrollToSection(item.href)">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template> -->
