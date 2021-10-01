/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ProductInput = {
  name: string
  status: ProductStatus
  price: number
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
  price: number
  category: ProductCategory
  status: ProductStatus
  tags?: Array<string | null> | null
  pictures?: Array<string | null> | null
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
}

export type ProductCategory = {
  __typename: 'ProductCategory'
  categoryId: string
  name: string
  status: CategoryStatus
}

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
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
      price: number
      status: ProductStatus
      tags?: Array<string | null> | null
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
    price: number
    category: {
      __typename: 'ProductCategory'
      categoryId: string
      name: string
      status: CategoryStatus
    }
    status: ProductStatus
    tags?: Array<string | null> | null
    pictures?: Array<string | null> | null
    createdAt?: string | null
    updatedAt?: string | null
    deletedAt?: string | null
  } | null
}
