'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from './ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  BookOpen,
  Users,
  Calendar,
  Settings,
  FileText,
  BarChart,
  MessageSquare,
  Bell,
  Heart,
  Brain,
  LogOut,
  Home,
  Keyboard,
} from 'lucide-react';

const PortalSidebar = ({ portalType }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Define menu items based on portal type
    switch (portalType) {
      case 'student':
        setMenuItems([
          { title: 'Dashboard', icon: Home, path: '/dashboard' },
          { title: 'My Courses', icon: BookOpen, path: '/courses' },
          { title: 'Achievements', icon: BarChart, path: '/achievements' },
          { title: 'Portfolio', icon: FileText, path: '/portfolio' },
          { title: 'Tools', icon: Keyboard, path: '/tools' },
          { title: 'Settings', icon: Settings, path: '/settings' },
        ]);
        break;
      case 'teacher':
        setMenuItems([
          { title: 'Dashboard', icon: Home, path: '/teacher/dashboard' },
          { title: 'My Classes', icon: Users, path: '/teacher/classes' },
          {
            title: 'Assignments',
            icon: FileText,
            path: '/teacher/assignments',
          },
          {
            title: 'Student Progress',
            icon: BarChart,
            path: '/teacher/progress',
          },
          { title: 'Calendar', icon: Calendar, path: '/teacher/calendar' },
          { title: 'Messages', icon: MessageSquare, path: '/teacher/messages' },
          { title: 'Tools', icon: Keyboard, path: '/teacher/tools' },
          { title: 'Settings', icon: Settings, path: '/teacher/settings' },
        ]);
        break;
      case 'parent':
        setMenuItems([
          { title: 'Dashboard', icon: Home, path: '/parent/dashboard' },
          { title: 'My Children', icon: Users, path: '/parent/children' },
          {
            title: 'Progress Reports',
            icon: BarChart,
            path: '/parent/reports',
          },
          { title: 'Messages', icon: MessageSquare, path: '/parent/messages' },
          { title: 'Calendar', icon: Calendar, path: '/parent/calendar' },
          { title: 'Settings', icon: Settings, path: '/parent/settings' },
        ]);
        break;
      case 'admin':
        setMenuItems([
          { title: 'Dashboard', icon: Home, path: '/admin/dashboard' },
          { title: 'Users', icon: Users, path: '/admin/users' },
          { title: 'Courses', icon: BookOpen, path: '/admin/courses' },
          { title: 'Analytics', icon: BarChart, path: '/admin/analytics' },
          { title: 'Announcements', icon: Bell, path: '/admin/announcements' },
          { title: 'Settings', icon: Settings, path: '/admin/settings' },
        ]);
        break;
      case 'health':
        setMenuItems([
          { title: 'Dashboard', icon: Home, path: '/health/dashboard' },
          { title: 'First Aid', icon: Heart, path: '/health/first-aid' },
          {
            title: 'Psychological Support',
            icon: Brain,
            path: '/health/psychological',
          },
          { title: 'Student Records', icon: FileText, path: '/health/records' },
          { title: 'Resources', icon: BookOpen, path: '/health/resources' },
          { title: 'Tools', icon: Keyboard, path: '/health/tools' },
          { title: 'Settings', icon: Settings, path: '/health/settings' },
        ]);
        break;
      default:
        setMenuItems([]);
    }
  }, [portalType]);

  const getPortalTitle = () => {
    switch (portalType) {
      case 'student':
        return 'Student Portal';
      case 'teacher':
        return 'Teacher Portal';
      case 'parent':
        return 'Parent Portal';
      case 'admin':
        return 'Admin Portal';
      case 'health':
        return 'Health Team Portal';
      default:
        return 'Zoma School IT';
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='p-4'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <BookOpen className='h-4 w-4' />
            </div>
            <div className='font-semibold'>{getPortalTitle()}</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className='h-4 w-4' />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <Avatar>
              <AvatarImage
                src={user?.avatar || '/placeholder.svg?height=32&width=32'}
              />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium'>{user?.name || 'User'}</div>
              <div className='text-xs text-muted-foreground'>
                {user?.email || 'user@example.com'}
              </div>
            </div>
          </div>
          <Button variant='outline' className='w-full' onClick={logout}>
            <LogOut className='h-4 w-4 mr-2' />
            Logout
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default PortalSidebar;
