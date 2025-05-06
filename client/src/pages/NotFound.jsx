'use client';

import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { user } = useAuth();

  // Determine where to redirect based on user role
  const getRedirectPath = () => {
    if (!user) return '/login';

    switch (user.role) {
      case 'student':
        return '/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'parent':
        return '/parent/dashboard';
      case 'admin':
        return '/admin/dashboard';
      case 'health':
        return '/health/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-6'>Page Not Found</h2>
      <p className='text-muted-foreground text-center mb-8 max-w-md'>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to={getRedirectPath()}>Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
