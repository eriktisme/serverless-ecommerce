<script setup lang="ts">
import { UserCircleIcon, HomeIcon } from '@heroicons/vue/outline'

defineProps({
  isOpen: Boolean,
})
</script>

<style scoped>
.sidebar {
  @apply flex flex-none absolute lg:relative -translate-x-full lg:translate-x-0 h-full z-20 transform transition-transform
}

.sidebar.is-open {
  @apply translate-x-0
}
</style>

<template>
  <div
    class="sidebar"
    :class="[{ 'is-open': isOpen }]"
  >
    <div
      class="flex flex-col flex-none bg-wild-sand-500 text-black z-10"
      style="width: 300px"
    >
      <div class="flex flex-1 flex-col items-baseline pt-8 px-4">
        <button
          type="button"
          class="
            flex flex-row
            items-center
            w-full
            p-2
            mb-2
            last:mb-0
            rounded
            hover:bg-black hover:bg-opacity-10
            text-opacity-80
            hover:text-opacity-100
          "
        >
          <home-icon class="h-5 w-5 mr-3" />
          Dashboard
        </button>
      </div>
      <div
        class="
          flex flex-none flex-col
          items-baseline
          p-4
          bg-wild-sand-500
          border-t border-wild-sand-600
        "
      >
        <div class="flex flex-row items-center w-full p-2">
          <user-circle-icon class="h-9 w-9 mr-3" />
          <div class="flex flex-col text-sm">
            <b>John Doe</b>
            <button type="button">Account Settings</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
