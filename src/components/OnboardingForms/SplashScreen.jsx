// SplashScreen.jsx
import React, { useEffect } from "react";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-yellow-100">
      <div className="text-center">
        <img src="/aaro7-logo.png" alt="Aaro7" className="h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-yellow-600">Welcome to Aaro7</h1>
        <p className="text-gray-700 mt-2">Loading your onboarding experience...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
