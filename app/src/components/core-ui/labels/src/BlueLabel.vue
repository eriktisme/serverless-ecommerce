<script setup lang="ts">
const props = defineProps({
  spacing: {
    type: String,
    default: 'px-2',
  },
  textSize: {
    type: String,
    default: 'text-xs',
  },
})
</script>

<template>
  <span
    class="
      inline-flex
      leading-5
      font-semibold
      rounded-full
      bg-blue-100
      text-blue-800
    "
    :class="[spacing, textSize]"
  >
    <slot />
  </span>
</template>
