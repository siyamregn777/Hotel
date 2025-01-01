"use client";
import styles from './Booking.module.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import bgImage from '../../../public/back/pexels-cachi290-29831643 (1).jpg'; // Background image

type ActivityType = 'hiking' | 'sightseeing' | 'diving';
type RoomType = 'vip' | 'normal';

const BookingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        checkInDate: '',
        checkOutDate: '',
        activity: '' as ActivityType,
        participants: 1,
        roomType: '' as RoomType,
        roomNumber: '',
    });
    const [availability, setAvailability] = useState('');
    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const activityPrices = useMemo(() => ({
        hiking: 50,
        sightseeing: 30,
        diving: 100,
    }), []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const handleAvailabilityCheck = async () => {
        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);

        if (!formData.checkInDate || !formData.checkOutDate) {
            setAvailability("Please select both check-in and check-out dates.");
            return;
        } else if (checkOut <= checkIn) {
            setAvailability("Check-out date must be after the check-in date.");
            return;
        }

        // Fetch availability from the API
        const response = await fetch('/api/booking', {
            method: 'POST',
            body: JSON.stringify({
                checkInDate: formData.checkInDate,
                checkOutDate: formData.checkOutDate,
                roomType: formData.roomType,
                roomNumber: formData.roomNumber,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!data.success) {
            setAvailability(data.message);
        } else {
            setAvailability(`Room ${formData.roomNumber} is available from ${formData.checkInDate} to ${formData.checkOutDate}.`);
        }
    };

    const calculateTotalPrice = useCallback(() => {
        const activityPrice = activityPrices[formData.activity as ActivityType] || 0;
        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);

        if (checkIn && checkOut && checkOut > checkIn) {
            const numberOfDays = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
            const total = activityPrice * formData.participants * numberOfDays;
            setPrice(total);
        } else {
            setPrice(0);
        }
    }, [formData.activity, formData.participants, formData.checkInDate, formData.checkOutDate, activityPrices]);

    useEffect(() => {
        calculateTotalPrice();
    }, [calculateTotalPrice]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);

        if (!formData.checkInDate || !formData.checkOutDate || checkOut <= checkIn) {
            setError("Check-out date must be after the check-in date.");
            return;
        }

        const response = await fetch('/api/booking', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.success) {
            setIsModalVisible(true);
        } else {
            setError(data.message);
        }
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${bgImage.src})` }}>
            <div className={styles.header}>
                <h1 className={styles.title}>Adventure Booking</h1>
                <p className={styles.subtitle}>Plan your dream trip with us!</p>
            </div>
            <div className={styles.bookingFormContainer}>
                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className={styles.inputField}
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
                            placeholder="Your Email"
                            className={styles.inputField}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Check-In Date:
                        <input
                            type="date"
                            name="checkInDate"
                            className={styles.inputField}
                            value={formData.checkInDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Check-Out Date:
                        <input
                            type="date"
                            name="checkOutDate"
                            className={styles.inputField}
                            value={formData.checkOutDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Activity:
                        <select
                            name="activity"
                            className={styles.inputField}
                            value={formData.activity}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select an activity</option>
                            <option value="hiking">Hiking</option>
                            <option value="sightseeing">Sightseeing</option>
                            <option value="diving">Diving</option>
                        </select>
                    </label>
                    <label>
                        Room Type:
                        <select
                            name="roomType"
                            className={styles.inputField}
                            value={formData.roomType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select room type</option>
                            <option value="vip">VIP</option>
                            <option value="normal">Normal</option>
                        </select>
                    </label>
                    <label>
                        Room Number:
                        <input
                            type="number"
                            name="roomNumber"
                            className={styles.inputField}
                            value={formData.roomNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Number of Participants:
                        <input
                            type="number"
                            name="participants"
                            className={styles.inputField}
                            value={formData.participants}
                            min="1"
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button
                        type="button"
                        onClick={handleAvailabilityCheck}
                        className={styles.button}
                    >
                        Check Availability
                    </button>
                    <p>{availability}</p>
                    <p>Total Price: ${price.toFixed(2)}</p>
                    <button type="submit" className={styles.submitButton}>
                        Proceed to Payment
                    </button>
                </form>
            </div>
            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Booking Confirmed</h2>
                        <p>Thank you, {formData.name}, for booking your adventure!</p>
                        <button onClick={() => setIsModalVisible(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
