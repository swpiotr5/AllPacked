import React, { useState } from 'react';
import AuthLayout from '../layouts/authentication/AuthLayout';
import LeftSideLoginWrapper from '../components/Login/LeftSideLoginWrapper';
import RightSideLoginWrapper from '../components/Login/RightSideLoginWrapper';
import { login } from '../services/UserService';
import { useNavigate } from 'react-router-dom';


const Login = ({setIsAuth}) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
      });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await login(loginData, navigate);
          setIsAuth(true);
          setError(null);
          setLoginData({
            username: '',
            password: '',
            });
        } catch (err) {
          setError(err);
        }
      };

    return (
        <AuthLayout>
            <LeftSideLoginWrapper loginData={loginData} handleChange={handleChange} handleSubmit={handleSubmit} error={error}>
            </LeftSideLoginWrapper>   
            <RightSideLoginWrapper>
            </RightSideLoginWrapper>
        </AuthLayout>
    )
}

export default Login;