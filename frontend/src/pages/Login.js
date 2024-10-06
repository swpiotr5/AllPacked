import React from 'react';
import AuthLayout from '../layouts/authentication/AuthLayout';
import LeftSideWrapper from '../layouts/authentication/LeftSideWrapper';
import RightSideWrapper from '../layouts/authentication/RightSideWrapper';
import LeftSideContainer from '../components/Login/LeftSideContainer';
import FormContainer from '../components/Login/FormContainer';
import RightSideContainer from '../components/Login/RightSideContainer';


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
                <RightSideContainer>
                </RightSideContainer>
            </RightSideWrapper>
        </AuthLayout>
    )
}

export default Login;