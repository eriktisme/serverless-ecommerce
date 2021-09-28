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
  category?: ProductCategory | null
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

export type GetProductQueryVariables = {
  productId: string
}

export type GetProductQuery = {
  getProduct?: {
    __typename: 'Product'
    productId: string
    name: string
    price: number
    category?: {
      __typename: 'ProductCategory'
      categoryId: string
      name: string
      status: CategoryStatus
    } | null
    status: ProductStatus
    tags?: Array<string | null> | null
    pictures?: Array<string | null> | null
    createdAt?: string | null
    updatedAt?: string | null
    deletedAt?: string | null
  } | null
}
