import { gql } from "@apollo/client";

export const GET_PRODUCTS_LIST = gql`
  query GetProductsList($skip: Int, $take: Int) {
    getProducts(skip: $skip, take: $take) {
      products {
        id
        name
        createdAt
        categories {
          id
          name
        }
        variants {
          id
        }
      }
      totalCount
    }
  }
`;

export const GET_PRODUCT_FORM_DATA = gql`
  query GetProductFormData {
    getSizes {
      id
      value
    }
    getColors {
      id
      name
      hexCode
    }
    getCategories {
      id
      name
    }
    getMainSubCategories {
      id
      name
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      description
      categories {
        id
        name
      }
      variants {
        id
        sku
        price
        stock
        size {
          id
          value
        }
        color {
          id
          name
          hexCode
        }
        images {
          id
          imageUrl
          altText
          isPrimary
        }
      }
    }
  }
`;

export const GET_COLORS = gql`
  query GetColors {
    getColors {
      id
      name
      hexCode
    }
  }
`;
