'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileText,
  BarChart,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock data for student assessments
const mockAssessments = [
  {
    id: 1,
    title: 'Practical Life Skills Observation',
    type: 'observation',
    course: 'Life Skills 101',
    dueDate: '2023-05-15',
    status: 'pending',
    description:
      'Demonstrate your practical life skills through a series of everyday tasks.',
  },
  {
    id: 2,
    title: 'Reading Comprehension Portfolio',
    type: 'portfolio',
    course: 'Language Arts',
    dueDate: '2023-05-20',
    status: 'in-progress',
    description:
      'Create a portfolio showcasing your reading comprehension skills with examples.',
  },
  {
    id: 3,
    title: 'Mathematics Practical Task',
    type: 'practical',
    course: 'Mathematics',
    dueDate: '2023-05-10',
    status: 'completed',
    score: 'Excellent',
    feedback:
      'Great work on applying mathematical concepts to real-world problems!',
    description:
      'Apply mathematical concepts to solve practical, real-world problems.',
  },
  {
    id: 4,
    title: 'Science Exploration Project',
    type: 'project',
    course: 'Science',
    dueDate: '2023-05-25',
    status: 'pending',
    description:
      'Design and conduct a scientific exploration based on your interests.',
  },
  {
    id: 5,
    title: 'Language Development Progress',
    type: 'progression',
    course: 'Language Arts',
    dueDate: '2023-05-18',
    status: 'completed',
    score: 'Progressing Well',
    feedback:
      "You're making excellent progress in your language development. Continue practicing your writing skills.",
    description:
      'Track and demonstrate your progress in language development over time.',
  },
];

