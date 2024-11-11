import React from 'react';
import Body from '../layouts/inside/Body';
import Navbar from '../layouts/inside/Navbar';
import PictureSection from '../components/Home/PictureSection';
import ManageTripSection from '../components/Home/ManageTripSection';
import { FaArrowCircleUp } from 'react-icons/fa';

const Home = ({setIsAuth}) => {
    const onScrollToSection = (e) => {
        e.preventDefault();
        const manageSection = document.getElementById('manage-trip-section');
        if (manageSection) {
            manageSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onScrollToTop = (e) => {
        e.preventDefault();
        const pictureSection = document.getElementById('picture-section');
        if (pictureSection) {
            pictureSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Navbar isHome={true} setIsAuth={setIsAuth}></Navbar>
            <Body>
                <PictureSection id="picture-section" onScrollToSection={onScrollToSection} />
                <ManageTripSection id="manage-trip-section" />
            </Body>
            <button onClick={onScrollToTop} className="fixed bottom-5 right-5 z-10 mt-7 text-4xl text-custom-white" ><FaArrowCircleUp  /></button>
        </div>
    );
};

export default Home;