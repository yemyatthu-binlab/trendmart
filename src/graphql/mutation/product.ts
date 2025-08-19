import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
    }
  }
`;

export const CREATE_COLOR = gql`
  mutation CreateColor($name: String!, $hexCode: String!) {
    createColor(name: $name, hexCode: $hexCode) {
      id
      name
      hexCode
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      id
      name
    }
  }
`;
