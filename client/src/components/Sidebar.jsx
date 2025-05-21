'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Users,
  Settings,
  Award,
  FileText,
  Home,
  User,
  MessageSquare,
  BarChart2,
  Heart,
  Brain,
  ClipboardList,
  Menu,
  X,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    switch (user?.role) {
      case 'student':
        return [
          {
            path: '/student/dashboard',
            label: 'Dashboard',
            icon: <Home size={20} />,
          },
          {
            path: '/student/assignments',
            label: 'Assignments',
            icon: <FileText size={20} />,
          },
          {
            path: '/student/portfolio',
            label: 'My Portfolio',
            icon: <Award size={20} />,
          },
          { path: '/profile', label: 'Profile', icon: <User size={20} /> },
        ];
      case 'teacher':
        return [
          {
            path: '/teacher/dashboard',
            label: 'Dashboard',
            icon: <Home size={20} />,
          },
          {
            path: '/teacher/courses',
            label: 'My Classes',
            icon: <BookOpen size={20} />,
          },
          {
            path: '/teacher/lessons',
            label: 'Lessons',
            icon: <FileText size={20} />,
          },
          {
            path: '/teacher/assignments',
            label: 'Assignments',
            icon: <ClipboardList size={20} />,
          },
          {
            path: '/teacher/gradebook',
            label: 'Gradebook',
            icon: <Award size={20} />,
          },
          {
            path: '/teacher/students',
            label: 'Students',
            icon: <Users size={20} />,
          },
          { path: '/profile', label: 'Profile', icon: <User size={20} /> },
        ];
      case 'parent':
        return [
          {
            path: '/parent/dashboard',
            label: 'Dashboard',
            icon: <Home size={20} />,
          },
          {
            path: '/parent/children',
            label: 'My Children',
            icon: <Users size={20} />,
          },
          {
            path: '/parent/communication',
            label: 'Communication',
            icon: <MessageSquare size={20} />,
          },
          { path: '/profile', label: 'Profile', icon: <User size={20} /> },
        ];
      case 'admin':
        return [
          {
            path: '/admin/dashboard',
            label: 'Dashboard',
            icon: <Home size={20} />,
          },
          { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
          {
            path: '/admin/courses',
            label: 'Courses',
            icon: <BookOpen size={20} />,
          },
          {
            path: '/admin/reports',
            label: 'Reports',
            icon: <BarChart2 size={20} />,
          },
          {
            path: '/admin/settings',
            label: 'Settings',
            icon: <Settings size={20} />,
          },
          { path: '/profile', label: 'Profile', icon: <User size={20} /> },
        ];
      case 'health':
        return [
          {
            path: '/health/dashboard',
            label: 'Dashboard',
            icon: <Home size={20} />,
          },
          {
            path: '/health/firstaid',
            label: 'First Aid',
            icon: <Heart size={20} />,
          },
          {
            path: '/health/psychological',
            label: 'Psychological',
            icon: <Brain size={20} />,
          },
          {
            path: '/health/records',
            label: 'Health Records',
            icon: <ClipboardList size={20} />,
          },
          { path: '/profile', label: 'Profile', icon: <User size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className='md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white'
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className='h-full flex flex-col'>
          {/* Logo and title */}
          <div className='p-4 border-b'>
            <Link to='/' className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
                <BookOpen size={18} className='text-white' />
              </div>
              <span className='text-xl font-bold'>Zoma School</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className='flex-1 overflow-y-auto p-4'>
            <ul className='space-y-2'>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info */}
          <div className='p-4 border-t'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                <User size={20} className='text-gray-500' />
              </div>
              <div>
                <p className='font-medium'>{user?.name || 'User'}</p>
                <p className='text-sm text-gray-500 capitalize'>
                  {user?.role || 'Role'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
