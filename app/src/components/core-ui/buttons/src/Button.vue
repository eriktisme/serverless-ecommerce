<template>
  <button
    :type="type"
    :disabled="busy"
    class="
      group
      relative
      flex
      justify-center
      px-3
      py-2
      border border-transparent
      sm:text-sm
      rounded-md
      focus:outline-none focus:ring-2 focus:ring-offset-2
    "
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
      default:
        'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
})
</script>
