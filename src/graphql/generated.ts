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

export type CustomerListResponse = {
  __typename?: 'CustomerListResponse';
  customers: Array<User>;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignSizesToSubCategory: Category;
  createCategory: Category;
  createColor: Color;
  createProduct: Product;
  createSize: Size;
  deleteCategory: SuccessResponse;
  deleteColor: SuccessResponse;
  deleteProduct: Product;
  deleteSize: SuccessResponse;
  login: AuthPayload;
  removeSizeFromSubCategory: Category;
  updateCategory: Category;
  updateColor: Color;
  updateProduct: Product;
  updateSize: Size;
  uploadImage: UploadedImage;
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


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateSizeArgs = {
  value: Scalars['String']['input'];
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


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateColorArgs = {
  hexCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};


export type MutationUpdateSizeArgs = {
  id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
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
  priceAtPurchase: Scalars['Float']['output'];
  product: Product;
  productVariant: ProductVariant;
  quantity: Scalars['Int']['output'];
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
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
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
  getCategories?: Maybe<Array<Category>>;
  getCategoriesForManagement: Array<Category>;
  getColors?: Maybe<Array<Color>>;
  getColorsForManagement: Array<Color>;
  getCustomerById?: Maybe<User>;
  getCustomers?: Maybe<CustomerListResponse>;
  getMainSubCategories: Array<Category>;
  getOrderById?: Maybe<Order>;
  getOrders: OrderListResponse;
  getProductById?: Maybe<Product>;
  getProducts?: Maybe<ProductListResponse>;
  getSizes?: Maybe<Array<Size>>;
  getUnassignedSizesForCategory: Array<Size>;
  listPublicProducts?: Maybe<PublicProductListResponse>;
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCustomersArgs = {
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


export type QueryGetUnassignedSizesForCategoryArgs = {
  subCategoryId: Scalars['ID']['input'];
};


export type QueryListPublicProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductSortInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
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

export type UploadedImage = {
  __typename?: 'UploadedImage';
  filename: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Address>>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phoneNumber: Scalars['String']['output'];
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, phoneNumber: string, role: UserRole } } };

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


export type GetCustomersQuery = { __typename?: 'Query', getCustomers?: { __typename?: 'CustomerListResponse', totalCount: number, customers: Array<{ __typename?: 'User', id: string, fullName: string, email: string, phoneNumber: string, createdAt: string }> } | null };

export type GetCustomerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCustomerByIdQuery = { __typename?: 'Query', getCustomerById?: { __typename?: 'User', id: string, fullName: string, email: string, phoneNumber: string, createdAt: string, updatedAt: string, addresses?: Array<{ __typename?: 'Address', id: string, fullName: string, phoneNumber: string, addressLine1: string, addressLine2?: string | null, city: string, state: string, postalCode: string, isDefault?: boolean | null }> | null } | null };

export type GetOrdersListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetOrdersListQuery = { __typename?: 'Query', getOrders: { __typename?: 'OrderListResponse', totalCount: number, orders: Array<{ __typename?: 'Order', id: string, createdAt: string, orderStatus: OrderStatus, orderTotal: number, user: { __typename?: 'User', fullName: string }, items: Array<{ __typename?: 'OrderItem', id: string }> }> } };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', getOrderById?: { __typename?: 'Order', id: string, createdAt: string, orderStatus: OrderStatus, orderTotal: number, user: { __typename?: 'User', id: string, fullName: string, email: string }, shippingAddress: { __typename?: 'Address', fullName: string, phoneNumber: string, addressLine1: string, addressLine2?: string | null, city: string, state: string, postalCode: string }, payment?: { __typename?: 'Payment', paymentMethod: PaymentMethod, paymentStatus: PaymentStatus, amount: number } | null, items: Array<{ __typename?: 'OrderItem', id: string, quantity: number, priceAtPurchase: number, product: { __typename?: 'Product', id: string, name: string }, productVariant: { __typename?: 'ProductVariant', id: string, size: { __typename?: 'Size', value: string }, color: { __typename?: 'Color', name: string }, images?: Array<{ __typename?: 'ProductImage', imageUrl: string }> | null } }> } | null };

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


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'Product', id: string, name: string, description?: string | null, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, sku?: string | null, price: number, stock: number, size: { __typename?: 'Size', id: string, value: string }, color: { __typename?: 'Color', id: string, name: string, hexCode?: string | null }, images?: Array<{ __typename?: 'ProductImage', id: string, imageUrl: string, altText?: string | null, isPrimary: boolean }> | null } | null> | null } | null };

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
      state
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