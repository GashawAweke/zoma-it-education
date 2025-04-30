'use client';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  FileText,
  Video,
} from 'lucide-react';
import Worksheet from '../../components/Worksheet';

const LessonView = () => {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock lesson data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setLesson({
        id: lessonId,
        title: 'Introduction to Computer Hardware',
        description: 'Learn about the basic components of a computer system',
        content: `
          <h2>What is Computer Hardware?</h2>
          <p>Computer hardware refers to the physical parts of a computer system that you can touch and see.</p>
          
          <h3>Main Components:</h3>
          <ul>
            <li><strong>CPU (Central Processing Unit)</strong>: The brain of the computer that processes instructions.</li>
            <li><strong>RAM (Random Access Memory)</strong>: Temporary memory that stores data the CPU is actively using.</li>
            <li><strong>Hard Drive</strong>: Stores all your files and programs even when the computer is turned off.</li>
            <li><strong>Monitor</strong>: The screen that displays information.</li>
            <li><strong>Keyboard</strong>: Used to type information into the computer.</li>
            <li><strong>Mouse</strong>: Used to point to and select items on the screen.</li>
          </ul>
          
          <p>Understanding these components helps you know how a computer works and how to take care of it.</p>
        `,
        videoUrl: 'https://example.com/video.mp4',
        worksheet: {
          title: 'Computer Hardware Quiz',
          description: 'Test your knowledge of computer hardware components',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              text: "Which component is considered the 'brain' of the computer?",
              options: ['CPU', 'RAM', 'Hard Drive', 'Monitor'],
            },
            {
              id: 'q2',
              type: 'checkbox',
              text: 'Which of the following are input devices? (Select all that apply)',
              options: ['Keyboard', 'Mouse', 'Monitor', 'Printer', 'Scanner'],
            },
            {
              id: 'q3',
              type: 'short-answer',
              text: 'What does RAM stand for?',
              hint: 'Think about the type of memory it represents',
            },
            {
              id: 'q4',
              type: 'long-answer',
              text: 'Explain the difference between RAM and a hard drive in your own words.',
              hint: 'Consider what happens to the data when the computer is turned off',
            },
          ],
          timeLimit: 15, // minutes
        },
        resources: [
          {
            title: 'Computer Parts Diagram',
            type: 'image',
            url: '/placeholder.svg?height=300&width=500',
          },
          {
            title: 'Hardware Glossary',
            type: 'document',
            url: '#',
          },
        ],
        progress: 0,
        completed: false,
      });
      setLoading(false);
    }, 1000);
  }, [lessonId]);

  const handleWorksheetSubmit = (answers, isSave = true) => {
    console.log('Worksheet answers:', answers);

    if (isSave) {
      // Using Sonner toast through our context
      toast.success('Progress saved', {
        description: 'Your answers have been saved successfully.',
      });
    } else {
      toast.success('Worksheet submitted!', {
        description: 'Your answers have been submitted for review.',
      });

      // In a real app, this would update the lesson progress
      setLesson((prev) => ({
        ...prev,
        progress: 100,
        completed: true,
      }));
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4'>Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' onClick={() => navigate(-1)}>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{lesson.title}</h1>
          <p className='text-muted-foreground'>{lesson.description}</p>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList>
            <TabsTrigger value='content'>
              <BookOpen className='h-4 w-4 mr-2' />
              Lesson Content
            </TabsTrigger>
            <TabsTrigger value='worksheet'>
              <FileText className='h-4 w-4 mr-2' />
              Worksheet
            </TabsTrigger>
            <TabsTrigger value='resources'>
              <Video className='h-4 w-4 mr-2' />
              Resources
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {lesson.completed && (
          <div className='flex items-center gap-1 text-green-600'>
            <CheckCircle className='h-4 w-4' />
            <span className='text-sm font-medium'>Completed</span>
          </div>
        )}
      </div>

      <TabsContent value='content' className='mt-0'>
        <Card>
          <CardContent className='p-6'>
            <div
              className='prose max-w-none dark:prose-invert'
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='worksheet' className='mt-0'>
        <Worksheet
          title={lesson.worksheet.title}
          description={lesson.worksheet.description}
          questions={lesson.worksheet.questions}
          timeLimit={lesson.worksheet.timeLimit}
          onSubmit={handleWorksheetSubmit}
          readOnly={lesson.completed}
        />
      </TabsContent>

      <TabsContent value='resources' className='mt-0'>
        <div className='grid gap-4 md:grid-cols-2'>
          {lesson.resources.map((resource, index) => (
            <Card key={index} className='overflow-hidden'>
              {resource.type === 'image' && (
                <div className='aspect-video'>
                  <img
                    src={resource.url || '/placeholder.svg'}
                    alt={resource.title}
                    className='object-cover w-full h-full'
                  />
                </div>
              )}
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-medium'>{resource.title}</h3>
                    <p className='text-sm text-muted-foreground capitalize'>
                      {resource.type}
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    {resource.type === 'image' ? 'View' : 'Download'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

export default LessonView;
