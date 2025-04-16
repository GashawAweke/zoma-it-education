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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
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
      await register(formData);
      toast('Registration successful!', 'success');
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
            <CardTitle className='text-2xl font-bold'>
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Full Name
                </label>
                <Input
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label htmlFor='password' className='text-sm font-medium'>
                  Password
                </label>
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

              <div className='space-y-2'>
                <label htmlFor='grade' className='text-sm font-medium'>
                  Grade Level
                </label>
                <select
                  id='grade'
                  name='grade'
                  value={formData.grade}
                  onChange={handleChange}
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  required
                >
                  <option value='' disabled>
                    Select your grade
                  </option>
                  <option value='1-2'>Grades 1-2</option>
                  <option value='3-4'>Grades 3-4</option>
                  <option value='5-6'>Grades 5-6</option>
                </select>
              </div>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4'>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Register'}
              </Button>

              <div className='text-center text-sm'>
                Already have an account?{' '}
                <Link to='/login' className='text-primary hover:underline'>
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Register;
