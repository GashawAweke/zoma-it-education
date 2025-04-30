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
import { Keyboard, Calculator, Clock, FileText } from 'lucide-react';
import TypingTutor from '../../components/tools/TypingTutor';

const TeacherTools = () => {
  const [activeTab, setActiveTab] = useState('typing');

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Teaching Tools</h1>
        <p className='text-muted-foreground'>
          Interactive tools to enhance your teaching and productivity
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='typing'>
            <Keyboard className='h-4 w-4 mr-2' />
            Typing Tutor
          </TabsTrigger>
          <TabsTrigger value='calculator' disabled>
            <Calculator className='h-4 w-4 mr-2' />
            Calculator
          </TabsTrigger>
          <TabsTrigger value='timer' disabled>
            <Clock className='h-4 w-4 mr-2' />
            Timer
          </TabsTrigger>
          <TabsTrigger value='grader' disabled>
            <FileText className='h-4 w-4 mr-2' />
            Grade Calculator
          </TabsTrigger>
        </TabsList>

        <TabsContent value='typing'>
          <Card>
            <CardHeader>
              <CardTitle>Typing Tutor</CardTitle>
              <CardDescription>
                Practice your typing skills or use this tool to teach students
                proper typing techniques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TypingTutor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='calculator'>
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>
                Perform mathematical calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Calculator tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='timer'>
          <Card>
            <CardHeader>
              <CardTitle>Timer</CardTitle>
              <CardDescription>
                Set timers for classroom activities and breaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Timer tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='grader'>
          <Card>
            <CardHeader>
              <CardTitle>Grade Calculator</CardTitle>
              <CardDescription>
                Calculate student grades and class averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Grade Calculator tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherTools;
