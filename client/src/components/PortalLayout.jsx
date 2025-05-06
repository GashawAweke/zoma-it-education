'use client';

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PortalSidebar from './PortalSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import NotificationCenter from './NotificationCenter';

const PortalLayout = ({ portalType }) => {
  const { themeName, setTheme } = useTheme();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Assignment',
      message: 'A new assignment has been added to your course.',
      type: 'assignment',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: 2,
      title: 'Upcoming Event',
      message: "Don't forget about the school exhibition tomorrow.",
      type: 'alert',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 3,
      title: 'Message from Teacher',
      message: 'Great job on your recent project submission!',
      type: 'message',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ]);

  // In a real app, this would fetch notifications from an API
  useEffect(() => {
    // Simulate receiving a new notification after 5 seconds
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        title: 'Welcome Back!',
        message: `Welcome to the ${portalType} portal. We're glad to have you here.`,
        type: 'success',
        read: false,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [portalType]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleClearAll = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full overflow-hidden'>
        <PortalSidebar portalType={portalType} />
        <SidebarInset>
          <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6'>
            <SidebarTrigger />
            <div className='flex-1' />
            <div className='flex items-center gap-4'>
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
              />
              <Button
                variant='ghost'
                size='icon'
                onClick={() =>
                  setTheme(themeName === 'dark' ? 'light' : 'dark')
                }
                aria-label='Toggle theme'
              >
                {themeName === 'dark' ? (
                  <Sun className='h-5 w-5' />
                ) : (
                  <Moon className='h-5 w-5' />
                )}
              </Button>
            </div>
          </header>
          <main className='flex-1 p-6'>
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PortalLayout;
