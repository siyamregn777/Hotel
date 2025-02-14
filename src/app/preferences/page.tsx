'use client';

import { useState } from 'react';
import styles from './Preferences.module.css';

const Preferences = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    alert(`Theme changed to ${e.target.value}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    alert(`Language changed to ${e.target.value}`);
  };

  const handleNotificationChange = (type: 'email' | 'sms' | 'push') => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
    alert(`${type.toUpperCase()} notifications ${notifications[type] ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className={styles.preferencesContainer}>
      <h2 className={styles.title}>Preferences & Customization</h2>

      {/* Theme Selection */}
      <div className={styles.section}>
        <h3>Theme Selection</h3>
        <select className={styles.select} value={theme} onChange={handleThemeChange}>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
          <option value="system">System Default</option>
        </select>
      </div>

      {/* Language Selection */}
      <div className={styles.section}>
        <h3>Language Preference</h3>
        <select className={styles.select} value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Notification Preferences */}
      <div className={styles.section}>
        <h3>Notification Preferences</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={() => handleNotificationChange('email')}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={() => handleNotificationChange('sms')}
          />
          SMS Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={() => handleNotificationChange('push')}
          />
          Push Notifications
        </label>
      </div>
    </div>
  );
};

export default Preferences;
