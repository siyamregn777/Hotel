'use client';

import styles from './Activity.module.css';

const Activity = () => {
  const favorites = ['Product 1', 'Product 2', 'Product 3'];

  const bookingHistory = [
    { id: 1, item: 'Hotel Reservation - NYC', date: '2024-01-10' },
    { id: 2, item: 'Flight to Paris', date: '2024-02-15' },
  ];

  const recentlyViewed = [
    'Laptop - Dell XPS 15',
    'Smartphone - iPhone 14 Pro',
    'Headphones - Sony WH-1000XM5',
  ];

  return (
    <div className={styles.activityContainer}>
      <h2 className={styles.title}>Activity & Usage</h2>

      {/* Favorites Section */}
      <div className={styles.section}>
        <h3>Favorites & Saved Items</h3>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>

      {/* Booking History */}
      <div className={styles.section}>
        <h3>Order/Booking History</h3>
        {bookingHistory.length > 0 ? (
          <ul>
            {bookingHistory.map((history) => (
              <li key={history.id}>
                {history.item} - <span className={styles.date}>{history.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No booking history available.</p>
        )}
      </div>

      {/* Recently Viewed */}
      <div className={styles.section}>
        <h3>Recently Viewed</h3>
        {recentlyViewed.length > 0 ? (
          <ul>
            {recentlyViewed.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No recently viewed items.</p>
        )}
      </div>
    </div>
  );
};

export default Activity;
