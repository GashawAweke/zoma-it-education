'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { themeName, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(themeName === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className='bg-card shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/' className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-primary'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='ml-2 text-xl font-bold text-card-foreground'>
                  Zoma School IT
                </span>
              </Link>
            </div>
          </div>

          <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4'>
            <button
              onClick={toggleTheme}
              className='p-2 rounded-md text-muted-foreground hover:text-card-foreground'
            >
              {themeName === 'dark' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
              )}
            </button>

            {user ? (
              <>
                <Link
                  to={
                    user.role === 'student'
                      ? '/dashboard'
                      : `/${user.role}/dashboard`
                  }
                >
                  <Button
                    variant='ghost'
                    className='text-primary hover:text-primary hover:bg-primary/10'
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant='outline'
                  className='border-primary text-primary hover:bg-primary/10'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button
                    variant='ghost'
                    className='text-primary hover:text-primary hover:bg-primary/10'
                  >
                    Login
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button className='bg-primary text-primary-foreground hover:bg-primary/90'>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className='flex items-center sm:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-card-foreground focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='sm:hidden'>
          <div className='pt-2 pb-3 space-y-1'>
            <button
              onClick={toggleTheme}
              className='block px-4 py-2 text-base font-medium text-muted-foreground hover:text-card-foreground'
            >
              {themeName === 'dark'
                ? 'Switch to Light Mode'
                : 'Switch to Dark Mode'}
            </button>

            {user ? (
              <>
                <Link
                  to={
                    user.role === 'student'
                      ? '/dashboard'
                      : `/${user.role}/dashboard`
                  }
                  className='block px-4 py-2 text-base font-medium text-primary hover:bg-primary/10'
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-base font-medium text-primary hover:bg-primary/10'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='block px-4 py-2 text-base font-medium text-primary hover:bg-primary/10'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='block px-4 py-2 text-base font-medium text-primary hover:bg-primary/10'
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
