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
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  ClipboardList,
  Brain,
  Puzzle,
  Activity,
  Leaf,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const TeacherAssessments = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for assessments with Montessori principles
  const assessments = [
    {
      id: 1,
      title: 'Computer Hardware Exploration',
      description:
        'Self-directed exploration of computer components with guided reflection',
      class: 'Grade 3-4 Typing Skills',
      type: 'observation',
      dueDate: '2025-05-10',
      status: 'active',
      submissions: 15,
      totalStudents: 22,
      montessoriPrinciples: [
        'self-directed',
        'hands-on',
        'concrete-to-abstract',
      ],
    },
    {
      id: 2,
      title: 'Typing Progress Journal',
      description:
        'Student-led documentation of typing skill development with self-reflection',
      class: 'Grade 3-4 Typing Skills',
      type: 'portfolio',
      dueDate: '2025-05-15',
      status: 'active',
      submissions: 8,
      totalStudents: 22,
      montessoriPrinciples: ['self-assessment', 'progress-tracking'],
    },
    {
      id: 3,
      title: 'Programming Concepts Practical Application',
      description:
        'Hands-on demonstration of understanding basic programming concepts',
      class: 'Grade 5-6 Programming Intro',
      type: 'practical',
      dueDate: '2025-05-12',
      status: 'active',
      submissions: 5,
      totalStudents: 18,
      montessoriPrinciples: [
        'hands-on',
        'concrete-to-abstract',
        'individual-pace',
      ],
    },
    {
      id: 4,
      title: 'Mouse Skills Mastery',
      description: 'Self-paced progression through mouse navigation challenges',
      class: 'Grade 1-2 Computer Basics',
      type: 'progression',
      dueDate: '2025-04-25',
      status: 'completed',
      submissions: 25,
      totalStudents: 25,
      montessoriPrinciples: ['individual-pace', 'self-directed'],
    },
    {
      id: 5,
      title: 'Computer Parts Sensorial Experience',
      description:
        'Multi-sensory exploration and identification of computer components',
      class: 'Grade 1-2 Computer Basics',
      type: 'observation',
      dueDate: '2025-04-20',
      status: 'completed',
      submissions: 23,
      totalStudents: 25,
      montessoriPrinciples: ['sensorial', 'hands-on'],
    },
    {
      id: 6,
      title: 'Digital Creation Project',
      description:
        'Open-ended project to demonstrate digital creativity and technical skills',
      class: 'Grade 5-6 Programming Intro',
      type: 'project',
      dueDate: '2025-06-15',
      status: 'draft',
      submissions: 0,
      totalStudents: 18,
      montessoriPrinciples: [
        'creative-expression',
        'self-directed',
        'individual-pace',
      ],
    },
  ];

  // Filter assessments based on search query, class, type, and tab
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      selectedClass === 'all' || assessment.class === selectedClass;
    const matchesType =
      selectedType === 'all' || assessment.type === selectedType;
    const matchesTab = activeTab === 'all' || assessment.status === activeTab;

    return matchesSearch && matchesClass && matchesType && matchesTab;
  });

  // Get unique classes and types for filters
  const classes = [...new Set(assessments.map((a) => a.class))];
  const types = [...new Set(assessments.map((a) => a.type))];

  const handleCreateAssessment = () => {
    setShowCreateModal(true);
  };

  const handleEditAssessment = (id) => {
    toast({
      title: 'Edit Assessment',
      description: `Editing assessment #${id}`,
    });
  };

  const handleDeleteAssessment = (id) => {
    toast({
      title: 'Delete Assessment',
      description: `Deleting assessment #${id}`,
    });
  };

  const handleViewSubmissions = (id) => {
    toast({
      title: 'View Submissions',
      description: `Viewing submissions for assessment #${id}`,
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
      case 'observation':
        return <Eye className='h-4 w-4 text-blue-500' />;
      case 'portfolio':
        return <ClipboardList className='h-4 w-4 text-purple-500' />;
      case 'practical':
        return <Puzzle className='h-4 w-4 text-green-500' />;
      case 'progression':
        return <Activity className='h-4 w-4 text-amber-500' />;
      case 'project':
        return <Brain className='h-4 w-4 text-pink-500' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  const getPrincipleBadge = (principle) => {
    switch (principle) {
      case 'self-directed':
        return (
          <Badge
            variant='outline'
            className='bg-blue-50 text-blue-700 border-blue-200'
          >
            Self-Directed
          </Badge>
        );
      case 'hands-on':
        return (
          <Badge
            variant='outline'
            className='bg-green-50 text-green-700 border-green-200'
          >
            Hands-On
          </Badge>
        );
      case 'concrete-to-abstract':
        return (
          <Badge
            variant='outline'
            className='bg-purple-50 text-purple-700 border-purple-200'
          >
            Concrete to Abstract
          </Badge>
        );
      case 'individual-pace':
        return (
          <Badge
            variant='outline'
            className='bg-amber-50 text-amber-700 border-amber-200'
          >
            Individual Pace
          </Badge>
        );
      case 'self-assessment':
        return (
          <Badge
            variant='outline'
            className='bg-pink-50 text-pink-700 border-pink-200'
          >
            Self-Assessment
          </Badge>
        );
      case 'progress-tracking':
        return (
          <Badge
            variant='outline'
            className='bg-indigo-50 text-indigo-700 border-indigo-200'
          >
            Progress Tracking
          </Badge>
        );
      case 'sensorial':
        return (
          <Badge
            variant='outline'
            className='bg-teal-50 text-teal-700 border-teal-200'
          >
            Sensorial
          </Badge>
        );
      case 'creative-expression':
        return (
          <Badge
            variant='outline'
            className='bg-rose-50 text-rose-700 border-rose-200'
          >
            Creative Expression
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Montessori-Inspired Assessments
          </h1>
          <p className='text-muted-foreground'>
            Create and manage holistic assessments that balance child-centered
            learning with structured evaluation
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button onClick={handleCreateAssessment}>
            <Plus className='mr-2 h-4 w-4' />
            Create Assessment
          </Button>
        </div>
      </div>

      <Card className='bg-green-50 border-green-200'>
        <CardContent className='p-4'>
          <div className='flex items-start gap-3'>
            <Leaf className='h-5 w-5 text-green-600 mt-0.5' />
            <div>
              <h3 className='font-medium text-green-800'>
                Montessori Assessment Principles
              </h3>
              <p className='text-sm text-green-700'>
                Our assessments focus on the whole child, emphasizing
                observation, self-directed learning, hands-on experiences, and
                individual progress rather than standardized testing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Input
            placeholder='Search assessments...'
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
          {filteredAssessments.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-10'>
                <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-medium'>No assessments found</h3>
                <p className='text-sm text-muted-foreground'>
                  {searchQuery ||
                  selectedClass !== 'all' ||
                  selectedType !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first assessment to get started'}
                </p>
                <Button className='mt-4' onClick={handleCreateAssessment}>
                  <Plus className='mr-2 h-4 w-4' />
                  Create Assessment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {filteredAssessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardHeader className='pb-2'>
                    <div className='flex justify-between items-start'>
                      <div className='flex items-center gap-2'>
                        {getTypeIcon(assessment.type)}
                        <CardTitle>{assessment.title}</CardTitle>
                      </div>
                      {getStatusBadge(assessment.status)}
                    </div>
                    <CardDescription>{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-3'>
                      <div>
                        <p className='text-sm font-medium'>Class</p>
                        <p className='text-sm text-muted-foreground'>
                          {assessment.class}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Due Date</p>
                        <p className='text-sm text-muted-foreground'>
                          {assessment.dueDate}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Submissions</p>
                        <p className='text-sm text-muted-foreground'>
                          {assessment.submissions} / {assessment.totalStudents}{' '}
                          students
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className='text-sm font-medium mb-1'>
                        Montessori Principles
                      </p>
                      <div className='flex flex-wrap gap-1'>
                        {assessment.montessoriPrinciples.map((principle) => (
                          <div key={principle}>
                            {getPrincipleBadge(principle)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-end gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleViewSubmissions(assessment.id)}
                    >
                      <Eye className='h-4 w-4 mr-1' />
                      View Responses
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleEditAssessment(assessment.id)}
                    >
                      <Edit className='h-4 w-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleDeleteAssessment(assessment.id)}
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

      {showCreateModal && (
        <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='w-full max-w-2xl max-h-[90vh] overflow-auto'>
            <Card>
              <CardHeader>
                <CardTitle>Create New Montessori-Inspired Assessment</CardTitle>
                <CardDescription>
                  Design an assessment that balances child-centered learning
                  with structured evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Title</label>
                  <Input placeholder='Enter assessment title' />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Description</label>
                  <Textarea
                    placeholder='Describe the assessment purpose and activities'
                    rows={3}
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Class</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select class' />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Assessment Type
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='observation'>Observation</SelectItem>
                        <SelectItem value='portfolio'>Portfolio</SelectItem>
                        <SelectItem value='practical'>Practical</SelectItem>
                        <SelectItem value='progression'>Progression</SelectItem>
                        <SelectItem value='project'>Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Due Date</label>
                  <Input type='date' />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Montessori Principles
                  </label>
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='self-directed' />
                      <label htmlFor='self-directed' className='text-sm'>
                        Self-Directed Learning
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='hands-on' />
                      <label htmlFor='hands-on' className='text-sm'>
                        Hands-On Experience
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='concrete-abstract' />
                      <label htmlFor='concrete-abstract' className='text-sm'>
                        Concrete to Abstract
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='individual-pace' />
                      <label htmlFor='individual-pace' className='text-sm'>
                        Individual Pace
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='self-assessment' />
                      <label htmlFor='self-assessment' className='text-sm'>
                        Self-Assessment
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='progress-tracking' />
                      <label htmlFor='progress-tracking' className='text-sm'>
                        Progress Tracking
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='sensorial' />
                      <label htmlFor='sensorial' className='text-sm'>
                        Sensorial
                      </label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='creative-expression' />
                      <label htmlFor='creative-expression' className='text-sm'>
                        Creative Expression
                      </label>
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Assessment Content
                  </label>
                  <Tabs defaultValue='questions'>
                    <TabsList className='mb-2'>
                      <TabsTrigger value='questions'>Questions</TabsTrigger>
                      <TabsTrigger value='observation'>
                        Observation Guide
                      </TabsTrigger>
                      <TabsTrigger value='rubric'>Rubric</TabsTrigger>
                    </TabsList>
                    <TabsContent value='questions' className='space-y-4'>
                      <div className='border rounded-md p-4'>
                        <div className='flex justify-between items-center mb-2'>
                          <h4 className='font-medium'>Question 1</h4>
                          <Button variant='ghost' size='sm'>
                            Remove
                          </Button>
                        </div>
                        <div className='space-y-2'>
                          <Input placeholder='Enter question' />
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder='Question type' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='multiple-choice'>
                                Multiple Choice
                              </SelectItem>
                              <SelectItem value='short-answer'>
                                Short Answer
                              </SelectItem>
                              <SelectItem value='long-answer'>
                                Long Answer
                              </SelectItem>
                              <SelectItem value='file-upload'>
                                File Upload
                              </SelectItem>
                              <SelectItem value='practical-task'>
                                Practical Task
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button variant='outline' className='w-full'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Question
                      </Button>
                    </TabsContent>
                    <TabsContent value='observation' className='space-y-4'>
                      <Textarea
                        placeholder='Enter observation guidelines for teachers...'
                        rows={5}
                      />
                      <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                          Observable Skills
                        </label>
                        <div className='border rounded-md p-4 space-y-2'>
                          <div className='flex items-center justify-between'>
                            <Input
                              placeholder='Enter skill to observe'
                              className='flex-1 mr-2'
                            />
                            <Button variant='ghost' size='sm'>
                              Remove
                            </Button>
                          </div>
                        </div>
                        <Button variant='outline' className='w-full'>
                          <Plus className='mr-2 h-4 w-4' />
                          Add Observable Skill
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value='rubric' className='space-y-4'>
                      <div className='border rounded-md p-4 space-y-2'>
                        <div className='flex items-center justify-between'>
                          <Input
                            placeholder='Criteria name'
                            className='flex-1 mr-2'
                          />
                          <Button variant='ghost' size='sm'>
                            Remove
                          </Button>
                        </div>
                        <Textarea
                          placeholder='Description of criteria and levels of achievement'
                          rows={3}
                        />
                      </div>
                      <Button variant='outline' className='w-full'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Rubric Criteria
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <div className='flex gap-2'>
                  <Button variant='secondary'>Save as Draft</Button>
                  <Button>Create Assessment</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TeacherAssessments;
