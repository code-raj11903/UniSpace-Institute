import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import RegisterPopup from '../components/RegisterPopup';
import useScrollPosition from '../hooks/useScrollPosition';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);  // Controls popup visibility
  const [hasDismissedPopup, setHasDismissedPopup] = useState(false);  // Tracks if popup was dismissed
  const scrollPosition = useScrollPosition();

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
      {showPopup && <RegisterPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default LandingPage;
