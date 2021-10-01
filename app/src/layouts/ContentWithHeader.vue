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
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
