'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useUser } from '@/context/userContext'; // Import the user context

export default function Login() {
  const { setUser } = useUser(); // Get setUser from UserContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || 'Something went wrong!');
      return;
    }

    const data = await response.json();
    const { token, role } = data;

    // Save the token and role in localStorage or cookies
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Save the role to manage redirection

    setUser({ email, isAuthenticated: true, role }); // Include role when updating the user context

    console.log('Login successful, redirecting...');
    setEmail('');
    setPassword('');

    // Redirect based on the role (admin or user)
    if (role === 'admin') {
      router.push('/adminDashboard'); // Redirect admin to the dashboard
    } else {
      router.push('/'); // Redirect regular user to home page
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginContainer}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
