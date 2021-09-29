<template>
  <with-left-sidebar>
    <ContentWithHeader>
      <router-view />
    </ContentWithHeader>
  </with-left-sidebar>
</template>

<script setup lang="ts">
import { ContentWithHeader, WithLeftSidebar } from '@/layouts'
</script>
