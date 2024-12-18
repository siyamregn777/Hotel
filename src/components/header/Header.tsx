import Navbar from '@/components/navbar/Navbar'; // Import Navbar
import styles from './Header.module.css'; // Import CSS module

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Journey</h1>
      <Navbar /> {/* Include Navbar here */}
    </header>
  );
};

export default Header;