"use client";
import styles from './Booking.module.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
// import bgImage from '../../../public/back/pexels-cachi290-29831643 (1).jpg'; // Background image
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper';
import Link from 'next/link';

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const handleRoomNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData({ ...formData, roomNumber: value });
        setError(''); // Clear error on input change
    };

    const handleAvailabilityCheck = async () => {
        const roomNumber = parseInt(formData.roomNumber, 10);

        // Check if the room number is valid based on the selected room type
        if (formData.roomType === 'normal' && (roomNumber < 30 || roomNumber > 50)) {
            setError("Room number must be between 30 and 50 for Normal Room.");
            return; // Prevent further processing if room number is invalid
        } else if (formData.roomType === 'vip' && (roomNumber < 1 || roomNumber > 29)) {
            setError("Room number must be between 1 and 29 for VIP Room.");
            return; // Prevent further processing if room number is invalid
        }

        // Proceed with availability check if room number is valid
        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);
        if (!formData.checkInDate || !formData.checkOutDate) {
            setAvailability("Please select both check-in and check-out dates.");
            return;
        } else if (checkOut <= checkIn) {
            setAvailability("Check-out date must be after the check-in date.");
            return;
        }

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

    const validateRoomNumber = useCallback(() => {
        const roomNumber = parseInt(formData.roomNumber, 10);
        if (formData.roomType === 'normal' && (roomNumber < 30 || roomNumber > 50)) {
            setError("Room number must be between 30 and 50 for Normal Room.");
            return false;
        } else if (formData.roomType === 'vip' && (roomNumber < 1 || roomNumber > 29)) {
            setError("Room number must be between 1 and 29 for VIP Room.");
            return false;
        }
        return true;
    }, [formData.roomNumber, formData.roomType]);

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

        if (!validateRoomNumber()) {
            return; // Prevent submission if room number is invalid
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

    // Check if all fields are filled
    const isFormValid = useMemo(() => {
        return Object.values(formData).every(value => value !== '') && validateRoomNumber();
    }, [formData, validateRoomNumber]); // Added validateRoomNumber to dependencies

    return (
        <ProtectedPageWrapper>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <div className={styles.overlay}></div>
                    <div className={styles.imageContent}>
                        <h1 className={styles.title}>Adventure Booking</h1>
                        <p className={styles.subtitle}>Plan your dream trip with us!</p>
                    </div>
                </div>
                <div className={styles.bookingSection}>
                    <form onSubmit={handleSubmit} className={styles.bookingForm}>
                        <h2>Book Your Adventure</h2>
                        <div className={styles.formGroup}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                Check-In Date:
                                <input
                                    type="date"
                                    name="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                Check-Out Date:
                                <input
                                    type="date"
                                    name="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                Activity:
                                <select
                                    name="activity"
                                    value={formData.activity}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>Select an activity</option>
                                    <option value="hiking">Only Tour</option>
                                    <option value="sightseeing">Tour and Food</option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                Room Type:
                                <select
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>Select room type</option>
                                    <option value="vip">VIP</option>
                                    <option value="normal">Normal</option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                Room Number:
                                <input
                                    type="number"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleRoomNumberChange}
                                    required
                                />
                                {formData.roomType && (
                                    <small>Room number should be between {formData.roomType === 'normal' ? '30 and 50' : '1 and 29'}.</small>
                                )}
                            </label>
                        </div>
                        <div className={styles.formGroup}>
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
                        </div>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        <button
                            type="button"
                            onClick={handleAvailabilityCheck}
                            className={styles.button}
                        >
                            Check Availability
                        </button>
                        <p className={styles.availability}>{availability}</p>
                        <p className={styles.price}>Total Price: <span>${price.toFixed(2)}</span></p>
                        <Link 
                            href={isFormValid ? "/payments" : "#"} 
                            className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ''}`}
                        >
                            <span>Proceed to Payment</span>
                        </Link>
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
        </ProtectedPageWrapper>
    );
};

export default BookingPage;