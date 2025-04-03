import { gql, useQuery } from '@apollo/client';

export const GET_MERCHANT_PRODUCT = gql`
  query GetMerchantProduct($page: Int!) {
    getMerchantProduct(page: $page) {
      product_id
      product_name
      description
      price
      merchant_id
      image
    }
  }
`


export const GET_MERCHANT_ORDER = gql`
    query{
        getMerchantOrders{
            product_id 
            customer_id 
            quantity 
            product_name 
            description 
            price 
            image 
            name 
            email 
            address
            order_status
        }
    }
`
export const UPDATE_MERCHANT_ORDER = gql`
  mutation changeOrderStatus($product_id: Int!, $statusofOrder: String!) {
    changeOrderStatus(product_id: $product_id, statusofOrder: $statusofOrder)
  }
`;


