<script setup lang="ts">
// Define slots for title and search
import SidebarBurger from './SidebarBurger.vue'
</script>

<template>
  <div class="bg-gray-100 overflow-auto h-full">
    <header class="bg-white shadow">
      <SidebarBurger />
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>
