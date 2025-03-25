import { gql } from '@apollo/client'

export const USER_DETAILS = gql`
  query getCustomerDetails($id : Int!){
    getCustomerDetails (id : $id){
      email
      name
      address
    }
  }
`;
