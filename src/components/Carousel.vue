<template>
  <Swiper
    :loop="true"
    :navigation="false"
    :pagination="true"
    :autoplay="{ delay: 3000 }"
    :slides-per-view="1"
  >
    <SwiperSlide>
      <div class="bg-blue-500 text-white p-10 text-center rounded-md">Slide 1</div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="bg-green-500 text-white p-10 text-center rounded-md">Slide 2</div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="bg-red-500 text-white p-10 text-center rounded-md">Slide 3</div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'

// Core styles (required)
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
</script>

<style scoped>
/* Optional: customize pagination dots */
.swiper-pagination-bullet-active {
  background-color: white;
}
</style>