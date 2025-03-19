'use client';

import { useState } from 'react';
import styles from './contact.module.css';
import image1 from '../../../public/back/new pexels-67117688-8566670.jpg';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Your message has been sent!');
      } else {
        alert('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred, please try again.');
    }
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className={styles.imageWrapper}>
        <Image
          src={image1}
          alt="Background Image"
          fill
          className={styles.upper}
        />
        <h1 className={styles.contactHeading}>Contact Us</h1>
      </div>

      {/* Main Content */}
      <div className={styles.back}>
        <div className={styles.more}>
          <div className={styles.make}>
            <h1>Any Questions?</h1>
            <h6>Let&apos;s make your dream journey happen. Buy a cup of coffee, have a seat, and chat with us about your next big adventure.</h6>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.beuty}>
          <label className={styles.lablle}>
            <ul>
              <li>
                <h1>Phone</h1>
                <p>+2519000000000</p>
                <p>+2519111111111</p>
              </li>
              <li>
                <h1>Email Us</h1>
                <p>Siyamregnyeshidagna@gmail.com</p>
              </li>
              <li>
                <h1>Opening Time</h1>
                <p>Any Time</p>
              </li>
            </ul>
          </label>
        </div>

        {/* Contact Form */}
        <div className={styles.container}>
          <h1 className={styles.ha}>Reach Us Anytime!</h1>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.horizontalGroup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.inputt}
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}