// src/components/header/Header.tsx
import Navbar from '@/components/navbar/Navbar';
import styles from './Header.module.css';
import Image from 'next/image';
import image1 from '../../../public/back/Africa_(orthographic_projection).svg.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <Image
        src={image1}
        alt="Logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>Journey</h1>
      <Navbar /> {/* Include Navbar here */}
    </header>
  );
};

export default Header;