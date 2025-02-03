'use client'; 
import { useState, useEffect } from 'react';
import Image from 'next/image';  // Import Image from Next.js
import Link from 'next/link'
// Define the type for an image
type ImageType = {
  _id: string;
  imageUrl: string;
};

export default function ManageImages() {
  const [images, setImages] = useState<ImageType[]>([]);  // Specify the type for images state
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/getImages');
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      } else {
        setMessage('Error fetching images.');
      }
    };
    fetchImages();
  }, []);

  const handleDelete = async (imageId: string) => {
    const response = await fetch(`/api/deleteImage?imageId=${imageId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.success) {
      setMessage('Image deleted successfully!');
      setImages(images.filter(image => image._id !== imageId));
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div>
              <Link href="/adminDashboard" >Dashboard</Link>

      <h2>Manage Images</h2>
      {message && <p>{message}</p>}

      <ul>
        {images.map((image) => (
          <li key={image._id}>
            <div>
              {/* Use Image component from Next.js for automatic image optimization */}
              <Image 
                src={image.imageUrl} 
                alt="Image" 
                width={100} 
                height={100} 
                objectFit="cover" 
              />
              <p>{image._id}</p>
              <button onClick={() => handleDelete(image._id)} className="bg-red-500 text-white p-2 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
