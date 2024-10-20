import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Landing/Header';
import HeroSection from '../components/Landing/HeroSection';
import FeaturesSection from '../components/Landing/FeaturesSection';
import Footer from '../components/Landing/Footer';
import RegisterPopup from '../components/Landing/RegisterPopup';
import useScrollPosition from '../hooks/useScrollPosition';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);  // Controls popup visibility
  const [hasDismissedPopup, setHasDismissedPopup] = useState(false);  // Tracks if popup was dismissed
  const scrollPosition = useScrollPosition();
  const {user} =useContext(AuthContext)

  useEffect(() => {
    // Show the popup if the user scrolls past 50% and hasn't dismissed it
    if (scrollPosition > 50 && !hasDismissedPopup) {
      setShowPopup(true);
    }
  }, [scrollPosition, hasDismissedPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);  // Close the popup
    setHasDismissedPopup(true);  // Mark the popup as dismissed
  };

  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      {!user && showPopup && <RegisterPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default LandingPage;
