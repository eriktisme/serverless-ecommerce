<template>
  <label class="block w-full mb-4 cursor-pointer">
    <span v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </span>
    <span class="relative">
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled selected hidden>
          {{ placeholder }}
        </option>
        <option
          :key="index"
          v-for="(option, index) in options"
          :value="option['key']"
        >
          {{ option['value'] }}
        </option>
      </select>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: [
    'modelValue',
    'options',
    'selectedOptions',
    'multiselect',
    'placeholder',
    'label',
    'required',
    'tabindex',
    'ref',
    'autocomplete',
  ],
})
</script>
