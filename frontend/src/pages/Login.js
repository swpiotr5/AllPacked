import React from 'react';
import AuthLayout from '../layouts/authentication/AuthLayout';
import LeftSideWrapper from '../layouts/authentication/LeftSideWrapper';
import RightSideWrapper from '../layouts/authentication/RightSideWrapper';
import LeftSideContainer from '../components/Login/LeftSideContainer';
import FormContainer from '../components/Login/FormContainer';


const Login = ({ setIsAuth }) => {

    return (
        <AuthLayout>
            <LeftSideWrapper>
                <LeftSideContainer>
                    <FormContainer>
                    </FormContainer>
                </LeftSideContainer>
            </LeftSideWrapper>   
            <RightSideWrapper>

            </RightSideWrapper>
        </AuthLayout>
    )
}

export default Login;