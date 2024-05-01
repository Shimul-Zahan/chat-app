import React, { useContext, useState } from 'react';
import bgImage from '../../assets/login/login-bg.png';
import gl from '../../assets/login/google.png';
import fb from '../../assets/login/fb.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }

        const res = await axios.post('http://localhost:5000/api/user/login', data);
        if (res.data._id) {
            localStorage.setItem('userInfoForChatApp', JSON.stringify(res.data))
            navigate('/chat')
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh', // Adjust height as needed
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='lg:w-[600px] mx-auto shadow-xl bg-white p-16'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1 className='text-4xl font-bold text-center my-4'>Login Account</h1>
                            <ul className='flex justify-center items-center gap-2 pb-10'>
                                <li>Home</li>
                                <li></li>
                                <Link to="/register">Register Now</Link>
                            </ul>
                        </div>
                        <div className='flex justify-center items-center gap-2 pb-8'>
                            <div className='border border-black w-full flex justify-center items-center gap-41 cursor-pointer'>
                                <img src={gl} alt="" className='h-12 w-12' />
                                <h1>Login With Google</h1>
                            </div>
                            <div className='border border-black w-full flex justify-center items-center gap-1 cursor-pointer'>
                                <img src={fb} alt="" className='h-12 w-12' />
                                <h1>Login With Facebook</h1>
                            </div>
                        </div>
                        <span className="flex items-center pb-8">
                            <span className="h-px flex-1 bg-black"></span>
                            <span className="shrink-0 px-4">or Sign in with Email</span>
                            <span className="h-px flex-1 bg-black"></span>
                        </span>

                        <div className='space-y-8'>
                            <div className='relative'>
                                <input
                                    type="text"
                                    placeholder='shimul@gmail.com'
                                    className='border border-black py-3 px-5 w-full'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Email</h1>
                            </div>
                            <div className='relative'>
                                <input
                                    type="password"
                                    placeholder='********'
                                    className='border border-black py-3 px-5 w-full'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Password</h1>
                            </div>
                            <button type='submit' className='border-2 bg-black text-white border-black py-3 px-5 w-full'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
