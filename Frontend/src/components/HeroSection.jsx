import React from 'react';
import heroBg from '../assets/hero-bg.jpg';  // Background image

const HeroSection = () => {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold">Welcome to UniSpace</h1>
        <p className="mt-4 text-xl">Efficient Resource Management for Colleges & Schools</p>
        <a
          href="/register"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
