<script setup lang="ts">
import { MenuIcon } from '@heroicons/vue/outline'
import { useSidebarStore } from '../stores/sidebar'

const { state, commit } = useSidebarStore()

const toggleSidebar = () => commit('toggle', !state.open)
</script>

<template>
  <button @click="toggleSidebar" type="button" class="h-5 w-5 lg:hidden">
    <menu-icon />
  </button>
</template>
