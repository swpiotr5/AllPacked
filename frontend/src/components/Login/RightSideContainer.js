import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import Carousel from "./Carousel";
import video from "../../assets/cloudsmountains.mp4";
import video2 from "../../assets/city.mp4";
import video3 from "../../assets/waterfall.mp4";
import video4 from "../../assets/mushroom.mp4";

const RightSideContainer = () => {
    const videos = [
        video,
        video2,
        video3,
        video4,
    ];

    const texts = [
        "Simplify Packing,\nAmplify Adventure.",
        "Travel Light, \nTravel Right with AllPacked.",
        "Packing Made Simple,\nTravel Made Fun.",
        "Be Prepared,\nBe AllPacked."
    ]
    return (
        <div className='w-full h-full object-cover bg-black'>
            <Carousel autoSlide={true} texts={texts}>
                {videos.map((src, index) => (
                    <video key={index} src={src} className='h-full w-full object-cover' autoPlay muted loop></video>
                ))}
            </Carousel>
        </div>
    );
};

export default RightSideContainer;