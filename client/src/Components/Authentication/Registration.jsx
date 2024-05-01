import React, { useState } from 'react';
import bgImage from '../../assets/login/login-bg.png';
import gl from '../../assets/login/google.png';
import fb from '../../assets/login/fb.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUP = () => {
    // State variables to store input field values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
        }

        const res = await axios.post('http://localhost:5000/api/user/reg', data);
        console.log(res.data);
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // height: '100vh', // Adjust height as needed
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='lg:w-[600px] mx-auto shadow-xl bg-white p-16'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1 className='text-4xl font-bold text-center my-4'>Sign Up Account</h1>
                            <ul className='flex justify-center items-center gap-2 pb-10'>
                                <li>Home</li>
                                <li></li>
                                <Link to='/'>Login Now</Link>
                            </ul>
                        </div>
                        <div className='flex justify-center items-center gap-2 pb-8'>
                            <div className='border border-black w-full flex justify-center items-center gap-41 cursor-pointer'>
                                <img src={gl} alt="" className='h-12 w-12' />
                                <h1>Sign Up With Google</h1>
                            </div>
                            <div className='border border-black w-full flex justify-center items-center gap-1 cursor-pointer'>
                                <img src={fb} alt="" className='h-12 w-12' />
                                <h1>Sign Up With Facebook</h1>
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
                                    placeholder='Shimul Zahan'
                                    className='border border-black py-3 px-5 w-full'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Name</h1>
                            </div>
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
                            <span className="flex items-center">
                                <span className="h-px flex-1 bg-black"></span>
                                <span className="shrink-0 px-4">Birth Date</span>
                                <span className="h-px flex-1 bg-black"></span>
                            </span>
                            {/* Fields for Day, Month, and Year */}
                            <div className='flex gap-4'>
                                <input
                                    type="text"
                                    placeholder='Day'
                                    className='border border-black py-3 px-5 w-full'
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Month'
                                    className='border border-black py-3 px-5 w-full'
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Year'
                                    className='border border-black py-3 px-5 w-full'
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </div>
                            <button type='submit' className='border-2 bg-black text-white border-black py-3 px-5 w-full'>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUP;
