import {
  GetProductCategoriesQuery,
  ProductCategory,
  ProductInput,
  ProductStatus,
} from '@/API'
import { createProduct } from '@/graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { reactive, ref, toRefs } from 'vue'
import { getProductCategories as getProductCategoriesQuery } from '@/graphql/queries'

export function useCreateProduct() {
  const state = reactive({
    form: {
      name: '',
      description: '',
      category: '',
      status: ProductStatus.DRAFT,
      price: 0,
    } as ProductInput,
  })

  const categories = ref<ProductCategory[]>([])

  const create = async () =>
    await API.graphql(graphqlOperation(createProduct, { input: state.form }))

  const getProductCategories = async () => {
    const response = (await API.graphql(
      graphqlOperation(getProductCategoriesQuery)
    )) as { data: GetProductCategoriesQuery }

    categories.value = response.data.getProductCategories.items
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

  return {
    ...toRefs(state),
    create,
    statusOptions,
    categories,
    getProductCategories,
  }
}
