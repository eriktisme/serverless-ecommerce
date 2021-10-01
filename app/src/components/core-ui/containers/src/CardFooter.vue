<script setup lang="ts">
defineProps({
  spacing: {
    type: String,
    default: 'px-4 py-3 sm:px-6',
  },
})
</script>

<template>
  <div class="bg-gray-50 text-right" :class="[spacing]">
    <slot />
  </div>
</template>
