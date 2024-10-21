import React, { useEffect, useState } from 'react';
import homeBg from '../../assets/homebg.jpg';
import { FaArrowDown } from 'react-icons/fa';

const PictureSection = ({ onScrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="picture-section" className="relative w-full h-screen">
      <div className="relative flex justify-center items-center w-full h-full opacity-10 object-cover">
          <img
            src={homeBg}
            className="w-full h-full object-cover"
          />
      </div>
      <div className={`flex flex-col justify-center w-full max-w-screen-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-pre-line tracking-wide text-custom-white text-6xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span>Pack Your Dreams with AllPacked!</span>
        <span className="text-2xl mt-10">Why just travel when you can travel smart? AllPacked is your go-to travel planner that helps you organize every detail of your journey, ensuring you have more time for what truly matters — making memories.</span>
        <div className=" flex flex-col items-center mt-24">
          <span className="text-2xl">Click here to create new trip</span>
          <button onClick={onScrollToSection}><FaArrowDown className="mt-7 text-4xl text-custom-white animate-bounce" /></button>
        </div>
      </div>
    </div>
  );
};

export default PictureSection;