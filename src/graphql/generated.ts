import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  addressLine1: Scalars['String']['output'];
  addressLine2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  phoneNumber: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Category = {
  __typename?: 'Category';
  children?: Maybe<Array<Category>>;
  id: Scalars['ID']['output'];
  isDeletable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
  sizes?: Maybe<Array<Size>>;
};

export type Color = {
  __typename?: 'Color';
  hexCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateOrderInput = {
  items: Array<OrderItemInput>;
  paymentMethod: Scalars['String']['input'];
  paymentScreenshotUrl: Scalars['String']['input'];
  saveAddress?: InputMaybe<Scalars['Boolean']['input']>;
  shippingAddress: ShippingAddressInput;
  shippingMethod: Scalars['String']['input'];
};

export type CreateProductFeedbackInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
};

export type CreateProductImageInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  imageUrl: Scalars['String']['input'];
  isPrimary: Scalars['Boolean']['input'];
};

export type CreateProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  variants: Array<CreateProductVariantInput>;
};

export type CreateProductVariantInput = {
  colorId: Scalars['Int']['input'];
  discountPercentage?: InputMaybe<Scalars['Float']['input']>;
  images: Array<CreateProductImageInput>;
  price: Scalars['Float']['input'];
  sizeId: Scalars['Int']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
};

export type CreateReturnRequestInput = {
  items: Array<ReturnRequestItemInput>;
  phoneNumber: Scalars['String']['input'];
};

export type CustomerListResponse = {
  __typename?: 'CustomerListResponse';
  customers: Array<User>;
  totalCount: Scalars['Int']['output'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  newUsersThisMonth: Scalars['Int']['output'];
  ordersLastMonth: Scalars['Int']['output'];
  ordersThisMonth: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  totalUsers: Scalars['Int']['output'];
};

export enum FeedbackRating {
  Five = 'FIVE',
  Four = 'FOUR',
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO'
}

export type MonthlyRevenue = {
  __typename?: 'MonthlyRevenue';
  month: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  assignSizesToSubCategory: Category;
  createCategory: Category;
  createColor: Color;
  createOrder: Order;
  createProduct: Product;
  createProductFeedback: ProductFeedback;
  createReturnRequest: Scalars['Boolean']['output'];
  createSize: Size;
  customerLogin: AuthPayload;
  deleteCategory: SuccessResponse;
  deleteColor: SuccessResponse;
  deleteProduct: Product;
  deleteSize: SuccessResponse;
  login: AuthPayload;
  removeSizeFromSubCategory: Category;
  requestRegistrationOtp: Scalars['String']['output'];
  updateCategory: Category;
  updateColor: Color;
  updateOrderStatus: Order;
  updateProduct: Product;
  updateReturnRequestStatus: ReturnRequest;
  updateSize: Size;
  uploadImage: UploadedImage;
  uploadPaymentScreenshot: UploadedFileResponse;
  uploadReturnImage: UploadedFileResponse;
  verifyOtpAndCompleteRegistration: AuthPayload;
};


export type MutationAssignSizesToSubCategoryArgs = {
  sizeIds: Array<Scalars['Int']['input']>;
  subCategoryId: Scalars['ID']['input'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateColorArgs = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductFeedbackArgs = {
  input: CreateProductFeedbackInput;
};


export type MutationCreateReturnRequestArgs = {
  input: CreateReturnRequestInput;
};


export type MutationCreateSizeArgs = {
  value: Scalars['String']['input'];
};


export type MutationCustomerLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteColorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSizeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveSizeFromSubCategoryArgs = {
  sizeId: Scalars['ID']['input'];
  subCategoryId: Scalars['ID']['input'];
};


export type MutationRequestRegistrationOtpArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateColorArgs = {
  hexCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};


export type MutationUpdateReturnRequestStatusArgs = {
  returnRequestId: Scalars['ID']['input'];
  status: ReturnStatus;
};


export type MutationUpdateSizeArgs = {
  id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadPaymentScreenshotArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadReturnImageArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationVerifyOtpAndCompleteRegistrationArgs = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  orderStatus: OrderStatus;
  orderTotal: Scalars['Float']['output'];
  payment?: Maybe<Payment>;
  shippingAddress: Address;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  order: Order;
  priceAtPurchase: Scalars['Float']['output'];
  product: Product;
  productVariant: ProductVariant;
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderListResponse = {
  __typename?: 'OrderListResponse';
  orders: Array<Order>;
  totalCount: Scalars['Int']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  PendingPayment = 'PENDING_PAYMENT',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  manualPaymentScreenshotUrl?: Maybe<Scalars['String']['output']>;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
};

export enum PaymentMethod {
  ManualUpload = 'MANUAL_UPLOAD',
  Stripe = 'STRIPE'
}

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  VerificationPending = 'VERIFICATION_PENDING'
}

export type Product = {
  __typename?: 'Product';
  averageRating?: Maybe<Scalars['Float']['output']>;
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  feedback?: Maybe<Array<ProductFeedback>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ratingCounts?: Maybe<Array<RatingCount>>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
};

export type ProductFeedback = {
  __typename?: 'ProductFeedback';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  user: User;
};

export type ProductFilterInput = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  altText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  isPrimary: Scalars['Boolean']['output'];
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  products: Array<Product>;
  totalCount: Scalars['Int']['output'];
};

export type ProductSortInput = {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SortOrder>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  color: Color;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImage>>;
  price: Scalars['Float']['output'];
  size: Size;
  sku?: Maybe<Scalars['String']['output']>;
  stock: Scalars['Int']['output'];
};

export type PublicProductListResponse = {
  __typename?: 'PublicProductListResponse';
  products: Array<Product>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  findMyOrderForReturn?: Maybe<Order>;
  getCategories?: Maybe<Array<Category>>;
  getCategoriesForManagement: Array<Category>;
  getColors?: Maybe<Array<Color>>;
  getColorsForManagement: Array<Color>;
  getCustomerById?: Maybe<User>;
  getCustomers?: Maybe<CustomerListResponse>;
  getDashboardStats: DashboardStats;
  getLowStockProducts: ProductListResponse;
  getMainSubCategories: Array<Category>;
  getMyOrderById?: Maybe<Order>;
  getMyOrders: OrderListResponse;
  getMyReturnRequests: ReturnRequestListResponse;
  getOrderById?: Maybe<Order>;
  getOrders: OrderListResponse;
  getProductById?: Maybe<Product>;
  getProducts?: Maybe<ProductListResponse>;
  getReturnRequestById?: Maybe<ReturnRequest>;
  getReturnRequests: ReturnRequestListResponse;
  getRevenueOverview: Array<MonthlyRevenue>;
  getSizes?: Maybe<Array<Size>>;
  getTopSellingProducts: Array<TopSellingProduct>;
  getUnassignedSizesForCategory: Array<Size>;
  listPublicProducts?: Maybe<PublicProductListResponse>;
  me?: Maybe<User>;
};


export type QueryFindMyOrderForReturnArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCustomersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetLowStockProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMyOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMyOrdersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMyReturnRequestsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrdersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetReturnRequestByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetReturnRequestsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReturnStatus>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTopSellingProductsArgs = {
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUnassignedSizesForCategoryArgs = {
  subCategoryId: Scalars['ID']['input'];
};


export type QueryListPublicProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductSortInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type RatingCount = {
  __typename?: 'RatingCount';
  count: Scalars['Int']['output'];
  star: Scalars['Int']['output'];
};

export enum ReturnReason {
  Damaged = 'DAMAGED',
  Other = 'OTHER',
  SizeIssue = 'SIZE_ISSUE',
  WrongItem = 'WRONG_ITEM'
}

export type ReturnRequest = {
  __typename?: 'ReturnRequest';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<ReturnRequestImage>;
  orderItem: OrderItem;
  reason: ReturnReason;
  status: ReturnStatus;
  updatedAt: Scalars['String']['output'];
};

export type ReturnRequestImage = {
  __typename?: 'ReturnRequestImage';
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
};

export type ReturnRequestItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrls: Array<Scalars['String']['input']>;
  orderItemId: Scalars['ID']['input'];
  reason: ReturnReason;
};

export type ReturnRequestListResponse = {
  __typename?: 'ReturnRequestListResponse';
  returnRequests: Array<ReturnRequest>;
  totalCount: Scalars['Int']['output'];
};

export enum ReturnStatus {
  Approved = 'APPROVED',
  Refunded = 'REFUNDED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED',
  Returned = 'RETURNED'
}

export type ShippingAddressInput = {
  addressLine1: Scalars['String']['input'];
  city: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
};

export type Size = {
  __typename?: 'Size';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type TopSellingProduct = {
  __typename?: 'TopSellingProduct';
  productImage?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  totalSold: Scalars['Int']['output'];
  variantInfo: Scalars['String']['output'];
};

export type UpdateProductImageInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  imageUrl: Scalars['String']['input'];
  isPrimary: Scalars['Boolean']['input'];
};

export type UpdateProductInput = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  variants?: InputMaybe<Array<UpdateProductVariantInput>>;
};

export type UpdateProductVariantInput = {
  colorId: Scalars['Int']['input'];
  discountPercentage?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images: Array<UpdateProductImageInput>;
  price: Scalars['Float']['input'];
  sizeId: Scalars['Int']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
};

export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  url: Scalars['String']['output'];
};

