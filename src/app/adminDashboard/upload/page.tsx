'use client';
import { useState } from 'react';
import styles from './upload.module.css';
import Link from 'next/link';

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Image uploaded successfully!');
      } else {
        alert('Error uploading image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <Link href="/adminDashboard" className={styles.dash}>Dashboard</Link>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className={styles.border_rounded}
          required
        />
        <button type="submit" className={styles.uploadd} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
}