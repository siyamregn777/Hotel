import Image from 'next/image';
import image11 from '../../../public/images/DALL·E 2024-12-16 00.14.42 - A breathtaking natural landscape featuring a crystal-clear river flowing through a lush green valley. Majestic mountains rise in the background, with .webp'
import styles from './decide.module.css';
import Link from 'next/link';
const decide =() =>{
    return(
        <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
           <h1>you are in the right place</h1>
          <Image
            src={image11}
            alt="Image 4"
            height={200}
            width={200}
            className={styles.image}
          />
          <div className={styles.overlayContent}>
            <p className={styles.text}>Do you decide to visit? If yes, let`s go!</p>
            <Link href="/about">
              <button type="button" className={styles.overlayButton}>Go</button>
            </Link>
          </div>
        </div>
      </div>
    )
}
export default decide;