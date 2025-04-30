'use client';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Moon, Sun, Zap } from 'lucide-react';

const ThemeToggle = () => {
  const { themeName, setTheme } = useTheme();

  return (
    <div className='flex flex-col space-y-4'>
      <h3 className='text-lg font-medium'>Theme Settings</h3>
      <div className='flex flex-wrap gap-3'>
        <Button
          variant={themeName === 'light' ? 'default' : 'outline'}
          onClick={() => setTheme('light')}
          className='flex items-center gap-2'
        >
          <Sun className='h-4 w-4' />
          Light
        </Button>

        <Button
          variant={themeName === 'dark' ? 'default' : 'outline'}
          onClick={() => setTheme('dark')}
          className='flex items-center gap-2'
        >
          <Moon className='h-4 w-4' />
          Dark
        </Button>

        <Button
          variant={themeName === 'highContrast' ? 'default' : 'outline'}
          onClick={() => setTheme('highContrast')}
          className='flex items-center gap-2'
        >
          <Zap className='h-4 w-4' />
          High Contrast
        </Button>
      </div>
      <p className='text-sm text-muted-foreground'>
        Choose a theme preference for your portal experience.
      </p>
    </div>
  );
};

export default ThemeToggle;
