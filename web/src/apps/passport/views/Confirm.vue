<template>
  <WelcomePage>
    <Card>
      <form @submit.prevent="confirm">
        <CardBody>
          <template v-if="error">
            {{ error }}
          </template>
          <InputGroup
            type="text"
            label="Code"
            v-model="confirmForm.code"
            :required="true"
            ref="code"
          />
          <Button :busy="submittingConfirmForm" :block="true" type="submit"
            >Confirm</Button
          >
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
import { Auth } from 'aws-amplify'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'

export default defineComponent({
  components: { Card, CardBody, Button, WelcomePage, InputGroup },
  mounted() {
    this.$nextTick(() => {
      ;(this.$refs.code as any).$el.focus()
    })
  },
  setup() {
    const { log } = useLogger()

    log({
      message: 'Confirm page has been loaded.',
    })

    const error = ref('')
    const submittingConfirmForm = ref(false)

    const form = reactive({
      password: {
        code: '',
      },
    })

    const { query } = useRoute()

    async function confirm() {
      try {
        submittingConfirmForm.value = true
        await Auth.confirmSignUp(query.email as string, form.password.code, {
          forceAliasCreation: true,
        })
      } catch (e) {
        if (e) {
          if (e.code === 'NotAuthorizedException') {
            error.value = 'Account is already confirmed'
          } else {
            error.value = e.message
          }
        }
      } finally {
        submittingConfirmForm.value = false
      }
    }

    return {
      ...toRefs(form),
      error,
      submittingConfirmForm,
      confirm,
    }
  },
})
</script>
