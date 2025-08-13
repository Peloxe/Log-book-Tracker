<template>
  <nav
    ref="menuRef"
    class="flex px-4 py-2 justify-between border-b border-gray items-center sticky top-0 z-4 bg-white"
  >
    <h1 class="font-bold flex flex-col items-center text-2xl text-blue-600 mt-1.5">
      SIWES Tracker
    </h1>

    <div
      :class="[
        'nav-links flex  px-2.5 py-2 rounded-3xl text-gray-600 items-center gap-8',
        isMenuVisible ? 'show' : ''
      ]"
    >
      <!-- <a href="#" @click="closeMenu" class="text-medium bg-white px-4 py-1 rounded-3xl font-bold text-black">Home</a>
      <a href="#about" @click="closeMenu">About Us</a>
      <a href="#products" @click="closeMenu">Listings</a>
      <a href="#testimonial" @click="closeMenu">Testimonial</a> -->
      <a
        href="#contact"
        @click="closeMenu"
        class="font-semibold px-4 py-2 rounded-xl text-black bg-blue-600 text-white lg:hidden"
      >
        Profile
      </a>
      <a
        href="#contact"
        @click="closeMenu"
        class="font-semibold px-4 py-2 rounded-xl text-black bg-red-600 text-white lg:hidden"
      >
        Logout
      </a>
    </div>
  <div class="flex gap-2">

    <a
    href="#contact"
    class="font-semibold px-4 py-2 rounded-lg text-black bg-blue-600 text-white hidden lg:block"
    >
    Profile
  </a>
    <a
    href="#contact"
    class="font-semibold px-4 py-2 rounded-lg bg-red-600 text-white hidden lg:block"
    >
    Logout
    </a>
    
  </div>

    <!-- Checkbox Component -->
    <Checkbox :setIsMenuVisible="setIsMenuVisible" :checkboxRef="checkboxRef" />
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Checkbox from "./Checkbox.vue";

const isMenuVisible = ref(false);
const menuRef = ref(null);
const checkboxRef = ref(null);

function closeMenu() {
  isMenuVisible.value = false;

  // Ensure the checkbox is clicked only if menu is open
  if (checkboxRef.value && checkboxRef.value.checked) {
    checkboxRef.value.click();
  }
}

function setIsMenuVisible(value) {
  isMenuVisible.value = value;
}

function handleClickOutside(event) {
  if (
    isMenuVisible.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target)
  ) {
    closeMenu();
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
