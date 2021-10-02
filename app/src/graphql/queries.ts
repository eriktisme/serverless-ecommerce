/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProducts = /* GraphQL */ `
  query GetProducts($nextToken: String) {
    getProducts(nextToken: $nextToken) {
      items {
        productId
        name
        slug
        reference
        price
        status
        pictures
        createdAt
        updatedAt
        deletedAt
      }
      nextToken
    }
  }
`
export const getProductCategories = /* GraphQL */ `
  query GetProductCategories($nextToken: String) {
    getProductCategories(nextToken: $nextToken) {
      items {
        categoryId
        name
        slug
        description
        status
      }
      nextToken
    }
  }
`
export const getProduct = /* GraphQL */ `
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      name
      slug
      reference
      price
      category {
        categoryId
        name
        slug
        description
        status
      }
      status
      pictures
      properties {
        name
        values
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`
