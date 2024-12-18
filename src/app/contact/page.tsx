'use client'; // Marking this file as a client component

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useState } from 'react';
import styles from './contact.module.css'; // Assuming you have CSS in a separate file

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <Header />
      <div className={styles.back}>
      <main className={styles.container}>
        <h1>Contact Us</h1>
        <p>Get in touch with us!</p>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
          </label>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
      </main>
      </div>
      <Footer />
    </div>
  );
}