'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
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
import {
  Search,
  Filter,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const Records = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for student records
  const students = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '10',
      lastVisit: '2023-05-15',
      condition: 'Asthma',
      status: 'Ongoing',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      name: 'Michael Smith',
      grade: '8',
      lastVisit: '2023-05-10',
      condition: 'Allergies',
      status: 'Resolved',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 3,
      name: 'Sophia Williams',
      grade: '9',
      lastVisit: '2023-05-18',
      condition: 'Headache',
      status: 'Resolved',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 4,
      name: 'James Brown',
      grade: '11',
      lastVisit: '2023-05-12',
      condition: 'Sprained Ankle',
      status: 'Follow-up',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 5,
      name: 'Olivia Davis',
      grade: '7',
      lastVisit: '2023-05-17',
      condition: 'Fever',
      status: 'Ongoing',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.includes(searchTerm)
  );

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing':
        return { variant: 'default', icon: <Clock className='h-3 w-3 mr-1' /> };
      case 'Resolved':
        return {
          variant: 'outline',
          icon: <CheckCircle className='h-3 w-3 mr-1 text-green-500' />,
        };
      case 'Follow-up':
        return {
          variant: 'secondary',
          icon: <AlertTriangle className='h-3 w-3 mr-1 text-amber-500' />,
        };
      default:
        return { variant: 'outline', icon: null };
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Student Health Records</h1>

      <Tabs defaultValue='records'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='records'>Records</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
          <TabsTrigger value='forms'>Forms</TabsTrigger>
        </TabsList>

        <TabsContent value='records'>
          <Card>
            <CardHeader>
              <CardTitle>Student Records</CardTitle>
              <CardDescription>
                View and manage student health records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between mb-4'>
                <div className='relative w-full max-w-sm'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search by name, condition, or grade...'
                    className='pl-8'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant='outline' size='sm' className='ml-2'>
                  <Filter className='h-4 w-4 mr-2' />
                  Filter
                </Button>
              </div>

              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={student.avatar || '/placeholder.svg'}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.lastVisit}</TableCell>
                          <TableCell>{student.condition}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadge(student.status).variant}
                              className='flex items-center w-fit'
                            >
                              {getStatusBadge(student.status).icon}
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-right'>
                            <Button variant='ghost' size='sm'>
                              <FileText className='h-4 w-4' />
                              <span className='sr-only'>View Record</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className='text-center py-4 text-muted-foreground'
                        >
                          No records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='reports'>
          <Card>
            <CardHeader>
              <CardTitle>Health Reports</CardTitle>
              <CardDescription>
                Generate and view health-related reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>Monthly Summary</CardTitle>
                  </CardHeader>
                  <CardContent className='pb-2'>
                    <p className='text-sm text-muted-foreground'>
                      Overview of health office visits and common conditions.
                    </p>
                  </CardContent>
                  <CardContent className='pt-0 flex justify-end'>
                    <Button size='sm'>Generate</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>
                      Immunization Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pb-2'>
                    <p className='text-sm text-muted-foreground'>
                      Report on student immunization compliance.
                    </p>
                  </CardContent>
                  <CardContent className='pt-0 flex justify-end'>
                    <Button size='sm'>Generate</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>Medication Log</CardTitle>
                  </CardHeader>
                  <CardContent className='pb-2'>
                    <p className='text-sm text-muted-foreground'>
                      Record of medications administered to students.
                    </p>
                  </CardContent>
                  <CardContent className='pt-0 flex justify-end'>
                    <Button size='sm'>Generate</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='forms'>
          <Card>
            <CardHeader>
              <CardTitle>Health Forms</CardTitle>
              <CardDescription>
                Access and manage health-related forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Required Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-blue-600' />
                            <span>Annual Health Information Form</span>
                          </div>
                          <Button variant='outline' size='sm'>
                            Download
                          </Button>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-blue-600' />
                            <span>Medication Authorization</span>
                          </div>
                          <Button variant='outline' size='sm'>
                            Download
                          </Button>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-blue-600' />
                            <span>Emergency Care Plan</span>
                          </div>
                          <Button variant='outline' size='sm'>
                            Download
                          </Button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Internal Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-green-600' />
                            <span>Health Office Visit Log</span>
                          </div>
                          <Button variant='outline' size='sm'>
                            Access
                          </Button>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-green-600' />
                            <span>Injury Report Form</span>
                          </div>
                          <Button variant='outline' size='sm'>
                            Access
                          </Button>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-green-600' />
                            <span>Health Screening Record</span>
                          </div>
                          <Button variant='outline' size='sm'>
                            Access
                          </Button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Form Submission Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium'>
                            Annual Health Forms
                          </span>
                          <span className='text-sm font-medium'>85%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-green-600 h-2.5 rounded-full'
                            style={{ width: '85%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium'>
                            Immunization Records
                          </span>
                          <span className='text-sm font-medium'>92%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-green-600 h-2.5 rounded-full'
                            style={{ width: '92%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium'>
                            Medical Action Plans
                          </span>
                          <span className='text-sm font-medium'>78%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-yellow-500 h-2.5 rounded-full'
                            style={{ width: '78%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Records;
