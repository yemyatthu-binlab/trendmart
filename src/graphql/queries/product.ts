import { gql } from "@apollo/client";

export const GET_PRODUCTS_LIST = gql`
  query GetProductsList {
    getProducts {
      id
      name
      createdAt
      categories {
        name
      }
      variants {
        id
      }
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
  }
`;
