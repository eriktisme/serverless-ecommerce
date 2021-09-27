<template>
  <h1>Create Product</h1>
  <form @submit.prevent="create">
    <InputGroup
      v-model='form.name'
      type="text"
      ref="name"
      :required="true"
    />
    <TextAreaGroup v-model='form.description' :required="true" />
    <SelectGroup v-model="form.status" :options="statusOptions" />
    <Button type="submit">Save</Button>
  </form>
</template>

<script lang="ts" setup>
import { ProductInput, ProductStatus } from '@/API'
import {
  InputGroup,
  SelectGroup,
  TextAreaGroup,
} from '@/components/core-ui/fields'
import { Button } from '@/components/core-ui/buttons'
import { createProduct } from '@/graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { reactive, toRefs } from 'vue'

function createProductFeature() {
  const state = reactive({
    form: {
      name: '',
      description: '',
      status: ProductStatus.DRAFT,
      price: 0,
    } as ProductInput,
  })

  const create = async () => {
    console.log('create product')
    await API.graphql(
      graphqlOperation(createProduct, { product: state.form })
    )
  }

  const statusOptions = [
    {
      value: 'Draft',
      key: ProductStatus.DRAFT,
    },
    {
      value: 'Active',
      key: ProductStatus.ACTIVE,
    },
  ]

  return { ...toRefs(state), create, statusOptions }
}

const { form, create, statusOptions } = createProductFeature()
</script>
