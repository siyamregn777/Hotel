'use client'; // Marking this file as a client component
import { useState } from 'react';
import { useRouter } from "next/navigation";
import styles from './register.module.css';
import Link from 'next/link';
export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("The passwords do not match");
      return;
    }

    setError('');
    setSuccess('');

    const response = await fetch('/api/adminRegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccess("Signup successful! Please log in.");
      setTimeout(() => {
        router.push('/adminDashboard/register');
      }, 2000);
      setUsername('');
      setConfirmPassword('');
      setEmail('');
      setPassword('');
    } else {
      setError(data.message || "Signup failed. Please try again.");
    }
  }
  return (
    <div className={styles.sign}>
      <Link href="/adminDashboard" className={styles.dash}>Dashboard</Link>
      <div className={styles.signupContainer}>
        <h1 className={styles.signupTitle}>Register Admin</h1>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}