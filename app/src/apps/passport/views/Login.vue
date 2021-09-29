<template>
  <WelcomePage>
    <h1>Login</h1>
    <Card>
      <form @submit.prevent="login">
        <CardBody>
          <template v-if="error">
            {{ error }}
          </template>
          <InputGroup
            type="email"
            label="Email"
            placeholder="john.doe@example.org"
            v-model="loginForm.email"
            ref="email"
            :required="true"
          />
          <InputGroup
            type="password"
            label="Password"
            placeholder="secret"
            v-model="loginForm.password"
            :required="true"
          />
          <Button type="submit" :block="true" :busy="busy">Login</Button>
        </CardBody>
      </form>
    </Card>
  </WelcomePage>
</template>

<script lang="ts">
import { Button } from '../../../components/core-ui/buttons'
import { Card, CardBody } from '../../../components/core-ui/containers'
import { InputGroup } from '../../../components/core-ui/fields'
import { userStore } from '../../../stores/user'
import { Auth } from 'aws-amplify'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'

export default defineComponent({
  components: { Button, Card, CardBody, WelcomePage, InputGroup },
  mounted() {
    this.$nextTick(() => {
      ;(this.$refs.email as any).$el.focus()
    })
  },
  setup() {
    const { push } = useRouter()

    const busy = ref(false)
    const error = ref('')

    const form = reactive({
      loginForm: {
        email: '',
        password: '',
      },
    })

    async function login() {
      try {
        busy.value = true

        const user = await Auth.signIn(
          form.loginForm.email,
          form.loginForm.password
        )

        console.log(user)

        await userStore.commit('user', user)

        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          return await push({
            name: 'new-password',
          })
        }

        const groups =
          user.getSignInUserSession().getIdToken().payload['cognito:groups'] ??
          []

        if (!groups.includes('admin')) {
          throw new Error('Entered credentials not found')
        }

        await push('/dashboard')
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
      busy,
      error,
      login,
    }
  },
})
</script>
