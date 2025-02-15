import styles from './important.module.css';
import Image from 'next/image';
import Decide from '../decide/decide';
import Link from 'next/link';
import image0 from '../../../public/uploads/ethio1.jpg';
import image1 from '../../../public/uploads/Tanzania.jpg';
import image2 from '../../../public/uploads/south-africa-1982418_1280.jpg';
import image3 from '../../../public/uploads/Victoria Falls, ZambiaZimbabwe.jpg';
import image4 from '../../../public/uploads/egypt-3847177_1280.jpg';
import image5 from '../../../public/uploads/mulher-mocambicana-2252464_1280.jpg';
import image6 from '../../../public/uploads/dunes-5568255_1280.jpg';
import image7 from '../../../public/uploads/flamingos-279991_1280.jpg';
import image8 from '../../../public/uploads/mammal-3151311_1280.jpg';
import image9 from '../../../public/uploads/ocean-241665_1280.jpg';
import image10 from '../../../public/uploads/zebra-6275284_1280.jpg';
import image11 from '../../../public/uploads/namibia-2046776_1280.jpg';

const images = [
  { src: image0, alt: 'Ethiopian Timket', description: `Ethiopian Timket, or Epiphany, celebrates Jesus' baptism with colorful processions, music, and water blessings. Pilgrims wear white and gather in communal festivities on January 19 (or 20 in leap years).` },
  { src: image1, alt: 'Serengeti National Park, Tanzania', description: `Serengeti National Park, Tanzania "Famous for the Great Migration, this vast savannah teems with wildlife."` },
  { src: image2, alt: 'Table Mountain, South Africa', description: `Table Mountain, South Africa "An iconic flat-topped mountain offering stunning views of Cape Town."` },
  { src: image3, alt: 'Victoria Falls, Zambia/Zimbabwe', description: `Victoria Falls, Zambia/Zimbabwe "The breathtaking falls create a misty wonderland, showcasing nature's power."` },
  { src: image4, alt: 'Pyramids of Giza, Egypt', description: `Pyramids of Giza, Egypt "Ancient wonders that stand as a testament to Egypt's rich history."` },
  { src: image5, alt: 'Maasai Mara, Kenya', description: `Maasai Mara, Kenya "Home to the Big Five and rich Maasai culture, offering unforgettable safaris."` },
  { src: image6, alt: 'Ancient Rock Art, Algeria', description: `Ancient Rock Art, Algeria "Fascinating petroglyphs that reveal the continent's prehistoric cultures."` },
  { src: image7, alt: 'Lake Nakuru, Kenya', description: `Lake Nakuru, Kenya "Famous for its flamingos, this lake is a vibrant spectacle of color."` },
  { src: image8, alt: 'Okavango Delta, Botswana', description: `Okavango Delta, Botswana "A unique inland delta teeming with diverse wildlife and lush vegetation."` },
  { src: image9, alt: 'Bazaruto Archipelago, Mozambique', description: `Bazaruto Archipelago, Mozambique "Idyllic islands with pristine beaches and crystal-clear waters for paradise seekers."` },
  { src: image10, alt: 'Okavango Delta, Botswana', description: `Okavango Delta, Botswana "A unique inland delta teeming with diverse wildlife and lush vegetation."` },
  { src: image11, alt: 'Sossusvlei Dunes, Namibia', description: `Sossusvlei Dunes, Namibia "Stunning red sand dunes contrasting with white salt pans create surreal landscapes."` },
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
                <div className={styles.imageContainer}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={200}
                    className={styles.image}
                    priority={index < 4} // Prioritize loading the first 4 images
                  />
                </div>
                <p className={styles.imageDescription}>
                  {image.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <Link href="/booking" className={styles.button}>
                  Visit
                </Link>
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