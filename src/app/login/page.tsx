// src/app/login/page.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useUser } from '@/context/userContext'; // Import the user context

export default function Login() {
  const { setUser } = useUser(); // Get setUser from UserContext
  const [username, setUsername] = useState(''); // Use username instead of email
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username instead of email
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const data = await response.json();
      const { token, role } = data;

      // Save the token and role in localStorage or cookies
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Save the role to manage redirection

      // Update user context
      setUser({ userId: data.userId, email, isAuthenticated: true, role });

      console.log('Login successful, redirecting...');
      setUsername('');
      setPassword('');
      setEmail('');

      // Redirect based on the role (admin or user)
      if (role === 'admin') {
        router.push('/adminDashboard'); // Redirect admin to the dashboard
      } else {
        router.push('/'); // Redirect regular user to home page
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred during login.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginContainer}>
        <input
          type="text" // Use text instead of email for username
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username" // Change placeholder to "Username"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        {error && <p className={styles.error} aria-live="assertive">{error}</p>}
        <ul>
          <li>
            <button type="submit" className={styles.createAccountLink} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </li>
          <li className={styles.donot}>
            <h5>Don’t have an account?</h5>
            <Link href="/signup" className={styles.signup}>
              <span>Create Account</span>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}