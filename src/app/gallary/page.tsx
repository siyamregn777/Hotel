import styles from './gallary.module.css';
import image1 from '../../../public/back/pexels-julia-volk-5111049.jpg';
import image2 from '../../../public/back/pexels-stephanlouis-19213653.jpg';
import image3 from '../../../public/back/pexels-shukran-1534548.jpg';
import image4 from '../../../public/back/pexels-rdne-7894899.jpg';
import image5 from '../../../public/back/pexels-sergey-pesterev-69811391-14578422.jpg';
import image6 from '../../../public/back/pexels-quang-vuong-724225078-29854247.jpg';
import image7 from '../../../public/back/pexels-quang-nguyen-vinh-222549-26742943.jpg';
import image8 from '../../../public/back/pexels-julien-goettelmann-44396125-19453661.jpg';
import Image from 'next/image';
const images=[
    { src:image1,alt:"image1",width:300,height:200,},
    {src:image2,alt:"image2",width:300,height:200,},
    {src:image3,alt:"image3",width:300,height:200,},
    {src:image4,alt:"image4",width:300,height:200,},
    {src:image5,alt:"image4",width:300,height:200,},
    {src:image6,alt:"image4",width:300,height:200,},
    {src:image7,alt:"image4",width:300,height:200,},
    {src:image8,alt:"image4",width:300,height:200,},
]
const Gallary =()=>{
    return(
    <div className={styles.middle1}>
      <h2>Our Gallary</h2>
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
    )
}
export default Gallary;