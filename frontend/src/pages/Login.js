import React from 'react';
import AuthLayout from '../layouts/authentication/AuthLayout';
import LeftSideLoginWrapper from '../components/Login/LeftSideLoginWrapper';
import RightSideLoginWrapper from '../components/Login/RightSideLoginWrapper';


const Login = () => {

    return (
        <AuthLayout>
            <LeftSideLoginWrapper>
            </LeftSideLoginWrapper>   
            <RightSideLoginWrapper>
            </RightSideLoginWrapper>
        </AuthLayout>
    )
}

export default Login;