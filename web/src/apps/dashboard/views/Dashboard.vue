<template>
  Protected

  <button @click="logout" type="button">Logout</button>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
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
