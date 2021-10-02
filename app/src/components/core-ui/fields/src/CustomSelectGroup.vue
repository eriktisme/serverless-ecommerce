<template>
  <Listbox as="div" v-model="selected" class="mb-4">
    <ListboxLabel
      v-if="label"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </ListboxLabel>
    <div class="relative">
      <ListboxButton
        class="
          relative
          w-full
          bg-white
          border border-gray-300
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none focus:ring-2 focus:ring-offset-2
        "
      >
        <span class="flex items-center">
          <span v-if="selected" class="block truncate">{{
            selected.value
          }}</span>
          <span v-else class="block truncate">Select an option</span>
        </span>
        <span
          class="
            ml-3
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            w-full
            bg-white
            shadow-lg
            max-h-56
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.key"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'ml-3 block truncate',
                ]"
              >
                {{ option['value'] }}
              </span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },
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
  setup(_, { emit }) {
    const selected = ref(null)

    watch(selected, (currentValue) => {
      emit('update:modelValue', currentValue.key)
    })

    return {
      selected,
    }
  },
})
</script>
