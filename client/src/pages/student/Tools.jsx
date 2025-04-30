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
import { Keyboard, Calculator, Clock, Calendar } from 'lucide-react';
import TypingTutor from '../../components/tools/TypingTutor';

const StudentTools = () => {
  const [activeTab, setActiveTab] = useState('typing');

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Learning Tools</h1>
        <p className='text-muted-foreground'>
          Interactive tools to help you develop essential skills
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
          <TabsTrigger value='calendar' disabled>
            <Calendar className='h-4 w-4 mr-2' />
            Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value='typing'>
          <Card>
            <CardHeader>
              <CardTitle>Typing Tutor</CardTitle>
              <CardDescription>
                Improve your typing speed and accuracy with interactive lessons
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
                Set timers for study sessions and breaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Timer tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='calendar'>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Manage your schedule and assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Calendar tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentTools;
