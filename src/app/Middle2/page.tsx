import styles from './middle2.module.css';
import video1 from '../../../videos/1168716-uhd_3840_2160_30fps.mp4';
import Video from 'next-video';
const Middle2 = () => {
  return (
    <div className={styles.middle2}>
      <div className={styles.videoContainer}>
        <Video
          src={video1}
          autoPlay
          muted
          controls={false} // Hide controls for background video
          loop
          style={{ width: '100%', height: '100%' }} // Make video fill the container
        />
        <div className={styles.overlay}>
          <h1>Your Overlay Text Here</h1>
          <p>Additional text or description can go here.</p>
        </div>
      </div>
    </div>
  );
};

export default Middle2;