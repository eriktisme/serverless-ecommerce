/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProducts = /* GraphQL */ `
  query GetProducts($nextToken: String) {
    getProducts(nextToken: $nextToken) {
      items {
        productId
        name
        price
        status
        tags
        pictures
        createdAt
        updatedAt
        deletedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      name
      price
      category {
        categoryId
        name
        status
      }
      status
      tags
      pictures
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
