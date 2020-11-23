import React from 'react'

import { withRouter} from 'react-router-dom' 
import {Query} from 'react-apollo'

import {GET_RECIPE} from '../../quires'
import LikeRecipe from './LikeRecipe'



const  RecipePage = ({ match}) =>{
    const { _id } = match.params
    console.log(_id);
    return(

       <Query query={GET_RECIPE} variables={{ _id}}>

           {({data, loading , error})=>{

               if (loading) return<div>loading...</div>
               if (error) return<div>error...</div>
                console.log(data);
               return<div className="App">
                    <h2>{data.getRecipe.name}</h2>
                    <p>Category:{data.getRecipe.category}</p>
                    <p>Description:{data.getRecipe.description}</p>
                    <p>Instractions:{data.getRecipe.instructions}</p>
                    <p>Like:{data.getRecipe.likes}</p>
                  

                    <LikeRecipe _id={_id}/>
                    

                    </div>
           }}
       </Query>
       
    )
}

export default withRouter(RecipePage)