export type UploadedImage = {
  __typename?: 'UploadedImage';
  filename: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  addresses: Array<Address>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['String']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string, isDeletable: boolean, children?: Array<{ __typename?: 'Category', id: string }> | null, sizes?: Array<{ __typename?: 'Size', id: string }> | null } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'SuccessResponse', success: boolean, message: string } };

export type CreateColorMutationVariables = Exact<{
  name: Scalars['String']['input'];
  hexCode: Scalars['String']['input'];
}>;


export type CreateColorMutation = { __typename?: 'Mutation', createColor: { __typename?: 'Color', id: string, name: string, hexCode?: string | null } };

export type UpdateColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  hexCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateColorMutation = { __typename?: 'Mutation', updateColor: { __typename?: 'Color', id: string, name: string, hexCode?: string | null } };

export type DeleteColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteColorMutation = { __typename?: 'Mutation', deleteColor: { __typename?: 'SuccessResponse', success: boolean, message: string } };

export type AssignSizesToSubCategoryMutationVariables = Exact<{
  subCategoryId: Scalars['ID']['input'];
  sizeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AssignSizesToSubCategoryMutation = { __typename?: 'Mutation', assignSizesToSubCategory: { __typename?: 'Category', id: string, sizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null } };

export type RemoveSizeFromSubCategoryMutationVariables = Exact<{
  subCategoryId: Scalars['ID']['input'];
  sizeId: Scalars['ID']['input'];
}>;


export type RemoveSizeFromSubCategoryMutation = { __typename?: 'Mutation', removeSizeFromSubCategory: { __typename?: 'Category', id: string, sizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null } };

export type CreateSizeMutationVariables = Exact<{
  value: Scalars['String']['input'];
}>;


export type CreateSizeMutation = { __typename?: 'Mutation', createSize: { __typename?: 'Size', id: string, value: string } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string } };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'UploadedImage', url: string } };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'Product', id: string, name: string } };

export type CreateProductFeedbackMutationVariables = Exact<{
  input: CreateProductFeedbackInput;
}>;


export type CreateProductFeedbackMutation = { __typename?: 'Mutation', createProductFeedback: { __typename?: 'ProductFeedback', id: string, rating: number, comment?: string | null, createdAt: string, user: { __typename?: 'User', id: string, fullName: string } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, phoneNumber?: string | null, role: UserRole } } };

export type CustomerLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CustomerLoginMutation = { __typename?: 'Mutation', customerLogin: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, email: string, role: UserRole } } };

export type RequestRegistrationOtpMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RequestRegistrationOtpMutation = { __typename?: 'Mutation', requestRegistrationOtp: string };

export type VerifyOtpAndCompleteRegistrationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type VerifyOtpAndCompleteRegistrationMutation = { __typename?: 'Mutation', verifyOtpAndCompleteRegistration: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, email: string, role: UserRole } } };

export type GetCategoriesForManagementQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesForManagementQuery = { __typename?: 'Query', getCategoriesForManagement: Array<{ __typename?: 'Category', id: string, name: string, isDeletable: boolean, children?: Array<{ __typename?: 'Category', id: string, name: string, sizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null }> | null }> };

export type GetColorsForManagementQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsForManagementQuery = { __typename?: 'Query', getColorsForManagement: Array<{ __typename?: 'Color', id: string, name: string, hexCode?: string | null }> };

export type GetUnassignedSizesForCategoryQueryVariables = Exact<{
  subCategoryId: Scalars['ID']['input'];
}>;


export type GetUnassignedSizesForCategoryQuery = { __typename?: 'Query', getUnassignedSizesForCategory: Array<{ __typename?: 'Size', id: string, value: string }> };

export type GetCustomersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCustomersQuery = { __typename?: 'Query', getCustomers?: { __typename?: 'CustomerListResponse', totalCount: number, customers: Array<{ __typename?: 'User', id: string, fullName: string, email: string, phoneNumber?: string | null, createdAt: string }> } | null };

export type GetCustomerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCustomerByIdQuery = { __typename?: 'Query', getCustomerById?: { __typename?: 'User', id: string, fullName: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, addresses: Array<{ __typename?: 'Address', id: string, fullName: string, phoneNumber: string, addressLine1: string, addressLine2?: string | null, city: string, postalCode: string, isDefault?: boolean | null }> } | null };

