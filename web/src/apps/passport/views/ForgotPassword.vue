<template>
  <WelcomePage>
    <h3>Recover Password</h3>
    <Card>
      <template v-if="!formSubmitted">
        <form @submit.prevent="forgotPassword">
          <CardBody>
            <template v-if="error">
              {{ error }}
            </template>
            <InputGroup
              type="email"
              label="Email"
              placeholder="john.doe@example.org"
              v-model="forgotPasswordForm.email"
              :required="true"
              ref="email"
            />
            <Button
              :busy="submittingForgotEmailForm"
              :block="true"
              type="submit"
              >Send</Button
            >
          </CardBody>
        </form>
      </template>

      <template v-if="formSubmitted && !passwordResetConfirmed">
        <form @submit.prevent="confirmForgotPassword">
          <CardBody>
            An email has been sent with a code to confirm your password reset.

            <InputGroup
              type="text"
              label="Code"
              v-model="confirmForgotPasswordForm.code"
              :required="true"
            />
            <InputGroup
              type="password"
              label="New password"
              v-model="confirmForgotPasswordForm.newPassword"
              :required="true"
              :autocomplete="false"
            />
            <Button
              :busy="submittingResetPasswordForm"
              :block="true"
              type="submit"
              >Send</Button
            >
          </CardBody>
        </form>
      </template>

      <template v-if="passwordResetConfirmed">
        Your password has been changed. Click
        <router-link to="/login">here</router-link> to login.
      </template>
    </Card>
  </WelcomePage>
</template>

<script lang="ts">
import { Button } from '@/components/core-ui/buttons'
import { Card, CardBody } from '@/components/core-ui/containers'
import { InputGroup } from '@/components/core-ui/fields'
import { Auth } from 'aws-amplify'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import WelcomePage from '../components/WelcomePage.vue'

export default defineComponent({
  components: { WelcomePage, Card, CardBody, Button, InputGroup },
  mounted() {
    this.$nextTick(() => {
      ;(this.$refs.email as any).$el.focus()
    })
  },
  setup() {
    const email = ref('')
    const formSubmitted = ref(false)
    const submittingForgotEmailForm = ref(false)
    const error = ref('')

    const form = reactive({
      forgotPasswordForm: {
        email: '',
      },
      confirmForgotPasswordForm: {
        code: '',
        newPassword: '',
      },
    })

    async function forgotPassword() {
      try {
        submittingForgotEmailForm.value = true
        await Auth.forgotPassword(form.forgotPasswordForm.email)

        email.value = form.forgotPasswordForm.email
        error.value = ''
        formSubmitted.value = true
      } catch (e) {
        if (e) {
          if (e.name === 'UserNotFoundException') {
            formSubmitted.value = true
          } else {
            error.value = e.message
          }
        }
      } finally {
        submittingForgotEmailForm.value = false
      }
    }

    const passwordResetConfirmed = ref(false)
    const submittingResetPasswordForm = ref(false)

    async function confirmForgotPassword() {
      try {
        submittingResetPasswordForm.value = true
        await Auth.forgotPasswordSubmit(
          email.value,
          form.confirmForgotPasswordForm.code,
          form.confirmForgotPasswordForm.newPassword
        )

        error.value = ''
        passwordResetConfirmed.value = true
      } catch (e) {
        if (e) {
          error.value = e.message
        }
      } finally {
        submittingResetPasswordForm.value = false
      }
    }

    return {
      ...toRefs(form),
      error,
      formSubmitted,
      submittingForgotEmailForm,
      submittingResetPasswordForm,
      forgotPassword,
      confirmForgotPassword,
      passwordResetConfirmed,
    }
  },
})
</script>
