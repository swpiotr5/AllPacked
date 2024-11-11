import React from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'

const History = ({setIsAuth}) => {

    return (
        <div>
            <Navbar setIsAuth={setIsAuth}></Navbar>
            <Body></Body>
        </div>

    )
}

export default History;