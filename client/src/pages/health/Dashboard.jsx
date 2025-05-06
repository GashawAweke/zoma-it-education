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
  AlertCircle,
  Brain,
  FileText,
  Heart,
  Plus,
  Search,
  Users,
} from 'lucide-react';

const HealthDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for health stats
  const stats = [
    {
      title: 'Active Cases',
      value: '12',
      icon: AlertCircle,
      change: '-3 from last week',
    },
    { title: 'First Aid Cases', value: '8', icon: Heart, change: 'This month' },
    {
      title: 'Psychological Support',
      value: '4',
      icon: Brain,
      change: 'Ongoing sessions',
    },
    {
      title: 'Total Students',
      value: '950',
      icon: Users,
      change: 'Under health monitoring',
    },
  ];

  // Mock data for recent cases
  const recentCases = [
    {
      id: 1,
      student: 'Kidus Alemu',
      grade: 'Grade 4',
      issue: 'Minor playground injury',
      type: 'first-aid',
      status: 'Resolved',
      date: '2025-04-25',
    },
    {
      id: 2,
      student: 'Hana Girma',
      grade: 'Grade 6',
      issue: 'Anxiety about upcoming exams',
      type: 'psychological',
      status: 'Ongoing',
      date: '2025-04-23',
    },
    {
      id: 3,
      student: 'Abel Tesfaye',
      grade: 'Grade 2',
      issue: 'Headache and fever',
      type: 'first-aid',
      status: 'Monitoring',
      date: '2025-04-22',
    },
    {
      id: 4,
      student: 'Meron Haile',
      grade: 'Grade 5',
      issue: 'Social interaction difficulties',
      type: 'psychological',
      status: 'Scheduled',
      date: '2025-04-20',
    },
  ];

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: 'First Aid for Common Injuries',
      type: 'first-aid',
      description: 'Step-by-step guide for treating common playground injuries',
      downloads: 45,
    },
    {
      id: 2,
      title: 'Managing Test Anxiety',
      type: 'psychological',
      description: 'Techniques to help students cope with exam stress',
      downloads: 32,
    },
    {
      id: 3,
      title: 'Recognizing Signs of Distress',
      type: 'psychological',
      description:
        'Guide for teachers to identify students who may need support',
      downloads: 28,
    },
    {
      id: 4,
      title: 'Basic First Aid Kit Guide',
      type: 'first-aid',
      description: 'Essential items for school first aid kits and their uses',
      downloads: 20,
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Health Team Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Monitor and manage student health and wellbeing.
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            New Case
          </Button>
          <Button variant='outline'>
            <Search className='mr-2 h-4 w-4' />
            Search Records
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

      <Tabs defaultValue='cases'>
        <TabsList>
          <TabsTrigger value='cases'>Recent Cases</TabsTrigger>
          <TabsTrigger value='resources'>Health Resources</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <TabsContent value='cases' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Active Health Cases</CardTitle>
              <CardDescription>
                Recent and ongoing student health issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentCases.map((case_) => (
                  <div
                    key={case_.id}
                    className='flex items-start gap-4 rounded-lg border p-4'
                  >
                    <div className='rounded-full bg-primary/10 p-2'>
                      {case_.type === 'first-aid' ? (
                        <Heart className='h-4 w-4 text-red-500' />
                      ) : (
                        <Brain className='h-4 w-4 text-purple-500' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                        <div>
                          <p className='font-medium'>{case_.student}</p>
                          <p className='text-sm text-muted-foreground'>
                            {case_.grade}
                          </p>
                        </div>
                        <div className='mt-1 sm:mt-0'>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              case_.status === 'Resolved'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : case_.status === 'Ongoing'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                            }`}
                          >
                            {case_.status}
                          </span>
                        </div>
                      </div>
                      <p className='text-sm mt-1'>{case_.issue}</p>
                      <div className='flex items-center justify-between mt-2'>
                        <p className='text-xs text-muted-foreground'>
                          Reported: {case_.date}
                        </p>
                        <Button variant='ghost' size='sm'>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='pt-2'>
                  <Button variant='outline' className='w-full'>
                    View All Cases
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='resources' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Health Resources</CardTitle>
              <CardDescription>
                Educational materials for students and staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className='flex items-start gap-4 rounded-lg border p-4'
                  >
                    <div className='rounded-full bg-primary/10 p-2'>
                      {resource.type === 'first-aid' ? (
                        <Heart className='h-4 w-4 text-red-500' />
                      ) : (
                        <Brain className='h-4 w-4 text-purple-500' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <p className='font-medium'>{resource.title}</p>
                      <p className='text-sm mt-1'>{resource.description}</p>
                      <div className='flex items-center justify-between mt-2'>
                        <p className='text-xs text-muted-foreground'>
                          {resource.downloads} downloads
                        </p>
                        <div className='flex gap-2'>
                          <Button variant='ghost' size='sm'>
                            Preview
                          </Button>
                          <Button variant='outline' size='sm'>
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='pt-2'>
                  <Button variant='outline' className='w-full'>
                    Upload New Resource
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reports' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Health Reports</CardTitle>
              <CardDescription>
                Monthly and quarterly health statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>April 2025 Health Report</p>
                      <p className='text-sm text-muted-foreground'>
                        Monthly summary of health incidents
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      <FileText className='h-4 w-4 mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
                <div className='rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>
                        Q1 2025 Psychological Support Report
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Quarterly summary of counseling sessions
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      <FileText className='h-4 w-4 mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
                <div className='rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>
                        2024-2025 Annual Health Review
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Yearly health trends and statistics
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      <FileText className='h-4 w-4 mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
                <div className='pt-2'>
                  <Button variant='outline' className='w-full'>
                    Generate New Report
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

export default HealthDashboard;
