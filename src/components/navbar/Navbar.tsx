import Link from 'next/link';
import styles from './Navbar.module.css'; // Correct import of CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>  {/* Apply styles via styles object */}
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}><Link href="#">About</Link>
          <ul className={styles.dropdown}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/ourstories">Our Stories</Link></li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact">Contact</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/important">Visit</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login">Login</Link> {/* Ensure this path is correct */}
        </li>
        <li className={styles.navItem}>
            <Link href="/booking">Booking</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
