<template>
  <with-left-sidebar>
    <ContentWithHeader>
      Protected

      <button @click="logout" type="button">Logout</button>
      <button @click="openSidebar" type="button">Sidebar</button>
    </ContentWithHeader>
  </with-left-sidebar>
</template>

<script lang="ts">
import { ContentWithHeader, WithLeftSidebar } from '@/layouts'
import { Auth } from 'aws-amplify'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

export default defineComponent({
  components: { ContentWithHeader, WithLeftSidebar },
  setup() {
    const { push } = useRouter()

    const sidebarStore = useSidebarStore()

    const openSidebar = () => {
      sidebarStore.commit('toggle', true)
    }

    const logout = async () => {
      await Auth.signOut()

      await push('/login')
    }

    return {
      logout,
      openSidebar,
    }
  },
})
</script>
