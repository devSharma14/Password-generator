import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => 
        toast.error(err, {
            position: 'bottom-left',
        });

    const handleSuccess = (message) =>
        toast.success(message, {
            position: 'bottom-left',
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/signin",
                { ...inputValue },
                { withCredentials: true }
            );
            console.log("Data received:", data);
            const { success, message } = data;

            if (success) {
                handleSuccess(message);
                // Clear input values before navigating
                setInputValue({
                    email: "",
                    password: "",
                });
                setTimeout(() => {
                    navigate("/home");
                }, 5000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log("Error occurred:", error.response || error);
            handleError("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="form_container">
                <h2>Login Account</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={handleOnChange}
                            required // Add required attribute for form validation
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={handleOnChange}
                            required // Add required attribute for form validation
                        />
                    </div>
                    <button type='submit'>Submit</button>
                    <span>
                        Do not have an account? <Link to={"/signup"}>Sign Up</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}

export default Login;
