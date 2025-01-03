import React, {useState} from 'react';
import AuthLayout from '../layouts/authentication/AuthLayout';
import LeftSideRegistrationWrapper from '../components/Register/LeftSideRegistrationWrapper';
import RightSideRegistrationWrapper from '../components/Register/RightSideRegistrationWrapper';
import { register } from '../services/UserService';


const Register = ({ }) => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirm_password: ''
      });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(registerData.email)) {
            setError({"email": "Provide correct email."});
            return;
        }

        if (registerData.password.length < 8 || !/\d/.test(registerData.password) || !/[a-zA-Z]/.test(registerData.password)) {
          setError({"password": "The password must contain at least 8 characters, one number and one letter."});
          return;
        }

        if (registerData.password !== registerData.confirm_password) {
          setError({"confirm_password": "Provided passwords do not match."});
          return;
        }

        try {
          const response = await register(registerData);
          console.log('Registration successful:', response);
          setError(null);
          setSuccess("Registration successful!")
          setRegisterData({
            email: '',
            password: '',
            confirm_password: ''
            });
        } catch (err) {
          console.error('Registration failed:', err);
          setSuccess(null);
          setError(err);
        }
      };

    return (
        <AuthLayout>
            <LeftSideRegistrationWrapper>
            </LeftSideRegistrationWrapper> 
            <RightSideRegistrationWrapper 
                registerData={registerData}
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                error={error} 
                success={success}>
            </RightSideRegistrationWrapper>
        </AuthLayout>
    )
}

export default Register;