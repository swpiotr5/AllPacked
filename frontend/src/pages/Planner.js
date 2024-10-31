import React from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';

const Planner = () => {

    return (
        <div>
            <Navbar></Navbar>
            <Body>
                <TripSelector></TripSelector>
            </Body>
        </div>

    )
}

export default Planner;