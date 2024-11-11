import React, { useEffect } from 'react';
import logoRowImg from '../../assets/Logo-row.png';
import userImg from '../../assets/user.png';
import '../../App.css';
import { MdLogout } from "react-icons/md";
import { logout } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isHome, setIsAuth }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isHome) {
            const navItems = document.querySelectorAll('.nav-item-text');
            navItems.forEach(item => {
                item.classList.add('hover:text-custom-white');
                item.classList.add('hover:text-2xl');
            });
            const mainNav = document.getElementById('main-nav');
            if (mainNav) {
                mainNav.classList.add('bg-transparent');
            }
        }
    }, [isHome]);

    const onClickLogout = (e) => {
        e.preventDefault();
        logout(navigate, setIsAuth);
    }

    return (
        <div id="main-nav" className='fixed flex bg-custom-blue h-20 w-full z-10 justify-between items-center'>
            <div className='flex h-full pl-10 items-center'>        
                <img src={logoRowImg} alt="Description" className="object-cover w-32 h-16" />
            </div>
            <div className='flex-grow m-48 font-semibold'>
                <ul className='flex h-full items-center justify-evenly space-x-4 text-xl text-custom-white'>
                    <li>
                        <a href="/home" className='group relative'>
                            <span className='nav-item-text hover-underline-animation hover:text-custom-dark-blue duration-300'>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/forecast" className='group relative'>
                            <span className='nav-item-text hover-underline-animation hover:text-custom-dark-blue duration-300'>Forecast</span>
                        </a>
                    </li>
                    <li>
                        <a href="/budget" className='group relative'>
                            <span className='nav-item-text hover-underline-animation hover:text-custom-dark-blue duration-300'>Budget</span>
                        </a>
                    </li>
                    <li>
                        <a href="/planner" className='group relative'>
                            <span className='nav-item-text hover-underline-animation hover:text-custom-dark-blue duration-300'>Planner</span>
                        </a>
                    </li>
                    <li>
                        <a href="/history" className='group relative'>
                            <span className='nav-item-text hover-underline-animation hover:text-custom-dark-blue duration-300'>History</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex h-full pr-5 items-center'>        
                <button className="h-full">
                    <img src={userImg} alt="Description" className="object-cover h-1/2 hover:scale-110" />
                </button>
                <button className="text-custom-white pl-3 hover:scale-110" onClick={onClickLogout}><MdLogout /></button>
            </div>
        </div>
    );
};

export default Navbar;
