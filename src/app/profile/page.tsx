'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Profile.module.css';
import profilePic from '../../../public/back/images.png'; // Default profile image
import type { StaticImageData } from 'next/image';
import { useUser } from '../../context/userContext'; // Import useUser hook

const Profile = () => {
  const { user } = useUser(); // Get the user from context
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | StaticImageData>(profilePic);

  // Fetch the user's profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.email) {
        console.error('Email is missing. Please log in again.');
        return;
      }

      try {
        const response = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`);
        const data = await response.json();
        if (response.ok) {
          setName(`${data.firstName} ${data.lastName}`);
          setUsername(data.username);
          setEmail(data.email);
          setImage(data.image || profilePic); // Use default image if no image is set
        } else {
          console.error('Failed to fetch profile data:', data.message);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfileData();
  }, [user?.email]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!user?.email) {
        console.error('Email is missing. Please log in again.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setImage(data.imageUrl); // Update the image state with the new URL
          alert('Profile image updated successfully!');
        } else {
          console.error('Failed to update profile image:', data.message);
        }
      } catch (err) {
        console.error('Error updating profile image:', err);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!user?.email) {
      console.error('Email is missing. Please log in again.');
      return;
    }

    try {
      const [firstName, lastName] = name.split(' ');

      const response = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, username }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        console.error('Failed to update profile:', data.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
  <div className={styles.profil}>
      
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

        <button className={styles.saveButton} onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  
  </div>  
  );
};

export default Profile;