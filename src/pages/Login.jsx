import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {

    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password);

        if(result.success){
            navigate("/");
        }else{
            setError("Invalid Credentials");
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
        <div className='card p-4 shadow' style={{width : "350px"}}>
            <h4 className="text-center mb-3">Login</h4>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type='email'
                    className='form-control mb-3'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    className='form-control mb-3'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error && <span className='text-danger'>{error}</span>}
                <button className='btn btn-dark w-100 mt-3' disabled={loading}>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login