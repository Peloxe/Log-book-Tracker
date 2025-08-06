<script setup>
import Card from '@/components/Card.vue';
</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="flex flex-col md:grid-cols-2 gap-4 p-4 rounded-lg">
                <card class="bg-green-100">
                    <h2 class="text-2xl font-bold">Signup</h2>
                    <p class="mt-2 mb-4">
                        students/supervisor/Admin
                    </p>
                </card>
                <card class="bg-green-100">
                    <h2 class="text-2xl font-bold">Log/ Review Works</h2>
                    <p class="mt-2 mb-4">
                        List your job to find the perfect developer for the role
                    </p>
                </card>
                <card class="bg-green-100">
                    <h2 class="text-2xl font-bold">Track/Approve</h2>
                    <p class="mt-2 mb-4">
                        Real-time feedback and approvals
                    </p>
                </card>
            </div>
        </div>
    </section>
</template>