'use client';

import { useState } from 'react';
import styles from './AccountSettings.module.css';
import { useUser } from '../../context/userContext'; // Adjust the import path as needed

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user } = useUser(); // Access the user context

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }

    try {
      // Use the userId from the context
      const userId = user.userId;

      if (!userId) {
        throw new Error('User ID is missing. Please log in again.');
      }

      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password.');
      }

      alert(data.message || 'Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Handle the error properly
      if (error instanceof Error) {
        alert(error.message || 'Failed to update password. Please try again.');
      } else {
        alert('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.doma}>
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
        <button className={styles.saveButton} onClick={handlePasswordChange}>
          Update Password
        </button>
      </div>
    </div>
    </div>
  );
};

export default AccountSettings;