export type GetOrdersListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetOrdersListQuery = { __typename?: 'Query', getOrders: { __typename?: 'OrderListResponse', totalCount: number, orders: Array<{ __typename?: 'Order', id: string, createdAt: string, orderStatus: OrderStatus, orderTotal: number, user: { __typename?: 'User', fullName: string }, items: Array<{ __typename?: 'OrderItem', id: string }> }> } };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', getOrderById?: { __typename?: 'Order', id: string, createdAt: string, orderStatus: OrderStatus, orderTotal: number, user: { __typename?: 'User', id: string, fullName: string, email: string }, shippingAddress: { __typename?: 'Address', fullName: string, phoneNumber: string, addressLine1: string, addressLine2?: string | null, city: string, postalCode: string }, payment?: { __typename?: 'Payment', paymentMethod: PaymentMethod, paymentStatus: PaymentStatus, amount: number, manualPaymentScreenshotUrl?: string | null, createdAt: string } | null, items: Array<{ __typename?: 'OrderItem', id: string, quantity: number, priceAtPurchase: number, product: { __typename?: 'Product', id: string, name: string }, productVariant: { __typename?: 'ProductVariant', id: string, size: { __typename?: 'Size', value: string }, color: { __typename?: 'Color', name: string }, images?: Array<{ __typename?: 'ProductImage', imageUrl: string }> | null } }> } | null };

export type GetMyOrdersListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMyOrdersListQuery = { __typename?: 'Query', getMyOrders: { __typename?: 'OrderListResponse', totalCount: number, orders: Array<{ __typename?: 'Order', id: string, createdAt: string, orderStatus: OrderStatus, orderTotal: number, items: Array<{ __typename?: 'OrderItem', id: string }> }> } };

export type GetMyReturnRequestsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMyReturnRequestsQuery = { __typename?: 'Query', getMyReturnRequests: { __typename?: 'ReturnRequestListResponse', totalCount: number, returnRequests: Array<{ __typename?: 'ReturnRequest', id: string, reason: ReturnReason, status: ReturnStatus, description?: string | null, createdAt: string, updatedAt: string, orderItem: { __typename?: 'OrderItem', id: string, quantity: number, product: { __typename?: 'Product', id: string, name: string }, productVariant: { __typename?: 'ProductVariant', id: string, size: { __typename?: 'Size', value: string }, color: { __typename?: 'Color', name: string }, images?: Array<{ __typename?: 'ProductImage', imageUrl: string }> | null } }, images: Array<{ __typename?: 'ReturnRequestImage', id: string, imageUrl: string }> }> } };

export type GetMyOrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMyOrderByIdQuery = { __typename?: 'Query', getMyOrderById?: { __typename?: 'Order', id: string, createdAt: string, orderStatus: OrderStatus, orderTotal: number, shippingAddress: { __typename?: 'Address', fullName: string, phoneNumber: string, addressLine1: string, city: string, postalCode: string }, payment?: { __typename?: 'Payment', paymentMethod: PaymentMethod, paymentStatus: PaymentStatus } | null, items: Array<{ __typename?: 'OrderItem', id: string, quantity: number, priceAtPurchase: number, product: { __typename?: 'Product', id: string, name: string }, productVariant: { __typename?: 'ProductVariant', id: string, size: { __typename?: 'Size', value: string }, color: { __typename?: 'Color', name: string }, images?: Array<{ __typename?: 'ProductImage', imageUrl: string }> | null } }> } | null };

export type FindMyOrderForReturnQueryVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type FindMyOrderForReturnQuery = { __typename?: 'Query', findMyOrderForReturn?: { __typename?: 'Order', id: string, createdAt: string, items: Array<{ __typename?: 'OrderItem', id: string, quantity: number, priceAtPurchase: number, product: { __typename?: 'Product', id: string, name: string }, productVariant: { __typename?: 'ProductVariant', id: string, size: { __typename?: 'Size', value: string }, color: { __typename?: 'Color', name: string }, images?: Array<{ __typename?: 'ProductImage', imageUrl: string }> | null } }> } | null };

export type UploadPaymentScreenshotMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadPaymentScreenshotMutation = { __typename?: 'Mutation', uploadPaymentScreenshot: { __typename?: 'UploadedFileResponse', url: string } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, orderStatus: OrderStatus, orderTotal: number } };

export type UpdateOrderStatusMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus: { __typename?: 'Order', id: string, orderStatus: OrderStatus } };

export type UploadReturnImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadReturnImageMutation = { __typename?: 'Mutation', uploadReturnImage: { __typename?: 'UploadedFileResponse', url: string } };

export type CreateReturnRequestMutationVariables = Exact<{
  input: CreateReturnRequestInput;
}>;


export type CreateReturnRequestMutation = { __typename?: 'Mutation', createReturnRequest: boolean };

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardDataQuery = { __typename?: 'Query', stats: { __typename?: 'DashboardStats', totalRevenue: number, totalOrders: number, ordersThisMonth: number, ordersLastMonth: number, totalUsers: number, newUsersThisMonth: number }, overview: Array<{ __typename?: 'MonthlyRevenue', month: string, revenue: number }>, topSelling: Array<{ __typename?: 'TopSellingProduct', productName: string, variantInfo: string, totalSold: number }>, recentOrders: { __typename?: 'OrderListResponse', orders: Array<{ __typename?: 'Order', id: string, orderTotal: number, orderStatus: OrderStatus, user: { __typename?: 'User', fullName: string } }> } };

export type GetProductsListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsListQuery = { __typename?: 'Query', getProducts?: { __typename?: 'ProductListResponse', totalCount: number, products: Array<{ __typename?: 'Product', id: string, name: string, createdAt: string, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: string } | null> | null }> } | null };

export type GetProductFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductFormDataQuery = { __typename?: 'Query', getSizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null, getColors?: Array<{ __typename?: 'Color', id: string, name: string, hexCode?: string | null }> | null, getCategories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, getMainSubCategories: Array<{ __typename?: 'Category', id: string, name: string, sizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null }> };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'Product', id: string, name: string, description?: string | null, averageRating?: number | null, totalReviews?: number | null, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, sku?: string | null, price: number, stock: number, size: { __typename?: 'Size', id: string, value: string }, color: { __typename?: 'Color', id: string, name: string, hexCode?: string | null }, images?: Array<{ __typename?: 'ProductImage', id: string, imageUrl: string, altText?: string | null, isPrimary: boolean }> | null } | null> | null, feedback?: Array<{ __typename?: 'ProductFeedback', id: string, rating: number, comment?: string | null, createdAt: string, user: { __typename?: 'User', id: string, fullName: string } }> | null, ratingCounts?: Array<{ __typename?: 'RatingCount', star: number, count: number }> | null } | null };

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'Query', getColors?: Array<{ __typename?: 'Color', id: string, name: string, hexCode?: string | null }> | null };

