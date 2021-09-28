<script setup lang="ts">
// Define slots for title and search
import SidebarBurger from './SidebarBurger.vue'
</script>

<template>
  <main class="overflow-auto h-full">
    <div class="flex flex-none items-center w-full">
      <SidebarBurger />
    </div>

    <div class="w-full">
      <slot />
    </div>
  </main>
</template>
