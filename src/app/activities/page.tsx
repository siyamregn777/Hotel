'use client'; // Marking this file as a client component

import { useState } from 'react';
import styles from './activities.module.css'; 

interface Review {
  comment: string;
  rating: number; // Now this can be a decimal
}

export default function Activities() {
  const [email, setEmail] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(0); // 0-5 rating, allowing decimals

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 && value <= 5) {
      setRating(value);
    } else {
      alert('Rating must be between 0 and 5.');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || rating < 0 || rating > 5) {
      alert('Please provide a valid comment and rating (0-5).');
      return;
    }

    setReviews([...reviews, { comment, rating }]);
    setComment('');
    setRating(0); // Reset rating
  };

  // Helper function to display rating as stars
  const renderRatingStars = (rating: number) => {
    const fullStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
    return fullStars + emptyStars;
  };

  return (
    <div className={styles.container}>
      <h1>Share Your Experience To Others</h1>
      

      <div className={styles.details}>
        <h2>Description</h2>
        <p>
          See the highlights of London via two classic modes of transport on this half-day adventure. First, you will enjoy great views of Westminster Abbey, the Houses of Parliament, and the London Eye, as you meander through the historic streets on board a vintage double-decker bus.
        </p>
        <p>
          Continue to see St. Paul’s Cathedral, where Admirals Nelson and Wellington are buried, and Princess Diana and Prince Charles got married. Then, visit the Tower of London, built nearly 1,000 years ago during the reign of William the Conqueror.
        </p>
        <p>
          Home to the Crown Jewels, the Tower is protected by the famous Beefeaters. Your guide will take you to Traitors Gate, where prisoners entered the Tower for the last time. Next, take a short trip along the River Thames, passing Shakespeare’s Globe, Cleopatra’s Needle, and London Bridge, before arriving at Westminster Pier.
        </p>
        <p>
          Rejoin the bus and head for Buckingham Palace. Make your way to the perfect spot to watch the world-famous Changing of the Guard ceremony.
        </p>

        <h2>What You Will Do</h2>
        <ul>
          <li>Discover London on board a classic Routemaster vintage double-decker bus</li>
          <li>Cruise down the River Thames</li>
          <li>See the Changing of the Guard</li>
          <li>Visit Westminster Abbey</li>
          <li>Listen to the chimes of Big Ben and see the Houses of Parliament</li>
        </ul>

        <h2>What’s Included</h2>
        <p>Includes:</p>
        <ul>
          <li>Double-decker Routemaster tour</li>
          <li>Short trip along the River Thames</li>
          <li>Changing of the Guard</li>
          <li>Gratuities</li>
        </ul>
        <p>Not Includes:</p>
        <ul>
          <li>Double-decker Routemaster tour</li>
          <li>Short trip along the River Thames</li>
          <li>Changing of the Guard</li>
          <li>Gratuities</li>
        </ul>

        <h2>Safety</h2>
        <ul>
          <li>All required protective equipment is provided</li>
          <li>All areas that customers touch are frequently cleaned</li>
          <li>You must keep social distance while in vehicles</li>
          <li>The number of visitors is limited to reduce crowds</li>
        </ul>

        <h2>Customer Reviews</h2>
        <div className={styles.reviews}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <p><strong>{renderRatingStars(review.rating)}</strong> ({review.rating.toFixed(1)})</p>
              <p>“{review.comment}”</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <h2>Add Your Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            placeholder="Add Your experience"
            value={comment}
            onChange={handleCommentChange}
            required
            className={styles.textarea}
          />
          <div>
            <label>Rating:</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={handleRatingChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Submit Review</button>
        </form>
        <h2>Join The Newsletter</h2>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={handleEmailChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>Subscribe</button>
        </form>
      </div>
    </div>
  );
}