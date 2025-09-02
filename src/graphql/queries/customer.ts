import { gql } from "@apollo/client";

export const GET_CUSTOMERS_QUERY = gql`
  query GetCustomers($skip: Int, $take: Int) {
    getCustomers(skip: $skip, take: $take) {
      customers {
        id
        fullName
        email
        phoneNumber
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_CUSTOMER_BY_ID_QUERY = gql`
  query GetCustomerById($id: ID!) {
    getCustomerById(id: $id) {
      id
      fullName
      email
      phoneNumber
      createdAt
      updatedAt
      addresses {
        id
        fullName
        phoneNumber
        addressLine1
        addressLine2
        city
        postalCode
        isDefault
      }
    }
  }
`;
