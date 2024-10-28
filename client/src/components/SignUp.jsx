import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const SignUp = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
            autoClose: 5000, 
        });

    const handleSuccess = (message) =>
        toast.success(message, { 
            position: "bottom-right",
            autoClose: 5000, 
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/signup",
                { ...inputValue },
                { withCredentials: true }
            );
            // console.log(data); 
            const { success, message } = data; 
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
            handleError("An error occurred. Please try again."); 
        }
        setInputValue({
            email: "",
            username: "",
            password: "",
        });
    };

    return (
        <>
            <div className="form_container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type="text" 
                            name='username'
                            value={username}
                            placeholder='Enter your username'
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter your password'
                        />
                    </div>

                    <button type='submit'>Submit</button>
                    <span>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default SignUp;
