'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import styles from './Header.module.css';
import Image from 'next/image';
import image1 from '../../../public/back/Africa_(orthographic_projection).svg.png';
import Link from 'next/link';
const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/"><Image src={image1} alt="Logo" className={styles.logo} /></Link>
        
        <h1 className={styles.title}>Journey</h1>
      </div>
      <Navbar isVisible={isNavbarVisible} />
      <button className={styles.hamburger} onClick={toggleNavbar}>
        ☰
      </button>
    </header>
  );
};

export default Header;