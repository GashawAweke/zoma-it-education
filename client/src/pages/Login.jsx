'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
      toast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      toast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold'>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='email' className='text-sm font-medium'>
                  Email
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='your.email@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='text-sm font-medium'>
                    Password
                  </label>
                  <Link to='#' className='text-sm text-primary hover:underline'>
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4'>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <div className='text-center text-sm'>
                Don't have an account?{' '}
                <Link to='/register' className='text-primary hover:underline'>
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Login;
