<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/solid'

const open = ref(false)

const navigation = {
  categories: [
    {
      id: 'computers-tablets',
      name: 'Computers & Tablets',
      sections: [
        {
          id: 'laptops-desktops-monitors',
          name: 'Laptops, desktops & monitors ',
          items: [
            { name: 'Laptops', href: '#' },
            { name: 'Tablets', href: '#' },
            { name: 'Desktops', href: '#' },
            { name: 'Monitors', href: '#' },
          ],
        },
        {
          id: 'tablets-ereaders',
          name: 'Tablets & e-readers',
          items: [
            { name: 'All tablets', href: '#' },
            { name: 'Android tablets', href: '#' },
            { name: 'Apple tablets', href: '#' },
            { name: 'E-readers', href: '#' },
          ],
        },
        {
          id: 'gaming',
          name: 'Gaming',
          items: [
            { name: 'Consoles', href: '#' },
            { name: 'Games', href: '#' },
            { name: 'VF-headsets', href: '#' },
            { name: 'Gaming headsets', href: '#' },
            { name: 'Gaming chairs', href: '#' },
            { name: 'Gaming monitors', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'image-sound',
      name: 'Image & sound',
      sections: [
        {
          id: 'televisions-projectors',
          name: 'Televisions & projectors ',
          items: [
            { name: 'Televisions', href: '#' },
            { name: 'Smart TVs', href: '#' },
            { name: 'Projectors', href: '#' },
          ],
        },
        {
          id: 'home-cinema',
          name: 'Home cinema',
          items: [
            { name: 'Soundbars', href: '#' },
            { name: 'Home cinema sets', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Business', href: '#' },
    { name: 'Order status', href: '#' },
    { name: 'Customer service', href: '#' },
  ],
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed inset-0 flex z-40 lg:hidden"
      @close="open = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div
          class="
            relative
            max-w-xs
            w-full
            bg-white
            shadow-xl
            pb-12
            flex flex-col
            overflow-y-auto
          "
        >
          <div class="px-4 pt-5 pb-2 flex">
            <button
              type="button"
              class="
                -m-2
                p-2
                rounded-md
                inline-flex
                items-center
                justify-center
                text-gray-400
              "
              @click="open = false"
            >
              <span class="sr-only">Close menu</span>
              <XIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>

  <header class="relative bg-white">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center">
        <button
          type="button"
          class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
          @click="open = true"
        >
          <span class="sr-only">Open menu</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Menu -->
        <PopoverGroup class="hidden lg:block lg:self-stretch">
          <div class="h-full flex space-x-8">
            <Popover
              v-for="category in navigation.categories"
              :key="category.name"
              class="flex"
              v-slot="{ open }"
            >
              <div class="relative flex">
                <PopoverButton
                  :class="[
                    open
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:text-gray-800',
                    'relative z-10 flex items-center transition-colors ease-out duration-200 font-medium border-b-2 -mb-px pt-px',
                  ]"
                >
                  {{ category.name }}
                </PopoverButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <PopoverPanel class="absolute top-full inset-x-0 text-gray-500">
                  <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                  <div
                    class="absolute inset-0 top-1/2 bg-white shadow"
                    aria-hidden="true"
                  />

                  <div class="relative bg-white">
                    <div class="max-w-7xl mx-auto px-8">
                      <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                        <div
                          class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8"
                        >
                          <div
                            v-for="section in category.sections"
                            :key="section.name"
                          >
                            <p
                              :id="`${section.name}-heading`"
                              class="font-medium text-gray-900"
                            >
                              {{ section.name }}
                            </p>
                            <ul
                              role="list"
                              :aria-labelledby="`${section.name}-heading`"
                              class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                            >
                              <li
                                v-for="item in section.items"
                                :key="item.name"
                                class="flex"
                              >
                                <a
                                  :href="item.href"
                                  class="hover:text-gray-800"
                                >
                                  {{ item.name }}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <a
              v-for="page in navigation.pages"
              :key="page.name"
              :href="page.href"
              class="
                flex
                items-center
                font-medium
                text-gray-700
                hover:text-gray-800
              "
              >{{ page.name }}</a
            >
          </div>
        </PopoverGroup>

        <div class="ml-auto flex items-center">
          <div class="flex flex-1 items-center justify-end space-x-6">
            <a class="font-medium text-gray-700 hover:text-gray-800">
              Sign in
            </a>
            <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
            <a class="font-medium text-gray-700 hover:text-gray-800">
              Create account
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
