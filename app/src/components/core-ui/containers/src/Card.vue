<script setup lang="ts">
defineProps({
  rounded: {
    type: String,
    default: 'rounded-sm',
  },
})
</script>

<template>
  <div class="bg-white border border-gray-200" :class="[rounded]">
    <slot />
  </div>
</template>
