import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../..//styles/auth.css'
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData  ={
            email,
            password
        }
        try {
            let response = await axios.post('http://localhost:5000/eShop/v1/api/users/login', formData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            
            
            if(response.status === 200){
                const token = await response.data.accessToken;
                localStorage.setItem('token', token);
            toast.success('Login successful');  
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else{
            toast.error('Error logging in');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            toast.error(error.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }
    const isFormFilled = email && password;

    return (
        <div className="signup-container">
            <div className="signup-form">
                <form  onSubmit={handleSubmit}>
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
                    <button type="submit" id={isFormFilled ? 'btnSucc' : 'btn'}>Login</button>
                </form>
            </div>
            <div className="show-off">
                <h2>Welcome back! <span>e-Shop</span></h2>
                <p>India's no 1 virtual Shop</p>
            </div>
        <ToastContainer />
        </div>
    )
}

export default Login;