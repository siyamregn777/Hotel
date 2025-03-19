import Image from 'next/image';
import Link from 'next/link';
import styles from './middle1.module.css';

import image1 from '../../../public/images/ethiopia1.jpg';
import image2 from '../../../public/images/egy1.jpg';
import image3 from '../../../public/images/congo1.jpg';
import image4 from '../../../public/images/sothAfrica1.jpg';

const images = [
  {
    src: image1,
    alt: "Image 1",
    link: "../important",
    description: `Ethiopia - Timket is celebrated on January 19th, honoring the baptism of Jesus with vibrant processions. This festival features priests in traditional attire and reenactments, showcasing rich cultural heritage and Orthodox traditions.`,
  },
  {
    src: image2,
    alt: "Image 2",
    link: "../important",
    description: `Egypt - Ancient Egypt thrived along the Nile for over 3,000 years. Known for its iconic pyramids and Sphinx, it features advanced knowledge and rich mythology. The legacy of divine Pharaohs continues to fascinate historians and travelers alike.`,
  },
  {
    src: image3,
    alt: "Image 3",
    link: "../important",
    description: `Congo - The Congo, home to the vast river, boasts rich biodiversity and vibrant cultures. Known for lush rainforests, it is a haven for wildlife like gorillas. Visitors can explore stunning parks such as Virunga and Kahuzi-Biega.`,
  },
  {
    src: image4,
    alt: "Image 4",
    link: "../important",
    description: `South Africa - This diverse nation is known for stunning landscapes and rich cultural heritage. Highlights include Table Mountain and Kruger National Park, renowned for wines and cuisine, along with the scenic Garden Route attracting many travelers.`,
  },
];

const Middle1 = () => {
  return (
    <div className={styles.middle1}>
      <h2>Featured Destinations</h2>
      <h6>Ask us!</h6>
      <div className={styles.middle}>
        <ul className={styles.imageList}>
          {images.map((image, index) => (
            <li key={index} className={styles.imageItem}>
              <Link href={image.link}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className={styles.image}
                />
              </Link>
              <p className={styles.imageDescription}>
                {image.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.trim()}
                    <br />
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Middle1;