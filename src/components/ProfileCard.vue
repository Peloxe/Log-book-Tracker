src/components/ProfileCard.vue
<template>
  <section class="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
    <!-- Loading skeleton -->
    <div v-if="loading" class="animate-pulse flex items-center gap-4">
      <div class="h-16 w-16 rounded-full bg-gray-200"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        <div class="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex items-start gap-3">
      <div class="shrink-0 rounded-full p-2 bg-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM9 5h2v6H9V5Zm0 8h2v2H9v-2Z"/>
        </svg>
      </div>
      <div>
        <p class="font-semibold text-red-700">Couldn’t load profile</p>
        <p class="text-sm text-red-600">{{ error }}</p>
        <button @click="retry" class="mt-2 text-sm underline">Retry</button>
      </div>
    </div>

    <!-- Data -->
    <div v-else class="flex items-center gap-4">
      <!-- Avatar -->
      <div class="relative">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          :alt="`${fullName} avatar`"
          class="h-16 w-16 rounded-full object-cover ring-2 ring-gray-100"
          @error="onImgError"
        />
        <div v-else class="h-16 w-16 rounded-full ring-2 ring-gray-100 bg-gray-100 flex items-center justify-center">
          <span class="font-semibold text-gray-600 select-none">{{ initials }}</span>
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1">
        <p class="text-lg font-semibold text-gray-900 leading-tight">{{ fullName || '—' }}</p>
        <div class="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 0 0-2 2v.4l10 5.6 10-5.6V6a2 2 0 0 0-2-2Zm0 4.3-8.7 4.86a1 1 0 0 1-.98 0L1.5 8.3V18a2 2 0 0 0 2 2h17a2 2 0 0 0 2-2V8.3Z"/>
            </svg>
            <span class="text-gray-600">Gmail:</span>
            <span class="text-gray-900 truncate">{{ email || '—' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7a2 2 0 0 0-2 2v14l7-3 7 3V5a2 2 0 0 0-2-2Z"/>
            </svg>
            <span class="text-gray-600">Matric No:</span>
            <span class="text-gray-900">{{ matricNo || '—' }}</span>
          </div>
        </div>
      </div>

      <!-- Optional action slot (e.g., Edit) -->
      <slot name="actions" />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/store/profileStore'

// Props: pass in the userId, optionally a token if you manage auth here
const props = defineProps({
  userId: { type: [String, Number], required: true },
  token:  { type: String, default: null },
  autoFetch: { type: Boolean, default: true }
})

const profileStore = useProfileStore()
const { profile, loading, error } = storeToRefs(profileStore)

const fullName = computed(() => profileStore.fullName)
const email    = computed(() => profileStore.email)
const matricNo = computed(() => profileStore.matricNo)
const avatarUrl = ref(profileStore.avatarUrl)

watch(() => profile?.value, () => {
  // keep local avatar reactive so we can fall back if the image fails
  avatarUrl.value = profileStore.avatarUrl
})

const initials = computed(() => {
  const n = fullName.value?.trim() || ''
  if (!n) return '👤'
  const parts = n.split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase()).join('') || '👤'
})

function onImgError() {
  avatarUrl.value = '' // fall back to initials bubble
}

function retry() {
  profileStore.fetchProfile(props.userId, props.token)
}

onMounted(() => {
  if (props.autoFetch) {
    profileStore.fetchProfile(props.userId, props.token)
  }
})
</script>
