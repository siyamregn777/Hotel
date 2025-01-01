'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
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
    localStorage.setItem('token', data.token);

    console.log('Login successful, redirecting...');
    setEmail('');
    setPassword('');
    router.push('/');
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



































// 'use client'; // Add this line
// import Link from 'next/link';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // For app directory usage
// import styles from './login.module.css'; // Importing CSS module
// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state
//   const router = useRouter(); // Initialize useRouter
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
//     setLoading(true); // Set loading state

//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }), // Sending user data to the API
//     });
//     setLoading(false); // Reset loading state
//     if (!response.ok) {
//       const errorData = await response.json();
//       setError(errorData.message || 'Something went wrong!'); // Set error message
//       return;
//     }
//     const data = await response.json(); // Getting the response from the server
//     console.log(data); // Log the response (either success or error)
//     // Redirect to the homepage on successful login
//     console.log('Login successful, redirecting...');
//     setEmail(''); // Clear input fields
//     setPassword(''); // Clear input fields
//     router.push('/'); // Redirect to the home page immediately
//   };
//   return (
//     <div className={styles.login}>
//       <h1 className={styles.title}>Login</h1>
//       <form onSubmit={handleSubmit} className={styles.loginContainer}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           className={styles.input}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           className={styles.input}
//         />
//         {error && <p className={styles.error} aria-live="assertive">{error}</p>} {/* Display error message */}
//         <ul>
//           <li>
//             <button type="submit" className={styles.createAccountLink} disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </li>
//           <li className={styles.donot}>
//             <h5>Don’t have an account?</h5>
//             <Link href='/signup' className={styles.signup}>
//               <span>Create Account</span>
//             </Link>
//           </li>
//         </ul>
//       </form>
//     </div>
//   );
// }