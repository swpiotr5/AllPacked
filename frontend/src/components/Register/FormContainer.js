import React, { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import '../../App.css'; 
import Input from './Input';

const FormContainer = ({registerData, handleChange, handleSubmit, error, success}) => {

    return (
        <div className="relative flex flex-col justify-center items-center w-full z-10">
            <form className="flex flex-col p-1 w-3/5" onSubmit={handleSubmit}>
                <div className="relative">
                    <p className="text-custom-white mb-1 text-sm">Email</p>
                    <Input 
                        type="text" 
                        name="email" 
                        value={registerData.email} 
                        onChange={handleChange} 
                        icon={<IoIosMail className="text-custom-white text-xl"></IoIosMail>}>
                    </Input>
                    {error && error.email && (
                        <div className="error mt-3 text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
                            <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                            <p className="text-sm font-medium">{error.email}</p>
                        </div>
                    )}                
                </div>
                <div className="relative">
                    <p className="text-custom-white mb-1 mt-3 text-sm">Password</p>
                    <Input 
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                        icon={<FaLock className="text-custom-white text-sm"></FaLock>}>
                    </Input>
                    {error && error.password && (
                        <div className="error mt-3 text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
                            <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                            <p className="text-sm font-medium">{error.password}</p>
                        </div>
                    )}                
                </div>
                <div className="relative">
                    <p className="text-custom-white mb-1 mt-2 text-sm"> Confirm Password</p>
                    <Input 
                        type="password"
                        name="confirm_password"
                        value={registerData.confirm_password}
                        onChange={handleChange}
                        icon={<FaLock className="text-custom-white text-sm"></FaLock>}>
                    </Input>
                    {error && error.confirm_password && (
                        <div className="error mt-3 text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
                            <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                            <p className="text-sm font-medium">{error.confirm_password}</p>
                        </div>
                    )}
                </div>
                {success && (
                    <div className="mt-3 text-green-700 bg-custom-white text-center rounded-xl font-bold p-2 shadow-lg flex items-center justify-center space-x-3 success-message">
                        <i className="fas fa-check-circle text-green-500 text-md"></i>
                        <p className="text-md">{success}</p>
                    </div>
                )}
                <button type="submit" className=" border-slate-600 p-1 mt-8 font-bold shadow-2xl bg-custom-white text-custom-dark-blue rounded-xl text-lg hover:bg-custom-dark-blue hover:text-custom-white">Register</button>
                {error && <div className="error text-red-600">{error.non_field_errors}</div>}
                <div className="flex justify-start text-left mt-2 w-full">
                    <a href="/login" className="text-custom-white hover:underline block text-xs mt-3">Already have an account? Login</a>        
                </div>
            </form>
        </div>
    );
};

export default FormContainer;