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
  { src: image0, alt: 'Ethiopian Timket', description: `Ethiopian Timket, or Epiphany, celebrates Jesus' baptism with colorful processions, music, and water blessings. Pilgrims wear white and gather in communal festivities on January 19 (or 20 in leap years).`, price: `50$` },
  { src: image1, alt: 'Serengeti National Park, Tanzania', description: `Serengeti National Park, Tanzania "Famous for the Great Migration, this vast savannah teems with wildlife."`, price: `30$` },
  { src: image4, alt: 'Pyramids of Giza, Egypt', description: `Pyramids of Giza, Egypt "Ancient wonders that stand as a testament to Egypt's rich history."`, price: `40$` },
  { src: image5, alt: 'Maasai Mara, Kenya', description: `Maasai Mara, Kenya "Home to the Big Five and rich Maasai culture, offering unforgettable safaris."`, price: `20$` },
  { src: image6, alt: 'Ancient Rock Art, Algeria', description: `Ancient Rock Art, Algeria "Fascinating petroglyphs that reveal the continent's prehistoric cultures."`, price: `25$` },
  { src: image7, alt: 'Lake Nakuru, Kenya', description: `Lake Nakuru, Kenya "Famous for its flamingos, this lake is a vibrant spectacle of color."`, price: `15$` },
  { src: image8, alt: 'Okavango Delta, Botswana', description: `Okavango Delta, Botswana "A unique inland delta teeming with diverse wildlife and lush vegetation."`, price: `35$` },
  { src: image9, alt: 'Bazaruto Archipelago, Mozambique', description: `Bazaruto Archipelago, Mozambique "Idyllic islands with pristine beaches and crystal-clear waters for paradise seekers."`, price: `20$` },
  { src: image10, alt: 'Okavango Delta, Botswana', description: `Okavango Delta, Botswana "A unique inland delta teeming with diverse wildlife and lush vegetation."`, price: `30$` },
  { src: image11, alt: 'Sossusvlei Dunes, Namibia', description: `Sossusvlei Dunes, Namibia "Stunning red sand dunes contrasting with white salt pans create surreal landscapes."`, price: `20$` },
  { src: image2, alt: 'Table Mountain, South Africa', description: `Table Mountain, South Africa "An iconic flat-topped mountain offering stunning views of Cape Town."`, price: `27$` },
  { src: image3, alt: 'Victoria Falls, Zambia/Zimbabwe', description: `Victoria Falls, Zambia/Zimbabwe "The breathtaking falls create a misty wonderland, showcasing nature's power."`, price: `34$` },
];

const Important = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Explore Africa</h2>
        <p>Discover the beauty, culture, and adventure of Africa`s most iconic destinations.</p>
      </div>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
                className={styles.image}
                priority={index < 4}
              />
            </div>
            <div className={styles.content}>
              <h3>{image.alt}</h3>
              <p>{image.description}</p>
              <p className={styles.price}>{image.price}</p>
              <Link href="/booking" className={styles.button}>
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Decide />
    </div>
  );
};

export default Important;