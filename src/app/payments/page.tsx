'use client';
import styles from './payments.module.css';
import { useState } from "react";
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper';

export default function Payments() {
    const [booking_id, setBooking_id] = useState('');
    const [amount, setAmount] = useState('');
    const [payment_date, setPayment_date] = useState('');
    const [payment_method, setPayment_method] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                booking_id,
                amount,
                payment_date,
                payment_method,
                status,
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <ProtectedPageWrapper>
        <div>
            <div className={styles.payments}>
                <h1 className={styles.payment}>Payment</h1>
                <form onSubmit={handleSubmit} className={styles.payment}>
                    <div className={styles.formGroup}>
                        <label htmlFor="booking_id" className={styles.label}>Booking ID</label>
                        <input
                            id="booking_id"
                            type="text"
                            value={booking_id}
                            onChange={(e) => setBooking_id(e.target.value)}
                            placeholder="Enter Booking ID"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="amount" className={styles.label}>Amount</label>
                        <input
                            id="amount"
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="payment_date" className={styles.label}>Payment Date</label>
                        <input
                            id="payment_date"
                            type="date"
                            value={payment_date}
                            onChange={(e) => setPayment_date(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="payment_method" className={styles.label}>Payment Method</label>
                        <input
                            id="payment_method"
                            type="text"
                            value={payment_method}
                            onChange={(e) => setPayment_method(e.target.value)}
                            placeholder="Enter Payment Method"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="status" className={styles.label}>Status</label>
                        <input
                            id="status"
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            placeholder="Enter Payment Status"
                            required
                            className={styles.input}
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
        </ProtectedPageWrapper>
    );
}