'use client';

import { useState } from 'react';
import styles from './destinations.module.css';

export default function Destination() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !region || !country ) {
      alert("Please fill all the fields!");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('region', region);
    formData.append('country', country);

    try {
      const response = await fetch('/api/destinations', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Response from API:', data);

      if (response.ok) {
        if (data.success) {
          alert('Destination added successfully!');
          // Reset form fields
          setName('');
          setDescription('');
          setRegion('');
          setCountry('');
        } else {
          alert(`Error: ${data.message}`);
        }
      } else {
        throw new Error('Failed to add destination');
      }
    } catch (error: unknown) {
      console.error('Error during form submission:', error);

      if (error instanceof Error) {
        alert(`An error occurred while submitting the form. Details: ${error.message}`);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className={styles.back}>
      <div className={styles.destination}>
        <h1 className={styles.heading}>Add Destination</h1>
        <form onSubmit={handleSubmit} className={styles.formDestination}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Add a New Destination</legend>

            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className={styles.input}
            />

            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              className={styles.input}
            />

            <label htmlFor="region" className={styles.label}>Region</label>
            <input
              id="region"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
              required
              className={styles.input}
            />

            <label htmlFor="country" className={styles.label}>Country</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
              className={styles.input}
            />

            <button type="submit" className={styles.button}>Add</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}