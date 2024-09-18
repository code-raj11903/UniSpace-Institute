import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/InstituteLogin';

function App() {
  const [isLogin, setIsLogin] = useState(true); // True shows login, false shows registration

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <Navbar />
      {isLogin ? (
        <LoginForm switchToRegister={switchForm} /> // Pass switchForm function to LoginForm
      ) : (
        <RegistrationForm switchToLogin={switchForm} /> // Pass switchForm function to RegistrationForm
      )}
    </div>
  );
}

export default App;
