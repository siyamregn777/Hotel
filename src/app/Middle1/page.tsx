import Image from 'next/image';
import Link from 'next/link';
import styles from './middle1.module.css';

import image1 from '../../../public/back/pexels-carlos-santos-892832-19064811.jpg';
import image2 from '../../../public/back/pexels-67117688-8566670.jpg';
import image3 from '../../../public/back/pexels-arthousestudio-4338021.jpg';
import image4 from '../../../public/back/pexels-catalin-m-1839309-6550285.jpg';
const images = [
  {
    src: image1,
    alt: "Image 1",
    link: "../about",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                  Asperiores vel architecto aut ea, nostrum laborum dolores 
                  voluptatem. Esse neque molestias corrupti inventore voluptatibus, 
                  voluptatum a dignissimos, et atque reprehenderit vero.`,
    width: 300,
    height: 250,
  },
  {
    src: image2,
    alt: "Image 2",
    link: "/page2",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                  Asperiores vel architecto aut ea, nostrum laborum dolores 
                  voluptatem. Esse neque molestias corrupti inventore voluptatibus, 
                  voluptatum a dignissimos, et atque reprehenderit vero.`,
    width: 300,
    height: 150,
  },
  {
    src: image3,
    alt: "Image 3",
    link: "/page3",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                  Asperiores vel architecto aut ea, nostrum laborum dolores 
                  voluptatem. Esse neque molestias corrupti inventore voluptatibus, 
                  voluptatum a dignissimos, et atque reprehenderit vero.`,
    width: 300,
    height: 250,
  },
  {
    src: image4,
    alt: "Image 4",
    link: "/page4",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                  Asperiores vel architecto aut ea, nostrum laborum dolores 
                  voluptatem. Esse neque molestias corrupti inventore voluptatibus, 
                  voluptatum a dignissimos, et atque reprehenderit vero.`,
    width: 300,
    height: 200,
  },
];

const Middle1 = () => {
  return (
    <div className={styles.middle1}>
      <h2>What do you want to see</h2>
      <h6>Ask us!</h6>
      <div className={styles.middle}>
        <ul className={styles.imageList}>
          {images.map((image, index) => (
            <li key={index} className={styles.imageItem}>
              <Link href={image.link}>
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  width={image.width} 
                  height={image.height} 
                  className={styles.image} 
                />
              </Link>
              <p className={styles.imageDescription}>
                {image.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
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
