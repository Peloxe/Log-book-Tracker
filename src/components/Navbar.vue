<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router"; // ✅ import useRouter
import Checkbox from "./Checkbox.vue";
import { useAuthStore } from "@/stores/auth";

const isMenuVisible = ref(false);
const menuRef = ref(null);
const checkboxRef = ref(null);

const auth = useAuthStore();
const route = useRoute();
const router = useRouter(); // ✅ initialize router

const hiddenRoutes = ['/', '/signup/student', '/signup/admin', '/signup/supervisor', '/login', '/student-setup', '/supervisor-setup', '/admin-setup', '/verify'];
const showNavbar = computed(() => !hiddenRoutes.includes(route.path));

function closeMenu() {
  isMenuVisible.value = false;
  if (checkboxRef.value && checkboxRef.value.checked) {
    checkboxRef.value.click();
  }
}

// ✅ Corrected logout
function handleLogout() {
  closeMenu();         // close menu
  auth.logout();       // clear tokens and user
  router.push('/login'); // ✅ use router, not route
}

function setIsMenuVisible(value) {
  isMenuVisible.value = value;
}

function handleClickOutside(event) {
  if (isMenuVisible.value && menuRef.value && !menuRef.value.contains(event.target)) {
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

<template>
  <!-- only render navbar if showNavbar is true -->
  <nav
    v-if="showNavbar"
    ref="menuRef"
    class="flex px-4 py-2 justify-between border-b border-gray items-center sticky top-0 z-4 bg-blue-500"
  >
    <RouterLink to="/" class="font-bold flex flex-col items-center text-2xl text-white mt-1.5">
      SIWES Tracker
    </RouterLink>

    <div
      :class="[
        'nav-links flex  px-2.5 py-2 rounded-l-xl text-gray-600 items-center gap-8',
        isMenuVisible ? 'show' : ''
      ]"
    >
      <a
        href="#"
        @click="closeMenu"
        class="font-semibold px-4 py-2  text-black text-white lg:hidden"
      >
        Profile
      </a>
      <a
        href="#"
        @click.prevent="handleLogout"
        class="font-semibold px-4 py-2 rounded-xl text-black bg-gradient-to-r from-red-400 to-red-600  text-white lg:hidden"
      >
        Logout
      </a>
    </div>

    <div class="flex gap-2">
      <RouterLink
        to="/ProfileCard"
        class="font-semibold px-4 py-2 text-black text-white hidden lg:block"
      >
        Profile
      </RouterLink>
      <a
        href="#"
        @click.prevent="handleLogout"
        class="font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600  text-white hidden lg:block"
      >
        Logout
      </a>
    </div>

    <!-- Checkbox Component -->
    <Checkbox :setIsMenuVisible="setIsMenuVisible" :checkboxRef="checkboxRef" />
  </nav>
</template>
