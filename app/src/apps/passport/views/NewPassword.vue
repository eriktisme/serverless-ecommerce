<template>
  <WelcomePage>
    <Card>
      <form @submit.prevent="confirm">
        <CardBody>
          <template v-if="error">
            {{ error }}
          </template>
          <InputGroup
            type="password"
            label="New Password"
            v-model="newPassword.password"
            :required="true"
            ref="password"
          />
          <Button :busy="busy" :block="true" type="submit">Confirm</Button>
        </CardBody>
      </form>
    </Card>
  </WelcomePage>
</template>

<script lang="ts">
import { Button } from '@/components/core-ui/buttons'
import { Card, CardBody } from '@/components/core-ui/containers'
import { InputGroup } from '@/components/core-ui/fields'
import { useLogger } from '@/packages/logger'
import { useUserStore } from '@/stores/user'
import { Auth } from 'aws-amplify'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'

export default defineComponent({
  components: { Card, CardBody, Button, WelcomePage, InputGroup },
  mounted() {
    this.$nextTick(() => {
      ;(this.$refs.password as any).$el.focus()
    })
  },
  setup() {
    const { log } = useLogger()

    log({
      message: 'New password page has been loaded.',
    })

    const error = ref('')
    const busy = ref(false)

    const form = reactive({
      newPassword: {
        password: '',
      },
    })

    const { push } = useRouter()

    const userStore = useUserStore()

    async function confirm() {
      try {
        busy.value = true
        await Auth.completeNewPassword(
          userStore.state.user,
          form.newPassword.password
        )

        await push({
          name: 'dashboard',
        })
      } catch (e) {
        if (e) {
          error.value = e.message
        }
      } finally {
        busy.value = false
      }
    }

    return {
      ...toRefs(form),
      error,
      busy,
      confirm,
    }
  },
})
</script>
