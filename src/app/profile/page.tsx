'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Profile.module.css';
import profilePic from '../../../public/back/images.png'; // Default profile image
import type { StaticImageData } from 'next/image';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe123');
  const [email] = useState('johndoe@example.com'); 
  const [image, setImage] = useState<string | StaticImageData>(profilePic); 

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Profile Information</h2>

      {/* Profile Image Upload */}
      <div className={styles.imageContainer}>
        <Image src={image} alt="Profile" width={120} height={120} className={styles.profileImage} />
        <input type="file" id="fileInput" className={styles.fileInput} onChange={handleImageChange} />
        <label htmlFor="fileInput" className={styles.uploadButton}>Change Photo</label>
      </div>

      {/* Profile Details */}
      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={styles.infoItem}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className={styles.infoItem}>
          <label>Email:</label>
          <input type="email" value={email} disabled />
        </div>

        <button className={styles.saveButton}>Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;
