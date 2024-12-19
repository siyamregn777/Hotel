'use client';
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import styles from './destinations.module.css';
import { useState } from "react";

export default function Destination() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/destinations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, region, country, image }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <Header />
            <div className={styles.destination}>
                <h1>Destination</h1>
                <form onSubmit={handleSubmit} className={styles.formDestination}>
                    <fieldset>
                        <legend>Add a New Destination</legend>

                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            className={styles.input}
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            className={styles.input}
                        />

                        <label htmlFor="region">Region</label>
                        <input
                            id="region"
                            type="text"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            placeholder="Region"
                            required
                            className={styles.input}
                        />

                        <label htmlFor="country">Country</label>
                        <input
                            id="country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            required
                            className={styles.input}
                        />

                        <label htmlFor="image">Image URL</label>
                        <input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                            required
                            className={styles.input}
                        />

                        <button type="submit" className={styles.button}>Add</button>
                    </fieldset>
                </form>
            </div>
            <Footer />
        </div>
    );
}
