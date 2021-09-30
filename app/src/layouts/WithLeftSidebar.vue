<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import Sidebar from './Sidebar.vue'

const route = useRoute()

watch(
  () => route,
  () => commit('toggle', false)
)

const { state, commit } = useSidebarStore()

const closeOverlay = () => commit('toggle', !open)
</script>

<style scoped>
.sidebar-is-open {
  transform: translateX(300px);
}

@screen lg {
  .sidebar-is-open {
    transform: translateX(0);
  }
}
</style>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden bg-white">
    <div class="flex relative h-full">
      <Sidebar :is-open="state.open" />

      <!-- Main Content -->
      <div
        class="
          flex flex-col flex-auto
          relative
          overflow-hidden
          h-full
          max-w-full
          transform
          transition-transform
        "
        :class="[{ 'sidebar-is-open': state.open }]"
      >
        <slot />
      </div>

      <!-- Overlay -->
      <div
        @click.self="closeOverlay"
        class="
          absolute
          top-0
          left-0
          z-10
          w-full
          h-full
          cursor-pointer
          bg-wild-sand-400
          transform
          transition-all
        "
        :class="[
          {
            'visible opacity-80 lg:invisible lg:opacity-0': state.open,
            'invisible opacity-0': !state.open,
          },
        ]"
      ></div>
    </div>
  </div>
</template>
