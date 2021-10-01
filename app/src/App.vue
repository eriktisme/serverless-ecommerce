<template>
  <template v-if="state.user">
    <with-left-sidebar>
      <content-with-header>
        <router-view />
      </content-with-header>
    </with-left-sidebar>
  </template>
  <template v-else>
    <content>
      <router-view />
    </content>
  </template>
</template>

<script setup lang="ts">
import { Content, ContentWithHeader, WithLeftSidebar } from '@/layouts'
import { useUserStore } from '@/stores/user'

const { state } = useUserStore()
</script>
