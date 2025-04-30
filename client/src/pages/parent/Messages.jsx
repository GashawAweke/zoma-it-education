'use client';
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const ParentMessages = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for messages
  const messages = [
    {
      id: 1,
      from: 'Ms. Tigist',
      role: 'Math Teacher',
      avatar: '/placeholder.svg?height=40&width=40',
      subject: 'Math Progress Update',
      content:
        "Dear Parent, I wanted to update you on Abebe's progress in math class. He has been doing very well with the recent lessons on basic arithmetic and is showing a good understanding of the concepts. Please encourage him to continue practicing at home. Let me know if you have any questions. Best regards, Ms. Tigist",
      date: '2025-04-27',
      time: '10:30 AM',
      read: true,
      folder: 'inbox',
      child: 'Abebe Kebede',
    },
    {
      id: 2,
      from: 'Mr. Dawit',
      role: 'IT Teacher',
      avatar: '/placeholder.svg?height=40&width=40',
      subject: 'Upcoming Computer Skills Test',
      content:
        'Dear Parent, This is to inform you that we will be having a computer skills assessment next week. The test will cover basic typing skills and computer navigation. Please ensure that Abebe practices his typing at home. The test will be on Monday, May 5th. Thank you for your support. Regards, Mr. Dawit',
      date: '2025-04-26',
      time: '02:15 PM',
      read: false,
      folder: 'inbox',
      child: 'Abebe Kebede',
    },
    {
      id: 3,
      from: 'School Admin',
      role: 'Administration',
      avatar: '/placeholder.svg?height=40&width=40',
      subject: 'Parent-Teacher Meeting Schedule',
      content:
        'Dear Parent, We are scheduling the next parent-teacher meetings for May 15th. Please let us know your preferred time slot by responding to this message. Available times are between 2:00 PM and 6:00 PM. Thank you for your cooperation. Regards, School Administration',
      date: '2025-04-25',
      time: '09:00 AM',
      read: true,
      folder: 'inbox',
      child: 'All Children',
    },
    {
      id: 4,
      from: 'Ms. Meron',
      role: 'Art Teacher',
      avatar: '/placeholder.svg?height=40&width=40',
      subject: 'Art Supplies Needed',
      content:
        'Dear Parent, For our upcoming art project, Sara will need the following supplies: colored pencils, scissors, and glue. If you have any difficulty providing these items, please let me know, and the school can assist. The project will begin next Monday. Thank you, Ms. Meron',
      date: '2025-04-24',
      time: '11:45 AM',
      read: true,
      folder: 'inbox',
      child: 'Sara Kebede',
    },
    {
      id: 5,
      from: 'You',
      role: 'Parent',
      avatar: '/placeholder.svg?height=40&width=40',
      subject: 'Re: Math Progress Update',
      content:
        'Thank you for the update, Ms. Tigist. We are glad to hear that Abebe is doing well in math. We will continue to encourage his practice at home. Best regards.',
      date: '2025-04-27',
      time: '11:15 AM',
      read: true,
      folder: 'sent',
      child: 'Abebe Kebede',
    },
  ];

  // Filter messages based on search query, tab, and filter
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = message.folder === activeTab;
    const matchesFilter =
      selectedFilter === 'all' || message.child === selectedFilter;

    return matchesSearch && matchesTab && matchesFilter;
  });

  // Get unique children for filter
  const children = ['All Children', 'Abebe Kebede', 'Sara Kebede'];

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);

    // Mark as read if it wasn't already
    if (!message.read) {
      // In a real app, this would update the server
      message.read = true;
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Empty Message', {
        description: 'Please enter a message before sending.',
      });
      return;
    }

    toast.success('Message Sent', {
      description: 'Your reply has been sent successfully.',
    });

    setReplyText('');
    // In a real app, this would add the reply to the messages
  };

  const handleComposeMessage = () => {
    toast.info('Compose Message', {
      description:
        'This feature is under development. Please check back later.',
    });
  };
};

export default ParentMessages;
