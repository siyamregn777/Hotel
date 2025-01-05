'use client'; // Marking this file as a client component

import { useState } from 'react';
import styles from './activities.module.css'; // Assuming you have CSS in a separate file

export default function Activities() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/activities", { // Adjust the path as necessary
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Activity added successfully!");
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error sending activity:", error);
      alert("An error occurred, please try again.");
    }
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
    });
  };

  return (
    <div className={styles.back}>
        <div className={styles.container}>
          <h1 className={styles.ha}>Add Activity</h1>
          <p>Provide the details of the new activity!</p>
          <form onSubmit={handleSubmit} className={styles.activityForm}>
            <label>
              <input
                type="text"
                name="name"
                placeholder="Activity Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              <textarea
                name="description"
                placeholder='Activity Description'
                value={formData.description}
                onChange={handleChange}
                required
                className={styles.textarea}
              />
            </label>
            <label>
              <input
                type="text"
                name="price"
                placeholder='Price'
                value={formData.price}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              <input
                type="text"
                name="duration"
                placeholder='Duration (in minutes)'
                value={formData.duration}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <button type="submit" className={styles.submitButton}>Add Activity</button>
          </form>
        </div>
    </div>
  );
}