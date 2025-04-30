import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow flex items-center justify-center'>
        <div className='text-center px-4'>
          <h1 className='text-6xl font-bold text-primary'>404</h1>
          <h2 className='text-2xl font-semibold mt-4 mb-6'>Page Not Found</h2>
          <p className='text-muted-foreground mb-8'>
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to='/'>
            <Button>Return Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
