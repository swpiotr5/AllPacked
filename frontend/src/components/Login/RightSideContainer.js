import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import Carousel from "./Carousel";
import video from "../../assets/cloudsmountains.mp4";
import video2 from "../../assets/city.mp4";
import video3 from "../../assets/waterfall.mp4";
import video4 from "../../assets/mushroom.mp4";

const RightSideContainer = ({ children }) => {
    const videos = [
        video,
        video2,
        video3,
        video4,
    ];

    return (
        <div className='max-w-lg h-full'>
            <Carousel autoSlide={true}>
                {videos.map((src, index) => (
                    <video key={index} src={src} className='w-full h-full object-cover' autoPlay muted loop></video>
                ))}
            </Carousel>
        </div>
    );
};

export default RightSideContainer;