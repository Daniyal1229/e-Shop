import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/nav.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Nav = () => {

let isAuthenticated = localStorage.getItem('token');
const navigate = useNavigate();

const handleLogout = async() => {
    let response =  await axios.post("http://localhost:5000/eShop/v1/api/users/logout")
    if(response.status === 200){
        localStorage.removeItem('token');
        console.log("hello");
        
        navigate('/');
        toast.success('Logout successful');
    }else{
        console.log("failed");
        
        toast.error('Logout failed');
    }
}

    return (
        <nav>
            <span>e-Shop</span>
            <input type="search"
                placeholder='what are you looking for?'
            />
            <div className='nav-links'>
                <Link to='/'>Home</Link>
                <Link to='/category'>category</Link>
                {!isAuthenticated ?
                    <div className='nav-links'>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                    :
                    <div className='nav-links2'>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/profile'>Profile</Link>
                    <button className='logout' onClick={handleLogout}>Logout</button>
                    </div>
                }
            </div>
            <ToastContainer />
        </nav>
    )
}

export default Nav
