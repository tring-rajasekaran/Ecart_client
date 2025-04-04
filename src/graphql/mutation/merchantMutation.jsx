import { gql } from '@apollo/client'

export const MERCHANT_LOGIN = gql`
    mutation login($email: String!, $password: String!, $login_type: String) {
    login(email: $email, password: $password, login_type: $login_type)
  }
`

export const EDIT_PRODUCT = gql`
    mutation updateMerchantProduct($input : EditedProduct!){
         updateMerchantProduct(input : $input)
    }
`

export const ADD_PRODUCT = gql`
    mutation addMerchantProduct($input : EditedProduct!){
        addMerchantProduct(input : $input)
    }
`

export const DELETE_PRODUCT = gql`
   mutation deleteMerchantProduct($product_id: Int!){
    deleteMerchantProduct(product_id: $product_id)
}
`;


export const LOG_OUT = gql`
    mutation logout{
        logout
    }
`