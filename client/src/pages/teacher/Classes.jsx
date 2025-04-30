'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  BarChart,
  Calendar,
  Clock,
  Filter,
  Plus,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { Input } from '../../components/ui/input';

const TeacherClasses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for classes
  const classes = [
    {
      id: 1,
      name: 'Grade 1-2 Computer Basics',
      description: 'Introduction to computers for young learners',
      students: 25,
      progress: 65,
      nextLesson: 'Using a Mouse',
      nextLessonDate: '2025-04-28',
      image: '/placeholder.svg?height=150&width=300',
    },
    {
      id: 2,
      name: 'Grade 3-4 Typing Skills',
      description: 'Developing proper typing techniques',
      students: 22,
      progress: 48,
      nextLesson: 'Home Row Practice',
      nextLessonDate: '2025-04-29',
      image: '/placeholder.svg?height=150&width=300',
    },
    {
      id: 3,
      name: 'Grade 5-6 Programming Intro',
      description: 'Basic concepts of programming logic',
      students: 18,
      progress: 30,
      nextLesson: 'Loops and Conditions',
      nextLessonDate: '2025-04-30',
      image: '/placeholder.svg?height=150&width=300',
    },
  ];

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Classes</h1>
          <p className='text-muted-foreground'>
            Manage your classes and student progress.
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            New Class
          </Button>
          <Button variant='outline'>
            <Calendar className='mr-2 h-4 w-4' />
            Schedule
          </Button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search classes...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant='outline' className='gap-2'>
          <Filter className='h-4 w-4' />
          Filter
        </Button>
      </div>

      <Tabs defaultValue='grid'>
        <div className='flex justify-between items-center'>
          <TabsList>
            <TabsTrigger value='grid'>Grid View</TabsTrigger>
            <TabsTrigger value='list'>List View</TabsTrigger>
          </TabsList>
          <div className='text-sm text-muted-foreground'>
            Showing {filteredClasses.length} of {classes.length} classes
          </div>
        </div>

        <TabsContent value='grid' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className='overflow-hidden'>
                <div className='aspect-video'>
                  <img
                    src={cls.image || '/placeholder.svg'}
                    alt={cls.name}
                    className='object-cover w-full h-full'
                  />
                </div>
                <CardHeader>
                  <CardTitle>{cls.name}</CardTitle>
                  <CardDescription>{cls.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex justify-between text-sm'>
                      <div className='flex items-center'>
                        <Users className='h-4 w-4 mr-1 text-muted-foreground' />
                        <span>{cls.students} students</span>
                      </div>
                      <div className='flex items-center'>
                        <BarChart className='h-4 w-4 mr-1 text-muted-foreground' />
                        <span>{cls.progress}% complete</span>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span>Course Progress</span>
                        <span className='font-medium'>{cls.progress}%</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-secondary'>
                        <div
                          className='h-2 rounded-full bg-primary'
                          style={{ width: `${cls.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className='rounded-md bg-muted p-3'>
                      <div className='flex items-center gap-2 text-sm'>
                        <Clock className='h-4 w-4 text-muted-foreground' />
                        <div>
                          <p className='font-medium'>Next: {cls.nextLesson}</p>
                          <p className='text-xs text-muted-foreground'>
                            {cls.nextLessonDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button className='flex-1'>View Class</Button>
                      <Button variant='outline' size='icon'>
                        <Settings className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='list' className='space-y-4'>
          <div className='rounded-md border'>
            <div className='grid grid-cols-6 gap-4 p-4 font-medium border-b'>
              <div className='col-span-2'>Class</div>
              <div className='col-span-1 text-center'>Students</div>
              <div className='col-span-1 text-center'>Progress</div>
              <div className='col-span-1 text-center'>Next Lesson</div>
              <div className='col-span-1 text-center'>Actions</div>
            </div>
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className='grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0'
              >
                <div className='col-span-2'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded overflow-hidden'>
                      <img
                        src={cls.image || '/placeholder.svg'}
                        alt={cls.name}
                        className='object-cover w-full h-full'
                      />
                    </div>
                    <div>
                      <p className='font-medium'>{cls.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {cls.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-span-1 text-center'>{cls.students}</div>
                <div className='col-span-1 text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-16 h-2 rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: `${cls.progress}%` }}
                      />
                    </div>
                    <span className='text-sm'>{cls.progress}%</span>
                  </div>
                </div>
                <div className='col-span-1 text-center text-sm'>
                  <p>{cls.nextLesson}</p>
                  <p className='text-xs text-muted-foreground'>
                    {cls.nextLessonDate}
                  </p>
                </div>
                <div className='col-span-1 flex justify-center gap-2'>
                  <Button variant='ghost' size='sm'>
                    View
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Settings className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherClasses;
