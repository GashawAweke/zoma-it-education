import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import zomaSchool from '../assets/images/zoma-school.png';

const Landing = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* Left Column - Text Content */}
            <div>
              <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl'>
                <span className='block'>Zoma Hybrid Learning System</span>
              </h1>
              <p className='mt-6 text-3xl font-bold text-primary'>
                Every child is talented.
              </p>
              <p className='mt-3 text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl'>
                Where nature, art, technology, and education intertwine to
                cultivate creative, conscious learners. Empowering students to
                grow as confident, compassionate, and globally competent
                individuals.
              </p>
              <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                <Link to='/register'>
                  <Button className='w-full px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10'>
                    Get Started
                  </Button>
                </Link>
                <Link to='/login'>
                  <Button
                    variant='outline'
                    className='w-full px-8 py-3 text-base font-medium rounded-md border-primary text-primary hover:bg-primary/10 md:py-4 md:text-lg md:px-10'
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className='hidden md:block'>
              <img
                src={zomaSchool}
                alt='Zoma School'
                className='w-full h-auto rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>
      </main>

      <footer className='bg-card border-t border-border'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} Zoma Hybrid Learning System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
