import {gql} from '@apollo/client'

export const CREATE_CUSTOMER=gql`
    mutation register($name: String!, $email: String!, $password: String! , $register_type: String){
    register(name: $name, email: $email, password: $password , register_type: $register_type)
}`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!, $login_type: String) {
    login(email: $email, password: $password, login_type: $login_type)
  }
`;

export const UPDATE_CUSTOMER_DETAILS = gql`
  mutation UpdateCustomerDetails($id: Int!, $name: String!, $address: String!) {
    setCustomerDetails(id: $id, name: $name, address: $address)
  }
`;


