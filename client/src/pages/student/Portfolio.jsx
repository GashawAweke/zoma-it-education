'use client';
import { useState } from 'react';
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import {
  BookOpen,
  Code,
  FileText,
  ImageIcon,
  Plus,
  Upload,
  Trophy,
  Medal,
  Star,
  Award,
  Zap,
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';

// Replace the entire StudentPortfolio component with this updated version
const StudentPortfolio = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('projects');

  // Mock data for portfolio projects
  const projects = [
    {
      id: 1,
      title: 'My First Computer Drawing',
      description: 'Created using Paint program',
      type: 'image',
      thumbnail: '/placeholder.svg?height=200&width=300',
      date: '2025-03-15',
      grade: 'A',
      feedback: 'Great use of colors and shapes!',
    },
    {
      id: 2,
      title: 'Simple Calculator',
      description: 'My first HTML and JavaScript project',
      type: 'code',
      thumbnail: '/placeholder.svg?height=200&width=300',
      date: '2025-04-02',
      grade: 'A-',
      feedback: 'Good functionality, consider adding more styling.',
    },
    {
      id: 3,
      title: 'My Learning Journey Essay',
      description: "Reflection on what I've learned this term",
      type: 'document',
      thumbnail: '/placeholder.svg?height=200&width=300',
      date: '2025-04-10',
      grade: 'B+',
      feedback: 'Well-written reflection with good insights.',
    },
  ];

  // Mock data for skills
  const skills = [
    {
      name: 'Typing Speed',
      level: 75,
      description: '25 WPM with 95% accuracy',
    },
    {
      name: 'Computer Basics',
      level: 90,
      description: 'Excellent understanding of hardware and software',
    },
    {
      name: 'Problem Solving',
      level: 65,
      description: 'Good logical thinking skills',
    },
    {
      name: 'Digital Art',
      level: 80,
      description: 'Creative use of digital tools',
    },
  ];

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: 'First Login',
      icon: '🏆',
      date: '2025-02-10',
      description: 'Started your digital learning journey',
      points: 10,
    },
    {
      id: 2,
      title: 'Perfect Score',
      icon: '🌟',
      date: '2025-03-05',
      description: 'Achieved 100% on Computer Basics quiz',
      points: 50,
    },
    {
      id: 3,
      title: 'Fast Typer',
      icon: '⌨️',
      date: '2025-04-01',
      description: 'Reached 25 WPM typing speed',
      points: 25,
    },
    {
      id: 4,
      title: 'Coding Novice',
      icon: '💻',
      date: '2025-04-15',
      description: 'Completed your first programming project',
      points: 75,
    },
    {
      id: 5,
      title: 'Team Player',
      icon: '👥',
      date: '2025-04-20',
      description: 'Participated in your first group project',
      points: 30,
    },
  ];

  // Mock data for badges
  const badges = [
    {
      id: 1,
      name: 'Computer Whiz',
      icon: <Zap className='h-6 w-6 text-amber-500' />,
      level: 'Gold',
      description: 'Mastered computer basics with exceptional scores',
      date: '2025-03-10',
    },
    {
      id: 2,
      name: 'Typing Master',
      icon: <Trophy className='h-6 w-6 text-blue-500' />,
      level: 'Silver',
      description: 'Achieved high typing speed and accuracy',
      date: '2025-04-05',
    },
    {
      id: 3,
      name: 'Creative Genius',
      icon: <Star className='h-6 w-6 text-purple-500' />,
      level: 'Bronze',
      description: 'Created outstanding digital art projects',
      date: '2025-04-12',
    },
  ];

  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      title: 'Introduction to Computers',
      issueDate: '2025-03-20',
      instructor: 'Mr. Dawit Haile',
      description:
        'Successfully completed the Introduction to Computers course',
    },
    {
      id: 2,
      title: 'Basic Typing Skills',
      issueDate: '2025-04-10',
      instructor: 'Ms. Meron Tadesse',
      description: 'Demonstrated proficiency in basic typing skills',
    },
  ];

  // Calculate total achievement points
  const totalPoints = achievements.reduce(
    (sum, achievement) => sum + achievement.points,
    0
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            My Digital Portfolio & Achievements
          </h1>
          <p className='text-muted-foreground'>
            Showcase your work and track your progress.
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add Project
          </Button>
          <Button variant='outline'>
            <Upload className='mr-2 h-4 w-4' />
            Export Portfolio
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Card className='md:col-span-1'>
          <CardHeader>
            <div className='flex flex-col items-center'>
              <Avatar className='h-24 w-24'>
                <AvatarImage
                  src={user?.avatar || '/placeholder.svg?height=96&width=96'}
                />
                <AvatarFallback>{user?.name?.charAt(0) || 'S'}</AvatarFallback>
              </Avatar>
              <CardTitle className='mt-4'>
                {user?.name || 'Student Name'}
              </CardTitle>
              <CardDescription>{user?.grade || 'Grade Level'}</CardDescription>
              <div className='mt-2 flex items-center gap-1'>
                <Trophy className='h-4 w-4 text-amber-500' />
                <span className='font-medium'>
                  {totalPoints} Achievement Points
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h3 className='font-medium mb-2'>My Skills</h3>
                <div className='space-y-3'>
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className='h-2 w-full rounded-full bg-secondary'>
                        <div
                          className='h-2 rounded-full bg-primary'
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <p className='text-xs text-muted-foreground mt-1'>
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className='font-medium mb-2'>Recent Achievements</h3>
                <div className='space-y-2'>
                  {achievements.slice(0, 3).map((achievement) => (
                    <div
                      key={achievement.id}
                      className='flex items-start gap-3 rounded-lg border p-3'
                    >
                      <div className='text-2xl'>{achievement.icon}</div>
                      <div>
                        <p className='font-medium'>{achievement.title}</p>
                        <p className='text-xs text-muted-foreground'>
                          {achievement.date}
                        </p>
                        <p className='text-sm mt-1'>
                          {achievement.description}
                        </p>
                        <Badge variant='secondary' className='mt-1'>
                          +{achievement.points} points
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant='ghost'
                    className='w-full text-sm'
                    onClick={() => setActiveTab('achievements')}
                  >
                    View All Achievements
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='md:col-span-2 space-y-6'>
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value='projects'>
                <FileText className='h-4 w-4 mr-2' />
                Projects
              </TabsTrigger>
              <TabsTrigger value='achievements'>
                <Trophy className='h-4 w-4 mr-2' />
                Achievements
              </TabsTrigger>
              <TabsTrigger value='badges'>
                <Medal className='h-4 w-4 mr-2' />
                Badges
              </TabsTrigger>
              <TabsTrigger value='certificates'>
                <Award className='h-4 w-4 mr-2' />
                Certificates
              </TabsTrigger>
              <TabsTrigger value='worksheets'>
                <BookOpen className='h-4 w-4 mr-2' />
                Worksheets
              </TabsTrigger>
              <TabsTrigger value='feedback'>
                <Star className='h-4 w-4 mr-2' />
                Feedback
              </TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value='projects' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                {projects.map((project) => (
                  <Card key={project.id} className='overflow-hidden'>
                    <div className='aspect-video relative'>
                      <img
                        src={project.thumbnail || '/placeholder.svg'}
                        alt={project.title}
                        className='object-cover w-full h-full'
                      />
                      <div className='absolute top-2 right-2 bg-background/80 rounded-full p-1'>
                        {project.type === 'image' && (
                          <ImageIcon className='h-4 w-4' />
                        )}
                        {project.type === 'code' && (
                          <Code className='h-4 w-4' />
                        )}
                        {project.type === 'document' && (
                          <FileText className='h-4 w-4' />
                        )}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex justify-between text-sm'>
                        <span>Date: {project.date}</span>
                        <span className='font-medium'>
                          Grade: {project.grade}
                        </span>
                      </div>
                      <p className='text-sm mt-2'>{project.feedback}</p>
                      <div className='pt-4'>
                        <Button variant='outline' className='w-full'>
                          View Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value='achievements' className='space-y-4'>
              <Card>
                <CardHeader>
                  <div className='flex justify-between items-center'>
                    <div>
                      <CardTitle>My Achievements</CardTitle>
                      <CardDescription>
                        Track your progress and accomplishments
                      </CardDescription>
                    </div>
                    <div className='bg-primary/10 px-3 py-2 rounded-lg'>
                      <div className='text-sm font-medium'>Total Points</div>
                      <div className='text-2xl font-bold text-primary flex items-center'>
                        <Trophy className='h-5 w-5 mr-1 text-amber-500' />
                        {totalPoints}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className='flex items-start gap-4 rounded-lg border p-4'
                      >
                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl'>
                          {achievement.icon}
                        </div>
                        <div className='flex-1'>
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                            <h3 className='font-medium'>{achievement.title}</h3>
                            <Badge className='mt-1 sm:mt-0 w-fit'>
                              +{achievement.points} points
                            </Badge>
                          </div>
                          <p className='text-sm text-muted-foreground'>
                            {achievement.date}
                          </p>
                          <p className='text-sm mt-1'>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value='badges' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>My Badges</CardTitle>
                  <CardDescription>
                    Special recognitions for your accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-3'>
                    {badges.map((badge) => (
                      <Card key={badge.id} className='overflow-hidden'>
                        <CardHeader className='pb-2'>
                          <div className='flex justify-between items-center'>
                            <CardTitle className='text-base'>
                              {badge.name}
                            </CardTitle>
                            <Badge
                              variant={
                                badge.level === 'Gold'
                                  ? 'default'
                                  : badge.level === 'Silver'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {badge.level}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-col items-center gap-3 py-4'>
                            <div className='h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center'>
                              {badge.icon}
                            </div>
                            <div className='text-center'>
                              <p className='text-sm'>{badge.description}</p>
                              <p className='text-xs text-muted-foreground mt-1'>
                                Earned on {badge.date}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value='certificates' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>My Certificates</CardTitle>
                  <CardDescription>
                    Official recognition of your completed courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {certificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className='border rounded-lg overflow-hidden'
                      >
                        <div className='bg-primary/5 p-4 border-b'>
                          <div className='flex items-center justify-between'>
                            <h3 className='font-medium'>{certificate.title}</h3>
                            <Badge variant='outline'>Certificate</Badge>
                          </div>
                          <p className='text-sm text-muted-foreground'>
                            Issued on {certificate.issueDate}
                          </p>
                        </div>
                        <div className='p-4'>
                          <p className='text-sm'>{certificate.description}</p>
                          <p className='text-sm mt-2'>
                            Instructor: {certificate.instructor}
                          </p>
                          <div className='mt-4 flex justify-end'>
                            <Button variant='outline' size='sm'>
                              View Certificate
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Worksheets Tab */}
            <TabsContent value='worksheets' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>My Worksheets</CardTitle>
                  <CardDescription>
                    Completed and pending worksheets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='flex items-center gap-3'>
                        <BookOpen className='h-5 w-5 text-primary' />
                        <div>
                          <p className='font-medium'>
                            Computer Parts Worksheet
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Completed on April 15, 2025
                          </p>
                        </div>
                      </div>
                      <Button variant='outline' size='sm'>
                        View
                      </Button>
                    </div>
                    <div className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='flex items-center gap-3'>
                        <BookOpen className='h-5 w-5 text-primary' />
                        <div>
                          <p className='font-medium'>
                            Keyboard Shortcuts Practice
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Completed on April 10, 2025
                          </p>
                        </div>
                      </div>
                      <Button variant='outline' size='sm'>
                        View
                      </Button>
                    </div>
                    <div className='flex items-center justify-between rounded-lg border p-4 bg-muted/50'>
                      <div className='flex items-center gap-3'>
                        <BookOpen className='h-5 w-5 text-muted-foreground' />
                        <div>
                          <p className='font-medium'>
                            File Management Exercise
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Due on April 30, 2025
                          </p>
                        </div>
                      </div>
                      <Button variant='outline' size='sm'>
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value='feedback' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Feedback</CardTitle>
                  <CardDescription>
                    Comments and suggestions from your teachers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='rounded-lg border p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarFallback>DH</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>Mr. Dawit Haile</p>
                          <p className='text-xs text-muted-foreground'>
                            IT Teacher • April 20, 2025
                          </p>
                        </div>
                      </div>
                      <p className='text-sm'>
                        You're making excellent progress with your typing
                        skills. I'm impressed with how quickly you've improved
                        your speed and accuracy. Keep practicing the home row
                        exercises we discussed.
                      </p>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>Ms. Meron Tadesse</p>
                          <p className='text-xs text-muted-foreground'>
                            Art Teacher • April 15, 2025
                          </p>
                        </div>
                      </div>
                      <p className='text-sm'>
                        Your digital art project shows great creativity. I love
                        how you used different tools to create texture in your
                        drawing. For your next project, try experimenting with
                        layers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentPortfolio;
