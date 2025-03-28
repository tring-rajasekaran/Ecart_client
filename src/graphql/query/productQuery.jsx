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

export const GET_CART_PRODUCT = gql`
  query getCartProducts {
    getCartProducts {
      product_id
      product_name
      price
      quantity
      description
      image
      quantity
    }
  }
`;

export const  GET_CART_QUANTITY = gql`
    query getCartQuantity{
        getCartQuantity
    }
`

export const GET_RECENT_SEARCH = gql`
    query getRecentSearch{
        getRecentSearch{
            searched_product_name
        }
    }
`
export const GET_ORDERED_PRODUCT = gql`
    query {
      getOrdersProduct {
        product_id
        quantity
        product_name
        description
        price
        merchant_id
        customer_name
        image
  }
}
`


