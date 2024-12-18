'use client';
import { useState } from "react";
import Styles from "./activities.module.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Activities() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, price, duration }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <Header />
            <div className={Styles.activities}>
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
            <Footer />
        </div>
    );
}
