import Header from '@/components/header/Header'; // Import Header
import Footer from '@/components/footer/Footer'; // Import Footer
import styles from './page.module.css'; // Import the CSS module
import Middle1 from './Middle1/page';
import Middle2 from './Middle2/page';
import Middle3 from './Middle3/page';
import Comques from './comques/page';
import Video from 'next-video';
import video2 from '../../videos/1321208-uhd_3840_2160_30fps.mp4';
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Header /> {/* Include Header */}
      <main className={styles.main}>
        <div className={styles.videoContainer}>
          <Video src={video2} autoPlay muted loop controls={false} />
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
      <Footer />
    </div>
  );
}