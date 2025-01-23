'use client'; // Marking this file as a client component
import { useState } from 'react';
import styles from './upload.module.css'; // Assuming you have CSS in a separate file

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]); // Use non-null assertion since we check for file existence later
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage(data.message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred during upload.');
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h1>Upload Image</h1>
      <form onSubmit={handleUpload} className={styles.uploadForm}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit" className={styles.uploadButton}>Upload</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}