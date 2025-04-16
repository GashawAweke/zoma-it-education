import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Landing = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='bg-gradient-to-b from-secondary/20 to-background py-16 md:py-24'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
              <div className='md:w-1/2 space-y-6'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground'>
                  Zoma School IT Department
                </h1>
                <p className='text-lg md:text-xl text-muted-foreground'>
                  Empowering students with digital skills through our self-paced
                  ICT education platform.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link to='/register'>
                    <Button
                      size='lg'
                      className='bg-primary text-primary-foreground'
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link to='/login'>
                    <Button
                      variant='outline'
                      size='lg'
                      className='border-primary text-primary'
                    >
                      Log In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='md:w-1/2'>
                <img
                  src='/placeholder.svg?height=400&width=500'
                  alt='Zoma School students learning computer skills'
                  className='rounded-lg shadow-xl'
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Zoma School Section */}
        <section className='py-16 bg-card'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-card-foreground'>
                About Zoma School
              </h2>
              <p className='text-muted-foreground mt-2'>
                Excellence in Education Since 2005
              </p>
            </div>

            <div className='max-w-3xl mx-auto text-center'>
              <p className='text-lg text-card-foreground mb-6'>
                Zoma School is committed to providing quality education that
                prepares students for the digital future. Our IT Department has
                developed this innovative platform to ensure all students have
                access to comprehensive ICT education at their own pace.
              </p>
              <p className='text-lg text-card-foreground'>
                Located in Addis Ababa, Ethiopia, Zoma School combines
                traditional educational values with modern teaching methods to
                create well-rounded, digitally literate students ready for the
                challenges of tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-16 bg-secondary/10'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-foreground'>
                Our Platform Features
              </h2>
              <p className='text-muted-foreground mt-2'>
                What makes our IT curriculum special
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Card className='border-t-4 border-t-primary'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-primary'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Zoma Learning Path
                    </h3>
                    <p className='text-muted-foreground'>
                      Follow our structured learning journey with locked and
                      unlocked levels as you progress through the Zoma School
                      ICT curriculum.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-t-4 border-t-primary'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-primary'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Teacher-Created Content
                    </h3>
                    <p className='text-muted-foreground'>
                      Watch engaging video tutorials created by Zoma School's
                      experienced IT teachers that explain complex concepts in
                      simple terms.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-t-4 border-t-primary'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-primary'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Zoma School Certification
                    </h3>
                    <p className='text-muted-foreground'>
                      Earn official Zoma School IT certificates upon completion
                      of each grade level, recognized for your academic record.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Grade Levels Section */}
        <section className='py-16 bg-secondary/20'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-foreground'>
                Zoma School ICT Curriculum
              </h2>
              <p className='text-muted-foreground mt-2'>
                Tailored for different grade levels
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Card className='hover:shadow-lg transition-shadow border-border'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                      <span className='text-2xl font-bold text-primary'>
                        1-2
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Grades 1-2
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      Introduction to computers, basic typing, and simple file
                      management for our youngest Zoma students.
                    </p>
                    <Link to='/login'>
                      <Button
                        variant='outline'
                        className='border-primary text-primary hover:bg-primary/10'
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className='hover:shadow-lg transition-shadow border-border'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                      <span className='text-2xl font-bold text-primary'>
                        3-4
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Grades 3-4
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      Hardware and software basics, multimedia projects, and
                      introduction to programming for intermediate Zoma
                      students.
                    </p>
                    <Link to='/login'>
                      <Button
                        variant='outline'
                        className='border-primary text-primary hover:bg-primary/10'
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className='hover:shadow-lg transition-shadow border-border'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                      <span className='text-2xl font-bold text-primary'>
                        5-6
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Grades 5-6
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      Advanced file management, multimedia creation, and
                      text-based programming for senior Zoma elementary
                      students.
                    </p>
                    <Link to='/login'>
                      <Button
                        variant='outline'
                        className='border-primary text-primary hover:bg-primary/10'
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='py-16 bg-card'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-card-foreground'>
                What Our Students Say
              </h2>
              <p className='text-muted-foreground mt-2'>
                Feedback from the Zoma School community
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
              <Card className='bg-secondary/10 border-none'>
                <CardContent className='p-6'>
                  <p className='italic text-card-foreground mb-4'>
                    "The Zoma School IT platform has made learning computer
                    skills so much fun! I love earning badges and unlocking new
                    levels."
                  </p>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 bg-primary/20 rounded-full mr-3'></div>
                    <div>
                      <p className='font-semibold text-card-foreground'>
                        Kidus T.
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Grade 4 Student
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-secondary/10 border-none'>
                <CardContent className='p-6'>
                  <p className='italic text-card-foreground mb-4'>
                    "As a parent, I appreciate how this platform allows my
                    daughter to learn at her own pace. The progress tracking
                    helps me stay involved in her education."
                  </p>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 bg-primary/20 rounded-full mr-3'></div>
                    <div>
                      <p className='font-semibold text-card-foreground'>
                        Meron A.
                      </p>
                      <p className='text-sm text-muted-foreground'>Parent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-primary text-primary-foreground py-8'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h3 className='text-xl font-bold mb-4'>Zoma School</h3>
              <p className='text-primary-foreground/80'>
                Providing quality education and digital literacy skills to
                prepare students for the future.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>Contact Us</h3>
              <p className='text-primary-foreground/80'>
                Addis Ababa, Ethiopia
              </p>
              <p className='text-primary-foreground/80'>
                Email: it@zomaschool.edu.et
              </p>
              <p className='text-primary-foreground/80'>
                Phone: +251 11 123 4567
              </p>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-primary-foreground'
                  >
                    About Zoma School
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-primary-foreground'
                  >
                    Academic Programs
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-primary-foreground'
                  >
                    IT Department
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-primary-foreground'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-primary-foreground/20 pt-6 text-center'>
            <p className='text-primary-foreground/80'>
              &copy; 2025 Zoma School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
