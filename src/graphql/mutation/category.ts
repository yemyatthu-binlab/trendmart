import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      success
      message
    }
  }
`;

export const DELETE_COLOR = gql`
  mutation DeleteColor($id: ID!) {
    deleteColor(id: $id) {
      success
      message
    }
  }
`;
