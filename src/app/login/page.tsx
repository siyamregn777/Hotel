'use client'; // Add this line
import Header from '@/components/header/Header';
// import Footer from '@/components/footer/Footer';

import { useState } from 'react';
import styles from './login.module.css'; // Importing CSS module

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Sending user data to the API
    });

    const data = await res.json(); // Getting the response from the server
    console.log(data); // Log the response (either success or error)
  };

  return (
    <div>
       <Header />
    <div className={styles.login}> {/* Use class from CSS module */}
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
        <ul>
          <li><button type="submit" className={styles.button}> {/* Apply styles to button */}
          Login
        </button></li>
            <li> <h5  className={styles.donot}> Dnot have account ?</h5>
            <button type="submit" className={styles.button}> {/* Apply styles to button */}
          sign up
        </button>
            </li>
        </ul>
       
        
      </form>
    </div>
      {/* <Footer/> */}
    </div>
    
  );
}