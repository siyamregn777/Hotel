'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible }) => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ email: null, isAuthenticated: false, role: null });
    router.push('/login');
  };

  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.visible : ''}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact">Contact</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/important">Visit</Link>
        </li>
        {user.isAuthenticated && (
          <>
            <li className={styles.navItem}>
              <Link href="/activities">Activities</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/booking">Booking</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/destinations">Destinations</Link>
            </li>
            {user.role === 'admin' && (
              <li className={styles.navItem}>
                <Link href="/adminDashboard">AdminDashboard</Link>
              </li>
            )}
            <li className={styles.navItem}>
              <Link href="/payments">Payment</Link>
            </li>
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        )}
        {!user.isAuthenticated && (
          <li className={styles.navItem}>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;