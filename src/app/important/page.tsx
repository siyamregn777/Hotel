import styles from './important.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Decide from '../decide/decide';
import image0 from '../../../public/images/DALL·E 2024-12-16 00.14.42 - A breathtaking natural landscape featuring a crystal-clear river flowing through a lush green valley. Majestic mountains rise in the background, with .webp';
import image1 from '../../../public/images/DALL·E 2024-12-16 00.14.39 - A luxurious and cozy bedroom with a modern design. The room features a large, plush bed with soft, layered bedding in neutral tones, accented by decor.webp';
import image2 from '../../../public/images/DALL·E 2024-12-16 00.14.42 - A breathtaking natural landscape featuring a crystal-clear river flowing through a lush green valley. Majestic mountains rise in the background, with .webp';
import image3 from '../../../public/images/DALL·E 2024-12-16 00.14.46 - A serene and picturesque natural scene featuring a flowing river surrounded by lush greenery and vibrant wildflowers. The water sparkles under the sun.webp';

const Important = () => {
    return (
        <div>
            <Header />
            <div className={styles.important}>
                <h1 className={styles.title}>Begin from Here</h1>
                <div className={styles.imageorder}>
                    <ul className={styles.important1}>
                        <li className={styles.important2}>
                            <Image src={image0}
                                alt="Image 1"
                                width={300}
                                height={250}
                                className={styles.image} />
                            <h3 className={styles.imageDescription}>visit lalibela</h3>
                            <p className={styles.imageDescription1}>Lorem ipsum dolor sit, amet consectetur <br />
                                dfga dipisicing elit.Asperiores vel archite <br />
                                aut ea,nostrum laborum dolores voluptat.<br />
                                Esse neque molestias corrupti inventore <br />
                                voluptatibus, voluptatum a dignissimos, <br />
                                atque reprehenderit fg ererhj eter fvero.</p>
                            <h2 className={styles.buttumm}>
                                <Link href="../about">
                                    <button>show More</button>
                                </Link>
                            </h2>
                        </li>
                        <li className={styles.important2}>
                            <Image src={image1}
                                alt="Image 1"
                                width={300}
                                height={250}
                                className={styles.image} />
                            <h3 className={styles.imageDescription}>visit lalibela</h3>
                            <p className={styles.imageDescription1}>Lorem ipsum dolor sit, amet consectetur <br />
                                dfga dipisicing elit.Asperiores vel archite <br />
                                aut ea,nostrum laborum dolores voluptat.<br />
                                Esse neque molestias corrupti inventore <br />
                                voluptatibus, voluptatum a dignissimos, <br />
                                atque reprehenderit fg ererhj eter fvero.</p>
                            <h2 className={styles.buttumm}>
                                <Link href="../about">
                                    <button>show More</button>
                                </Link>
                            </h2>
                        </li>
                        <li className={styles.important2}>
                            <Image src={image2}
                                alt="Image 1"
                                width={300}
                                height={250}
                                className={styles.image} />
                            <h3 className={styles.imageDescription}>visit lalibela</h3>
                            <p className={styles.imageDescription1}>Lorem ipsum dolor sit, amet consectetur <br />
                                dfga dipisicing elit.Asperiores vel archite <br />
                                aut ea,nostrum laborum dolores voluptat.<br />
                                Esse neque molestias corrupti inventore <br />
                                voluptatibus, voluptatum a dignissimos, <br />
                                atque reprehenderit fg ererhj eter fvero.</p>
                            <h2 className={styles.buttumm}>
                                <Link href="../about">
                                    <button>show More</button>
                                </Link>
                            </h2>
                        </li>
                        <li className={styles.important2}>
                            <Image src={image3}
                                alt="Image 1"
                                width={300}
                                height={250}
                                className={styles.image} />
                            <h3 className={styles.imageDescription}>visit lalibela</h3>
                            <p className={styles.imageDescription1}>Lorem ipsum dolor sit, amet consectetur <br />
                                dfga dipisicing elit.Asperiores vel archite <br />
                                aut ea,nostrum laborum dolores voluptat.<br />
                                Esse neque molestias corrupti inventore <br />
                                voluptatibus, voluptatum a dignissimos, <br />
                                atque reprehenderit fg ererhj eter fvero.</p>
                            <h2 className={styles.buttumm}>
                                <Link href="../about">
                                    <button>show More</button>
                                </Link>
                            </h2>
                        </li>
                    </ul>
                </div>
            </div>
            <Decide/>
            <Footer />
        </div>
    );
};

export default Important;