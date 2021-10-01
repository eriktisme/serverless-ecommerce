import {API, graphqlOperation} from 'aws-amplify'
import { ref } from 'vue'
import { getProducts as getProductsQuery } from '@/graphql/queries'
import {GetProductsQuery, Product} from "@/API";

export function useGetProducts() {
  const nextToken = ref<string | null>(null)

  const products = ref<Product[]>([])

  const getProducts = async () => {
    const response = (await API.graphql(graphqlOperation(getProductsQuery, {
      nextToken: nextToken.value,
    }))) as { data: GetProductsQuery }

    nextToken.value = response.data.getProducts.nextToken ?? null

    products.value = response.data.getProducts.items
  }

  return { products, getProducts }
}
