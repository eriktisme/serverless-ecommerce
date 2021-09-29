<template>
    Protected

    <button @click="logout" type="button">Logout</button>
    <button @click="openSidebar" type="button">Sidebar</button>
</template>

<script setup lang="ts">
import { Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

const { push } = useRouter()

const sidebarStore = useSidebarStore()

const openSidebar = () => {
  sidebarStore.commit('toggle', true)
}

const logout = async () => {
  await Auth.signOut()

  await push('/login')
}
</script>
