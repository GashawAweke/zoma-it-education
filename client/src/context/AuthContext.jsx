'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

// Create the auth context
const AuthContext = createContext();

// Mock users for testing different portals
const MOCK_USERS = {
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // In a real app, passwords would be hashed
    role: 'admin',
    isActive: true,
  },
  teacher: {
    id: 'teacher-1',
    name: 'Teacher User',
    email: 'teacher@example.com',
    password: 'password123',
    role: 'teacher',
    isActive: true,
  },
  student: {
    id: 'student-1',
    name: 'Student User',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
    isActive: true,
  },
  parent: {
    id: 'parent-1',
    name: 'Parent User',
    email: 'parent@example.com',
    password: 'password123',
    role: 'parent',
    isActive: true,
  },
  health: {
    id: 'health-1',
    name: 'Health Team User',
    email: 'health@example.com',
    password: 'password123',
    role: 'health',
    isActive: true,
  },
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('token');

        if (token) {
          // Get user data from localStorage
          const userData = JSON.parse(localStorage.getItem('userData'));

          if (userData) {
            setUser(userData);
          } else {
            // If no user data, clear token
            localStorage.removeItem('token');
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Find matching mock user
      const mockUserEntry = Object.entries(MOCK_USERS).find(
        ([_, user]) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!mockUserEntry || mockUserEntry[1].password !== password) {
        throw new Error('Invalid email or password');
      }

      const userData = { ...mockUserEntry[1] };
      delete userData.password; // Don't store password in state

      // Store user data and token
      setUser(userData);
      localStorage.setItem('token', 'mock-token-' + userData.role);
      localStorage.setItem('userData', JSON.stringify(userData));

      toast({
        title: 'Logged in successfully',
        description: `Welcome back, ${userData.name}!`,
        type: 'success',
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);

      toast({
        title: 'Login failed',
        description:
          error.message || 'Please check your credentials and try again.',
        type: 'error',
      });

      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Check if email already exists
      const emailExists = Object.values(MOCK_USERS).some(
        (user) => user.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (emailExists) {
        throw new Error('Email already in use');
      }

      // Create new user (in a real app, this would be sent to a server)
      const newUser = {
        id: `${userData.role}-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        isActive: true,
      };

      // Add to mock users (this would be temporary until page refresh)
      MOCK_USERS[newUser.id] = { ...newUser, password: userData.password };

      // Store user data and token
      const userDataToStore = { ...newUser };
      setUser(userDataToStore);
      localStorage.setItem('token', 'mock-token-' + newUser.role);
      localStorage.setItem('userData', JSON.stringify(userDataToStore));

      toast({
        title: 'Registered successfully',
        description: 'Welcome to Zoma School IT!',
        type: 'success',
      });

      return true;
    } catch (error) {
      console.error('Registration error:', error);

      toast({
        title: 'Registration failed',
        description:
          error.message || 'Please check your information and try again.',
        type: 'error',
      });

      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);

    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
      type: 'info',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        mockUsers: MOCK_USERS, // Expose mock users for easy access
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
