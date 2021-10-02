<template>
  <label class="block w-full mb-4 cursor-pointer">
    <span v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </span>
    <span class="relative">
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :tabindex="tabindex"
        :ref="ref"
        class="
          appearance-none
          block
          w-full
          px-3
          py-2
          border border-gray-300
          rounded-md
          shadow-sm
          cursor-default
          focus:outline-none focus:ring-2 focus:ring-offset-2
        "
      />
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: [
    'modelValue',
    'type',
    'placeholder',
    'label',
    'required',
    'tabindex',
    'ref',
    'autocomplete',
  ],
})
</script>
