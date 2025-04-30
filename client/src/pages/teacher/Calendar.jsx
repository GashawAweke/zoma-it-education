'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import {
  CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  CalendarIcon as CalendarComponent,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';

const TeacherCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('month');

  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Typing Test',
      description: 'Grade 3-4 Typing Skills class typing assessment',
      date: '2025-05-10',
      time: '09:00 AM - 10:30 AM',
      type: 'assessment',
      class: 'Grade 3-4 Typing Skills',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      description: 'Meeting with parents to discuss student progress',
      date: '2025-05-15',
      time: '02:00 PM - 04:00 PM',
      type: 'meeting',
      class: 'All Classes',
    },
    {
      id: 3,
      title: 'Computer Hardware Lesson',
      description: 'Introduction to computer components',
      date: '2025-05-05',
      time: '10:00 AM - 11:30 AM',
      type: 'lesson',
      class: 'Grade 1-2 Computer Basics',
    },
    {
      id: 4,
      title: 'Programming Project Due',
      description: 'Final submission for HTML project',
      date: '2025-05-20',
      time: '11:59 PM',
      type: 'deadline',
      class: 'Grade 5-6 Programming Intro',
    },
    {
      id: 5,
      title: 'Staff Meeting',
      description: 'Weekly staff meeting',
      date: '2025-05-08',
      time: '03:30 PM - 04:30 PM',
      type: 'meeting',
      class: 'Teachers Only',
    },
  ];

  // Get events for selected date
  const selectedDateEvents = events.filter(
    (event) => event.date === format(selectedDate, 'yyyy-MM-dd')
  );

  // Get events for current month
  const currentMonthEvents = events.filter((event) => {
    const eventDate = parseISO(event.date);
    return isSameMonth(eventDate, currentDate);
  });

  // Generate calendar days for current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Get event badge color based on type
  const getEventBadge = (type) => {
    switch (type) {
      case 'assessment':
        return <Badge className='bg-blue-500'>Assessment</Badge>;
      case 'meeting':
        return <Badge className='bg-purple-500'>Meeting</Badge>;
      case 'lesson':
        return <Badge className='bg-green-500'>Lesson</Badge>;
      case 'deadline':
        return <Badge className='bg-red-500'>Deadline</Badge>;
      default:
        return <Badge>Event</Badge>;
    }
  };

  // Check if a date has events
  const hasEvents = (date) => {
    return events.some((event) => event.date === format(date, 'yyyy-MM-dd'));
  };

  // Create new event
  const handleCreateEvent = () => {
    toast.info('Create Event', {
      description: 'This feature will be implemented soon.',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Calendar</h1>
          <p className='text-muted-foreground'>
            Manage your schedule, classes, and events
          </p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button onClick={handleCreateEvent}>
            <Plus className='mr-2 h-4 w-4' />
            Create Event
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <div className='flex flex-col md:flex-row justify-between'>
          <TabsList>
            <TabsTrigger value='month'>Month</TabsTrigger>
            <TabsTrigger value='week'>Week</TabsTrigger>
            <TabsTrigger value='day'>Day</TabsTrigger>
            <TabsTrigger value='agenda'>Agenda</TabsTrigger>
          </TabsList>
          <div className='flex items-center gap-2 mt-4 md:mt-0'>
            <Button variant='outline' size='icon' onClick={prevMonth}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button variant='outline' onClick={goToToday}>
              Today
            </Button>
            <Button variant='outline' size='icon' onClick={nextMonth}>
              <ChevronRight className='h-4 w-4' />
            </Button>
            <div className='font-medium'>
              {format(currentDate, 'MMMM yyyy')}
            </div>
          </div>
        </div>

        <TabsContent value='month' className='space-y-4'>
          <Card>
            <CardContent className='p-0'>
              <div className='grid grid-cols-7 gap-px bg-muted'>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day) => (
                    <div key={day} className='p-2 text-center font-medium'>
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className='grid grid-cols-7 gap-px bg-muted'>
                {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                  <div
                    key={`empty-start-${index}`}
                    className='p-2 bg-background min-h-[100px]'
                  />
                ))}
                {calendarDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={`p-2 bg-background min-h-[100px] ${
                      isSameDay(day, selectedDate) ? 'ring-2 ring-primary' : ''
                    } ${isToday(day) ? 'bg-primary/5' : ''}`}
                    onClick={() => handleDateSelect(day)}
                  >
                    <div className='flex justify-between items-center'>
                      <span
                        className={`text-sm font-medium ${
                          isToday(day) ? 'text-primary' : ''
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                      {hasEvents(day) && (
                        <div className='h-2 w-2 rounded-full bg-primary' />
                      )}
                    </div>
                    <div className='mt-1 space-y-1'>
                      {events
                        .filter(
                          (event) => event.date === format(day, 'yyyy-MM-dd')
                        )
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            className='text-xs truncate rounded px-1 py-0.5 bg-primary/10'
                          >
                            {event.title}
                          </div>
                        ))}
                      {events.filter(
                        (event) => event.date === format(day, 'yyyy-MM-dd')
                      ).length > 2 && (
                        <div className='text-xs text-muted-foreground'>
                          +
                          {events.filter(
                            (event) => event.date === format(day, 'yyyy-MM-dd')
                          ).length - 2}{' '}
                          more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {Array.from({ length: 6 - monthEnd.getDay() }).map(
                  (_, index) => (
                    <div
                      key={`empty-end-${index}`}
                      className='p-2 bg-background min-h-[100px]'
                    />
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>
                  Selected Day: {format(selectedDate, 'MMMM d, yyyy')}
                </CardTitle>
                <CardDescription>
                  {selectedDateEvents.length === 0
                    ? 'No events scheduled for this day'
                    : `${selectedDateEvents.length} event${
                        selectedDateEvents.length > 1 ? 's' : ''
                      } scheduled`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {selectedDateEvents.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-6'>
                      <CalendarIcon className='h-12 w-12 text-muted-foreground mb-4' />
                      <h3 className='text-lg font-medium'>No Events</h3>
                      <p className='text-sm text-muted-foreground'>
                        There are no events scheduled for this day.
                      </p>
                      <Button className='mt-4' onClick={handleCreateEvent}>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Event
                      </Button>
                    </div>
                  ) : (
                    selectedDateEvents.map((event) => (
                      <div key={event.id} className='border rounded-lg p-4'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h3 className='font-medium'>{event.title}</h3>
                            <p className='text-sm text-muted-foreground'>
                              {event.description}
                            </p>
                          </div>
                          {getEventBadge(event.type)}
                        </div>
                        <div className='mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-sm'>
                          <div className='flex items-center'>
                            <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                            <span>{event.time}</span>
                          </div>
                          <div className='hidden sm:block text-muted-foreground'>
                            •
                          </div>
                          <div className='flex items-center'>
                            <Users className='h-4 w-4 mr-1 text-muted-foreground' />
                            <span>{event.class}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Events for {format(currentDate, 'MMMM yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {currentMonthEvents.length === 0 ? (
                    <div className='text-center py-6 text-muted-foreground'>
                      No events scheduled for this month
                    </div>
                  ) : (
                    currentMonthEvents
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((event) => (
                        <div
                          key={event.id}
                          className='flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0'
                        >
                          <div className='min-w-[60px] text-center'>
                            <div className='text-sm font-medium'>
                              {format(parseISO(event.date), 'MMM')}
                            </div>
                            <div className='text-2xl font-bold'>
                              {format(parseISO(event.date), 'd')}
                            </div>
                          </div>
                          <div className='flex-1'>
                            <div className='flex justify-between items-start'>
                              <h3 className='font-medium'>{event.title}</h3>
                              {getEventBadge(event.type)}
                            </div>
                            <p className='text-sm text-muted-foreground mt-1'>
                              {event.time}
                            </p>
                            <p className='text-sm mt-1'>{event.description}</p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={handleCreateEvent}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Add Event
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='week' className='space-y-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='text-center py-12'>
                <CalendarComponent className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium'>Week View Coming Soon</h3>
                <p className='text-sm text-muted-foreground'>
                  We're working on implementing the week view for the calendar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='day' className='space-y-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='text-center py-12'>
                <CalendarComponent className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium'>Day View Coming Soon</h3>
                <p className='text-sm text-muted-foreground'>
                  We're working on implementing the day view for the calendar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='agenda' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Agenda View</CardTitle>
              <CardDescription>All upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      className='flex items-start gap-4 border-b pb-6 last:border-0 last:pb-0'
                    >
                      <div className='min-w-[80px] text-center'>
                        <div className='text-sm font-medium'>
                          {format(parseISO(event.date), 'MMM')}
                        </div>
                        <div className='text-3xl font-bold'>
                          {format(parseISO(event.date), 'd')}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          {format(parseISO(event.date), 'yyyy')}
                        </div>
                      </div>
                      <div className='flex-1'>
                        <div className='flex justify-between items-start'>
                          <h3 className='font-medium text-lg'>{event.title}</h3>
                          {getEventBadge(event.type)}
                        </div>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
                          <Clock className='h-4 w-4' />
                          <span>{event.time}</span>
                          <span>•</span>
                          <BookOpen className='h-4 w-4' />
                          <span>{event.class}</span>
                        </div>
                        <p className='text-sm mt-2'>{event.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCalendar;
