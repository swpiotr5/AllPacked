import React from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import PictureSection from '../components/Home/PictureSection';

const Home = () => {
    return (
        <div>
            <Navbar isHome={true}></Navbar>
            <Body>
                <PictureSection>
                </PictureSection>
            </Body>
        </div>

    )
}

export default Home;