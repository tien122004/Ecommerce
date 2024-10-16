import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'; // Dùng uuid để tạo ID ngẫu nhiên

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    localStorage.setItem('login', false)

    const getStoredUsers = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const users = getStoredUsers();
        const userExists = users.some(user => user.username === username && user.email === email);

        if (userExists) {
            toast.error('Username already exists. Please choose a different one.');
        } else {
            const newUser = { id: uuidv4(), username, email, password };
            localStorage.setItem('users', JSON.stringify([...users, newUser]));

            toast.success('Registration successful! Redirecting to login.');
            setCurrentState('Login');
            navigate('/login')
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const users = getStoredUsers();
        const userIndex = users.findIndex(user => user.email === email)
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            toast.success('Login successful! Redirecting to home.');
            navigate('/home')
            localStorage.setItem('userIndex', userIndex)
            localStorage.setItem('login', true)
            localStorage.setItem('userId', users[userIndex].id)
        } else {
            toast.error('Incorrect email or password. Please try again or register.');
        }
    };

    return (
        <form onSubmit={currentState === 'Login' ? handleLogin : handleRegister}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800"></hr>
            </div>
            {currentState === 'Login' ? '' : (
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            )}
            <input
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className=" cursor-pointer">Forgot your password?</p>
                {currentState === 'Login' ? (
                    <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
                        Create account
                    </p>
                ) : (
                    <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
                        Login here
                    </p>
                )}
            </div>
            <button className="bg-black text-white font-light px-8 py-2 mt-4">
                {currentState === 'Login' ? 'Login' : 'Sign Up'}
            </button>
        </form>
    );
};

export default Login;
