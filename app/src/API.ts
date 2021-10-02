/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ProductInput = {
  name: string
  status: ProductStatus
  price: number
  category: string
  description: string
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
}

export type Response = {
  __typename: 'Response'
  success: boolean
}

export type PaginatedProducts = {
  __typename: 'PaginatedProducts'
  items: Array<Product>
  nextToken?: string | null
}

export type Product = {
  __typename: 'Product'
  productId: string
  name: string
  slug: string
  reference?: string | null
  price: number
  category: ProductCategory
  status: ProductStatus
  pictures?: Array<string | null> | null
  properties?: Array<Property | null> | null
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
}

export type ProductCategory = {
  __typename: 'ProductCategory'
  categoryId: string
  name: string
  slug: string
  description?: string | null
  status: CategoryStatus
  children?: Array<ProductCategory | null> | null
}

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
}

export type Property = {
  __typename: 'Property'
  name?: string | null
  values?: Array<string | null> | null
}

export type PaginatedProductCategories = {
  __typename: 'PaginatedProductCategories'
  items: Array<ProductCategory>
  nextToken?: string | null
}

export type CreateProductMutationVariables = {
  input: ProductInput
}

export type CreateProductMutation = {
  createProduct: {
    __typename: 'Response'
    success: boolean
  }
}

export type GetProductsQueryVariables = {
  nextToken?: string | null
}

export type GetProductsQuery = {
  getProducts: {
    __typename: 'PaginatedProducts'
    items: Array<{
      __typename: 'Product'
      productId: string
      name: string
      slug: string
      reference?: string | null
      price: number
      status: ProductStatus
      pictures?: Array<string | null> | null
      createdAt?: string | null
      updatedAt?: string | null
      deletedAt?: string | null
    }>
    nextToken?: string | null
  }
}

export type GetProductCategoriesQueryVariables = {
  nextToken?: string | null
}

export type GetProductCategoriesQuery = {
  getProductCategories: {
    __typename: 'PaginatedProductCategories'
    items: Array<{
      __typename: 'ProductCategory'
      categoryId: string
      name: string
      slug: string
      description?: string | null
      status: CategoryStatus
    }>
    nextToken?: string | null
  }
}

export type GetProductQueryVariables = {
  productId: string
}

export type GetProductQuery = {
  getProduct?: {
    __typename: 'Product'
    productId: string
    name: string
    slug: string
    reference?: string | null
    price: number
    category: {
      __typename: 'ProductCategory'
      categoryId: string
      name: string
      slug: string
      description?: string | null
      status: CategoryStatus
    }
    status: ProductStatus
    pictures?: Array<string | null> | null
    properties?: Array<{
      __typename: 'Property'
      name?: string | null
      values?: Array<string | null> | null
    } | null> | null
    createdAt?: string | null
    updatedAt?: string | null
    deletedAt?: string | null
  } | null
}
