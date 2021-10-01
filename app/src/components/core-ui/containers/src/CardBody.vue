<script setup lang="ts">
const props = defineProps({
  spacing: {
    type: String,
    default: 'p-4',
  },
})
</script>

<template>
  <div :class="[props.spacing]">
    <slot />
  </div>
</template>
