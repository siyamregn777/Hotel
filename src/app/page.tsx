
import styles from './page.module.css'; // Import the CSS module
import Middle1 from './Middle1/page';
import Middle2 from './Middle2/page';
import Middle3 from './Middle3/page';
import Comques from './comques/page';
import Image from 'next/image';
import image1 from '../../public/images/pexels-francesco-ungaro-464401.jpg';
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image src={image1}
          alt="imgae1"
          />
          <div className={styles.overlay}>
            <h1>Welcome to Ethiopia</h1>
            <p>Your comfort is our priority.</p>
            <section className={styles.Home}>
              <div className={styles.Home_beauty}>
                <h2 className={styles.h2}>Discover New Horizons: Your Journey Awaits!</h2>
                <h3 className={styles.h3}>Travel with Purpose: Explore, Learn, Connect!</h3>
              </div>
              <button className={styles.getStartedButton}>Get Started</button>
            </section>
          </div>
        </div>
      </main>
      <Middle1 />
      <Middle2 />
      <Middle3 />
      <Comques />
    </div>
  );
}