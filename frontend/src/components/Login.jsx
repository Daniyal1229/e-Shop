import React, { useState } from 'react'
import '../styles/auth.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.table({ email, password });
    }
    const isFormFilled = email && password;

    return (
        <div className="signup-container">
            <div className="signup-form">
                <form action="" method='post' onSubmit={handleSubmit}>
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
                    <button type="submit" id={isFormFilled ? 'btnSucc' : 'btn'}>Sign Up</button>
                </form>
            </div>
            <div className="show-off">
                <h2>Welcome back! <span>e-Shop</span></h2>
                <p>India's no 1 virtual Shop</p>
            </div>
        </div>
    )
}

export default Login;