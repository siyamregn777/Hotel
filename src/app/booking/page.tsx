"use client"; // Ensure this is a client component
import Footer from '@/components/footer/Footer';
import styles from './Booking.module.css';
import Header from '@/components/header/Header';
import { useState } from 'react';
const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        activity: '',
        participants: 1,
    });
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Booking submitted! Proceeding to payment...');
    };

    return (
        <div>
            <Header />
            <div className={styles.Booking}>
                <h1>Book Your Adventure</h1>
                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Activity:
                        <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>
                                Select an activity
                            </option>
                            <option value="hiking">Hiking</option>
                            <option value="sightseeing">Sightseeing</option>
                            <option value="diving">Diving</option>
                        </select>
                    </label>
                    <label>
                        Number of Participants:
                        <input
                            type="number"
                            name="participants"
                            value={formData.participants}
                            min="1"
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <button type="submit" className={styles.submitButton}>
                        Proceed to Payment
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Booking;
