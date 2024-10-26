import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import '../styles/auth.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.table({ name, email, password });
    }
    const isFormFilled = name && email && password;

    return (
        <div className="signup-container">
            <div className="signup-form">
                <form action="" method='post' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id='Name' 
                        name='name'
                        required 
                        placeholder='Enter your name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        id='Email' 
                        name='email'
                        required 
                        placeholder='Enter your email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        id='pass' 
                        name='password'
                        required 
                        placeholder='Enter your password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="login">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                    <button type="submit" id={isFormFilled ? 'btnSucc' : 'btn'}>Sign Up</button>
                </form>
            </div>
            <div className="show-off">
                <h2>Welcome to <span>e-Shop</span></h2>
                <p>India's no 1 virtual Shop</p>
            </div>
        </div>
    )
}

export default Signup