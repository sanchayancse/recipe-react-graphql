import React from 'react'
import { Mutation } from 'react-apollo';
import withSession from '../withSession'
 import {GET_RECIPE, LIKE_RECIPE, UNLIKE_RECIPE} from '../../quires'

class LikeRecipe  extends React.Component{

    state ={
        username: ''
    }

componentDidMount(){
    if(this.props.session.getCurrentUser){
        const {username} = this.props.session.getCurrentUser

        console.log(username);

        this.setState({ username})
    }
}


handleLike =(likeRecipe)=>{
    this.setState(
        
    )
    likeRecipe().then(({data})=>{
        console.log(data);
    })
    
}

updateLike =(cache, {data:{likeRecipe}}) =>{
    const {_id} = this.props;
    const {getRecipe} = cache.readQuery({ query: GET_RECIPE, variables:{_id} })


    cache.writeQuery(
        {
            query: GET_RECIPE,
            variables:{_id},
            data:{
                getRecipe:{ ...getRecipe, likes: likeRecipe.likes + 1 }
            }
        }
    )
}

render(){
    const {username} = this.state;

    const {_id} = this.props;
    return(
        <Mutation mutation={UNLIKE_RECIPE} 
        variables={{_id, username}}>
        {unlikeRecipe=>{
            

            <Mutation mutation={LIKE_RECIPE} 
            variables={{_id, username}} 
            update={this.updateLike}
            
            >
        {(likeRecipe)=>{
        
        
        return(
        
        
                
            username && <button onClick={()=> this.handleLike(likeRecipe, unlikeRecipe)}>{likes? "Unlike" : "Like"}</button>
        )
        
        
        }}
               </Mutation>
        }}

   
       </Mutation>
       )
}

}

export default withSession(LikeRecipe)