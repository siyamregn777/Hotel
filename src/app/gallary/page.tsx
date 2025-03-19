import styles from './gallary.module.css';
import image1 from '../../../public/gallary/africa-1283673_1280.jpg';
import image2 from '../../../public/gallary/africa-5135407_1280.jpg';
import image3 from '../../../public/gallary/birds-1099071_1280.jpg';
import image4 from '../../../public/gallary/dog-8246868_1280.jpg';
import image5 from '../../../public/gallary/duiker-island-2076042_1280.jpg';
import image6 from '../../../public/gallary/giraffes-1330814_1280.jpg';
import image7 from '../../../public/gallary/group-3137670_1280.jpg';
import image8 from '../../../public/gallary/man-7771583_1280.jpg';
import image9 from '../../../public/gallary/meerkat-8345747_1280.jpg';
import image10 from '../../../public/gallary/morocco-4030733_1280.jpg';
import image11 from '../../../public/gallary/namibia-2049203_1280.jpg';
import image12 from '../../../public/gallary/penguins-4668754_1280.jpg';
import Image from 'next/image';

const images = [
  { src: image1, alt: 'Africa Landscape', width: 300, height: 200 },
  { src: image2, alt: 'African Wildlife', width: 300, height: 200 },
  { src: image3, alt: 'Birds in Africa', width: 300, height: 200 },
  { src: image4, alt: 'Dog in Africa', width: 300, height: 200 },
  { src: image5, alt: 'Duiker Island', width: 300, height: 200 },
  { src: image6, alt: 'Giraffes', width: 300, height: 200 },
  { src: image7, alt: 'Group of People', width: 300, height: 200 },
  { src: image8, alt: 'Man in Africa', width: 300, height: 200 },
  { src: image9, alt: 'Meerkat', width: 300, height: 200 },
  { src: image10, alt: 'Morocco Landscape', width: 300, height: 200 },
  { src: image11, alt: 'Namibia Landscape', width: 300, height: 200 },
  { src: image12, alt: 'Penguins', width: 300, height: 200 },
];

const Gallary = () => {
  return (
    <div className={styles.middle1}>
      <h2>Our Gallery</h2>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gallary;