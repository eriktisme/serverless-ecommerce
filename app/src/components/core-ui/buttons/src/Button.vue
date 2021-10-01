<template>
  <button
    :type="type"
    :disabled="busy"
    class="btn"
    :class="[style, { 'w-full': block, 'cursor-not-allowed': busy }]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    busy: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String,
      default: 'btn-indigo',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
})
</script>
