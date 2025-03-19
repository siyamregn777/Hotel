import styles from './middle2.module.css';
import imagge1 from '../../../public/back/Africa_(orthographic_projection).svg.png';
import image2 from '../../../public/back/ostrich.jpg';
import Image from 'next/image';
import Link from 'next/link';

const Middle2 = () => {
  return (
    <div className={styles.middle2}>
      {/* Background image with animation */}
      <div className={styles.backgroundImage}>
        <Image
          src={image2}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Overlay Content */}
      <div className={styles.overlayContainer}>
        {/* Top-left image */}
        <div className={styles.topLeft}>
          <Image
            src={imagge1}
            alt="Overlay Image"
            width={200}
            height={300}
            className={styles.overlayImage}
          />
          <Link href="/important">
            <h3>Visit Africa</h3>
          </Link>
        </div>

        {/* Bottom-right text */}
        <div className={styles.bottomRight}>
          <h1>This is Africa</h1>
          <p>Visit and Enjoy the Moment</p>
          <Link href="/gallary" className={styles.bottom}>
            Show Our Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Middle2;