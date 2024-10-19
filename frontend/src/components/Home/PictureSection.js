import React, { useEffect, useState } from 'react';
import homeBg from '../../assets/homebg.jpg';
import { FaArrowDown } from 'react-icons/fa';

const PictureSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center w-full h-screen opacity-10" style={{ backgroundImage: `url(${homeBg})` }}>
      </div>
      <div className={`flex flex-col absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 whitespace-pre-line tracking-wide text-custom-white text-6xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span>Pack Your Dreams with AllPacked!</span>
        <span className="text-2xl mt-10">Why just travel when you can travel smart? AllPacked is your go-to travel planner that helps you organize every detail of your journey, ensuring you have more time for what truly matters — making memories.</span>
        <div className="w-full flex justify-center flex-col items-center">
          <span className="text-2xl mt-60">Click here to manage your trips</span>
          <a><FaArrowDown className="mt-7 text-4xl text-custom-white animate-bounce" /></a>
        </div>
      </div>
    </div>
  );
};

export default PictureSection;