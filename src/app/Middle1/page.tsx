import Image from 'next/image';
import Link from 'next/link';
import styles from './middle1.module.css';
import image1 from '../../../public/images/image1.jpg.webp';
import image2 from '../../../public/images/DALL·E 2024-12-16 00.14.39 - A luxurious and cozy bedroom with a modern design. The room features a large, plush bed with soft, layered bedding in neutral tones, accented by decor.webp';
import image3 from '../../../public/images/DALL·E 2024-12-16 00.14.46 - A serene and picturesque natural scene featuring a flowing river surrounded by lush greenery and vibrant wildflowers. The water sparkles under the sun.webp';
import image4 from '../../../public/images/DALL·E 2024-12-16 00.14.46 - A serene and picturesque natural scene featuring a flowing river surrounded by lush greenery and vibrant wildflowers. The water sparkles under the sun.webp'
const Middle1 = () => {
  return (
    <div className={styles.middle1}>
      <h2>What do you want to see</h2>
      <h6>Ask us!</h6>
      <div className={styles.middle}>
        <ul className={styles.imageList}>
          <li className={styles.imageItem}>
            <Link href="../about">
              <Image 
                src={image1}
                alt="Image 1" 
                width={300} 
                height={250} 
                className={styles.image}
              />
            </Link>
            <p className={styles.imageDescription}>Lorem ipsum dolor sit, amet consectetur <br/>
                                                  adipisicing elit.Asperiores vel architec <br/>
                                                   aut ea,nostrum laborum dolores voluptatem.<br/>
                                                    Esse neque molestias corrupti inventore <br/>
                                                    voluptatibus, voluptatum a dignissimos,et <br/>
                                                     atque reprehenderit vero.</p>
          </li>
          <li className={styles.imageItem}>
            <Link href="/page2">
              <Image 
                src={image2}
                alt="Image 2" 
                width={300} 
                height={150} 
                className={styles.image}
              />
            </Link>
            <p className={styles.imageDescription}>Lorem ipsum dolor sit, amet consectetur <br/>
                                                  adipisicing elit.Asperiores vel architec <br/>
                                                   aut ea,nostrum laborum dolores voluptatem.<br/>
                                                    Esse neque molestias corrupti inventore <br/>
                                                    voluptatibus, voluptatum a dignissimos,et <br/>
                                                     atque reprehenderit vero.</p>          </li>
          <li className={styles.imageItem}>
            <Link href="/page3">
              <Image 
                src={image3}
                alt="Image 3" 
                width={300} 
                height={250} 
                className={styles.image}
              />
            </Link>
            <p className={styles.imageDescription}>Lorem ipsum dolor sit, amet consectetur <br/>
                                                  adipisicing elit.Asperiores vel architec <br/>
                                                   aut ea,nostrum laborum dolores voluptatem.<br/>
                                                    Esse neque molestias corrupti inventore <br/>
                                                    voluptatibus, voluptatum a dignissimos,et <br/>
                                                     atque reprehenderit vero.</p>         
          </li>
          <li>
            <Link href="/page4">
            <Image
              src={image4}
              alt="image4"
              width={300}
              height={200}
              className={styles.image}
            />
            </Link>
            <p className={styles.imageDescription}>Lorem ipsum dolor sit, amet consectetur <br/>
                                                  adipisicing elit.Asperiores vel architec <br/>
                                                   aut ea,nostrum laborum dolores voluptatem.<br/>
                                                    Esse neque molestias corrupti inventore <br/>
                                                    voluptatibus, voluptatum a dignissimos,et <br/>
                                                     atque reprehenderit vero.</p>  
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Middle1;
