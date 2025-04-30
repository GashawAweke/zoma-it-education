'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import {
  BarChart,
  Download,
  Search,
  Users,
  BarChart3,
  TrendingUp,
  Filter,
} from 'lucide-react';
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

const TeacherProgress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Grade 1-2 Computer Basics', students: 25 },
    { id: 2, name: 'Grade 3-4 Typing Skills', students: 22 },
    { id: 3, name: 'Grade 5-6 Programming Intro', students: 18 },
  ];

  // Mock data for students
  const students = [
    {
      id: 1,
      name: 'Abebe Kebede',
      avatar: '/placeholder.svg?height=40&width=40',
      class: 'Grade 3-4 Typing Skills',
      overallProgress: 78,
      attendance: 95,
      lastActive: '2025-04-27',
      skills: {
        typing: 85,
        computerBasics: 90,
        problemSolving: 70,
      },
    },
    {
      id: 2,
      name: 'Sara Tadesse',
      avatar: '/placeholder.svg?height=40&width=40',
      class: 'Grade 3-4 Typing Skills',
      overallProgress: 65,
      attendance: 88,
      lastActive: '2025-04-26',
      skills: {
        typing: 72,
        computerBasics: 80,
        problemSolving: 60,
      },
    },
    {
      id: 3,
      name: 'Dawit Haile',
      avatar: '/placeholder.svg?height=40&width=40',
      class: 'Grade 5-6 Programming Intro',
      overallProgress: 92,
      attendance: 98,
      lastActive: '2025-04-28',
      skills: {
        typing: 95,
        computerBasics: 95,
        problemSolving: 90,
      },
    },
    {
      id: 4,
      name: 'Meron Abebe',
      avatar: '/placeholder.svg?height=40&width=40',
      class: 'Grade 1-2 Computer Basics',
      overallProgress: 45,
      attendance: 75,
      lastActive: '2025-04-20',
      skills: {
        typing: 40,
        computerBasics: 60,
        problemSolving: 35,
      },
    },
    {
      id: 5,
      name: 'Yonas Bekele',
      avatar: '/placeholder.svg?height=40&width=40',
      class: 'Grade 5-6 Programming Intro',
      overallProgress: 82,
      attendance: 92,
      lastActive: '2025-04-25',
      skills: {
        typing: 85,
        computerBasics: 90,
        problemSolving: 80,
      },
    },
  ];

  // Filter students based on search query and selected class
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass =
      selectedClass === 'all' || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  // Mock data for progress over time
  const progressOverTimeData = [
    { month: 'Jan', typing: 45, computerBasics: 60, problemSolving: 30 },
    { month: 'Feb', typing: 50, computerBasics: 65, problemSolving: 35 },
    { month: 'Mar', typing: 60, computerBasics: 70, problemSolving: 45 },
    { month: 'Apr', typing: 75, computerBasics: 80, problemSolving: 55 },
    { month: 'May', typing: 85, computerBasics: 85, problemSolving: 65 },
  ];

  // Mock data for skill distribution
  const skillDistributionData = [
    { name: 'Beginner', value: 15, color: '#ef4444' },
    { name: 'Intermediate', value: 45, color: '#f59e0b' },
    { name: 'Advanced', value: 30, color: '#10b981' },
    { name: 'Expert', value: 10, color: '#3b82f6' },
  ];

  // Mock data for assignment completion
  const assignmentCompletionData = [
    { name: 'Computer Hardware', completed: 90, inProgress: 5, notStarted: 5 },
    { name: 'Typing Practice', completed: 75, inProgress: 15, notStarted: 10 },
    {
      name: 'Programming Basics',
      completed: 60,
      inProgress: 25,
      notStarted: 15,
    },
    { name: 'Digital Art', completed: 80, inProgress: 10, notStarted: 10 },
    { name: 'Internet Safety', completed: 95, inProgress: 5, notStarted: 0 },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Student Progress
          </h1>
          <p className='text-muted-foreground'>
            Track and analyze student performance and learning outcomes
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='overview'>
            <BarChart className='h-4 w-4 mr-2' />
            Overview
          </TabsTrigger>
          <TabsTrigger value='students'>
            <Users className='h-4 w-4 mr-2' />
            Students
          </TabsTrigger>
          <TabsTrigger value='skills'>
            <TrendingUp className='h-4 w-4 mr-2' />
            Skills
          </TabsTrigger>
          <TabsTrigger value='assignments'>
            <BarChart3 className='h-4 w-4 mr-2' />
            Assignments
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Average Progress
                </CardTitle>
                <BarChart className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>72%</div>
                <p className='text-xs text-muted-foreground'>
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Attendance Rate
                </CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>89%</div>
                <p className='text-xs text-muted-foreground'>
                  +2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Assignment Completion
                </CardTitle>
                <BarChart3 className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>85%</div>
                <p className='text-xs text-muted-foreground'>
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Students
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>62</div>
                <p className='text-xs text-muted-foreground'>
                  Out of 65 total students
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>
                  Average student progress by skill area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    typing: {
                      label: 'Typing',
                      color: 'hsl(var(--chart-1))',
                    },
                    computerBasics: {
                      label: 'Computer Basics',
                      color: 'hsl(var(--chart-2))',
                    },
                    problemSolving: {
                      label: 'Problem Solving',
                      color: 'hsl(var(--chart-3))',
                    },
                  }}
                  className='h-[300px]'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <ReLineChart data={progressOverTimeData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='month' />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='typing'
                        stroke='var(--color-typing)'
                        strokeWidth={2}
                      />
                      <Line
                        type='monotone'
                        dataKey='computerBasics'
                        stroke='var(--color-computerBasics)'
                        strokeWidth={2}
                      />
                      <Line
                        type='monotone'
                        dataKey='problemSolving'
                        stroke='var(--color-problemSolving)'
                        strokeWidth={2}
                      />
                    </ReLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>
                  Student skill levels across all classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-[300px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <RePieChart>
                      <Pie
                        data={skillDistributionData}
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
                        {skillDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value='students' className='space-y-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-1'>
              <Input
                placeholder='Search students...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-8'
              />
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            </div>
            <div className='flex gap-2'>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Filter by class' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.name}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant='outline'>
                <Filter className='mr-2 h-4 w-4' />
                More Filters
              </Button>
            </div>
          </div>

          <div className='space-y-4'>
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className='p-6'>
                  <div className='flex flex-col md:flex-row gap-6'>
                    <div className='flex items-center gap-4'>
                      <Avatar className='h-12 w-12'>
                        <AvatarImage
                          src={student.avatar || '/placeholder.svg'}
                        />
                        <AvatarFallback>
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className='font-medium'>{student.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {student.class}
                        </p>
                      </div>
                    </div>
                    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <p className='text-sm font-medium'>Overall Progress</p>
                        <div className='flex items-center gap-2'>
                          <Progress
                            value={student.overallProgress}
                            className='h-2'
                          />
                          <span className='text-sm'>
                            {student.overallProgress}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Attendance</p>
                        <div className='flex items-center gap-2'>
                          <Progress
                            value={student.attendance}
                            className='h-2'
                          />
                          <span className='text-sm'>{student.attendance}%</span>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Last Active</p>
                        <p className='text-sm'>{student.lastActive}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant='outline' size='sm'>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value='skills' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of student skills across different areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-medium mb-2'>Typing Skills</h3>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Average WPM</span>
                        <span className='font-medium'>28 WPM</span>
                      </div>
                      <Progress value={56} className='h-2' />
                      <p className='text-xs text-muted-foreground mt-1'>
                        56% of target (50 WPM)
                      </p>
                    </div>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Average Accuracy</span>
                        <span className='font-medium'>92%</span>
                      </div>
                      <Progress value={92} className='h-2' />
                      <p className='text-xs text-muted-foreground mt-1'>
                        92% of target (100%)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-medium mb-2'>Computer Basics</h3>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Hardware Knowledge</span>
                        <span className='font-medium'>85%</span>
                      </div>
                      <Progress value={85} className='h-2' />
                    </div>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Software Navigation</span>
                        <span className='font-medium'>78%</span>
                      </div>
                      <Progress value={78} className='h-2' />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-medium mb-2'>Problem Solving</h3>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Logical Thinking</span>
                        <span className='font-medium'>72%</span>
                      </div>
                      <Progress value={72} className='h-2' />
                    </div>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Algorithmic Thinking</span>
                        <span className='font-medium'>65%</span>
                      </div>
                      <Progress value={65} className='h-2' />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value='assignments' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Assignment Completion</CardTitle>
              <CardDescription>
                Student progress on assigned tasks and exercises
              </CardDescription>
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
                  <ReBarChart data={assignmentCompletionData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey='completed'
                      stackId='a'
                      fill='var(--color-completed)'
                    />
                    <Bar
                      dataKey='inProgress'
                      stackId='a'
                      fill='var(--color-inProgress)'
                    />
                    <Bar
                      dataKey='notStarted'
                      stackId='a'
                      fill='var(--color-notStarted)'
                    />
                  </ReBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>
                Detailed breakdown of individual assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {assignmentCompletionData.map((assignment, index) => (
                  <div key={index} className='border rounded-lg p-4'>
                    <h3 className='font-medium mb-2'>{assignment.name}</h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <p className='text-sm font-medium'>Completed</p>
                        <div className='flex items-center gap-2'>
                          <Progress
                            value={assignment.completed}
                            className='h-2'
                          />
                          <span className='text-sm'>
                            {assignment.completed}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>In Progress</p>
                        <div className='flex items-center gap-2'>
                          <Progress
                            value={assignment.inProgress}
                            className='h-2'
                          />
                          <span className='text-sm'>
                            {assignment.inProgress}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Not Started</p>
                        <div className='flex items-center gap-2'>
                          <Progress
                            value={assignment.notStarted}
                            className='h-2'
                          />
                          <span className='text-sm'>
                            {assignment.notStarted}%
                          </span>
                        </div>
                      </div>
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

export default TeacherProgress;
