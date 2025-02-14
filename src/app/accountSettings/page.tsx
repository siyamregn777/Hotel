'use client';

import { useState } from 'react';
import styles from './AccountSettings.module.css';

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState({
    google: false,
    facebook: false,
  });

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    alert(is2FAEnabled ? '2FA Disabled' : '2FA Enabled');
  };

  const handleLinkAccount = (provider: 'google' | 'facebook') => {
    setLinkedAccounts({ ...linkedAccounts, [provider]: !linkedAccounts[provider] });
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} ${linkedAccounts[provider] ? 'Unlinked' : 'Linked'} Successfully!`);
  };

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Account Settings</h2>

      {/* Password Change */}
      <div className={styles.section}>
        <h3>Password Change</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={styles.saveButton} onClick={handlePasswordChange}>Update Password</button>
      </div>

      {/* Two-Factor Authentication */}
      <div className={styles.section}>
        <h3>Two-Factor Authentication</h3>
        <button className={styles.toggleButton} onClick={handle2FAToggle}>
          {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
        </button>
      </div>

      {/* Linked Accounts */}
      <div className={styles.section}>
        <h3>Linked Accounts</h3>
        <button
          className={`${styles.linkButton} ${linkedAccounts.google ? styles.linked : ''}`}
          onClick={() => handleLinkAccount('google')}
        >
          {linkedAccounts.google ? 'Unlink Google' : 'Link Google'}
        </button>
        <button
          className={`${styles.linkButton} ${linkedAccounts.facebook ? styles.linked : ''}`}
          onClick={() => handleLinkAccount('facebook')}
        >
          {linkedAccounts.facebook ? 'Unlink Facebook' : 'Link Facebook'}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
