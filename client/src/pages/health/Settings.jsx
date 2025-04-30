import SettingsPage from '../../components/SettingsPage.jsx';

const HealthSettings = () => {
  // Additional tabs specific to health team
  const additionalTabs = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: () => <span>🔔</span>,
    },
    { id: 'privacy', label: 'Privacy', icon: () => <span>🔒</span> },
  ];

  // Additional content for health-specific tabs
  const additionalContent = {
    notifications: (
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Health Team Notifications</h3>
        <p>Configure notification settings specific to the health team.</p>
        <div className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Emergency Alerts</h4>
              <p className='text-sm text-muted-foreground'>
                Receive notifications for emergency situations
              </p>
            </div>
            <div>
              <input
                type='checkbox'
                id='emergency-alerts'
                className='toggle'
                defaultChecked
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Health Record Updates</h4>
              <p className='text-sm text-muted-foreground'>
                Get notified when student health records are updated
              </p>
            </div>
            <div>
              <input
                type='checkbox'
                id='record-updates'
                className='toggle'
                defaultChecked
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Medication Reminders</h4>
              <p className='text-sm text-muted-foreground'>
                Receive reminders for student medication schedules
              </p>
            </div>
            <div>
              <input
                type='checkbox'
                id='medication-reminders'
                className='toggle'
                defaultChecked
              />
            </div>
          </div>
        </div>
      </div>
    ),
    privacy: (
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Privacy Settings</h3>
        <p>Configure privacy settings for health data and records.</p>
        <div className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Data Sharing</h4>
              <p className='text-sm text-muted-foreground'>
                Allow sharing of anonymized health data for reporting
              </p>
            </div>
            <div>
              <input type='checkbox' id='data-sharing' className='toggle' />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Record Access</h4>
              <p className='text-sm text-muted-foreground'>
                Control who can access student health records
              </p>
            </div>
            <div>
              <select className='select select-bordered w-full max-w-xs'>
                <option>Health Team Only</option>
                <option>Health Team and Administrators</option>
                <option>Health Team, Administrators, and Teachers</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <SettingsPage
      title='Health Team Settings'
      description='Manage your health team account settings and preferences.'
      userRole='health'
      additionalTabs={additionalTabs}
      additionalContent={additionalContent}
    />
  );
};

export default HealthSettings;
