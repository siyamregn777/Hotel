'use client'; // Marking this file as a client component

import { useState } from 'react';
import styles from './contact.module.css'; // Assuming you have CSS in a separate file
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
      const response = await fetch("/api/contact", { // Note: Adjusted the relative path
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
    <div>
       <div className={styles.imageWrapper}>
        {/* Image with responsive layout */}
        <Image
          src={image1}
          alt="Background Image"
          layout="responsive" /* Makes the image responsive */
          height={200} /* Set the height to 200px */
          width={1600} /* Set the width to a large value (to ensure it's wide enough) */
          className={styles.upper}
        />
        {/* "Contact Us" heading positioned on top of the image */}
        <h1 className={styles.contactHeading}>Contact Us</h1>
      </div>
    <div className={styles.back}>
   
      <div className={styles.more}>
        <div className={styles.make}>
        <h1>Any Question`s?,<br />
           Let`s Make Your <br /> Dream Happen</h1>
        <h6>Buy a cup of cooffee,have a seat,<br /> and chat with us about your next big journey</h6>
        </div>
      </div>
      <div className={styles.beuty}>
        <label className={styles.lablle} >
        <ul className={styles.wow}>
            <li> <h1>Phone</h1> 
              <p>+2519000000000</p>
              <p>+2519111111111</p>
            </li>
            <li><h1>Email Us</h1>
              <p>Siyamregnyeshidagna@gmail.com</p>
            </li>
            <li><h1>Opening time</h1>
              <p>Any Time</p>
            </li>
          </ul>
        </label>
      </div>
        <div className={styles.container}>
          <h1 className={styles.ha}>Contact Us</h1>
            
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.horizontalGroup}>
            <p>Reach Us Anytime!</p>
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
              <input 
                type="text"
                name="subject"
                placeholder='Subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.inputt} 
              />
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
    </div>
  );
}