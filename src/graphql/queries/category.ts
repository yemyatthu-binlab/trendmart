import { gql } from "@apollo/client";

export const GET_CATEGORIES_FOR_MANAGEMENT = gql`
  query GetCategoriesForManagement {
    getCategoriesForManagement {
      id
      name
      isDeletable
      children {
        id
        name
        sizes {
          id
          value
        }
      }
    }
  }
`;

export const GET_COLORS_FOR_MANAGEMENT = gql`
  query GetColorsForManagement {
    getColorsForManagement {
      id
      name
      hexCode
    }
  }
`;
