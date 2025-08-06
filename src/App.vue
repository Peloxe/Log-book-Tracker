<script setup>
import AOS from 'aos';
import FooterSection from '@/components/FooterSection.vue';
import { defineAsyncComponent } from 'vue';
import HeroSection from './components/HeroSection.vue';
import 'aos/dist/aos.css';


AOS.init({
  duration: 1000,
  once: true,
});
// import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const submitted = ref(false);
const form = ref({
  name: '',
  email: '',
  message: '',
});
function submitForm() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    alert('Please fill in all fields.');
    return;
  }

  // Simulate API call delay
  setTimeout(() => {
    console.log('Form submitted:', form.value);
    submitted.value = true;

    // Reset form
    form.value.name = '';
    form.value.email = '';
    form.value.message = '';
  }, 2000);
}  


const Navbar = defineAsyncComponent(()=>import('@/components/Navbar.vue'));
// const HeroSection = defineAsyncComponent(()=>import('@/components/HeroSection.vue'));
const Feature = defineAsyncComponent(()=>import('@/components/Features.vue'));
// const LandingPage = defineAsyncComponent(()=>import('@/pages/LandingPage.vue'));
const HowItWork = defineAsyncComponent(()=>import('@/components/HowItWork.vue'));
const Testimonial = defineAsyncComponent(()=>import('@/components/Testimonial.vue'));
const Contact = defineAsyncComponent(()=>import('@/components/Contact.vue'));
const BackToTop = defineAsyncComponent(()=>import('@/components/Back-ToTop.vue'));
const About = defineAsyncComponent(()=>import('@/components/About.vue'));
</script>

<template>
    <Navbar />
    <HeroSection />
    <About />
   <!-- <LandingPage /> -->
   <Feature />
   <HowItWork />
   <Testimonial />
   <Contact />
   <FooterSection /> 
    <BackToTop />
</template>