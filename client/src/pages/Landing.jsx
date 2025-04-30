import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';

const Landing = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl'>
              <span className='block'>Zoma IT Hybrid Learning System</span>
              <span className='block text-primary'>
                Empowering Education Through Technology
              </span>
            </h1>
            <p className='mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
              A comprehensive platform designed to bridge the gap between
              traditional and digital learning, providing students, teachers,
              parents, and administrators with the tools they need to succeed.
            </p>
            <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
              <div className='rounded-md shadow'>
                <Link to='/register'>
                  <Button className='w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10'>
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
                <Link to='/login'>
                  <Button
                    variant='outline'
                    className='w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md border-primary text-primary hover:bg-primary/10 md:py-4 md:text-lg md:px-10'
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className='bg-card border-t border-border'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} Zoma IT Hybrid Learning System.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
