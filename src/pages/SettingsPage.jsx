import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { Switch } from '@headlessui/react'; // Assuming installed or use custom

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    publicProfiles: false,
    emailNotifications: true,
    analytics: true,
    maintenanceMode: false
  });
  const { darkMode, toggleDarkMode, toggle, addNotification } = useAppContext();

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toggle(key);
    addNotification(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} toggled ${!settings[key] ? 'ON' : 'OFF'}`);
  };

  const settingGroups = [
    {
      title: 'General',
      items: [
        { key: 'notifications', label: 'Push Notifications', desc: 'Enable desktop notifications for new activity' },
        { key: 'publicProfiles', label: 'Public Profiles', desc: 'Allow students to view each others profiles' },
        { key: 'emailNotifications', label: 'Email Alerts', desc: 'Send email for important announcements' }
      ]
    },
    {
      title: 'System',
      items: [
        { key: 'analytics', label: 'Analytics Tracking', desc: 'Anonymous usage data for improvements' },
        { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Disable student access for updates' }
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-primary">System Settings</h1>
      </div>

      {/* Dark Mode Toggle */}
      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-text-primary">Dark Mode</h3>
            <p className="text-text-secondary">Toggle between light and dark themes</p>
          </div>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            className={`${darkMode ? 'bg-purple-primary' : 'bg-black-card/50'} relative inline-flex h-8 w-16 items-center rounded-full border-2 border-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-primary/50`}
          >
            <span className={`transform transition-transform ${darkMode ? 'translate-x-9' : 'translate-x-1'} w-6 h-6 bg-white rounded-full shadow-lg`} />
          </Switch>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="space-y-8">
        {settingGroups.map((group, index) => (
          <div key={index} className="card p-8">
            <h3 className="text-2xl font-black text-text-primary mb-8">{group.title}</h3>
            <div className="space-y-6">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-black-card/50 rounded-2xl hover:bg-black-card/70 transition-all group">
                  <div>
                    <div className="font-bold text-text-primary text-lg">{item.label}</div>
                    <div className="text-text-secondary text-sm">{item.desc}</div>
                  </div>
                  <Switch
                    checked={settings[item.key]}
                    onChange={() => handleToggle(item.key)}
                    className={`${settings[item.key] ? 'bg-green-500' : 'bg-black-card/50'} relative inline-flex h-7 w-12 items-center rounded-full border-2 border-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400/50 group-hover:border-green-400/50`}
                  >
                    <span className={`transform transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-1'} w-5 h-5 bg-white rounded-full shadow-md`} />
                  </Switch>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-8 border-2 border-purple-primary/30">
        <h3 className="text-xl font-bold text-purple-primary mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-primary rounded-full animate-pulse" />
          Advanced Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="font-semibold text-text-primary mb-1">API Base URL</div>
            <div className="text-text-secondary">http://localhost:3000</div>
          </div>
          <div>
            <div className="font-semibold text-text-primary mb-1">Version</div>
            <div className="text-purple-primary font-semibold">2.0 Pro</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

