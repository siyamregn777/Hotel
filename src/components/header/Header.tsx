'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import styles from './Header.module.css';
import Image from 'next/image';
import image1 from '../../../public/back/Africa_(orthographic_projection).svg.png';

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Image src={image1} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Journey</h1>
        <button className={styles.hamburger} onClick={toggleNavbar}>
          ☰
        </button>
      </div>
      <Navbar isVisible={isNavbarVisible} />
    </header>
  );
};

export default Header;