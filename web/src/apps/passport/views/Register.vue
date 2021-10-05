<template>
  <WelcomePage>
    <Card>
      <form @submit.prevent="register">
        <CardBody>
          <template v-if="error">
            {{ error }}
          </template>
          <div class="grid grid-cols-2 gap-4">
            <InputGroup
              type="text"
              label="Your first name"
              placeholder="John"
              v-model="registerForm.first_name"
              :required="true"
              ref="first_name"
            />
            <InputGroup
              type="text"
              label="Your last name"
              placeholder="Doe"
              v-model="registerForm.last_name"
              :required="true"
            />
          </div>
          <InputGroup
            type="email"
            label="Email"
            placeholder="john.doe@example.org"
            v-model="registerForm.email"
            :required="true"
          />
          <InputGroup
            type="password"
            label="Password"
            placeholder="At least 8 characters"
            v-model="registerForm.password"
            :required="true"
          />
          <Button type="submit" :block="true" :busy="busy">
            Create your account
          </Button>
        </CardBody>
      </form>
    </Card>
  </WelcomePage>
</template>

<script lang="ts">
import { Card, CardBody } from '@/components/core-ui/containers'
import WelcomePage from '../components/WelcomePage.vue'
import { Button } from '@/components/core-ui/buttons'
import { InputGroup } from '@/components/core-ui/fields'
import { Auth } from 'aws-amplify'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { WelcomePage, Card, CardBody, Button, InputGroup },
  mounted() {
    this.$nextTick(() => {
      ;(this.$refs.first_name as any).$el.focus()
    })
  },
  setup() {
    const error = ref('')
    const busy = ref(false)

    const form = reactive({
      registerForm: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
    })

    const { push } = useRouter()

    async function register() {
      busy.value = true

      try {
        await Auth.signUp({
          username: form.registerForm.email,
          password: form.registerForm.password,
          attributes: {
            email: form.registerForm.email,
            given_name: form.registerForm.first_name,
            family_name: form.registerForm.last_name,
          },
          validationData: [],
        })

        await push({
          name: 'confirm',
          query: {
            email: form.registerForm.email,
          },
        })
      } catch (e) {
        busy.value = false
        if (e) {
          error.value = e.message
        }
      }
    }

    return {
      ...toRefs(form),
      error,
      register,
      busy,
    }
  },
})
</script>
