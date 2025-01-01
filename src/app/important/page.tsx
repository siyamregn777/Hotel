import styles from './important.module.css';
import Image from 'next/image';
import Decide from '../decide/decide';
import Link from 'next/link';
import image0 from '../../../public/back/pexels-julien-goettelmann-44396125-19453661.jpg'
import image1 from '../../../public/back/pexels-julien-goettelmann-44396125-19453660.jpg'
import image2 from '../../../public/back/pexels-julien-goettelmann-44396125-19453587.jpg'
import image3 from '../../../public/back/pexels-cachi290-29831643.jpg'
import image4 from '../../../public/back/pexels-julien-goettelmann-44396125-19453661.jpg'
import image5 from '../../../public/back/pexels-julien-goettelmann-44396125-19453660.jpg'
import image6 from '../../../public/back/pexels-julien-goettelmann-44396125-19453587.jpg'
import image7 from '../../../public/back/pexels-cachi290-29831643.jpg'
import image8 from '../../../public/back/pexels-cachi290-29831643.jpg'
import image9 from '../../../public/back/pexels-cachi290-29831643.jpg'
import image10 from '../../../public/back/pexels-cachi290-29831643.jpg'
import image11 from '../../../public/back/pexels-cachi290-29831643 (1).jpg'


const images = [
  {src: image0,alt: "image1",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Asperiores
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image1,alt: "image1", width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
                   vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image2,alt: "image2",
    width: 300,
    height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image3,alt: "image3",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiore
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image4,alt: "image3",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiore
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image5,alt: "image3",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiore
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image6,alt: "image3",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiore
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image7,alt: "image3",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiore
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image8,alt: "image3",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiore
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image9,alt: "image1",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Asperiores
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image10,alt: "image1",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Asperiores
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
  {src: image11,alt: "image1",width: 300,height: 200,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Asperiores
                  vel architecto aut ea nostrum laborum dolores voluptates.`
  },
];

const Important = () => {
  return (
    <div>
      <div className={styles.middle1}>
      <h2>Visit Africa</h2>
      <div className={styles.middle}>
        <ul className={styles.imageList}>
          {images.map((image, index) => (
            <li key={index} className={styles.imageItem}>
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  width={image.width} 
                  height={image.height} 
                  className={styles.image} 
                />
               <p className={styles.imageDescription}>
                {image.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <Link href="/booking" className={styles.button}>visit</Link>
            </li>
            
          ))}
        </ul>
      </div>
      </div>
      <Decide />
    </div>
  );
};

export default Important;