export type ListPublicProductsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductFilterInput>;
  sort?: InputMaybe<ProductSortInput>;
}>;


export type ListPublicProductsQuery = { __typename?: 'Query', listPublicProducts?: { __typename?: 'PublicProductListResponse', totalCount: number, products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, createdAt: string, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, price: number, stock: number, size: { __typename?: 'Size', id: string, value: string }, color: { __typename?: 'Color', id: string, name: string, hexCode?: string | null }, images?: Array<{ __typename?: 'ProductImage', id: string, imageUrl: string, altText?: string | null, isPrimary: boolean }> | null } | null> | null }> } | null };

export type GetMainSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMainSubCategoriesQuery = { __typename?: 'Query', getMainSubCategories: Array<{ __typename?: 'Category', id: string, name: string, sizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null, children?: Array<{ __typename?: 'Category', id: string, name: string }> | null }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', id: string, name: string, sizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null, children?: Array<{ __typename?: 'Category', id: string, name: string }> | null }> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, fullName: string, email: string, role: UserRole, addresses: Array<{ __typename?: 'Address', id: string, fullName: string, phoneNumber: string, addressLine1: string, city: string, postalCode: string, isDefault?: boolean | null }> } | null };


export const CreateCategoryDocument = gql`
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
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    success
    message
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CreateColorDocument = gql`
    mutation CreateColor($name: String!, $hexCode: String!) {
  createColor(name: $name, hexCode: $hexCode) {
    id
    name
    hexCode
  }
}
    `;
export type CreateColorMutationFn = Apollo.MutationFunction<CreateColorMutation, CreateColorMutationVariables>;

/**
 * __useCreateColorMutation__
 *
 * To run a mutation, you first call `useCreateColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createColorMutation, { data, loading, error }] = useCreateColorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      hexCode: // value for 'hexCode'
 *   },
 * });
 */
export function useCreateColorMutation(baseOptions?: Apollo.MutationHookOptions<CreateColorMutation, CreateColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateColorMutation, CreateColorMutationVariables>(CreateColorDocument, options);
      }
export type CreateColorMutationHookResult = ReturnType<typeof useCreateColorMutation>;
export type CreateColorMutationResult = Apollo.MutationResult<CreateColorMutation>;
export type CreateColorMutationOptions = Apollo.BaseMutationOptions<CreateColorMutation, CreateColorMutationVariables>;
export const UpdateColorDocument = gql`
    mutation UpdateColor($id: ID!, $name: String, $hexCode: String) {
  updateColor(id: $id, name: $name, hexCode: $hexCode) {
    id
    name
    hexCode
  }
}
    `;
export type UpdateColorMutationFn = Apollo.MutationFunction<UpdateColorMutation, UpdateColorMutationVariables>;

/**
 * __useUpdateColorMutation__
 *
 * To run a mutation, you first call `useUpdateColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColorMutation, { data, loading, error }] = useUpdateColorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      hexCode: // value for 'hexCode'
 *   },
 * });
 */
export function useUpdateColorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColorMutation, UpdateColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColorMutation, UpdateColorMutationVariables>(UpdateColorDocument, options);
      }
export type UpdateColorMutationHookResult = ReturnType<typeof useUpdateColorMutation>;
export type UpdateColorMutationResult = Apollo.MutationResult<UpdateColorMutation>;
export type UpdateColorMutationOptions = Apollo.BaseMutationOptions<UpdateColorMutation, UpdateColorMutationVariables>;
export const DeleteColorDocument = gql`
    mutation DeleteColor($id: ID!) {
  deleteColor(id: $id) {
    success
    message
  }
}
    `;
export type DeleteColorMutationFn = Apollo.MutationFunction<DeleteColorMutation, DeleteColorMutationVariables>;

/**
 * __useDeleteColorMutation__
 *
 * To run a mutation, you first call `useDeleteColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteColorMutation, { data, loading, error }] = useDeleteColorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteColorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteColorMutation, DeleteColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteColorMutation, DeleteColorMutationVariables>(DeleteColorDocument, options);
      }
export type DeleteColorMutationHookResult = ReturnType<typeof useDeleteColorMutation>;
export type DeleteColorMutationResult = Apollo.MutationResult<DeleteColorMutation>;
export type DeleteColorMutationOptions = Apollo.BaseMutationOptions<DeleteColorMutation, DeleteColorMutationVariables>;
export const AssignSizesToSubCategoryDocument = gql`
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
export type AssignSizesToSubCategoryMutationFn = Apollo.MutationFunction<AssignSizesToSubCategoryMutation, AssignSizesToSubCategoryMutationVariables>;

/**
 * __useAssignSizesToSubCategoryMutation__
 *
 * To run a mutation, you first call `useAssignSizesToSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignSizesToSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignSizesToSubCategoryMutation, { data, loading, error }] = useAssignSizesToSubCategoryMutation({
 *   variables: {
 *      subCategoryId: // value for 'subCategoryId'
 *      sizeIds: // value for 'sizeIds'
 *   },
 * });
 */
export function useAssignSizesToSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AssignSizesToSubCategoryMutation, AssignSizesToSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignSizesToSubCategoryMutation, AssignSizesToSubCategoryMutationVariables>(AssignSizesToSubCategoryDocument, options);
      }
