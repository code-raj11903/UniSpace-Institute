import React from 'react';
import heroBg from '../../assets/hero=bg3.jpg';  // Background image
import './Herosection.css';
const HeroSection = () => {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

      {/* Content */}
      <div className="text-center text-white relative z-10">
        <h1 className="text-5xl font-bold drop-shadow-lg md:text-6xl lg:text-7xl ">
          Welcome to UniSpace
        </h1>
        <p className="mt-4 text-xl md:text-2xl lg:text-3xl drop-shadow-md">
          Efficient Resource Management for Colleges & Schools
        </p>
        <a
          href="/register"
          className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
