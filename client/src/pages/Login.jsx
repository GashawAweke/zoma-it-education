'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { login, mockUsers } = useAuth();
  const { themeName } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (role) => {
    const user = mockUsers[role];
    setEmail(user.email);
    setPassword(user.password);

    // Submit the form after a short delay to show the filled credentials
    setTimeout(() => {
      login(user.email, user.password).then((success) => {
        if (success) {
          // Navigate to the appropriate dashboard based on role
          switch (role) {
            case 'student':
              navigate('/dashboard');
              break;
            case 'teacher':
              navigate('/teacher/dashboard');
              break;
            case 'parent':
              navigate('/parent/dashboard');
              break;
            case 'admin':
              navigate('/admin/dashboard');
              break;
            case 'health':
              navigate('/health/dashboard');
              break;
            default:
              navigate('/dashboard');
          }
        }
      });
    }, 500);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-background p-4`}
    >
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-foreground'>Welcome Back</h1>
          <p className='text-muted-foreground mt-2'>
            Sign in to your account to continue
          </p>
        </div>

        <div className='bg-card rounded-lg shadow-lg p-6 mb-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-card-foreground mb-1'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-card-foreground mb-1'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
            </div>

            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50'
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className='mt-6'>
            <p className='text-center text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <Link to='/register' className='text-primary hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Quick login section */}
        <div className='bg-card rounded-lg shadow-lg p-6'>
          <h2 className='text-xl font-semibold text-card-foreground mb-4'>
            Quick Login
          </h2>
          <p className='text-sm text-muted-foreground mb-4'>
            Use these test accounts to explore different portals:
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <button
              onClick={() => handleQuickLogin('admin')}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              Admin Portal
            </button>
            <button
              onClick={() => handleQuickLogin('teacher')}
              className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
            >
              Teacher Portal
            </button>
            <button
              onClick={() => handleQuickLogin('student')}
              className='px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors'
            >
              Student Portal
            </button>
            <button
              onClick={() => handleQuickLogin('parent')}
              className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors'
            >
              Parent Portal
            </button>
            <button
              onClick={() => handleQuickLogin('health')}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors md:col-span-2'
            >
              Health Team Portal
            </button>
          </div>

          <div className='mt-4 text-xs text-muted-foreground'>
            <p>
              All test accounts use the password:{' '}
              <code className='bg-muted p-1 rounded'>password123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
