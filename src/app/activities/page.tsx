'use client';
import { useState } from 'react';
import Styles from './activities.module.css';

export default function Activities() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null); // To show notifications

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback(null); // Clear previous feedback

        try {
            const response = await fetch('/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, price, duration }),
            });

            if (response.ok) {
                setFeedback('Activity added successfully!');
                setName('');
                setDescription('');
                setPrice('');
                setDuration('');
            } else {
                const errorData = await response.json(); // Log error details if necessary
                setFeedback(`Error: ${errorData.error || 'Failed to add activity.'}`);
            }
        } catch {
            setFeedback('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className={Styles.active}>
            <div className={Styles.activities}>
                <h1 className={Styles.act}>Activities</h1>
                {feedback && <p className={Styles.feedback}>{feedback}</p>} {/* Display feedback */}
                <form onSubmit={handleSubmit} className={Styles.activit}>
                    <div className={Styles.formGroup}>
                        <label htmlFor="name" className={Styles.label}>Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            className={Styles.input}
                        />
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor="description" className={Styles.label}>Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            className={Styles.input}
                        />
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor="price" className={Styles.label}>Price</label>
                        <input
                            id="price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            required
                            className={Styles.input}
                        />
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor="duration" className={Styles.label}>Duration</label>
                        <input
                            id="duration"
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Duration"
                            required
                            className={Styles.input}
                        />
                    </div>
                    <ul>
                        <li>
                            <button type="submit" className={Styles.button}>Submit</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}
