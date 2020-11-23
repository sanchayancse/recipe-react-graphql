import { gql } from "apollo-boost";

export const GET_ALL_RECIPES = gql`

query{
    getAllRecipies{
        _id

        name

        description

        instructions

        category

        likes

        createdDate
    }
}

`;

export const GET_RECIPE = gql`

query($_id:ID!){
  getRecipe(_id: $_id){
    _id
    name
    category
    description
    instructions
    likes
    createdDate
    
  }
}

`;


export const LIKE_RECIPE = gql`

mutation($_id: ID!, $username: String!){
  likeRecipe(_id: $_id, username: $username){

    _id
    likes

  }
}
`;


export const UNLIKE_RECIPE = gql`

mutation($_id: ID!, $username: String!){
  unlikeRecipe(_id: $_id, username: $username){

    _id
    likes

  }
}
`;



export const SEARCH_RECIPES = gql`
 
 query($searchTerm: String){
   searchRecipes(searchTerm: $searchTerm){
    _id
    name
    likes

   }
 }

`





//Recipes Mutation 

export const ADD_RECIPE = gql`

mutation($name: String!, $description: String!, $category: String!, $instructions: String!, $username: String! 


){
  addRecipe(name:$name, description:$description, instructions:$instructions, category:$category, username:$username  ){
    _id
    name
    description
    instructions
    category
    likes
    createdDate


  }
}

`


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