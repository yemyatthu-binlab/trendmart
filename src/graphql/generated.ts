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
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createColor: Color;
  createProduct: Product;
  deleteProduct: Product;
  login: AuthPayload;
  updateProduct: Product;
  uploadImage: UploadedImage;
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


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};

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

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  getCategories?: Maybe<Array<Category>>;
  getColors?: Maybe<Array<Color>>;
  getMainSubCategories: Array<Category>;
  getProducts?: Maybe<ProductListResponse>;
  getSizes?: Maybe<Array<Size>>;
};


export type QueryGetProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Size = {
  __typename?: 'Size';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
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
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phoneNumber: Scalars['String']['output'];
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string } };

export type CreateColorMutationVariables = Exact<{
  name: Scalars['String']['input'];
  hexCode: Scalars['String']['input'];
}>;


export type CreateColorMutation = { __typename?: 'Mutation', createColor: { __typename?: 'Color', id: string, name: string, hexCode?: string | null } };

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

export type GetProductsListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsListQuery = { __typename?: 'Query', getProducts?: { __typename?: 'ProductListResponse', totalCount: number, products: Array<{ __typename?: 'Product', id: string, name: string, createdAt: string, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, variants?: Array<{ __typename?: 'ProductVariant', id: string } | null> | null }> } | null };

export type GetProductFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductFormDataQuery = { __typename?: 'Query', getSizes?: Array<{ __typename?: 'Size', id: string, value: string }> | null, getColors?: Array<{ __typename?: 'Color', id: string, name: string, hexCode?: string | null }> | null, getCategories?: Array<{ __typename?: 'Category', id: string, name: string }> | null, getMainSubCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'Query', getColors?: Array<{ __typename?: 'Color', id: string, name: string, hexCode?: string | null }> | null };


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