export type AssignSizesToSubCategoryMutationHookResult = ReturnType<typeof useAssignSizesToSubCategoryMutation>;
export type AssignSizesToSubCategoryMutationResult = Apollo.MutationResult<AssignSizesToSubCategoryMutation>;
export type AssignSizesToSubCategoryMutationOptions = Apollo.BaseMutationOptions<AssignSizesToSubCategoryMutation, AssignSizesToSubCategoryMutationVariables>;
export const RemoveSizeFromSubCategoryDocument = gql`
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
export type RemoveSizeFromSubCategoryMutationFn = Apollo.MutationFunction<RemoveSizeFromSubCategoryMutation, RemoveSizeFromSubCategoryMutationVariables>;

/**
 * __useRemoveSizeFromSubCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveSizeFromSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSizeFromSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSizeFromSubCategoryMutation, { data, loading, error }] = useRemoveSizeFromSubCategoryMutation({
 *   variables: {
 *      subCategoryId: // value for 'subCategoryId'
 *      sizeId: // value for 'sizeId'
 *   },
 * });
 */
export function useRemoveSizeFromSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSizeFromSubCategoryMutation, RemoveSizeFromSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSizeFromSubCategoryMutation, RemoveSizeFromSubCategoryMutationVariables>(RemoveSizeFromSubCategoryDocument, options);
      }
export type RemoveSizeFromSubCategoryMutationHookResult = ReturnType<typeof useRemoveSizeFromSubCategoryMutation>;
export type RemoveSizeFromSubCategoryMutationResult = Apollo.MutationResult<RemoveSizeFromSubCategoryMutation>;
export type RemoveSizeFromSubCategoryMutationOptions = Apollo.BaseMutationOptions<RemoveSizeFromSubCategoryMutation, RemoveSizeFromSubCategoryMutationVariables>;
export const CreateSizeDocument = gql`
    mutation CreateSize($value: String!) {
  createSize(value: $value) {
    id
    value
  }
}
    `;
export type CreateSizeMutationFn = Apollo.MutationFunction<CreateSizeMutation, CreateSizeMutationVariables>;

/**
 * __useCreateSizeMutation__
 *
 * To run a mutation, you first call `useCreateSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSizeMutation, { data, loading, error }] = useCreateSizeMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCreateSizeMutation(baseOptions?: Apollo.MutationHookOptions<CreateSizeMutation, CreateSizeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSizeMutation, CreateSizeMutationVariables>(CreateSizeDocument, options);
      }
