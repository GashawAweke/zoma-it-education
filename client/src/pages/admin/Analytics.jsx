'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Calendar, Download, LineChart, BarChart3, Users } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartType, setChartType] = useState('line');

  // Mock data for user activity
  const userActivityData = [
    { name: 'Week 1', students: 450, teachers: 35, parents: 120 },
    { name: 'Week 2', students: 520, teachers: 38, parents: 150 },
    { name: 'Week 3', students: 580, teachers: 42, parents: 180 },
    { name: 'Week 4', students: 650, teachers: 45, parents: 210 },
    { name: 'Week 5', students: 700, teachers: 45, parents: 230 },
  ];

  // Mock data for course completion
  const courseCompletionData = [
    { name: 'Computer Basics', completed: 85, inProgress: 12, notStarted: 3 },
    { name: 'Typing Skills', completed: 72, inProgress: 20, notStarted: 8 },
    {
      name: 'Programming Intro',
      completed: 45,
      inProgress: 35,
      notStarted: 20,
    },
    { name: 'Digital Art', completed: 60, inProgress: 25, notStarted: 15 },
    { name: 'Internet Safety', completed: 90, inProgress: 8, notStarted: 2 },
  ];

  // Mock data for user distribution
  const userDistributionData = [
    { name: 'Students', value: 950, color: '#2563eb' },
    { name: 'Teachers', value: 45, color: '#16a34a' },
    { name: 'Parents', value: 230, color: '#ca8a04' },
    { name: 'Admins', value: 8, color: '#dc2626' },
    { name: 'Health Team', value: 15, color: '#9333ea' },
  ];

  // Mock data for grade distribution
  const gradeDistributionData = [
    { name: 'Grade 1', students: 120 },
    { name: 'Grade 2', students: 110 },
    { name: 'Grade 3', students: 130 },
    { name: 'Grade 4', students: 100 },
    { name: 'Grade 5', students: 95 },
    { name: 'Grade 6', students: 105 },
    { name: 'Grade 7', students: 90 },
    { name: 'Grade 8', students: 85 },
    { name: 'Grade 9', students: 75 },
    { name: 'Grade 10', students: 40 },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Analytics Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Detailed insights into system usage and performance.
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button variant='outline'>
            <Calendar className='mr-2 h-4 w-4' />
            Date Range
          </Button>
          <Button>
            <Download className='mr-2 h-4 w-4' />
            Export Data
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,248</div>
            <p className='text-xs text-muted-foreground'>
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Students
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>876</div>
            <p className='text-xs text-muted-foreground'>
              92% of total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Course Completion
            </CardTitle>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>68%</div>
            <p className='text-xs text-muted-foreground'>+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>System Uptime</CardTitle>
            <LineChart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>99.8%</div>
            <p className='text-xs text-muted-foreground'>Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='col-span-1'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Active users over time</CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className='w-[120px]'>
                  <SelectValue placeholder='Time Range' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='week'>This Week</SelectItem>
                  <SelectItem value='month'>This Month</SelectItem>
                  <SelectItem value='quarter'>This Quarter</SelectItem>
                  <SelectItem value='year'>This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: 'Students',
                  color: 'hsl(var(--chart-1))',
                },
                teachers: {
                  label: 'Teachers',
                  color: 'hsl(var(--chart-2))',
                },
                parents: {
                  label: 'Parents',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <ReLineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='students'
                    stroke='var(--color-students)'
                    strokeWidth={2}
                  />
                  <Line
                    type='monotone'
                    dataKey='teachers'
                    stroke='var(--color-teachers)'
                    strokeWidth={2}
                  />
                  <Line
                    type='monotone'
                    dataKey='parents'
                    stroke='var(--color-parents)'
                    strokeWidth={2}
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className='col-span-1'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Course Completion</CardTitle>
                <CardDescription>Status of course completion</CardDescription>
              </div>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className='w-[120px]'>
                  <SelectValue placeholder='Chart Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='bar'>Bar Chart</SelectItem>
                  <SelectItem value='line'>Line Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: {
                  label: 'Completed',
                  color: 'hsl(var(--chart-1))',
                },
                inProgress: {
                  label: 'In Progress',
                  color: 'hsl(var(--chart-2))',
                },
                notStarted: {
                  label: 'Not Started',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                {chartType === 'bar' ? (
                  <ReBarChart data={courseCompletionData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey='completed' fill='var(--color-completed)' />
                    <Bar dataKey='inProgress' fill='var(--color-inProgress)' />
                    <Bar dataKey='notStarted' fill='var(--color-notStarted)' />
                  </ReBarChart>
                ) : (
                  <ReLineChart data={courseCompletionData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='completed'
                      stroke='var(--color-completed)'
                      strokeWidth={2}
                    />
                    <Line
                      type='monotone'
                      dataKey='inProgress'
                      stroke='var(--color-inProgress)'
                      strokeWidth={2}
                    />
                    <Line
                      type='monotone'
                      dataKey='notStarted'
                      stroke='var(--color-notStarted)'
                      strokeWidth={2}
                    />
                  </ReLineChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <RePieChart>
                  <Pie
                    data={userDistributionData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Number of students per grade</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: 'Students',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <ReBarChart data={gradeDistributionData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey='students' fill='var(--color-students)' />
                </ReBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
