import Navbar from '@/components/navbar/Navbar'; // Import Navbar
import styles from './Header.module.css'; // Import CSS module
import Image from 'next/image';
import image1 from '../../../public/images/DALL·E 2024-12-21 14.56.08 - A professional and modern logo design for a tourism company, featuring elements like mountains, a globe, and a travel suitcase. The color palette shou.webp';
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