const StudentAssessments = () => {
  const { user } = useAuth();
  const [assessments] = useState(mockAssessments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Get unique courses from assessments
  const courses = [...new Set(assessments.map((a) => a.course))];

  // Filter assessments based on search and filters
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === 'all' || assessment.course === selectedCourse;
    const matchesType =
      selectedType === 'all' || assessment.type === selectedType;
    return matchesSearch && matchesCourse && matchesType;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant='outline' className='flex items-center gap-1'>
            <Clock className='h-3 w-3' /> Pending
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className='bg-blue-500 flex items-center gap-1'>
            <AlertCircle className='h-3 w-3' /> In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge className='bg-green-500 flex items-center gap-1'>
            <CheckCircle className='h-3 w-3' /> Completed
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  // Get assessment type display name
  const getAssessmentTypeDisplay = (type) => {
    switch (type) {
      case 'observation':
        return 'Observation';
      case 'portfolio':
        return 'Portfolio';
      case 'practical':
        return 'Practical Task';
      case 'project':
        return 'Project';
      case 'progression':
        return 'Progression Tracking';
      default:
        return type;
    }
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Assessments</h1>
          <p className='text-muted-foreground'>
            View and complete your assessments
          </p>
        </div>
      </div>

      <Tabs defaultValue='all' className='w-full'>
        <TabsList className='mb-4'>
          <TabsTrigger value='all'>All Assessments</TabsTrigger>
          <TabsTrigger value='pending'>Pending</TabsTrigger>
          <TabsTrigger value='in-progress'>In Progress</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Assessment Dashboard</CardTitle>
              <CardDescription>
                View all your assessments across different courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <div className='relative flex-1'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search assessments...'
                    className='pl-8'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className='flex gap-2'>
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Course' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Courses</SelectItem>
                      {courses.map((course, index) => (
                        <SelectItem key={index} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Types</SelectItem>
                      <SelectItem value='observation'>Observation</SelectItem>
                      <SelectItem value='portfolio'>Portfolio</SelectItem>
                      <SelectItem value='practical'>Practical Task</SelectItem>
                      <SelectItem value='project'>Project</SelectItem>
                      <SelectItem value='progression'>Progression</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className='text-center py-4'>
                          No assessments found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAssessments.map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell className='font-medium'>
                            {assessment.title}
                          </TableCell>
                          <TableCell>
                            {getAssessmentTypeDisplay(assessment.type)}
                          </TableCell>
                          <TableCell>{assessment.course}</TableCell>
                          <TableCell>
                            {new Date(assessment.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(assessment.status)}
                          </TableCell>
                          <TableCell>
                            <Link to={`/assessment/${assessment.id}`}>
                              <Button variant='outline' size='sm'>
                                {assessment.status === 'completed'
                                  ? 'View Results'
                                  : 'Start Assessment'}
                                <ArrowRight className='ml-2 h-4 w-4' />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='pending' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Assessments</CardTitle>
              <CardDescription>Assessments you need to start</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {assessments
                  .filter((a) => a.status === 'pending')
                  .map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-lg'>
                          {assessment.title}
                        </CardTitle>
                        <CardDescription>{assessment.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='text-sm mb-2'>
                          {assessment.description}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                          <div className='flex items-center'>
                            <Clock className='mr-1 h-4 w-4' />
                            Due:{' '}
                            {new Date(assessment.dueDate).toLocaleDateString()}
                          </div>
                          <Badge variant='outline'>
                            {getAssessmentTypeDisplay(assessment.type)}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          to={`/assessment/${assessment.id}`}
                          className='w-full'
                        >
                          <Button className='w-full'>
                            Start Assessment
                            <ArrowRight className='ml-2 h-4 w-4' />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                {assessments.filter((a) => a.status === 'pending').length ===
                  0 && (
                  <div className='col-span-full text-center py-8'>
                    <CheckCircle className='mx-auto h-12 w-12 text-muted-foreground opacity-50' />
                    <h3 className='mt-4 text-lg font-medium'>
                      No pending assessments
                    </h3>
                    <p className='text-muted-foreground'>
                      You're all caught up!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='in-progress' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>In Progress Assessments</CardTitle>
              <CardDescription>
                Assessments you've started but not yet completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {assessments
                  .filter((a) => a.status === 'in-progress')
                  .map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-lg'>
                          {assessment.title}
                        </CardTitle>
                        <CardDescription>{assessment.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='text-sm mb-2'>
                          {assessment.description}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                          <div className='flex items-center'>
                            <Clock className='mr-1 h-4 w-4' />
                            Due:{' '}
                            {new Date(assessment.dueDate).toLocaleDateString()}
                          </div>
                          <Badge variant='outline'>
                            {getAssessmentTypeDisplay(assessment.type)}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          to={`/assessment/${assessment.id}`}
                          className='w-full'
                        >
                          <Button className='w-full'>
                            Continue Assessment
                            <ArrowRight className='ml-2 h-4 w-4' />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                {assessments.filter((a) => a.status === 'in-progress')
                  .length === 0 && (
                  <div className='col-span-full text-center py-8'>
                    <FileText className='mx-auto h-12 w-12 text-muted-foreground opacity-50' />
                    <h3 className='mt-4 text-lg font-medium'>
                      No in-progress assessments
                    </h3>
                    <p className='text-muted-foreground'>
                      You haven't started any assessments yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='completed' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Completed Assessments</CardTitle>
              <CardDescription>
                Assessments you've finished with feedback and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {assessments
                  .filter((a) => a.status === 'completed')
                  .map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader className='pb-2'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <CardTitle className='text-lg'>
                              {assessment.title}
                            </CardTitle>
                            <CardDescription>
                              {assessment.course}
                            </CardDescription>
                          </div>
                          <Badge className='bg-green-500'>
                            {assessment.score}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className='text-sm mb-2'>
                          <div className='font-medium mb-1'>Feedback:</div>
                          {assessment.feedback}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground mt-2'>
                          <div className='flex items-center'>
                            <CheckCircle className='mr-1 h-4 w-4' />
                            Completed:{' '}
                            {new Date(assessment.dueDate).toLocaleDateString()}
                          </div>
                          <Badge variant='outline'>
                            {getAssessmentTypeDisplay(assessment.type)}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          to={`/assessment/${assessment.id}/review`}
                          className='w-full'
                        >
                          <Button variant='outline' className='w-full'>
                            Review Assessment
                            <ArrowRight className='ml-2 h-4 w-4' />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                {assessments.filter((a) => a.status === 'completed').length ===
                  0 && (
                  <div className='col-span-full text-center py-8'>
                    <BarChart className='mx-auto h-12 w-12 text-muted-foreground opacity-50' />
                    <h3 className='mt-4 text-lg font-medium'>
                      No completed assessments
                    </h3>
                    <p className='text-muted-foreground'>
                      You haven't completed any assessments yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAssessments;
