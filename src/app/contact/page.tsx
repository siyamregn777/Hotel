'use client'; // Marking this file as a client component

import { useState } from 'react';
import styles from './contact.module.css'; // Assuming you have CSS in a separate file
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject:'',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("../api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Your message has been sent!");
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred, please try again.");
    }
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className={styles.back}>
        <div className={styles.container}>
          <h1 className={styles.ha}>Contact Us</h1>
          <p>Get in touch with us!</p>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.horizontalGroup}>
              <ul className={styles.devv}>
              <li className={styles.lii}>
              <label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
              </li>
              </ul>
            </div>
            <label>
              <input type="text"
                name="subject"
                placeholder='Subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.inputt} />
            </label>
            
            <label>
              <textarea
                name="message"
                placeholder='Message'
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textarea}
              />
            </label>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
    </div>
  );
}
