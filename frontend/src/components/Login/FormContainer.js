import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../App.css'; 

const FormContainer = ({loginData, handleChange, handleSubmit}) => {

    return (
        <div className="relative flex flex-col justify-center items-center w-full">
            <form className="flex flex-col p-1 w-3/5" onSubmit={handleSubmit}>
                <div className="relative">
                    <p className="text-custom-white mb-1 text-">Email</p>
                    <input
                        type="text"
                        id="email"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        className="p-2 pl-3 bg-input-lower-opacity input-placeholder shadow-2xl text-custom-white rounded-xl w-full text-sm"
                        placeholder="&#xf007;"
                        style={{ fontFamily: 'Arial, FontAwesome' }}
                    />
                </div>
                <div className="relative mb-3">
                    <p className="text-custom-white mb-1 mt-3">Password</p>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        className="p-2 pl-3 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        placeholder="&#xf023;"
                        style={{ fontFamily: 'Arial, FontAwesome' }}
                    />
                    <div className="text-right mt-2">
                        <a href="/resetPassword" className="text-custom-white hover:underline block text-xs mt-3">Forgot password?</a>
                    </div>                
                </div>
                <button type="submit" className=" border-slate-600 p-1 mt-6 font-bold shadow-2xl bg-custom-white text-custom-dark-blue rounded-xl text-xl hover:bg-custom-dark-blue hover:text-custom-white">Sign In</button>
                
                <div className="flex items-center my-4 w-full">
                    <div className="flex-grow border-t border-custom-white"></div>
                    <span className="mx-4 text-custom-white">OR</span>
                    <div className="flex-grow border-t border-custom-white"></div>
                </div>

                <button className="flex items-center justify-center border-slate-600 p-1 opacity-80 p-2 font-semibold shadow-2xl bg-custom-dark-blue text-custom-white rounded-xl text-l hover:bg-custom-white hover:text-custom-dark-blue">
                    <i className="fab fa-google mr-2"></i>
                    Sign in with Google
                </button>

                <div className="flex justify-start text-left mt-2 w-full">
                    <a href="/register" className="text-custom-white hover:underline block text-s mt-3">Don't have an account? Sign up</a>        
                </div>
            </form>
        </div>
    );
};

export default FormContainer;