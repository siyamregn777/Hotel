'use client';

import { useState, useEffect, useRef } from 'react'; // Import useRef
import Image from 'next/image';
import styles from './destinations.module.css';
import image1 from '../../../public/uploads/cloud-computing.png';

interface Destination {
  _id: string;
  name: string;
  description: string;
  region: string;
  country: string;
  imagePath?: string; // Cloudinary URL or fallback image
}

export default function DestinationForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch destinations from the database
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch('/api/destinations');
        const data = await response.json();
        if (response.ok) {
          setDestinations(data);
        } else {
          setErrorMessage('Failed to fetch destinations');
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setErrorMessage('An error occurred while fetching destinations');
      }
    }
    fetchDestinations();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Function to trigger file input click
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !description || !region || !country || !image) {
      setErrorMessage('Please fill all the fields!');
      return;
    }

    try {
      // Step 1: Upload image to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', image);
      cloudinaryFormData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
      cloudinaryFormData.append('cloud_name', 'dibfxapqy'); // Replace with your Cloudinary cloud name

      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dibfxapqy/image/upload',
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );

      const cloudData = await cloudinaryResponse.json();
      if (!cloudinaryResponse.ok) throw new Error(cloudData.error.message);

      const imageUrl = cloudData.secure_url; // Get the uploaded image URL

      // Step 2: Send data to backend (including Cloudinary image URL)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('region', region);
      formData.append('country', country);
      formData.append('imagePath', imageUrl);

      // Log the FormData being sent
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch('/api/destinations', {
        method: 'POST',
        body: formData, // No need to set Content-Type header
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert('Destination added successfully!');
      setName('');
      setDescription('');
      setRegion('');
      setCountry('');
      setImage(null);

      // Step 3: Fetch updated destinations
      const res = await fetch('/api/destinations');
      const newDestinations = await res.json();
      setDestinations(newDestinations);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className={styles.display}>
      {/* Image Grid for Displaying Destinations */}
      <div className={styles.imageGrid}>
        <h2 className={styles.imageGridHeading}>Destinations</h2> {/* Added heading */}
        {destinations.length === 0 ? (
          <p>No destinations available.</p>
        ) : (
          destinations.map((destination) => {
            console.log('Image Path:', destination.imagePath); // Log the image path
            return (
              <div key={destination._id} className={styles.destinationItem}>
                <div className={styles.imageContainer}> {/* Wrapper for consistent image size */}
                  <Image
                    src={
                      destination.imagePath?.startsWith('http') ||
                      destination.imagePath?.startsWith('/')
                        ? destination.imagePath
                        : '/default-image.png' // Fallback image
                    }
                    alt={destination.name}
                    width={200}
                    height={150}
                    className={styles.destinationImage}
                  />
                </div>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <span>
                  {destination.region}, {destination.country}
                </span>
              </div>
            );
          })
        )}
      </div>
  
      {/* Form Container */}
      <div className={styles.back}>
        <div className={styles.destination}>
          <h1 className={styles.heading}>Add Your Destination Place For Others To Motivate Them To Come And See Africa</h1>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <form onSubmit={handleSubmit} className={styles.formDestination}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Add a New Destination</legend>
  
              {/* Name, Region, and Country in a horizontal row */}
              <div className={styles.horizontalFields}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className={styles.input}
                  />
                </div>
  
                <div className={styles.fieldGroup}>
                  <label htmlFor="region" className={styles.label}>
                    Region
                  </label>
                  <input
                    id="region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Region"
                    required
                    className={styles.input}
                  />
                </div>
  
                <div className={styles.fieldGroup}>
                  <label htmlFor="country" className={styles.label}>
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    required
                    className={styles.input}
                  />
                </div>
              </div>
  
              {/* Description below the horizontal fields */}
              <div className={styles.fieldGroup}>
                <label htmlFor="description" className={styles.label}>
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  required
                  className={styles.input}
                />
              </div>
  
              {/* Upload Image below the description */}
              <div className={styles.fieldGroup}>
                {/* Clickable Image */}
                <Image 
                  src={image1}
                  alt="image1"
                  height={100}
                  width={100}
                  onClick={handleImageClick} // Add onClick handler
                  style={{ cursor: 'pointer' }} // Change cursor to pointer
                />
                {/* Hidden File Input */}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.input}
                  ref={fileInputRef} // Attach the ref
                  style={{ display: 'none' }} // Hide the file input
                />
                <label htmlFor="image" className={styles.label}>
                  Upload Image
                </label>
              </div>
  
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}