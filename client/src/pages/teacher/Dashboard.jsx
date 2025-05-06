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
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Users,
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Grade 1-2 Computer Basics', students: 25, progress: 65 },
    { id: 2, name: 'Grade 3-4 Typing Skills', students: 22, progress: 48 },
    { id: 3, name: 'Grade 5-6 Programming Intro', students: 18, progress: 30 },
  ];

  // Mock data for upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: 'Grade typing assignments',
      dueDate: '2025-04-28',
      type: 'assignment',
    },
    {
      id: 2,
      title: 'Parent-teacher meeting',
      dueDate: '2025-04-30',
      type: 'event',
    },
    {
      id: 3,
      title: 'Submit progress reports',
      dueDate: '2025-05-05',
      type: 'report',
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      description: 'Added new lesson to Grade 3-4 course',
      time: '2 hours ago',
    },
    { id: 2, description: 'Graded 15 student assignments', time: '1 day ago' },
    {
      id: 3,
      description: 'Created new quiz for Grade 5-6',
      time: '2 days ago',
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Welcome back, {user?.name || 'Teacher'}!
          </h1>
          <p className='text-muted-foreground'>
            Here's what's happening with your classes today.
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button>
            <FileText className='mr-2 h-4 w-4' />
            Create Lesson
          </Button>
          <Button variant='outline'>
            <Calendar className='mr-2 h-4 w-4' />
            Schedule
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Students
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>65</div>
            <p className='text-xs text-muted-foreground'>+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Classes</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3</div>
            <p className='text-xs text-muted-foreground'>
              Across 3 grade levels
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Avg. Completion
            </CardTitle>
            <BarChart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>48%</div>
            <p className='text-xs text-muted-foreground'>+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Tasks</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>7</div>
            <p className='text-xs text-muted-foreground'>3 high priority</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='classes'>
        <TabsList>
          <TabsTrigger value='classes'>My Classes</TabsTrigger>
          <TabsTrigger value='tasks'>Upcoming Tasks</TabsTrigger>
          <TabsTrigger value='activity'>Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value='classes' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {classes.map((cls) => (
              <Card key={cls.id}>
                <CardHeader>
                  <CardTitle>{cls.name}</CardTitle>
                  <CardDescription>
                    {cls.students} students enrolled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>Average Progress</span>
                      <span className='font-medium'>{cls.progress}%</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: `${cls.progress}%` }}
                      />
                    </div>
                    <div className='pt-4'>
                      <Button variant='outline' className='w-full'>
                        View Class
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value='tasks' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Tasks and events that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className='flex items-start gap-4 rounded-lg border p-4'
                  >
                    <div className='rounded-full bg-primary/10 p-2'>
                      {task.type === 'assignment' && (
                        <FileText className='h-4 w-4 text-primary' />
                      )}
                      {task.type === 'event' && (
                        <Calendar className='h-4 w-4 text-primary' />
                      )}
                      {task.type === 'report' && (
                        <BarChart className='h-4 w-4 text-primary' />
                      )}
                    </div>
                    <div className='flex-1 space-y-1'>
                      <p className='font-medium leading-none'>{task.title}</p>
                      <p className='text-sm text-muted-foreground'>
                        Due: {task.dueDate}
                      </p>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <CheckCircle className='h-4 w-4 mr-2' />
                      Mark Complete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='activity' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className='flex items-center gap-4 rounded-lg border p-3'
                  >
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>
                        {activity.description}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {activity.time}
                      </p>
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

export default TeacherDashboard;
