'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import SettingsPage from '../../components/SettingsPage.jsx';
import { BookOpen, Keyboard } from 'lucide-react';

const StudentSettings = () => {
  // Additional tabs specific to students
  const additionalTabs = [
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'accessibility', label: 'Accessibility', icon: Keyboard },
  ];

  // Additional content for student-specific tabs
  const additionalContent = {
    learning: (
      <Card>
        <CardHeader>
          <CardTitle>Learning Preferences</CardTitle>
          <CardDescription>Customize your learning experience</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='auto-play'>Auto-play Videos</Label>
              <p className='text-sm text-muted-foreground'>
                Automatically play videos in lessons
              </p>
            </div>
            <Switch id='auto-play' defaultChecked={true} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='show-hints'>Show Hints</Label>
              <p className='text-sm text-muted-foreground'>
                Display hints for exercises and quizzes
              </p>
            </div>
            <Switch id='show-hints' defaultChecked={true} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='difficulty'>Adaptive Difficulty</Label>
              <p className='text-sm text-muted-foreground'>
                Adjust difficulty based on your performance
              </p>
            </div>
            <Switch id='difficulty' defaultChecked={true} />
          </div>
        </CardContent>
      </Card>
    ),
    accessibility: (
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Settings</CardTitle>
          <CardDescription>
            Make the platform more accessible for your needs
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='font-size'>Larger Font Size</Label>
              <p className='text-sm text-muted-foreground'>
                Increase the size of text throughout the platform
              </p>
            </div>
            <Switch id='font-size' defaultChecked={false} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='high-contrast'>High Contrast Mode</Label>
              <p className='text-sm text-muted-foreground'>
                Enhance visual contrast for better readability
              </p>
            </div>
            <Switch id='high-contrast' defaultChecked={false} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label htmlFor='screen-reader'>Screen Reader Optimization</Label>
              <p className='text-sm text-muted-foreground'>
                Optimize content for screen readers
              </p>
            </div>
            <Switch id='screen-reader' defaultChecked={false} />
          </div>
        </CardContent>
      </Card>
    ),
  };

  return (
    <SettingsPage
      title='Student Settings'
      description='Manage your student account settings and learning preferences'
      userRole='student'
      additionalTabs={additionalTabs}
      additionalContent={additionalContent}
    />
  );
};

export default StudentSettings;
