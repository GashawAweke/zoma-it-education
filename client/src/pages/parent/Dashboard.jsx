'use client';
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Calendar, MessageSquare, Star } from 'lucide-react';

const ParentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for children
  const children = [
    {
      id: 1,
      name: 'Abebe Kebede',
      grade: 'Grade 3',
      avatar: '/placeholder.svg?height=40&width=40',
      progress: 72,
      recentAchievements: [
        {
          id: 1,
          title: 'Completed Introduction to Computers',
          date: '2025-04-15',
        },
        { id: 2, title: 'Perfect Score on Typing Test', date: '2025-04-10' },
      ],
    },
    {
      id: 2,
      name: 'Sara Kebede',
      grade: 'Grade 1',
      avatar: '/placeholder.svg?height=40&width=40',
      progress: 45,
      recentAchievements: [
        { id: 1, title: 'First Computer Login', date: '2025-04-20' },
        { id: 2, title: 'Completed Mouse Tutorial', date: '2025-04-18' },
      ],
    },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2025-04-30',
      time: '14:00-16:00',
    },
    {
      id: 2,
      title: 'School Exhibition',
      date: '2025-05-15',
      time: '09:00-12:00',
    },
    {
      id: 3,
      title: 'End of Term Ceremony',
      date: '2025-06-20',
      time: '10:00-12:00',
    },
  ];

  // Mock data for recent messages
  const recentMessages = [
    {
      id: 1,
      from: 'Ms. Tigist (Math Teacher)',
      message: 'Abebe is doing well in the recent math exercises.',
      time: '2 hours ago',
    },
    {
      id: 2,
      from: 'Mr. Dawit (IT Teacher)',
      message: 'Sara has shown great improvement in typing skills.',
      time: '1 day ago',
    },
    {
      id: 3,
      from: 'School Admin',
      message: 'Please complete the annual survey by next Friday.',
      time: '3 days ago',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          Welcome, {user?.name || 'Parent'}!
        </h1>
        <p className='text-muted-foreground'>
          Here's how your children are doing at school.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Children</CardTitle>
            <Star className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{children.length}</div>
            <p className='text-xs text-muted-foreground'>
              Enrolled at Zoma School
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Upcoming Events
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{upcomingEvents.length}</div>
            <p className='text-xs text-muted-foreground'>In the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>New Messages</CardTitle>
            <MessageSquare className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{recentMessages.length}</div>
            <p className='text-xs text-muted-foreground'>
              From teachers and staff
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='children'>
        <TabsList>
          <TabsTrigger value='children'>My Children</TabsTrigger>
          <TabsTrigger value='events'>Upcoming Events</TabsTrigger>
          <TabsTrigger value='messages'>Recent Messages</TabsTrigger>
        </TabsList>
        <TabsContent value='children' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            {children.map((child) => (
              <Card key={child.id}>
                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <Avatar>
                      <AvatarImage src={child.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>{child.grade}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Overall Progress</span>
                        <span className='font-medium'>{child.progress}%</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-secondary'>
                        <div
                          className='h-2 rounded-full bg-primary'
                          style={{ width: `${child.progress}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className='text-sm font-medium mb-2'>
                        Recent Achievements
                      </h4>
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

                    <div className='pt-2'>
                      <Button variant='outline' className='w-full'>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value='events' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>School Calendar</CardTitle>
              <CardDescription>Upcoming events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className='flex items-start gap-4 rounded-lg border p-4'
                  >
                    <div className='rounded-full bg-primary/10 p-2'>
                      <Calendar className='h-4 w-4 text-primary' />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <p className='font-medium leading-none'>{event.title}</p>
                      <p className='text-sm text-muted-foreground'>
                        Date: {event.date}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Time: {event.time}
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Add to Calendar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='messages' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Recent communications from school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className='flex flex-col gap-2 rounded-lg border p-4'
                  >
                    <div className='flex items-center justify-between'>
                      <p className='font-medium'>{message.from}</p>
                      <p className='text-xs text-muted-foreground'>
                        {message.time}
                      </p>
                    </div>
                    <p className='text-sm'>{message.message}</p>
                    <div className='flex justify-end gap-2 pt-2'>
                      <Button variant='ghost' size='sm'>
                        Mark as Read
                      </Button>
                      <Button variant='outline' size='sm'>
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
