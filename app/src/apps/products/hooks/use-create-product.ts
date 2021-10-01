import { ProductInput, ProductStatus } from '../../../API'
import { createProduct } from '../../../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { reactive, toRefs } from 'vue'

export function useCreateProduct() {
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
    await API.graphql(graphqlOperation(createProduct, { input: state.form }))
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
