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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import {
  Download,
  FileText,
  BarChartIcon,
  Calendar,
  Printer,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart';

const ParentReports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('progress');
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('term');

  // Mock data for children
  const children = [
    { id: 1, name: 'Abebe Kebede', grade: 'Grade 3' },
    { id: 2, name: 'Sara Kebede', grade: 'Grade 1' },
  ];

  // Mock data for progress reports
  const progressReports = [
    {
      id: 1,
      title: 'Term 1 Progress Report',
      child: 'Abebe Kebede',
      date: '2025-04-15',
      period: 'term',
      overallGrade: 'A-',
      subjects: [
        {
          name: 'Computer Basics',
          grade: 'A',
          comments: 'Excellent understanding of hardware components',
        },
        {
          name: 'Typing Skills',
          grade: 'B+',
          comments: 'Good progress, needs to work on accuracy',
        },
        {
          name: 'Digital Art',
          grade: 'A',
          comments: 'Shows great creativity and attention to detail',
        },
      ],
      teacherComments:
        'Abebe is making excellent progress in all subjects. He is attentive in class and completes all assignments on time.',
    },
    {
      id: 2,
      title: 'Monthly Progress Update - March',
      child: 'Abebe Kebede',
      date: '2025-03-30',
      period: 'month',
      overallGrade: 'B+',
      subjects: [
        {
          name: 'Computer Basics',
          grade: 'B+',
          comments: 'Good understanding of software applications',
        },
        {
          name: 'Typing Skills',
          grade: 'B',
          comments: 'Improving speed, but needs to work on accuracy',
        },
        {
          name: 'Digital Art',
          grade: 'A-',
          comments: 'Creative work with digital tools',
        },
      ],
      teacherComments:
        'Abebe has shown improvement this month, particularly in Digital Art.',
    },
    {
      id: 3,
      title: 'Term 1 Progress Report',
      child: 'Sara Kebede',
      date: '2025-04-15',
      period: 'term',
      overallGrade: 'B',
      subjects: [
        {
          name: 'Computer Basics',
          grade: 'B',
          comments: 'Good understanding of basic concepts',
        },
        {
          name: 'Mouse Skills',
          grade: 'A-',
          comments: 'Excellent control and precision',
        },
      ],
      teacherComments:
        'Sara is adapting well to computer classes. She is enthusiastic and eager to learn.',
    },
  ];

  // Mock data for attendance reports
  const attendanceReports = [
    {
      id: 1,
      title: 'Term 1 Attendance Report',
      child: 'Abebe Kebede',
      date: '2025-04-15',
      period: 'term',
      daysPresent: 45,
      daysAbsent: 2,
      daysLate: 3,
      totalDays: 50,
      attendanceRate: 90,
    },
    {
      id: 2,
      title: 'Monthly Attendance - March',
      child: 'Abebe Kebede',
      date: '2025-03-30',
      period: 'month',
      daysPresent: 18,
      daysAbsent: 1,
      daysLate: 1,
      totalDays: 20,
      attendanceRate: 90,
    },
    {
      id: 3,
      title: 'Term 1 Attendance Report',
      child: 'Sara Kebede',
      date: '2025-04-15',
      period: 'term',
      daysPresent: 43,
      daysAbsent: 5,
      daysLate: 2,
      totalDays: 50,
      attendanceRate: 86,
    },
  ];

  // Mock data for progress over time
  const progressOverTimeData = [
    { month: 'Jan', 'Abebe Kebede': 65, 'Sara Kebede': 45 },
    { month: 'Feb', 'Abebe Kebede': 68, 'Sara Kebede': 50 },
    { month: 'Mar', 'Abebe Kebede': 72, 'Sara Kebede': 55 },
    { month: 'Apr', 'Abebe Kebede': 78, 'Sara Kebede': 60 },
  ];

  // Mock data for attendance over time
  const attendanceOverTimeData = [
    { month: 'Jan', 'Abebe Kebede': 88, 'Sara Kebede': 80 },
    { month: 'Feb', 'Abebe Kebede': 92, 'Sara Kebede': 82 },
    { month: 'Mar', 'Abebe Kebede': 90, 'Sara Kebede': 85 },
    { month: 'Apr', 'Abebe Kebede': 95, 'Sara Kebede': 88 },
  ];

  // Filter reports based on selected child and period
  const filteredProgressReports = progressReports.filter((report) => {
    const matchesChild =
      selectedChild === 'all' || report.child === selectedChild;
    const matchesPeriod =
      selectedPeriod === 'all' || report.period === selectedPeriod;
    return matchesChild && matchesPeriod;
  });

  const filteredAttendanceReports = attendanceReports.filter((report) => {
    const matchesChild =
      selectedChild === 'all' || report.child === selectedChild;
    const matchesPeriod =
      selectedPeriod === 'all' || report.period === selectedPeriod;
    return matchesChild && matchesPeriod;
  });

  const handleDownloadReport = (reportId) => {
    toast.success('Report Downloaded', {
      description: `Report #${reportId} has been downloaded.`,
    });
  };

  const handlePrintReport = (reportId) => {
    toast.info('Print Report', {
      description: `Preparing to print report #${reportId}.`,
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Progress Reports
          </h1>
          <p className='text-muted-foreground'>
            View detailed reports on your children's academic progress
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Download All
          </Button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <Select value={selectedChild} onValueChange={setSelectedChild}>
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Select child' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Children</SelectItem>
            {children.map((child) => (
              <SelectItem key={child.id} value={child.name}>
                {child.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Select period' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Periods</SelectItem>
            <SelectItem value='term'>Term</SelectItem>
            <SelectItem value='month'>Monthly</SelectItem>
            <SelectItem value='week'>Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='progress'>
            <BarChartIcon className='h-4 w-4 mr-2' />
            Academic Progress
          </TabsTrigger>
          <TabsTrigger value='attendance'>
            <Calendar className='h-4 w-4 mr-2' />
            Attendance
          </TabsTrigger>
          <TabsTrigger value='analytics'>
            <BarChartIcon className='h-4 w-4 mr-2' />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Progress Reports Tab */}
        <TabsContent value='progress' className='space-y-4'>
          {filteredProgressReports.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-10'>
                <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-medium'>No Reports Found</h3>
                <p className='text-sm text-muted-foreground'>
                  {selectedChild !== 'all' || selectedPeriod !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No progress reports are available yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProgressReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>
                        {report.child} • {report.date}
                      </CardDescription>
                    </div>
                    <Badge className='w-fit'>
                      Overall Grade: {report.overallGrade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='border rounded-lg divide-y'>
                      <div className='grid grid-cols-3 p-3 font-medium text-sm'>
                        <div>Subject</div>
                        <div>Grade</div>
                        <div>Comments</div>
                      </div>
                      {report.subjects.map((subject, index) => (
                        <div
                          key={index}
                          className='grid grid-cols-3 p-3 text-sm'
                        >
                          <div>{subject.name}</div>
                          <div>{subject.grade}</div>
                          <div>{subject.comments}</div>
                        </div>
                      ))}
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-medium mb-2'>Teacher Comments</h3>
                      <p className='text-sm'>{report.teacherComments}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePrintReport(report.id)}
                  >
                    <Printer className='h-4 w-4 mr-1' />
                    Print
                  </Button>
                  <Button
                    size='sm'
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    <Download className='h-4 w-4 mr-1' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Attendance Reports Tab */}
        <TabsContent value='attendance' className='space-y-4'>
          {filteredAttendanceReports.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-10'>
                <Calendar className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-medium'>
                  No Attendance Reports Found
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {selectedChild !== 'all' || selectedPeriod !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No attendance reports are available yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAttendanceReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>
                        {report.child} • {report.date}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`w-fit ${
                        report.attendanceRate >= 90
                          ? 'bg-green-500'
                          : report.attendanceRate >= 80
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                    >
                      Attendance: {report.attendanceRate}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <Card>
                        <CardContent className='pt-6'>
                          <div className='text-center'>
                            <div className='text-2xl font-bold'>
                              {report.daysPresent}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              Days Present
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className='pt-6'>
                          <div className='text-center'>
                            <div className='text-2xl font-bold'>
                              {report.daysAbsent}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              Days Absent
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className='pt-6'>
                          <div className='text-center'>
                            <div className='text-2xl font-bold'>
                              {report.daysLate}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              Days Late
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className='pt-6'>
                          <div className='text-center'>
                            <div className='text-2xl font-bold'>
                              {report.totalDays}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              Total School Days
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <h3 className='text-sm font-medium mb-2'>
                        Attendance Rate
                      </h3>
                      <div className='flex items-center gap-2'>
                        <Progress
                          value={report.attendanceRate}
                          className='h-2 flex-1'
                        />
                        <span className='text-sm font-medium'>
                          {report.attendanceRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePrintReport(report.id)}
                  >
                    <Printer className='h-4 w-4 mr-1' />
                    Print
                  </Button>
                  <Button
                    size='sm'
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    <Download className='h-4 w-4 mr-1' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value='analytics' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Academic progress trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    'Abebe Kebede': {
                      label: 'Abebe Kebede',
                      color: 'hsl(var(--chart-1))',
                    },
                    'Sara Kebede': {
                      label: 'Sara Kebede',
                      color: 'hsl(var(--chart-2))',
                    },
                  }}
                  className='h-[300px]'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={progressOverTimeData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='month' />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='Abebe Kebede'
                        stroke='var(--color-Abebe Kebede)'
                        strokeWidth={2}
                      />
                      <Line
                        type='monotone'
                        dataKey='Sara Kebede'
                        stroke='var(--color-Sara Kebede)'
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Over Time</CardTitle>
                <CardDescription>Attendance rate trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    'Abebe Kebede': {
                      label: 'Abebe Kebede',
                      color: 'hsl(var(--chart-1))',
                    },
                    'Sara Kebede': {
                      label: 'Sara Kebede',
                      color: 'hsl(var(--chart-2))',
                    },
                  }}
                  className='h-[300px]'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={attendanceOverTimeData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='month' />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='Abebe Kebede'
                        stroke='var(--color-Abebe Kebede)'
                        strokeWidth={2}
                      />
                      <Line
                        type='monotone'
                        dataKey='Sara Kebede'
                        stroke='var(--color-Sara Kebede)'
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>
                Performance across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  'Abebe Kebede': {
                    label: 'Abebe Kebede',
                    color: 'hsl(var(--chart-1))',
                  },
                  'Sara Kebede': {
                    label: 'Sara Kebede',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className='h-[300px]'
              >
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={[
                      {
                        subject: 'Computer Basics',
                        'Abebe Kebede': 85,
                        'Sara Kebede': 65,
                      },
                      {
                        subject: 'Typing Skills',
                        'Abebe Kebede': 75,
                        'Sara Kebede': 0,
                      },
                      {
                        subject: 'Digital Art',
                        'Abebe Kebede': 90,
                        'Sara Kebede': 0,
                      },
                      {
                        subject: 'Mouse Skills',
                        'Abebe Kebede': 0,
                        'Sara Kebede': 85,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='subject' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey='Abebe Kebede'
                      fill='var(--color-Abebe Kebede)'
                    />
                    <Bar
                      dataKey='Sara Kebede'
                      fill='var(--color-Sara Kebede)'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentReports;
