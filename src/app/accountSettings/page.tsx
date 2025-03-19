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
      {/* Additional Text Outside the Container */}
      <div className={styles.introSection}>
        <h1>Account Security</h1>
        <p>
          Your account security is our top priority. Regularly updating your password helps protect your personal
          information and ensures a safe experience on our platform. Below, you can change your password by following
          the instructions.
        </p>
        <p>
          If you have any questions or encounter issues, feel free to reach out to our support team at{' '}
          <a href="siyamregnyeshidagna777.com" className={styles.supportLink}>
          siyamregnyeshidagna777.com
          </a>
          .
        </p>
      </div>

      {/* Password Change Container */}
      <div className={styles.settingsContainer}>
        <h2 className={styles.title}>Change Your Password</h2>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className={styles.saveButton} onClick={handlePasswordChange}>
            Update Password
          </button>
        </div>
      </div>

      {/* Additional Text Outside the Container */}
      <div className={styles.footerSection}>
        <h3>Password Best Practices</h3>
        <p>
          To ensure your account remains secure, follow these best practices when creating a new password:
        </p>
        <ul className={styles.passwordTips}>
          <li>Use a minimum of 8 characters.</li>
          <li>Include a mix of uppercase and lowercase letters, numbers, and special characters.</li>
          <li>Avoid using easily guessable information like your name, birthdate, or common words.</li>
          <li>Do not reuse passwords from other accounts.</li>
        </ul>
        <p>
          Remember to keep your password confidential and never share it with anyone. If you suspect any unauthorized
          access to your account, change your password immediately and contact our support team.
        </p>
      </div>
    </div>
  );
};

export default AccountSettings;