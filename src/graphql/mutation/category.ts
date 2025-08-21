// src/graphql/mutation/attributes.ts

import { gql } from "@apollo/client";

// --- CATEGORY & SUB-CATEGORY ---
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $parentId: Int) {
    createCategory(name: $name, parentId: $parentId) {
      id
      name
      isDeletable
      children {
        id
      }
      sizes {
        id
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      success
      message
    }
  }
`;

// --- COLOR ---
export const CREATE_COLOR = gql`
  mutation CreateColor($name: String!, $hexCode: String!) {
    createColor(name: $name, hexCode: $hexCode) {
      id
      name
      hexCode
    }
  }
`;

export const UPDATE_COLOR = gql`
  mutation UpdateColor($id: ID!, $name: String, $hexCode: String) {
    updateColor(id: $id, name: $name, hexCode: $hexCode) {
      id
      name
      hexCode
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

// --- SIZES ---
export const ASSIGN_SIZES_TO_SUB_CATEGORY = gql`
  mutation AssignSizesToSubCategory($subCategoryId: ID!, $sizeIds: [Int!]!) {
    assignSizesToSubCategory(subCategoryId: $subCategoryId, sizeIds: $sizeIds) {
      id
      sizes {
        id
        value
      }
    }
  }
`;

export const REMOVE_SIZE_FROM_SUB_CATEGORY = gql`
  mutation RemoveSizeFromSubCategory($subCategoryId: ID!, $sizeId: ID!) {
    removeSizeFromSubCategory(subCategoryId: $subCategoryId, sizeId: $sizeId) {
      id
      sizes {
        id
        value
      }
    }
  }
`;

export const CREATE_SIZE = gql`
  mutation CreateSize($value: String!) {
    createSize(value: $value) {
      id
      value
    }
  }
`;
