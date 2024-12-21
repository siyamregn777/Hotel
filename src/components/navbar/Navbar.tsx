import Link from 'next/link';
import styles from './Navbar.module.css';

interface User {
  role: 'admin' | 'user'; // Define allowed roles
  username: string;
}

interface NavbarProps {
  user?: User; // The user prop is optional because it might not exist for logged-out users
}
const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && user?.role === 'admin';

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li className={styles.navItem}>
              <Link href="/booking">Booking</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/payments">Payment</Link>
            </li>
          </>
        )}
        <li className={styles.navItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact">Contact</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/important">Visit</Link>
        </li>

        {!isLoggedIn && (
          <li className={styles.navItem}>
            <Link href="/login">Login</Link>
          </li>
        )}

        

        <li className={styles.navItem}>
          <Link href="/activities">Activities</Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/destinations">Destinations</Link>
        </li>

        {isAdmin && (
          <>
            <li className={styles.navItem}>
              <Link href="/manage-destinations">Manage Destinations</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/view-payments">View Payments</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/manage-users">Manage Users</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;