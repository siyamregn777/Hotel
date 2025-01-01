import styles from './abouts.module.css'; // Assuming you have CSS in a separate file
import image1 from '../../../public/back/pexels-jess-vide-4601423.jpg';
import image2 from '../../../public/back/pexels-carlos-santos-892832-19064811.jpg';
import Image from 'next/image';
export default function AboutUs() {
  return (
    <div>
      <main className={styles.container}>
        <h1>About Us</h1>
        <p>Discover our story, mission, and values.</p>
        <div className={styles.content}>
          <Image 
                src={image1}
                alt="Image 1" 
                width={300} 
                height={250} 
                className={styles.aboutImage}
          />
          <div className={styles.textSection}>
            <h2>Our Story</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna 
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
               ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Accusamus perferendis id beatae. Reiciendis laborum cupiditate
               voluptas atque optio porro numquam! Dolores aperiam vel nesciunt!
               Odit odio voluptatem nisi porro illo!</p>
            <h2>Our Values</h2>
            <ul>
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Customer Satisfaction</li>
              <li>Sustainability</li>
            </ul>
          </div>
        </div>
        <div className={styles.text}>
            <h1>Our Goal</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        <div className={styles.first}>
          <div className={styles.text1}>
            <h2>Our Goal</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Nostrum excepturi modi ut deserunt in maiores. Ab molestias 
              possimus eaque numquam consequatur. Enim, libero rem! Mollitia 
              excepturi nesciunt incidunt quibusdam repellat?</p>
          </div>
          <Image
            src={image2}
            alt="image 2"
            width={300}
            height={400}
            className={styles.image2}
          />
        </div>
      </main>
    </div>
  );
}