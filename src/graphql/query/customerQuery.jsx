import { gql } from '@apollo/client'

export const USER_DETAILS = gql`
  query getCustomerDetails{
    getCustomerDetails{
      email
      name
      address
    }
  }
`;
