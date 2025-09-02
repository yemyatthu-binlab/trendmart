import { gql } from "@apollo/client";
export const GET_ME = gql`
  query GetMe {
    me {
      id
      fullName
      email
      role
      addresses {
        id
        fullName
        phoneNumber
        addressLine1
        city
        postalCode
        isDefault
      }
    }
  }
`;
