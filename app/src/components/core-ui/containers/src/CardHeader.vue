<script setup lang="ts">
defineProps({
  rounded: {
    type: String,
    default: 'rounded-t-sm',
  },
})
</script>

<template>
  <div
    class="flex items-center bg-gray-100 border border-gray-200 p-4"
    :class="[rounded]"
  >
    <div class="flex-1 font-semibold text-lg">
      <slot />
    </div>
    <slot name="action"></slot>
  </div>
</template>
