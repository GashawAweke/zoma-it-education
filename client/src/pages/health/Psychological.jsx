import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Brain,
  Calendar,
  FileText,
  Heart,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';

const Psychological = () => {
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>
        Psychological Support Services
      </h1>

      <Tabs defaultValue='resources'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='resources'>Resources</TabsTrigger>
          <TabsTrigger value='referrals'>Referrals</TabsTrigger>
          <TabsTrigger value='programs'>Programs</TabsTrigger>
          <TabsTrigger value='training'>Staff Training</TabsTrigger>
        </TabsList>

        <TabsContent value='resources'>
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Resources</CardTitle>
              <CardDescription>
                Support materials for students, teachers, and parents
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg flex items-center'>
                      <Brain className='mr-2 h-5 w-5 text-purple-500' />
                      Anxiety Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>
                      Techniques and resources for managing anxiety in the
                      classroom and at home.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant='outline' size='sm' className='w-full'>
                      View Resources
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg flex items-center'>
                      <Heart className='mr-2 h-5 w-5 text-red-500' />
                      Emotional Regulation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>
                      Strategies to help students identify and manage their
                      emotions effectively.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant='outline' size='sm' className='w-full'>
                      View Resources
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg flex items-center'>
                      <Users className='mr-2 h-5 w-5 text-blue-500' />
                      Social Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>
                      Activities and guides for developing healthy social
                      interactions and relationships.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant='outline' size='sm' className='w-full'>
                      View Resources
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-medium mb-2'>Crisis Resources</h3>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <Phone className='h-4 w-4 mr-2 text-green-600' />
                    <span>
                      National Suicide Prevention Lifeline: 988 or
                      1-800-273-8255
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <MessageSquare className='h-4 w-4 mr-2 text-blue-600' />
                    <span>Crisis Text Line: Text HOME to 741741</span>
                  </li>
                  <li className='flex items-center'>
                    <Phone className='h-4 w-4 mr-2 text-purple-600' />
                    <span>
                      School Crisis Counselor: 555-123-4567 (ext. 789)
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='referrals'>
          <Card>
            <CardHeader>
              <CardTitle>Referral System</CardTitle>
              <CardDescription>
                Process for referring students for psychological support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <h3 className='font-medium text-blue-800 mb-2'>
                    Referral Process
                  </h3>
                  <ol className='list-decimal pl-5 space-y-2 text-blue-800'>
                    <li>
                      Identify student concerns using the observation checklist
                    </li>
                    <li>
                      Complete the online referral form with detailed
                      observations
                    </li>
                    <li>
                      Notify parents/guardians about the referral (unless
                      contraindicated)
                    </li>
                    <li>
                      School psychologist will review and respond within 48
                      hours
                    </li>
                    <li>
                      Follow-up meeting will be scheduled to discuss support
                      plan
                    </li>
                  </ol>
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Referral Forms</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <span>Teacher Referral Form</span>
                        <Button size='sm'>Access</Button>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Parent Referral Form</span>
                        <Button size='sm'>Access</Button>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Self-Referral Form (Students)</span>
                        <Button size='sm'>Access</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Recent Referrals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <div className='flex justify-between items-center'>
                          <span>Pending Review</span>
                          <Badge>12</Badge>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>In Progress</span>
                          <Badge variant='outline'>24</Badge>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Completed This Month</span>
                          <Badge variant='outline'>36</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='programs'>
          <Card>
            <CardHeader>
              <CardTitle>Support Programs</CardTitle>
              <CardDescription>
                Ongoing psychological support initiatives at our school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex justify-between items-start'>
                        <CardTitle className='text-lg'>
                          Peer Support Group
                        </CardTitle>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-muted-foreground mb-2'>
                        Student-led support groups facilitated by trained
                        counselors.
                      </p>
                      <div className='flex items-center text-xs text-muted-foreground'>
                        <Calendar className='h-3 w-3 mr-1' />
                        <span>Wednesdays, 3:30 PM - 4:30 PM</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant='outline' size='sm' className='w-full'>
                        Program Details
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex justify-between items-start'>
                        <CardTitle className='text-lg'>
                          Mindfulness Practice
                        </CardTitle>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-muted-foreground mb-2'>
                        Daily mindfulness sessions to reduce stress and improve
                        focus.
                      </p>
                      <div className='flex items-center text-xs text-muted-foreground'>
                        <Calendar className='h-3 w-3 mr-1' />
                        <span>Daily, 8:15 AM - 8:30 AM</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant='outline' size='sm' className='w-full'>
                        Program Details
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex justify-between items-start'>
                        <CardTitle className='text-lg'>
                          Parent Workshop Series
                        </CardTitle>
                        <Badge variant='outline'>Upcoming</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-muted-foreground mb-2'>
                        Workshops for parents on supporting children's mental
                        health.
                      </p>
                      <div className='flex items-center text-xs text-muted-foreground'>
                        <Calendar className='h-3 w-3 mr-1' />
                        <span>Starting June 15, 7:00 PM - 8:30 PM</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant='outline' size='sm' className='w-full'>
                        Program Details
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Program Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium'>
                            Student Wellbeing Index
                          </span>
                          <span className='text-sm font-medium'>78%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-green-600 h-2.5 rounded-full'
                            style={{ width: '78%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium'>
                            Program Participation
                          </span>
                          <span className='text-sm font-medium'>65%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-blue-600 h-2.5 rounded-full'
                            style={{ width: '65%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium'>
                            Reported Effectiveness
                          </span>
                          <span className='text-sm font-medium'>82%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-purple-600 h-2.5 rounded-full'
                            style={{ width: '82%' }}
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

        <TabsContent value='training'>
          <Card>
            <CardHeader>
              <CardTitle>Staff Training</CardTitle>
              <CardDescription>
                Professional development for psychological support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Required Training
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-blue-600' />
                            <span>Mental Health First Aid</span>
                          </div>
                          <Badge variant='outline'>Annual</Badge>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-blue-600' />
                            <span>Suicide Prevention</span>
                          </div>
                          <Badge variant='outline'>Annual</Badge>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <FileText className='h-4 w-4 mr-2 text-blue-600' />
                            <span>Trauma-Informed Practices</span>
                          </div>
                          <Badge variant='outline'>Biennial</Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Upcoming Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-2 text-green-600' />
                            <span>Anxiety Recognition & Support</span>
                          </div>
                          <Badge>June 12</Badge>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-2 text-green-600' />
                            <span>De-escalation Techniques</span>
                          </div>
                          <Badge>June 26</Badge>
                        </li>
                        <li className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-2 text-green-600' />
                            <span>Supporting Students in Crisis</span>
                          </div>
                          <Badge>July 10</Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Training Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-4 md:grid-cols-3'>
                      <Button
                        variant='outline'
                        className='h-auto py-4 flex flex-col'
                      >
                        <FileText className='h-6 w-6 mb-2' />
                        <span>Training Materials</span>
                      </Button>
                      <Button
                        variant='outline'
                        className='h-auto py-4 flex flex-col'
                      >
                        <MessageSquare className='h-6 w-6 mb-2' />
                        <span>Discussion Forums</span>
                      </Button>
                      <Button
                        variant='outline'
                        className='h-auto py-4 flex flex-col'
                      >
                        <Users className='h-6 w-6 mb-2' />
                        <span>Peer Support Network</span>
                      </Button>
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

export default Psychological;
