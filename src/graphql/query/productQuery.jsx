import { gql, useQuery } from '@apollo/client';

export const RANDOM_PRODUCT = gql`
  query getRandomProducts {
    getRandomProducts {
      product_id
      product_name
      description
      image
      price
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($search: String!) {
    searchProducts(search: $search) {
      product_id
      product_name
      description
      price
      image
    }
  }
`;