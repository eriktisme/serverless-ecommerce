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
import { useCreateProduct } from '@/apps/products/hooks'
import {
  InputGroup,
  SelectGroup,
  TextAreaGroup,
} from '@/components/core-ui/fields'
import { Button } from '@/components/core-ui/buttons'

const { form, create, statusOptions } = useCreateProduct()
</script>
