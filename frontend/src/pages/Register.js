import React from 'react';
import AuthLayout from '../layouts/authentication/AuthLayout';
import LeftSideWrapper from '../layouts/authentication/LeftSideWrapper';
import RightSideWrapper from '../layouts/authentication/RightSideWrapper';
import LeftSideContainer from '../components/Register/LeftSideContainer';
import RightSideContainer from '../components/Register/RightSideContainer';
import FormContainer from '../components/Register/FormContainer';


const Register = ({ }) => {

    return (
        <AuthLayout>
            <LeftSideWrapper>
                <LeftSideContainer>
                </LeftSideContainer>
            </LeftSideWrapper>   
            <RightSideWrapper>
                <RightSideContainer>
                    <FormContainer>
                    </FormContainer>
                </RightSideContainer>
            </RightSideWrapper>
        </AuthLayout>
    )
}

export default Register;