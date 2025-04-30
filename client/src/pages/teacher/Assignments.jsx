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
import { Input } from '../../components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const TeacherAssignments = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: 'Computer Hardware Identification',
      description:
        'Identify and label the main components of a computer system',
      class: 'Grade 3-4 Typing Skills',
      type: 'worksheet',
      dueDate: '2025-05-10',
      status: 'active',
      submissions: 15,
      totalStudents: 22,
    },
    {
      id: 2,
      title: 'Typing Speed Challenge',
      description: 'Complete the typing exercise with at least 20 WPM',
      class: 'Grade 3-4 Typing Skills',
      type: 'exercise',
      dueDate: '2025-05-15',
      status: 'active',
      submissions: 8,
      totalStudents: 22,
    },
    {
      id: 3,
      title: 'Introduction to Programming Concepts',
      description: 'Complete the quiz on basic programming concepts',
      class: 'Grade 5-6 Programming Intro',
      type: 'quiz',
      dueDate: '2025-05-12',
      status: 'active',
      submissions: 5,
      totalStudents: 18,
    },
    {
      id: 4,
      title: 'Mouse Skills Practice',
      description: 'Complete the mouse navigation exercises',
      class: 'Grade 1-2 Computer Basics',
      type: 'exercise',
      dueDate: '2025-04-25',
      status: 'completed',
      submissions: 25,
      totalStudents: 25,
    },
    {
      id: 5,
      title: 'Computer Parts Diagram',
      description: 'Label the parts of a computer in the provided diagram',
      class: 'Grade 1-2 Computer Basics',
      type: 'worksheet',
      dueDate: '2025-04-20',
      status: 'completed',
      submissions: 23,
      totalStudents: 25,
    },
    {
      id: 6,
      title: 'End of Term Project',
      description: 'Create a simple webpage using HTML',
      class: 'Grade 5-6 Programming Intro',
      type: 'project',
      dueDate: '2025-06-15',
      status: 'draft',
      submissions: 0,
      totalStudents: 18,
    },
  ];

  // Filter assignments based on search query, class, type, and tab
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      selectedClass === 'all' || assignment.class === selectedClass;
    const matchesType =
      selectedType === 'all' || assignment.type === selectedType;
    const matchesTab = activeTab === 'all' || assignment.status === activeTab;

    return matchesSearch && matchesClass && matchesType && matchesTab;
  });

  // Get unique classes and types for filters
  const classes = [...new Set(assignments.map((a) => a.class))];
  const types = [...new Set(assignments.map((a) => a.type))];

  const handleCreateAssignment = () => {
    toast.info('Create Assignment', {
      description: 'This feature will be implemented soon.',
    });
  };

  const handleEditAssignment = (id) => {
    toast.info('Edit Assignment', {
      description: `Editing assignment #${id}`,
    });
  };

  const handleDeleteAssignment = (id) => {
    toast.info('Delete Assignment', {
      description: `Deleting assignment #${id}`,
    });
  };

  const handleViewSubmissions = (id) => {
    toast.info('View Submissions', {
      description: `Viewing submissions for assignment #${id}`,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className='bg-green-500'>Active</Badge>;
      case 'completed':
        return (
          <Badge variant='outline' className='text-muted-foreground'>
            Completed
          </Badge>
        );
      case 'draft':
        return <Badge variant='secondary'>Draft</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'worksheet':
        return <FileText className='h-4 w-4 text-blue-500' />;
      case 'quiz':
        return <CheckCircle className='h-4 w-4 text-purple-500' />;
      case 'exercise':
        return <Clock className='h-4 w-4 text-green-500' />;
      case 'project':
        return <Calendar className='h-4 w-4 text-amber-500' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Assignments</h1>
          <p className='text-muted-foreground'>
            Create and manage assignments for your classes
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button onClick={handleCreateAssignment}>
            <Plus className='mr-2 h-4 w-4' />
            Create Assignment
          </Button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Input
            placeholder='Search assignments...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-8'
          />
          <FileText className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        </div>
        <div className='flex gap-2'>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by class' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type} className='capitalize'>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='active'>Active</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
          <TabsTrigger value='draft'>Drafts</TabsTrigger>
          <TabsTrigger value='all'>All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='space-y-4 mt-4'>
          {filteredAssignments.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-10'>
                <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-medium'>No assignments found</h3>
                <p className='text-sm text-muted-foreground'>
                  {searchQuery ||
                  selectedClass !== 'all' ||
                  selectedType !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first assignment to get started'}
                </p>
                <Button className='mt-4' onClick={handleCreateAssignment}>
                  <Plus className='mr-2 h-4 w-4' />
                  Create Assignment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className='pb-2'>
                    <div className='flex justify-between items-start'>
                      <div className='flex items-center gap-2'>
                        {getTypeIcon(assignment.type)}
                        <CardTitle>{assignment.title}</CardTitle>
                      </div>
                      {getStatusBadge(assignment.status)}
                    </div>
                    <CardDescription>{assignment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <p className='text-sm font-medium'>Class</p>
                        <p className='text-sm text-muted-foreground'>
                          {assignment.class}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Due Date</p>
                        <p className='text-sm text-muted-foreground'>
                          {assignment.dueDate}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Submissions</p>
                        <p className='text-sm text-muted-foreground'>
                          {assignment.submissions} / {assignment.totalStudents}{' '}
                          students
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-end gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleViewSubmissions(assignment.id)}
                    >
                      <Eye className='h-4 w-4 mr-1' />
                      View Submissions
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleEditAssignment(assignment.id)}
                    >
                      <Edit className='h-4 w-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      <Trash2 className='h-4 w-4 mr-1' />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherAssignments;
