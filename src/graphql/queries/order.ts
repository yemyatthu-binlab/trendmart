import { gql } from "@apollo/client";

export const GetOrdersList = gql`
  query GetOrdersList($skip: Int, $take: Int) {
    getOrders(skip: $skip, take: $take) {
      orders {
        id
        createdAt
        orderStatus
        orderTotal
        user {
          fullName
        }
        items {
          id # We only need the items to count them on the list page
        }
      }
      totalCount
    }
  }
`;

export const GetOrderById = gql`
  query GetOrderById($id: ID!) {
    getOrderById(id: $id) {
      id
      createdAt
      orderStatus
      orderTotal
      user {
        id
        fullName
        email
      }
      shippingAddress {
        fullName
        phoneNumber
        addressLine1
        addressLine2
        city
        state
        postalCode
      }
      payment {
        paymentMethod
        paymentStatus
        amount
      }
      items {
        id
        quantity
        priceAtPurchase
        product {
          # <-- CORRECT location
          id
          name
        }
        productVariant {
          id
          # The 'product' field is no longer queried from here
          size {
            value
          }
          color {
            name
          }
          images {
            imageUrl
          }
        }
      }
    }
  }
`;
