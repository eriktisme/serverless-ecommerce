<template>
  <label class="block w-full mb-4 cursor-pointer">
    <span v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </span>
    <span class="relative">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :type="type"
        :tabindex="tabindex"
        :ref="ref"
        :autocomplete="autocomplete"
        class="
          appearance-none
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          px-3
          py-2
          border border-gray-300
          rounded-md
          shadow-sm
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
