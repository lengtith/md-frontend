import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const history = useNavigate();
    const [auth, setAuth] = useState({
        username: "",
        password: "",

    })
    const handleAuth = (event) => {
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value });
    };
    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { ...auth }).catch(err => console.log(err));
            const data = await res.data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin().then(() => history("/products"));
    }
    return (
        <div>
            <div className='bg-white p-5 rounded-lg shadow-lg'>
                <h3>Login</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2.5'>
                        <input className='border' type="text" name="username" id="" value={auth.username} onChange={handleAuth} />
                        <input className='border' type="text" name="password" id="" value={auth.password} onChange={handleAuth} />
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login