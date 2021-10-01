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
      bg-green-100
      text-green-800
    "
    :class="[spacing, textSize]"
  >
    <slot />
  </span>
</template>
