import React, { useEffect, useState } from 'react';
import homeBg from '../../assets/homebg.jpg';
import { FaArrowDown } from 'react-icons/fa';
import logoRowImg from '../../assets/onlylogo.png';

const PictureSection = ({ onScrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="picture-section" className="hidden md:block relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <img src={homeBg} className="w-full h-full object-cover opacity-60" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50"></div>
      </div>

      <div className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-screen-xl mx-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 text-left md:text-center">
              <h1 className="text-center text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Pack Your Dreams with AllPacked!
              </h1>
              <p className="hidden md:block text-lg md:text-2xl mt-5 text-white drop-shadow-lg">
                Why just travel when you can travel smart? AllPacked is your go-to travel planner that helps you organize every detail of your journey, ensuring you have more time for what truly matters — making memories.
              </p>
            </div>
            <div className="flex justify-center">
              <img src={logoRowImg} alt="Logo" className="object-cover w-3/4 md:w-1/2 pulse" />
            </div>
          </div>
          <div className="mt-14 p-10">
            <span className="text-lg md:text-xl text-white drop-shadow-lg">Click here to create new trip</span>
            <div className="mt-4">
              <button onClick={onScrollToSection}>
                <FaArrowDown className="text-4xl text-white animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureSection;