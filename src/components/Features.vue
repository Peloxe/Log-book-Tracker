<script setup>
import Card from '@/components/Card.vue';

</script>

<template>
    <section id="features" class="py-16 px-4 bg-gray-50" data-aos="fade-up">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row md:gap-8 text-center">
            <Card class="flex-1 mb-4 md:mb-0 md:mr-4 bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-50 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ">
                <img src="https://picsum.photos/100/100" class="mx-auto mb-4" alt="Feature 1" />
                <h4 class="font-bold text-lg mb-2">Daily Activity Logging</h4>
                <p class="text-gray-600">Students can easily record daily tasks from any device.</p>
            </Card>
            <Card class="flex-1 mb-4 md:mb-0 md:mr-4 bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-50 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img src="https://picsum.photos/100/100" class="mx-auto mb-4" alt="Feature 2" />
                <h4 class="font-bold text-lg mb-2">Supervisor Feedback</h4>
                <p class="text-gray-600">Supervisors can comment and approve logs efficiently.</p>
            </Card>
            <Card class="flex-1 mb-4 md:mb-0 md:mr-4 bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-50 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img src="https://picsum.photos/100/100" class="mx-auto mb-4" alt="Feature 3" />
                <h4 class="font-bold text-lg mb-2">Report Generation</h4>
                <p class="text-gray-600">Export detailed PDF reports automatically for submission.</p>
            </Card>
        </div>
    </section>
</template>

