import styles from './Footer.module.css';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
          <div className={styles.footer_links}>
            <h3> Quick Links</h3>
            <ul className={styles.footlink}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.footinfo}>
            <h3>Contact Us</h3>
            <p>Email: siyamregnyeshidagna777@gmail.com</p>
            <p>Phone: +251961177953</p>
            <p>Address: 123 Business 4kilo, Addis Ababa, Ethiopia</p>
          </div>

          <div className={styles.footsocial}>
            <h3>Follow Us</h3>
              <ul>
                <li><a href="https://www.facebook.com" target="_blank">FaceBook</a></li>
                <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
              </ul>

          </div>
      </div>
      <p className={styles.footbotm}>© 2024 Hotel Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;