import { gql } from '@apollo/client'

export const USER_DETAILS = gql`
  query getCustomerDetails{
    getCustomerDetails (id : 2){
      email
      name
      address
    }
  }
`;
