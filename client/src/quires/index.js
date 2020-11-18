import { gql } from "apollo-boost";

export const GET_ALL_RECIPES = gql`

query{
    getAllRecipies{
        name

        description

        instructions

        category

        likes

        createdDate
    }
}

`;


// USER QUIRES

export const GET_CURRENT_USER = gql`

query{
    getCurrentUser{
        username

        joinDate
        
        email   

    }
}

`;

//USER MUTATION

export const SIGNIN_USER = gql`
    mutation ($username: String!, $password: String!) {
  signinUser(username: $username, password: $password) {
    token
  }
}


`;

export const SIGNUP_USER = gql`
mutation ($username: String!, $email: String!, $password: String!) {
  signupUser(username: $username, email: $email, password: $password) {
    token
  }
}



`