<script setup lang="ts">
defineProps({
  spacing: {
    type: String,
    default: 'p-4',
  },
})
</script>

<template>
  <div :class="[spacing]">
    <slot />
  </div>
</template>
