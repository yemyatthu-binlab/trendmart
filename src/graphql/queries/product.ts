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
      sizes {
        id
        value
      }
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
      feedback {
        id
        rating
        comment
        createdAt
        user {
          id
          fullName
        }
      }
      averageRating
      totalReviews
      ratingCounts {
        star
        count
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

export const LIST_PUBLIC_PRODUCTS = gql`
  query ListPublicProducts(
    $skip: Int
    $take: Int
    $filter: ProductFilterInput
    $sort: ProductSortInput
  ) {
    listPublicProducts(skip: $skip, take: $take, filter: $filter, sort: $sort) {
      products {
        id
        name
        description
        createdAt
        categories {
          id
          name
        }
        variants {
          id
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
      totalCount
    }
  }
`;

export const GET_MAIN_SUB_CATEGORIES = gql`
  query GetMainSubCategories {
    getMainSubCategories {
      id
      name
      sizes {
        id
        value
      }
      children {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
      sizes {
        id
        value
      }
      children {
        id
        name
      }
    }
  }
`;
