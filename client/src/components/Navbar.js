import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Signout from './Auth/Signout'

const Navbar = ({session}) =>(

<nav>
    {session && session.getCurrentUser ?<NavbarAuth session={session}/> : <NavbarUnAuth/>}
</nav>
)

const NavbarAuth = ({ session})=>(
    <>
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li> 

        <li>
            <NavLink to="/search">Search</NavLink>
        </li>

        
        <li>
            <NavLink to="/recipe/add">Add Recipe</NavLink>
        </li>


        <li>
            <NavLink to="/profile">Profile</NavLink>
        </li>

        <li>
            <Signout/>
        </li>
    </ul>

<h2>Welcome ,{session.getCurrentUser.username}</h2>
   </>

)


const NavbarUnAuth =()=>(

    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>

        
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>

        
        <li>
            <NavLink to="/signin">Signin</NavLink>
        </li>

        
        <li>
            <NavLink to="/signup">Signup</NavLink>
        </li>
    </ul>
)

export default Navbar