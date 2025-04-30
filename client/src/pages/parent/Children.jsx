'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Input } from '../../components/ui/input';
import {
  Search,
  BookOpen,
  BarChart,
  MessageSquare,
  Star,
  FileText,
  Clock,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ParentChildren = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for children
  const children = [
    {
      id: 1,
      name: 'Abebe Kebede',
      grade: 'Grade 3',
      avatar: '/placeholder.svg?height=40&width=40',
      progress: 72,
      attendance: 95,
      lastActive: '2025-04-27',
      courses: [
        { id: 1, name: 'Computer Basics', progress: 85, teacher: 'Mr. Dawit' },
        { id: 2, name: 'Typing Skills', progress: 68, teacher: 'Ms. Meron' },
        { id: 3, name: 'Digital Art', progress: 92, teacher: 'Ms. Sara' },
      ],
      recentAchievements: [
        {
          id: 1,
          title: 'Completed Introduction to Computers',
          date: '2025-04-15',
        },
        { id: 2, title: 'Perfect Score on Typing Test', date: '2025-04-10' },
      ],
      upcomingAssignments: [
        {
          id: 1,
          title: 'Computer Hardware Worksheet',
          dueDate: '2025-05-05',
          status: 'not-started',
        },
        {
          id: 2,
          title: 'Typing Practice Exercise',
          dueDate: '2025-05-10',
          status: 'in-progress',
        },
      ],
    },
    {
      id: 2,
      name: 'Sara Kebede',
      grade: 'Grade 1',
      avatar: '/placeholder.svg?height=40&width=40',
      progress: 45,
      attendance: 88,
      lastActive: '2025-04-26',
      courses: [
        { id: 1, name: 'Computer Basics', progress: 52, teacher: 'Mr. Dawit' },
        { id: 2, name: 'Mouse Skills', progress: 78, teacher: 'Ms. Tigist' },
      ],
      recentAchievements: [
        { id: 1, title: 'First Computer Login', date: '2025-04-20' },
        { id: 2, title: 'Completed Mouse Tutorial', date: '2025-04-18' },
      ],
      upcomingAssignments: [
        {
          id: 1,
          title: 'Computer Parts Coloring',
          dueDate: '2025-05-08',
          status: 'not-started',
        },
      ],
    },
  ];

  // Filter children based on search query
  const filteredChildren = children.filter((child) => {
    return (
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.grade.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleViewDetails = (childId) => {
    toast.info('View Details', {
      description: `Viewing details for child #${childId}`,
    });
  };

  const handleContactTeacher = (teacherName) => {
    toast.info('Contact Teacher', {
      description: `Sending message to ${teacherName}`,
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Children</h1>
          <p className='text-muted-foreground'>
            Monitor your children's progress and activities
          </p>
        </div>
      </div>

      <div className='relative'>
        <Input
          placeholder='Search children...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-8'
        />
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      </div>

      <div className='space-y-6'>
        {filteredChildren.map((child) => (
          <Card key={child.id} className='overflow-hidden'>
            <CardHeader>
              <div className='flex flex-col md:flex-row md:items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={child.avatar || '/placeholder.svg'} />
                  <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>{child.grade}</CardDescription>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        className='text-blue-500 border-blue-500'
                      >
                        Last Active: {child.lastActive}
                      </Badge>
                      <Badge
                        variant='outline'
                        className='text-green-500 border-green-500'
                      >
                        Attendance: {child.attendance}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='overview' className='space-y-4'>
                <TabsList>
                  <TabsTrigger value='overview'>
                    <BarChart className='h-4 w-4 mr-2' />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value='courses'>
                    <BookOpen className='h-4 w-4 mr-2' />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value='achievements'>
                    <Star className='h-4 w-4 mr-2' />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value='assignments'>
                    <FileText className='h-4 w-4 mr-2' />
                    Assignments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='overview'>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Overall Progress</span>
                        <span className='font-medium'>{child.progress}%</span>
                      </div>
                      <Progress value={child.progress} className='h-2' />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <h3 className='text-sm font-medium mb-2'>
                          Recent Achievements
                        </h3>
                        <div className='space-y-2'>
                          {child.recentAchievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className='flex items-center gap-2 text-sm'
                            >
                              <div className='h-2 w-2 rounded-full bg-green-500'></div>
                              <div className='flex-1'>{achievement.title}</div>
                              <div className='text-xs text-muted-foreground'>
                                {achievement.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className='text-sm font-medium mb-2'>
                          Upcoming Assignments
                        </h3>
                        <div className='space-y-2'>
                          {child.upcomingAssignments.map((assignment) => (
                            <div
                              key={assignment.id}
                              className='flex items-center gap-2 text-sm'
                            >
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  assignment.status === 'not-started'
                                    ? 'bg-amber-500'
                                    : 'bg-blue-500'
                                }`}
                              ></div>
                              <div className='flex-1'>{assignment.title}</div>
                              <div className='text-xs text-muted-foreground'>
                                Due: {assignment.dueDate}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='courses'>
                  <div className='space-y-4'>
                    {child.courses.map((course) => (
                      <div key={course.id} className='border rounded-lg p-4'>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                          <div>
                            <h3 className='font-medium'>{course.name}</h3>
                            <p className='text-sm text-muted-foreground'>
                              Teacher: {course.teacher}
                            </p>
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleContactTeacher(course.teacher)}
                          >
                            <MessageSquare className='h-4 w-4 mr-1' />
                            Contact Teacher
                          </Button>
                        </div>
                        <div className='mt-2'>
                          <div className='flex justify-between text-sm mb-1'>
                            <span>Progress</span>
                            <span className='font-medium'>
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className='h-2' />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value='achievements'>
                  <div className='space-y-4'>
                    {child.recentAchievements.length === 0 ? (
                      <div className='text-center py-6 text-muted-foreground'>
                        No achievements yet
                      </div>
                    ) : (
                      child.recentAchievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className='flex items-start gap-4 border rounded-lg p-4'
                        >
                          <div className='rounded-full bg-primary/10 p-2'>
                            <Star className='h-4 w-4 text-primary' />
                          </div>
                          <div className='flex-1'>
                            <h3 className='font-medium'>{achievement.title}</h3>
                            <p className='text-sm text-muted-foreground'>
                              Achieved on {achievement.date}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value='assignments'>
                  <div className='space-y-4'>
                    {child.upcomingAssignments.length === 0 ? (
                      <div className='text-center py-6 text-muted-foreground'>
                        No upcoming assignments
                      </div>
                    ) : (
                      child.upcomingAssignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className='flex items-start gap-4 border rounded-lg p-4'
                        >
                          <div className='rounded-full bg-primary/10 p-2'>
                            <Clock className='h-4 w-4 text-primary' />
                          </div>
                          <div className='flex-1'>
                            <h3 className='font-medium'>{assignment.title}</h3>
                            <p className='text-sm text-muted-foreground'>
                              Due: {assignment.dueDate}
                            </p>
                            <Badge
                              className={`mt-2 ${
                                assignment.status === 'not-started'
                                  ? 'bg-amber-500'
                                  : assignment.status === 'in-progress'
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                              }`}
                            >
                              {assignment.status === 'not-started'
                                ? 'Not Started'
                                : assignment.status === 'in-progress'
                                ? 'In Progress'
                                : 'Completed'}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                className='w-full'
                onClick={() => handleViewDetails(child.id)}
              >
                View Full Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParentChildren;
