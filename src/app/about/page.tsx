import styles from './abouts.module.css';
import image1 from '../../../public/back/pexels-jess-vide-4601423.jpg';
import image2 from '../../../public/back/pexels-carlos-santos-892832-19064811.jpg';
import image3 from '../../../public/back/new1pexels-jackson-jacob-143967477-20584923.jpg';
import Image from 'next/image';
import image4 from '../../../public/back/g1.jpg';
import image5 from '../../../public/back/g2.jpg';
import image6 from '../../../public/back/g3.jpg';
import image7 from '../../../public/back/g4.jpg';

const images = [
  { src: image4, alt: "Meareg Tesema", description: "Meareg Tesema, our fearless leader, believes in the power of dreams and dedication." },
  { src: image5, alt: "Teshome Mekonen", description: "Teshome Mekonen, guiding us with his wisdom and passion for adventure." },
  { src: image6, alt: "Siyamregn Yeshi", description: "Siyamregn Yeshi, dedicated to turning your journeys into unforgettable experiences." },
  { src: image7, alt: "Mesifin Alemayehu", description: "Mesifin Alemayehu, creating beautiful moments for travelers to cherish forever." }
];

export default function AboutUs() {
  return (
    <div className={styles.backcolor}>
      {/* Hero Section */}
      <div className={styles.imageWrapper}>
        <Image
          src={image3}
          alt="Our team working together"
          fill
          className={styles.upp}
        />
        <h1 className={styles.image3}>About Us</h1>
      </div>

      {/* Main Content */}
      <main className={styles.container}>
        <p>We are a passionate team, driven by our love for travel and discovery. Our mission is to create meaningful experiences that bring people together.</p>

        {/* First Section */}
        <div className={styles.content}>
          <Image
            src={image1}
            alt="The story of our team"
            width={400}
            height={300}
            className={styles.aboutImage}
          />
          <div className={styles.textSection}>
            <h2>Our Story</h2>
            <p>We started with a dream to help people connect with the world in deeper, more meaningful ways. Our founders, passionate about exploring new places, believe that travel is one of the best ways to learn, grow, and connect with people from all walks of life.</p>
            <h2>Our Mission</h2>
            <p>Our mission is to create unique travel experiences that inspire adventure, spark curiosity, and create lasting memories. We are here to bring the world closer to you and make every journey unforgettable.</p>
            <h2>Our Values</h2>
            <ul>
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Customer Satisfaction</li>
              <li>Sustainability</li>
            </ul>
          </div>
        </div>

        {/* Second Section */}
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2>Our Vision</h2>
            <p>We envision a world where travel is not just a journey, but a way to enrich lives and create lasting bonds between people and cultures. Our goal is to empower travelers to explore the world with confidence and curiosity.</p>
          </div>
          <Image
            src={image2}
            alt="Exploring new horizons"
            width={400}
            height={500}
            className={styles.image2}
          />
        </div>

        {/* Travel Guides Section */}
        <div className={styles.travel}>
          <h1 className={styles.guide}>Our Travel Guides</h1>
          <ul className={styles.immage}>
            {images.map((image, index) => (
              <li key={index} className={styles.imageli}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={150}
                  height={150}
                />
                <p className={styles.description}>{image.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}