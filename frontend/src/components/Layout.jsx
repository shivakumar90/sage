import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {children}
      </div>
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500 w-full">
        Note: This is an AI-powered analysis and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
      </footer>
    </div>
  );
};

export default Layout; 