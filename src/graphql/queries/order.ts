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
        postalCode
      }
      payment {
        paymentMethod
        paymentStatus
        amount
        manualPaymentScreenshotUrl
        createdAt
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
export const GetMyOrdersList = gql`
  query GetMyOrdersList($skip: Int, $take: Int) {
    getMyOrders(skip: $skip, take: $take) {
      orders {
        id
        createdAt
        orderStatus
        orderTotal
        items {
          id # To get a count of items
        }
      }
      totalCount
    }
  }
`;

export const GetMyOrderById = gql`
  query GetMyOrderById($id: ID!) {
    getMyOrderById(id: $id) {
      id
      createdAt
      orderStatus
      orderTotal
      shippingAddress {
        fullName
        phoneNumber
        addressLine1
        city
        postalCode
      }
      payment {
        paymentMethod
        paymentStatus
      }
      items {
        id
        quantity
        priceAtPurchase
        product {
          id
          name
        }
        productVariant {
          id
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

export const UPLOAD_PAYMENT_SCREENSHOT = gql`
  mutation UploadPaymentScreenshot($file: Upload!) {
    uploadPaymentScreenshot(file: $file) {
      url
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      orderStatus
      orderTotal
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      orderStatus
    }
  }
`;
