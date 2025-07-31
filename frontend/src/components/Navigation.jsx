import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex space-x-4">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Disease Detection</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/predict"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/predict')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Predict
            </Link>
            <Link
              to="/history"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/history')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              History
            </Link>
            <Link
              to="/feedback"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/feedback')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Feedback
            </Link>

            <div className="relative ml-3">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/predict"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/predict')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Predict
            </Link>
            <Link
              to="/history"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/history')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </Link>
            <Link
              to="/feedback"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/feedback')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            
            {/* User info and logout in mobile menu */}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.username}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 