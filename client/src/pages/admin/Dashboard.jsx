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
  BookOpen,
  Download,
  FileText,
  PieChart,
  Plus,
  Users,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for system stats
  const stats = [
    {
      title: 'Total Users',
      value: '1,248',
      icon: Users,
      change: '+12% from last month',
    },
    {
      title: 'Active Courses',
      value: '32',
      icon: BookOpen,
      change: '+3 new courses',
    },
    {
      title: 'Avg. Completion',
      value: '68%',
      icon: PieChart,
      change: '+5% from last month',
    },
    {
      title: 'Total Lessons',
      value: '456',
      icon: FileText,
      change: '+24 new lessons',
    },
  ];

  // Mock data for user distribution
  const userDistribution = [
    { role: 'Students', count: 950, percentage: 76 },
    { role: 'Teachers', count: 45, percentage: 3.6 },
    { role: 'Parents', count: 230, percentage: 18.4 },
    { role: 'Admins', count: 8, percentage: 0.6 },
    { role: 'Health Team', count: 15, percentage: 1.2 },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'Dawit Haile (Teacher)',
      action: 'Added new course: Advanced Programming',
      time: '2 hours ago',
    },
    {
      id: 2,
      user: 'System',
      action: 'Backup completed successfully',
      time: '6 hours ago',
    },
    {
      id: 3,
      user: 'Meron Abebe (Admin)',
      action: 'Updated school calendar',
      time: '1 day ago',
    },
    {
      id: 4,
      user: 'Yonas Kebede (Health)',
      action: 'Added new psychological resource',
      time: '2 days ago',
    },
    {
      id: 5,
      user: 'System',
      action: 'Automatic grade reports generated',
      time: '3 days ago',
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Admin Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage and monitor the entire learning system.
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add User
          </Button>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export Reports
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-xs text-muted-foreground'>{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>System Overview</TabsTrigger>
          <TabsTrigger value='users'>User Distribution</TabsTrigger>
          <TabsTrigger value='activity'>Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Current status of the learning platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Server Status</span>
                    <span className='flex items-center text-sm text-green-500'>
                      <span className='h-2 w-2 rounded-full bg-green-500 mr-1'></span>
                      Operational
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Database</span>
                    <span className='flex items-center text-sm text-green-500'>
                      <span className='h-2 w-2 rounded-full bg-green-500 mr-1'></span>
                      Connected
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Storage Usage</span>
                    <span className='text-sm'>68% (34.2 GB / 50 GB)</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-secondary'>
                    <div
                      className='h-2 rounded-full bg-amber-500'
                      style={{ width: '68%' }}
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Last Backup</span>
                    <span className='text-sm'>Today, 06:00 AM</span>
                  </div>
                  <div className='pt-2'>
                    <Button variant='outline' className='w-full'>
                      System Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
                <CardDescription>
                  Most active courses this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Introduction to Computers</span>
                      <span className='font-medium'>85%</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Basic Typing Tutorials</span>
                      <span className='font-medium'>72%</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: '72%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Programming Basics</span>
                      <span className='font-medium'>64%</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: '64%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Digital Art</span>
                      <span className='font-medium'>58%</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: '58%' }}
                      />
                    </div>
                  </div>
                  <div className='pt-2'>
                    <Button variant='outline' className='w-full'>
                      View All Courses
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='users' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown of users by role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {userDistribution.map((item, index) => (
                  <div key={index}>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>{item.role}</span>
                      <span className='font-medium'>
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-secondary'>
                      <div
                        className='h-2 rounded-full bg-primary'
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className='pt-4 flex justify-between'>
                  <Button variant='outline'>Add New User</Button>
                  <Button variant='outline'>Manage Roles</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='activity' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>Recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className='flex items-start gap-4 rounded-lg border p-3'
                  >
                    <div className='rounded-full bg-primary/10 p-2'>
                      <FileText className='h-4 w-4 text-primary' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex flex-col sm:flex-row sm:justify-between'>
                        <p className='font-medium'>{activity.user}</p>
                        <p className='text-xs text-muted-foreground'>
                          {activity.time}
                        </p>
                      </div>
                      <p className='text-sm mt-1'>{activity.action}</p>
                    </div>
                  </div>
                ))}
                <div className='pt-2'>
                  <Button variant='outline' className='w-full'>
                    View Full Activity Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
