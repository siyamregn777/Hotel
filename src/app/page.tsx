'use client'; 
import { useState } from 'react'; // Import useState for managing image state
import styles from './page.module.css'; // Import the CSS module
import Middle1 from './Middle1/page';
import Middle2 from './Middle2/page';
import Middle3 from './Middle3/page';
// import Comques from './comques/page';
import Image from 'next/image';
import image1 from '../../public/back/Africa_(orthographic_projection).svg.png';
import image2 from '../../public/back/pexels-cachi290-29889498.jpg';
import image3 from '../../public/back/pexels-fatih-turan-63325184-26346365.jpg';
import Gallary from './gallary/page';

const images = [
  { src: image1, alt: 'Image 1' },
  { src: image2, alt: 'Image 2' },
  { src: image3, alt: 'Image 3' },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); 

  const handleDotClick = (index: number) => {
    setCurrentIndex(index); 
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src={images[currentIndex].src} // Display the current image
            alt={images[currentIndex].alt}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h1>Welcome to Africa</h1>
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

        <div className={styles.dotsContainer}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => handleDotClick(index)} 
            ></span>
          ))}
        </div>
      </main>

      <Middle1 />
      <Middle2 />
      <Middle3 />
      {/* <Comques /> */}
      <Gallary/>
    </div>
  );
}
