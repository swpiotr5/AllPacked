import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../App.css'; 

const FormContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    return (
        <div className="relative flex flex-col justify-center items-center w-full z-10">
            <form className="flex flex-col p-1 w-3/5">
                <div className="relative">
                    <p className="text-custom-white mb-1 text-">Email</p>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="p-2 pl-3 bg-input-lower-opacity input-placeholder shadow-2xl text-custom-white rounded-xl w-full text-sm"
                        placeholder="&#xf007;"
                        style={{ fontFamily: 'Arial, FontAwesome' }}
                    />
                </div>
                <div className="relative">
                    <p className="text-custom-white mb-1 mt-3">Password</p>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="p-2 pl-3 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        placeholder="&#xf023;"
                        style={{ fontFamily: 'Arial, FontAwesome' }}
                    />          
                </div>
                <div className="relative">
                    <p className="text-custom-white mb-1 mt-3"> Confirm Password</p>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="p-2 pl-3 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        placeholder="&#xf023;"
                        style={{ fontFamily: 'Arial, FontAwesome' }}
                    />                
                </div>
                <button type="submit" className=" border-slate-600 p-1 mt-14 font-bold shadow-2xl bg-custom-white text-custom-dark-blue rounded-xl text-xl hover:bg-custom-dark-blue hover:text-custom-white">Register</button>

                <div className="flex justify-start text-left mt-2 w-full">
                    <a href="/login" className="text-custom-white hover:underline block text-s mt-3">Already have an account? Login</a>        
                </div>
            </form>
        </div>
    );
};

export default FormContainer;