<script lang="ts" setup>
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/core-ui/containers'
import { useCreateProduct } from '../hooks'
import {
  CustomSelectGroup,
  InputGroup,
  TextAreaGroup,
} from '@/components/core-ui/fields'
import { Button } from '@/components/core-ui/buttons'

const { form, create, statusOptions, categories, getProductCategories } =
  useCreateProduct()

getProductCategories()
</script>

<template>
  <form @submit.prevent="create">
    <Card>
      <CardHeader> Create Product </CardHeader>
      <CardBody>
        <InputGroup
          label="Product name"
          v-model="form.name"
          type="text"
          ref="name"
          :required="true"
        />
        <TextAreaGroup
          label="Product description"
          v-model="form.description"
          :required="true"
        />
        <CustomSelectGroup
          label="Product status"
          v-model="form.status"
          :options="statusOptions"
        />
        <CustomSelectGroup
          label="Product category"
          v-model="form.category"
          :options="
            categories.map((category) => ({
              key: category.categoryId,
              value: category.name,
            }))
          "
        />
      </CardBody>
      <CardFooter>
        <Button type="submit">Save</Button>
      </CardFooter>
    </Card>
  </form>
</template>
