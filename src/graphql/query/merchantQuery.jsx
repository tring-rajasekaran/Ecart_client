import { gql, useQuery } from '@apollo/client';

export const GET_MERCHANT_PRODUCT=gql`
   query{
     getMerchantProduct {
       product_id 
        product_name 
        description 
        price 
        merchant_id 
        image 
   }
}
`