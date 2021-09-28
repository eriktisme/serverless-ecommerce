<template>
  <with-left-sidebar>
    Protected

    <button @click="logout" type="button">Logout</button>
  </with-left-sidebar>
</template>

<script lang="ts">
import WithLeftSidebar from '../../../layouts/WithLeftSidebar.vue'
import { Auth } from 'aws-amplify'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { WithLeftSidebar },
  setup() {
    const { push } = useRouter()

    const logout = async () => {
      await Auth.signOut()

      await push('/login')
    }

    return {
      logout,
    }
  },
})
</script>
