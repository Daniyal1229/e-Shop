import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/auth.css'


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            name,
            email,
            password
        }

        try {
            const response = await axios.post('http://localhost:5000/eShop/v1/api/users/signup/',
                formData,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                

            if (response.status === 201) {
                const token = await response.data.accessToken;
                localStorage.setItem('token', token);
                toast.success('User created successfully');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error('Error creating user');
                setTimeout(() => {
                    navigate('/signup');
                }, 2000);
            }
        } catch (error) {
            toast.error('Error creating user');
            console.log(error.message);
            
        }

        setName('');
        setEmail('');
        setPassword('');
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
            
            <ToastContainer />
        </div>
    )
}

export default Signup
