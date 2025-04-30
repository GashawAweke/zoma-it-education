'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const { register } = useAuth();
  const { themeName } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData);
      if (success) {
        // Navigate to the appropriate dashboard based on role
        switch (formData.role) {
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
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-background p-4`}
    >
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-foreground'>
            Create an Account
          </h1>
          <p className='text-muted-foreground mt-2'>
            Join Zoma School IT platform
          </p>
        </div>

        <div className='bg-card rounded-lg shadow-lg p-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-card-foreground mb-1'
              >
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-card-foreground mb-1'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
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
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-card-foreground mb-1'
              >
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
            </div>

            <div>
              <label
                htmlFor='role'
                className='block text-sm font-medium text-card-foreground mb-1'
              >
                Role
              </label>
              <select
                id='role'
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                required
              >
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
                <option value='parent'>Parent</option>
                <option value='admin'>Admin</option>
                <option value='health'>Health Team</option>
              </select>
            </div>

            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50'
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className='mt-6'>
            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link to='/login' className='text-primary hover:underline'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
