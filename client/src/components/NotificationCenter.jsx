'use client';
import { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '../lib/utils';

const NotificationCenter = ({
  notifications: initialNotifications = [],
  onMarkAsRead,
  onClearAll,
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkAsRead = (id) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    } else {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <div className='h-2 w-2 rounded-full bg-blue-500' />;
      case 'assignment':
        return <div className='h-2 w-2 rounded-full bg-amber-500' />;
      case 'alert':
        return <div className='h-2 w-2 rounded-full bg-red-500' />;
      case 'success':
        return <div className='h-2 w-2 rounded-full bg-green-500' />;
      default:
        return <div className='h-2 w-2 rounded-full bg-gray-500' />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - notificationTime) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <Bell className='h-5 w-5' />
          {unreadCount > 0 && (
            <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-80'>
        <DropdownMenuLabel className='flex items-center justify-between'>
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClearAll}
              className='h-auto py-1 px-2 text-xs'
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className='py-6 text-center text-sm text-muted-foreground'>
            No notifications
          </div>
        ) : (
          <ScrollArea className='h-[300px]'>
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    'flex cursor-default flex-col items-start p-4 focus:bg-accent',
                    !notification.read && 'bg-muted'
                  )}
                >
                  <div className='flex w-full items-start justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                      {getNotificationIcon(notification.type)}
                      <span className='font-medium'>{notification.title}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-muted-foreground'>
                        {getTimeAgo(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                        >
                          <Check className='h-3 w-3' />
                          <span className='sr-only'>Mark as read</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className='mt-1 text-sm'>{notification.message}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
