'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from '../context/ToastContext';
import {
  User,
  Bell,
  Shield,
  Moon,
  Sun,
  Upload,
  Globe,
  Eye,
  EyeOff,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const SettingsPage = ({
  title = 'Settings',
  description = 'Manage your account settings and preferences.',
  userRole = 'user',
  additionalTabs = [],
  additionalContent = {},
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=128&width=128',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'english',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      updates: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleSaveAccount = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account settings saved successfully');
    }, 1000);
  };

  const handleSavePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      toast.success('Password changed successfully');
    }, 1000);
  };

  const handleSavePreferences = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Preferences saved successfully');
    }, 1000);
  };

  // Combine default tabs with additional tabs
  const allTabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'password', label: 'Password', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    ...additionalTabs,
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {allTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <tab.icon className='h-4 w-4 mr-2' />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Account Tab */}
        <TabsContent value='account' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex flex-col items-center gap-4'>
                  <Avatar className='h-24 w-24'>
                    <AvatarImage src={formData.avatar || '/placeholder.svg'} />
                    <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant='outline' size='sm'>
                    <Upload className='h-4 w-4 mr-2' />
                    Change Avatar
                  </Button>
                </div>
                <div className='flex-1 space-y-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label>Role</Label>
                    <div className='rounded-md bg-muted px-3 py-2 text-sm'>
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <Button onClick={handleSaveAccount} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value='password' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='currentPassword'>Current Password</Label>
                  <div className='relative'>
                    <Input
                      id='currentPassword'
                      name='currentPassword'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <div className='relative'>
                    <Input
                      id='newPassword'
                      name='newPassword'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                  <div className='relative'>
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <Button onClick={handleSavePassword} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Change Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value='notifications' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='email-notifications'>
                      Email Notifications
                    </Label>
                    <p className='text-sm text-muted-foreground'>
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id='email-notifications'
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) =>
                      handleNotificationChange('email', checked)
                    }
                  />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='push-notifications'>
                      Push Notifications
                    </Label>
                    <p className='text-sm text-muted-foreground'>
                      Receive notifications in the browser
                    </p>
                  </div>
                  <Switch
                    id='push-notifications'
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) =>
                      handleNotificationChange('push', checked)
                    }
                  />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='update-notifications'>System Updates</Label>
                    <p className='text-sm text-muted-foreground'>
                      Receive notifications about system updates
                    </p>
                  </div>
                  <Switch
                    id='update-notifications'
                    checked={formData.notifications.updates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange('updates', checked)
                    }
                  />
                </div>
              </div>
              <div className='flex justify-end'>
                <Button onClick={handleSavePreferences} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value='preferences' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='language'>Language</Label>
                  <select
                    id='language'
                    name='language'
                    value={formData.language}
                    onChange={handleInputChange}
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <option value='english'>English</option>
                    <option value='amharic'>Amharic</option>
                    <option value='french'>French</option>
                    <option value='arabic'>Arabic</option>
                  </select>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='theme'>Theme</Label>
                    <p className='text-sm text-muted-foreground'>
                      Choose between light and dark mode
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Sun className='h-4 w-4' />
                    <Switch
                      id='theme'
                      checked={formData.theme === 'dark'}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          theme: checked ? 'dark' : 'light',
                        }))
                      }
                    />
                    <Moon className='h-4 w-4' />
                  </div>
                </div>
              </div>
              <div className='mb-8'>
                <ThemeToggle />
              </div>
              <div className='flex justify-end'>
                <Button onClick={handleSavePreferences} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Render additional tabs */}
        {additionalTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className='space-y-4'>
            {additionalContent[tab.id] || (
              <Card>
                <CardHeader>
                  <CardTitle>{tab.label}</CardTitle>
                  <CardDescription>
                    Configure your {tab.label.toLowerCase()} settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Content for {tab.label} tab</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SettingsPage;
