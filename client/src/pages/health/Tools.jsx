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
import { Keyboard, Clock, Heart, Brain } from 'lucide-react';
import TypingTutor from '../../components/tools/TypingTutor';

const HealthTools = () => {
  const [activeTab, setActiveTab] = useState('typing');

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Health Team Tools</h1>
        <p className='text-muted-foreground'>
          Interactive tools to support student health and wellbeing
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
          <TabsTrigger value='bmi' disabled>
            <Heart className='h-4 w-4 mr-2' />
            BMI Calculator
          </TabsTrigger>
          <TabsTrigger value='stress' disabled>
            <Brain className='h-4 w-4 mr-2' />
            Stress Assessment
          </TabsTrigger>
          <TabsTrigger value='timer' disabled>
            <Clock className='h-4 w-4 mr-2' />
            Meditation Timer
          </TabsTrigger>
        </TabsList>

        <TabsContent value='typing'>
          <Card>
            <CardHeader>
              <CardTitle>Typing Tutor</CardTitle>
              <CardDescription>
                Improve typing skills for better computer interaction and
                reduced physical strain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TypingTutor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='bmi'>
          <Card>
            <CardHeader>
              <CardTitle>BMI Calculator</CardTitle>
              <CardDescription>
                Calculate Body Mass Index for health assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                BMI Calculator tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='stress'>
          <Card>
            <CardHeader>
              <CardTitle>Stress Assessment</CardTitle>
              <CardDescription>
                Evaluate stress levels and get recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Stress Assessment tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='timer'>
          <Card>
            <CardHeader>
              <CardTitle>Meditation Timer</CardTitle>
              <CardDescription>
                Timer with calming sounds for meditation sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12 text-muted-foreground'>
                Meditation Timer tool coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthTools;
