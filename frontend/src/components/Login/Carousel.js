import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousel = ({ children, autoSlide=false, autoSlideInterval=5000, texts = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (!autoSlide) return
        const interval = setInterval(handleNext, autoSlideInterval)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='overflow-hidden relative w-full h-full'>
            <div className='flex transition-transform ease-out duration-500 opacity-20' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {children}
            </div>
            <div className='absolute top-1/2 transform -translate-y-1/2 left-2'>
                <button onClick={handlePrev} className='bg-custom-white p-1 rounded-full shadow-md'>
                    <ChevronLeft />
                </button>
            </div>
            <div className='absolute top-1/2 transform -translate-y-1/2 right-2'>
                <button onClick={handleNext} className='bg-custom-white p-1 rounded-full shadow-md'>
                    <ChevronRight />
                </button>
            </div>
            <div className='absolute bottom-1/2 left-0 right-0 text-center'>
                <p className='text-white text-3xl whitespace-pre-line tracking-wider'>{texts[currentIndex]}</p>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {children.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-2 h-2 bg-custom-white rounded-full ${currentIndex === i ? "p-2" : "bg-opacity-50"}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;