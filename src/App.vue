<template>
  <div class="min-h-screen">
    <header class="bg-primary text-white">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-white/10 p-2">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3z"/></svg>
          </div>
          <div>
            <div class="text-sm opacity-90">SIWES Logbook Tracker</div>
            <div class="font-display text-lg">Student Portal</div>
          </div>
        </div>

        <nav class="flex items-center gap-4">
          <router-link to="/" class="text-white/90 hover:text-white">Dashboard</router-link>
          <router-link to="/add-log" class="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white">Add Log</router-link>
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
