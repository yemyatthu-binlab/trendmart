// graphql/mutations/user.ts
import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        fullName
        phoneNumber
        role
      }
    }
  }
`;

export const CUSTOMER_LOGIN = gql`
  mutation CustomerLogin($email: String!, $password: String!) {
    customerLogin(email: $email, password: $password) {
      token
      user {
        id
        fullName
        email
        role
      }
    }
  }
`;

export const REQUEST_REGISTRATION_OTP = gql`
  mutation RequestRegistrationOtp(
    $fullName: String!
    $email: String!
    $password: String!
  ) {
    requestRegistrationOtp(
      fullName: $fullName
      email: $email
      password: $password
    )
  }
`;

export const VERIFY_OTP_AND_COMPLETE_REGISTRATION = gql`
  mutation VerifyOtpAndCompleteRegistration($email: String!, $otp: String!) {
    verifyOtpAndCompleteRegistration(email: $email, otp: $otp) {
      token
      user {
        id
        fullName
        email
        role
      }
    }
  }
`;
