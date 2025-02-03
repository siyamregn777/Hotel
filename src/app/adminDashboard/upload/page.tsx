'use client';
import { useState } from 'react';
import styles from './upload.module.css';
import Link from 'next/link';
export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageUrl', imageUrl);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      alert('Image URL uploaded successfully!');
    } else {
      alert('Error uploading image URL.');
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <Link href="/adminDashboard" className={styles.dash}>Dashboard</Link>
      <form onSubmit={handleUpload}>
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className={styles.border_rounded}
        required
      />
      <button type="submit" className={styles.uploadd}>
        Upload URL
      </button>
    </form>
    </div>
    
  );
}
