'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Middle1 from './Middle1/page';
import Middle2 from './Middle2/page';
import Middle3 from './Middle3/page';
import Image from 'next/image';
import image1 from '../../public/back/Africa_(orthographic_projection).svg.png';
import image4 from '../../public/papa/pexels-dibert-1301172.jpg';
import image5 from '../../public/papa/pexels-distoreal-3689863.jpg';
import image6 from '../../public/papa/pexels-droosmo-2945595.jpg';
import image7 from '../../public/papa/pexels-gibson-g-wairagu-69813440-13934688.jpg';
import image8 from '../../public/papa/pexels-hugosykes-30705110.jpg';
import image9 from '../../public/papa/pexels-keeganjchecks-10294335.jpg';
import image10 from '../../public/papa/pexels-keeganjchecks-2802903.jpg';
import image11 from '../../public/papa/pexels-keeganjchecks-9730025.jpg';
import image12 from '../../public/papa/pexels-lovetosmile-30327295.jpg';
import image13 from '../../public/papa/pexels-mourad-barkassi-385497466-30320422.jpg';
import image14 from '../../public/papa/pexels-mr-sketch-55235740-31151819.jpg';
import image15 from '../../public/papa/pexels-vika-glitter-392079-31166906.jpg';
import Gallary from './gallary/page';

const images = [
  { src: image1, alt: 'Image 1' },
  { src: image4, alt: 'Image 4' },
  { src: image5, alt: 'Image 5' },
  { src: image6, alt: 'Image 6' },
  { src: image7, alt: 'Image 7' },
  { src: image8, alt: 'Image 8' },
  { src: image9, alt: 'Image 9' },
  { src: image10, alt: 'Image 10' },
  { src: image11, alt: 'Image 11' },
  { src: image12, alt: 'Image 12' },
  { src: image13, alt: 'Image 13' },
  { src: image14, alt: 'Image 14' },
  { src: image15, alt: 'Image 15' },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(images.length - 1);

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex); // Set the previous index
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Update current index
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              className={`${styles.image} ${
                index === currentIndex
                  ? styles.active
                  : index === previousIndex
                  ? styles.previous
                  : ''
              }`}
              priority={index === 0} // Prioritize loading the first image
              fill
            />
          ))}
          <div className={styles.overlay}>
            <h1>Welcome to Africa</h1>
            <p>Your comfort is our priority.</p>
            <section className={styles.Home}>
              <div className={styles.Home_beauty}>
                <h2>Discover New Horizons: Your Journey Awaits!</h2>
                <h3>Travel with Purpose: Explore, Learn, Connect!</h3>
              </div>
              <button className={styles.getStartedButton}>Get Started</button>
            </section>
          </div>
        </div>
      </main>

      <Middle1 />
      <Middle2 />
      <Middle3 />
      <Gallary />
    </div>
  );
}