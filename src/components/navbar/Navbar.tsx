'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import styles from './Navbar.module.css';
import Image from 'next/image';
import image1 from '../../../public/back/images.png';
import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible }) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ userId: null, email: null, isAuthenticated: false, role: null });
    router.push('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            
            {/* Profile Dropdown */}
            <li className={styles.dropDown} ref={dropdownRef}>
              <Image
                src={image1}
                alt="Profile"
                height={50}
                width={50}
                className={styles.profileImage}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <ul className={styles.dropDownMenu}>
                  <li className={styles.navItem}>
                    <Link href="/profile">Profile</Link>
                  </li>

                  <li className={styles.navItem}>
                    <Link href="/accountSettings">Settings</Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link href="/help">Help</Link>
                  </li>
                  <li className={styles.navItem}>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                      Log out
                    </button>
                  </li>
                </ul>
              )}
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
