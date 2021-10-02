<template>
  <Card rounded="rounded-lg">
    <CardHeader rounded="rounded-t-lg">
      Products
      <template #action>
        <router-link :to="{ name: 'create-product' }" class="btn btn-indigo">
          Create Product
        </router-link>
      </template>
    </CardHeader>
    <CardBody spacing="p-0">
      <Table
        :columns="['name', 'price', 'status', 'actions']"
        :items="products"
      >
        <template #column[status]="data">
          <GreenLabel v-if="data.data.status === ProductStatus.ACTIVE">
            Active
          </GreenLabel>
          <BlueLabel v-else> Draft </BlueLabel>
        </template>
        <template #column[actions]="data"> Edit </template>
      </Table>
    </CardBody>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardBody, CardHeader } from '@/components/core-ui/containers'
import { Table } from '@/components/core-ui/lists'
import { ProductStatus } from '@/API'
import { BlueLabel, GreenLabel } from '@/components/core-ui/labels'
import { useGetProducts } from '../hooks'

const { products, getProducts } = useGetProducts()

getProducts()
</script>
