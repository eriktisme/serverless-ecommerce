<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  rounded: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<object[]>,
    default: () => [],
  },
})
</script>

<template>
  <div
    class="shadow overflow-hidden border-b border-gray-200"
    :class="[{ 'sm:rounded-lg': rounded }]"
  >
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in columns"
            scope="col"
            class="
              px-6
              py-3
              text-left text-xs
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in items">
          <td v-for="column in columns" class="px-6 py-3">
            <slot :name="'column[' + column + ']'" :data="item">
              {{ item[column] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