export type CreateSizeMutationHookResult = ReturnType<typeof useCreateSizeMutation>;
export type CreateSizeMutationResult = Apollo.MutationResult<CreateSizeMutation>;
export type CreateSizeMutationOptions = Apollo.BaseMutationOptions<CreateSizeMutation, CreateSizeMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($file: Upload!) {
  uploadImage(file: $file) {
    url
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId) {
    id
    name
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const CreateProductFeedbackDocument = gql`
    mutation CreateProductFeedback($input: CreateProductFeedbackInput!) {
  createProductFeedback(input: $input) {
    id
    rating
    comment
    createdAt
    user {
      id
      fullName
    }
  }
}
    `;
export type CreateProductFeedbackMutationFn = Apollo.MutationFunction<CreateProductFeedbackMutation, CreateProductFeedbackMutationVariables>;

/**
 * __useCreateProductFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateProductFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductFeedbackMutation, { data, loading, error }] = useCreateProductFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductFeedbackMutation, CreateProductFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductFeedbackMutation, CreateProductFeedbackMutationVariables>(CreateProductFeedbackDocument, options);
      }
export type CreateProductFeedbackMutationHookResult = ReturnType<typeof useCreateProductFeedbackMutation>;
export type CreateProductFeedbackMutationResult = Apollo.MutationResult<CreateProductFeedbackMutation>;
export type CreateProductFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateProductFeedbackMutation, CreateProductFeedbackMutationVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CustomerLoginDocument = gql`
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
export type CustomerLoginMutationFn = Apollo.MutationFunction<CustomerLoginMutation, CustomerLoginMutationVariables>;

/**
 * __useCustomerLoginMutation__
 *
 * To run a mutation, you first call `useCustomerLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCustomerLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [customerLoginMutation, { data, loading, error }] = useCustomerLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCustomerLoginMutation(baseOptions?: Apollo.MutationHookOptions<CustomerLoginMutation, CustomerLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CustomerLoginMutation, CustomerLoginMutationVariables>(CustomerLoginDocument, options);
      }
export type CustomerLoginMutationHookResult = ReturnType<typeof useCustomerLoginMutation>;
export type CustomerLoginMutationResult = Apollo.MutationResult<CustomerLoginMutation>;
export type CustomerLoginMutationOptions = Apollo.BaseMutationOptions<CustomerLoginMutation, CustomerLoginMutationVariables>;
export const RequestRegistrationOtpDocument = gql`
    mutation RequestRegistrationOtp($fullName: String!, $email: String!, $password: String!) {
  requestRegistrationOtp(fullName: $fullName, email: $email, password: $password)
}
    `;
export type RequestRegistrationOtpMutationFn = Apollo.MutationFunction<RequestRegistrationOtpMutation, RequestRegistrationOtpMutationVariables>;

/**
 * __useRequestRegistrationOtpMutation__
 *
 * To run a mutation, you first call `useRequestRegistrationOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestRegistrationOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestRegistrationOtpMutation, { data, loading, error }] = useRequestRegistrationOtpMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRequestRegistrationOtpMutation(baseOptions?: Apollo.MutationHookOptions<RequestRegistrationOtpMutation, RequestRegistrationOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestRegistrationOtpMutation, RequestRegistrationOtpMutationVariables>(RequestRegistrationOtpDocument, options);
      }
export type RequestRegistrationOtpMutationHookResult = ReturnType<typeof useRequestRegistrationOtpMutation>;
export type RequestRegistrationOtpMutationResult = Apollo.MutationResult<RequestRegistrationOtpMutation>;
export type RequestRegistrationOtpMutationOptions = Apollo.BaseMutationOptions<RequestRegistrationOtpMutation, RequestRegistrationOtpMutationVariables>;
export const VerifyOtpAndCompleteRegistrationDocument = gql`
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
export type VerifyOtpAndCompleteRegistrationMutationFn = Apollo.MutationFunction<VerifyOtpAndCompleteRegistrationMutation, VerifyOtpAndCompleteRegistrationMutationVariables>;

/**
 * __useVerifyOtpAndCompleteRegistrationMutation__
 *
 * To run a mutation, you first call `useVerifyOtpAndCompleteRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpAndCompleteRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpAndCompleteRegistrationMutation, { data, loading, error }] = useVerifyOtpAndCompleteRegistrationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpAndCompleteRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpAndCompleteRegistrationMutation, VerifyOtpAndCompleteRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpAndCompleteRegistrationMutation, VerifyOtpAndCompleteRegistrationMutationVariables>(VerifyOtpAndCompleteRegistrationDocument, options);
      }
export type VerifyOtpAndCompleteRegistrationMutationHookResult = ReturnType<typeof useVerifyOtpAndCompleteRegistrationMutation>;
export type VerifyOtpAndCompleteRegistrationMutationResult = Apollo.MutationResult<VerifyOtpAndCompleteRegistrationMutation>;
export type VerifyOtpAndCompleteRegistrationMutationOptions = Apollo.BaseMutationOptions<VerifyOtpAndCompleteRegistrationMutation, VerifyOtpAndCompleteRegistrationMutationVariables>;
export const GetCategoriesForManagementDocument = gql`
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

/**
 * __useGetCategoriesForManagementQuery__
 *
 * To run a query within a React component, call `useGetCategoriesForManagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesForManagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesForManagementQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesForManagementQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>(GetCategoriesForManagementDocument, options);
      }
export function useGetCategoriesForManagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>(GetCategoriesForManagementDocument, options);
        }
export function useGetCategoriesForManagementSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>(GetCategoriesForManagementDocument, options);
        }
export type GetCategoriesForManagementQueryHookResult = ReturnType<typeof useGetCategoriesForManagementQuery>;
export type GetCategoriesForManagementLazyQueryHookResult = ReturnType<typeof useGetCategoriesForManagementLazyQuery>;
export type GetCategoriesForManagementSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesForManagementSuspenseQuery>;
export type GetCategoriesForManagementQueryResult = Apollo.QueryResult<GetCategoriesForManagementQuery, GetCategoriesForManagementQueryVariables>;
export const GetColorsForManagementDocument = gql`
    query GetColorsForManagement {
  getColorsForManagement {
    id
    name
    hexCode
  }
}
    `;

/**
 * __useGetColorsForManagementQuery__
 *
 * To run a query within a React component, call `useGetColorsForManagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetColorsForManagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetColorsForManagementQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetColorsForManagementQuery(baseOptions?: Apollo.QueryHookOptions<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>(GetColorsForManagementDocument, options);
      }
export function useGetColorsForManagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>(GetColorsForManagementDocument, options);
        }
export function useGetColorsForManagementSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>(GetColorsForManagementDocument, options);
        }
export type GetColorsForManagementQueryHookResult = ReturnType<typeof useGetColorsForManagementQuery>;
export type GetColorsForManagementLazyQueryHookResult = ReturnType<typeof useGetColorsForManagementLazyQuery>;
export type GetColorsForManagementSuspenseQueryHookResult = ReturnType<typeof useGetColorsForManagementSuspenseQuery>;
export type GetColorsForManagementQueryResult = Apollo.QueryResult<GetColorsForManagementQuery, GetColorsForManagementQueryVariables>;
export const GetUnassignedSizesForCategoryDocument = gql`
    query GetUnassignedSizesForCategory($subCategoryId: ID!) {
  getUnassignedSizesForCategory(subCategoryId: $subCategoryId) {
    id
    value
  }
}
    `;

/**
 * __useGetUnassignedSizesForCategoryQuery__
 *
 * To run a query within a React component, call `useGetUnassignedSizesForCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnassignedSizesForCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnassignedSizesForCategoryQuery({
 *   variables: {
 *      subCategoryId: // value for 'subCategoryId'
 *   },
 * });
 */
export function useGetUnassignedSizesForCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables> & ({ variables: GetUnassignedSizesForCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables>(GetUnassignedSizesForCategoryDocument, options);
      }
export function useGetUnassignedSizesForCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables>(GetUnassignedSizesForCategoryDocument, options);
        }
export function useGetUnassignedSizesForCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables>(GetUnassignedSizesForCategoryDocument, options);
        }
export type GetUnassignedSizesForCategoryQueryHookResult = ReturnType<typeof useGetUnassignedSizesForCategoryQuery>;
export type GetUnassignedSizesForCategoryLazyQueryHookResult = ReturnType<typeof useGetUnassignedSizesForCategoryLazyQuery>;
export type GetUnassignedSizesForCategorySuspenseQueryHookResult = ReturnType<typeof useGetUnassignedSizesForCategorySuspenseQuery>;
export type GetUnassignedSizesForCategoryQueryResult = Apollo.QueryResult<GetUnassignedSizesForCategoryQuery, GetUnassignedSizesForCategoryQueryVariables>;
export const GetCustomersDocument = gql`
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

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetCustomerByIdDocument = gql`
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

/**
 * __useGetCustomerByIdQuery__
 *
 * To run a query within a React component, call `useGetCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables> & ({ variables: GetCustomerByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
      }
export function useGetCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
        }
export function useGetCustomerByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
        }
export type GetCustomerByIdQueryHookResult = ReturnType<typeof useGetCustomerByIdQuery>;
export type GetCustomerByIdLazyQueryHookResult = ReturnType<typeof useGetCustomerByIdLazyQuery>;
export type GetCustomerByIdSuspenseQueryHookResult = ReturnType<typeof useGetCustomerByIdSuspenseQuery>;
export type GetCustomerByIdQueryResult = Apollo.QueryResult<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>;
export const GetOrdersListDocument = gql`
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
        id
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetOrdersListQuery__
 *
 * To run a query within a React component, call `useGetOrdersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersListQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetOrdersListQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersListQuery, GetOrdersListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersListQuery, GetOrdersListQueryVariables>(GetOrdersListDocument, options);
      }
export function useGetOrdersListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersListQuery, GetOrdersListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersListQuery, GetOrdersListQueryVariables>(GetOrdersListDocument, options);
        }
export function useGetOrdersListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrdersListQuery, GetOrdersListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersListQuery, GetOrdersListQueryVariables>(GetOrdersListDocument, options);
        }
export type GetOrdersListQueryHookResult = ReturnType<typeof useGetOrdersListQuery>;
export type GetOrdersListLazyQueryHookResult = ReturnType<typeof useGetOrdersListLazyQuery>;
export type GetOrdersListSuspenseQueryHookResult = ReturnType<typeof useGetOrdersListSuspenseQuery>;
export type GetOrdersListQueryResult = Apollo.QueryResult<GetOrdersListQuery, GetOrdersListQueryVariables>;
export const GetOrderByIdDocument = gql`
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

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables> & ({ variables: GetOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export function useGetOrderByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetOrderByIdSuspenseQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const GetMyOrdersListDocument = gql`
    query GetMyOrdersList($skip: Int, $take: Int) {
  getMyOrders(skip: $skip, take: $take) {
    orders {
      id
      createdAt
      orderStatus
      orderTotal
      items {
        id
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetMyOrdersListQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersListQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetMyOrdersListQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>(GetMyOrdersListDocument, options);
      }
export function useGetMyOrdersListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>(GetMyOrdersListDocument, options);
        }
export function useGetMyOrdersListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>(GetMyOrdersListDocument, options);
        }
export type GetMyOrdersListQueryHookResult = ReturnType<typeof useGetMyOrdersListQuery>;
export type GetMyOrdersListLazyQueryHookResult = ReturnType<typeof useGetMyOrdersListLazyQuery>;
export type GetMyOrdersListSuspenseQueryHookResult = ReturnType<typeof useGetMyOrdersListSuspenseQuery>;
export type GetMyOrdersListQueryResult = Apollo.QueryResult<GetMyOrdersListQuery, GetMyOrdersListQueryVariables>;
export const GetMyReturnRequestsDocument = gql`
    query GetMyReturnRequests($skip: Int, $take: Int) {
  getMyReturnRequests(skip: $skip, take: $take) {
    returnRequests {
      id
      reason
      status
      description
      createdAt
      updatedAt
      orderItem {
        id
        quantity
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
      images {
        id
        imageUrl
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetMyReturnRequestsQuery__
 *
 * To run a query within a React component, call `useGetMyReturnRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyReturnRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyReturnRequestsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetMyReturnRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>(GetMyReturnRequestsDocument, options);
      }
export function useGetMyReturnRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>(GetMyReturnRequestsDocument, options);
        }
export function useGetMyReturnRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>(GetMyReturnRequestsDocument, options);
        }
export type GetMyReturnRequestsQueryHookResult = ReturnType<typeof useGetMyReturnRequestsQuery>;
export type GetMyReturnRequestsLazyQueryHookResult = ReturnType<typeof useGetMyReturnRequestsLazyQuery>;
export type GetMyReturnRequestsSuspenseQueryHookResult = ReturnType<typeof useGetMyReturnRequestsSuspenseQuery>;
export type GetMyReturnRequestsQueryResult = Apollo.QueryResult<GetMyReturnRequestsQuery, GetMyReturnRequestsQueryVariables>;
export const GetMyOrderByIdDocument = gql`
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

/**
 * __useGetMyOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetMyOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMyOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables> & ({ variables: GetMyOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables>(GetMyOrderByIdDocument, options);
      }
export function useGetMyOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables>(GetMyOrderByIdDocument, options);
        }
export function useGetMyOrderByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables>(GetMyOrderByIdDocument, options);
        }
export type GetMyOrderByIdQueryHookResult = ReturnType<typeof useGetMyOrderByIdQuery>;
export type GetMyOrderByIdLazyQueryHookResult = ReturnType<typeof useGetMyOrderByIdLazyQuery>;
export type GetMyOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetMyOrderByIdSuspenseQuery>;
export type GetMyOrderByIdQueryResult = Apollo.QueryResult<GetMyOrderByIdQuery, GetMyOrderByIdQueryVariables>;
export const FindMyOrderForReturnDocument = gql`
    query FindMyOrderForReturn($orderId: String!) {
  findMyOrderForReturn(orderId: $orderId) {
    id
    createdAt
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

/**
 * __useFindMyOrderForReturnQuery__
 *
 * To run a query within a React component, call `useFindMyOrderForReturnQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyOrderForReturnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyOrderForReturnQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useFindMyOrderForReturnQuery(baseOptions: Apollo.QueryHookOptions<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables> & ({ variables: FindMyOrderForReturnQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables>(FindMyOrderForReturnDocument, options);
      }
export function useFindMyOrderForReturnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables>(FindMyOrderForReturnDocument, options);
        }
export function useFindMyOrderForReturnSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables>(FindMyOrderForReturnDocument, options);
        }
export type FindMyOrderForReturnQueryHookResult = ReturnType<typeof useFindMyOrderForReturnQuery>;
export type FindMyOrderForReturnLazyQueryHookResult = ReturnType<typeof useFindMyOrderForReturnLazyQuery>;
export type FindMyOrderForReturnSuspenseQueryHookResult = ReturnType<typeof useFindMyOrderForReturnSuspenseQuery>;
export type FindMyOrderForReturnQueryResult = Apollo.QueryResult<FindMyOrderForReturnQuery, FindMyOrderForReturnQueryVariables>;
export const UploadPaymentScreenshotDocument = gql`
    mutation UploadPaymentScreenshot($file: Upload!) {
  uploadPaymentScreenshot(file: $file) {
    url
  }
}
    `;
export type UploadPaymentScreenshotMutationFn = Apollo.MutationFunction<UploadPaymentScreenshotMutation, UploadPaymentScreenshotMutationVariables>;

/**
 * __useUploadPaymentScreenshotMutation__
 *
 * To run a mutation, you first call `useUploadPaymentScreenshotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPaymentScreenshotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPaymentScreenshotMutation, { data, loading, error }] = useUploadPaymentScreenshotMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadPaymentScreenshotMutation(baseOptions?: Apollo.MutationHookOptions<UploadPaymentScreenshotMutation, UploadPaymentScreenshotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPaymentScreenshotMutation, UploadPaymentScreenshotMutationVariables>(UploadPaymentScreenshotDocument, options);
      }
export type UploadPaymentScreenshotMutationHookResult = ReturnType<typeof useUploadPaymentScreenshotMutation>;
export type UploadPaymentScreenshotMutationResult = Apollo.MutationResult<UploadPaymentScreenshotMutation>;
export type UploadPaymentScreenshotMutationOptions = Apollo.BaseMutationOptions<UploadPaymentScreenshotMutation, UploadPaymentScreenshotMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    orderStatus
    orderTotal
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderStatusDocument = gql`
    mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
  updateOrderStatus(orderId: $orderId, status: $status) {
    id
    orderStatus
  }
}
    `;
export type UpdateOrderStatusMutationFn = Apollo.MutationFunction<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument, options);
      }
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = Apollo.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;
export const UploadReturnImageDocument = gql`
    mutation UploadReturnImage($file: Upload!) {
  uploadReturnImage(file: $file) {
    url
  }
}
    `;
export type UploadReturnImageMutationFn = Apollo.MutationFunction<UploadReturnImageMutation, UploadReturnImageMutationVariables>;

/**
 * __useUploadReturnImageMutation__
 *
 * To run a mutation, you first call `useUploadReturnImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadReturnImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadReturnImageMutation, { data, loading, error }] = useUploadReturnImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadReturnImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadReturnImageMutation, UploadReturnImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadReturnImageMutation, UploadReturnImageMutationVariables>(UploadReturnImageDocument, options);
      }
export type UploadReturnImageMutationHookResult = ReturnType<typeof useUploadReturnImageMutation>;
export type UploadReturnImageMutationResult = Apollo.MutationResult<UploadReturnImageMutation>;
export type UploadReturnImageMutationOptions = Apollo.BaseMutationOptions<UploadReturnImageMutation, UploadReturnImageMutationVariables>;
export const CreateReturnRequestDocument = gql`
    mutation CreateReturnRequest($input: CreateReturnRequestInput!) {
  createReturnRequest(input: $input)
}
    `;
export type CreateReturnRequestMutationFn = Apollo.MutationFunction<CreateReturnRequestMutation, CreateReturnRequestMutationVariables>;

/**
 * __useCreateReturnRequestMutation__
 *
 * To run a mutation, you first call `useCreateReturnRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReturnRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReturnRequestMutation, { data, loading, error }] = useCreateReturnRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReturnRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateReturnRequestMutation, CreateReturnRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReturnRequestMutation, CreateReturnRequestMutationVariables>(CreateReturnRequestDocument, options);
      }
export type CreateReturnRequestMutationHookResult = ReturnType<typeof useCreateReturnRequestMutation>;
export type CreateReturnRequestMutationResult = Apollo.MutationResult<CreateReturnRequestMutation>;
export type CreateReturnRequestMutationOptions = Apollo.BaseMutationOptions<CreateReturnRequestMutation, CreateReturnRequestMutationVariables>;
export const GetDashboardDataDocument = gql`
    query GetDashboardData {
  stats: getDashboardStats {
    totalRevenue
    totalOrders
    ordersThisMonth
    ordersLastMonth
    totalUsers
    newUsersThisMonth
  }
  overview: getRevenueOverview {
    month
    revenue
  }
  topSelling: getTopSellingProducts(take: 5) {
    productName
    variantInfo
    totalSold
  }
  recentOrders: getOrders(take: 5) {
    orders {
      id
      user {
        fullName
      }
      orderTotal
      orderStatus
    }
  }
}
    `;

/**
 * __useGetDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
      }
export function useGetDashboardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export function useGetDashboardDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export type GetDashboardDataQueryHookResult = ReturnType<typeof useGetDashboardDataQuery>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<typeof useGetDashboardDataLazyQuery>;
export type GetDashboardDataSuspenseQueryHookResult = ReturnType<typeof useGetDashboardDataSuspenseQuery>;
export type GetDashboardDataQueryResult = Apollo.QueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const GetProductsListDocument = gql`
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

/**
 * __useGetProductsListQuery__
 *
 * To run a query within a React component, call `useGetProductsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsListQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetProductsListQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsListQuery, GetProductsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsListQuery, GetProductsListQueryVariables>(GetProductsListDocument, options);
      }
export function useGetProductsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsListQuery, GetProductsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsListQuery, GetProductsListQueryVariables>(GetProductsListDocument, options);
        }
export function useGetProductsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsListQuery, GetProductsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsListQuery, GetProductsListQueryVariables>(GetProductsListDocument, options);
        }
export type GetProductsListQueryHookResult = ReturnType<typeof useGetProductsListQuery>;
export type GetProductsListLazyQueryHookResult = ReturnType<typeof useGetProductsListLazyQuery>;
export type GetProductsListSuspenseQueryHookResult = ReturnType<typeof useGetProductsListSuspenseQuery>;
export type GetProductsListQueryResult = Apollo.QueryResult<GetProductsListQuery, GetProductsListQueryVariables>;
export const GetProductFormDataDocument = gql`
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

/**
 * __useGetProductFormDataQuery__
 *
 * To run a query within a React component, call `useGetProductFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductFormDataQuery(baseOptions?: Apollo.QueryHookOptions<GetProductFormDataQuery, GetProductFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductFormDataQuery, GetProductFormDataQueryVariables>(GetProductFormDataDocument, options);
      }
export function useGetProductFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductFormDataQuery, GetProductFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductFormDataQuery, GetProductFormDataQueryVariables>(GetProductFormDataDocument, options);
        }
export function useGetProductFormDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductFormDataQuery, GetProductFormDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductFormDataQuery, GetProductFormDataQueryVariables>(GetProductFormDataDocument, options);
        }
export type GetProductFormDataQueryHookResult = ReturnType<typeof useGetProductFormDataQuery>;
export type GetProductFormDataLazyQueryHookResult = ReturnType<typeof useGetProductFormDataLazyQuery>;
export type GetProductFormDataSuspenseQueryHookResult = ReturnType<typeof useGetProductFormDataSuspenseQuery>;
export type GetProductFormDataQueryResult = Apollo.QueryResult<GetProductFormDataQuery, GetProductFormDataQueryVariables>;
export const GetProductByIdDocument = gql`
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

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables> & ({ variables: GetProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetColorsDocument = gql`
    query GetColors {
  getColors {
    id
    name
    hexCode
  }
}
    `;

/**
 * __useGetColorsQuery__
 *
 * To run a query within a React component, call `useGetColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetColorsQuery(baseOptions?: Apollo.QueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
      }
export function useGetColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
        }
export function useGetColorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
        }
export type GetColorsQueryHookResult = ReturnType<typeof useGetColorsQuery>;
export type GetColorsLazyQueryHookResult = ReturnType<typeof useGetColorsLazyQuery>;
export type GetColorsSuspenseQueryHookResult = ReturnType<typeof useGetColorsSuspenseQuery>;
export type GetColorsQueryResult = Apollo.QueryResult<GetColorsQuery, GetColorsQueryVariables>;
export const ListPublicProductsDocument = gql`
    query ListPublicProducts($skip: Int, $take: Int, $filter: ProductFilterInput, $sort: ProductSortInput) {
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

/**
 * __useListPublicProductsQuery__
 *
 * To run a query within a React component, call `useListPublicProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPublicProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPublicProductsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useListPublicProductsQuery(baseOptions?: Apollo.QueryHookOptions<ListPublicProductsQuery, ListPublicProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPublicProductsQuery, ListPublicProductsQueryVariables>(ListPublicProductsDocument, options);
      }
export function useListPublicProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPublicProductsQuery, ListPublicProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPublicProductsQuery, ListPublicProductsQueryVariables>(ListPublicProductsDocument, options);
        }
export function useListPublicProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPublicProductsQuery, ListPublicProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPublicProductsQuery, ListPublicProductsQueryVariables>(ListPublicProductsDocument, options);
        }
export type ListPublicProductsQueryHookResult = ReturnType<typeof useListPublicProductsQuery>;
export type ListPublicProductsLazyQueryHookResult = ReturnType<typeof useListPublicProductsLazyQuery>;
export type ListPublicProductsSuspenseQueryHookResult = ReturnType<typeof useListPublicProductsSuspenseQuery>;
export type ListPublicProductsQueryResult = Apollo.QueryResult<ListPublicProductsQuery, ListPublicProductsQueryVariables>;
export const GetMainSubCategoriesDocument = gql`
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

/**
 * __useGetMainSubCategoriesQuery__
 *
 * To run a query within a React component, call `useGetMainSubCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMainSubCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMainSubCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMainSubCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>(GetMainSubCategoriesDocument, options);
      }
export function useGetMainSubCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>(GetMainSubCategoriesDocument, options);
        }
export function useGetMainSubCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>(GetMainSubCategoriesDocument, options);
        }
export type GetMainSubCategoriesQueryHookResult = ReturnType<typeof useGetMainSubCategoriesQuery>;
export type GetMainSubCategoriesLazyQueryHookResult = ReturnType<typeof useGetMainSubCategoriesLazyQuery>;
export type GetMainSubCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetMainSubCategoriesSuspenseQuery>;
export type GetMainSubCategoriesQueryResult = Apollo.QueryResult<GetMainSubCategoriesQuery, GetMainSubCategoriesQueryVariables>;
export const GetCategoriesDocument = gql`
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

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetMeDocument = gql`
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

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;