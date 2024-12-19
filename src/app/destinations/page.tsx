'use client';
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import styles from './destinations.module.css';
import { useState } from "react";

export default function  Destination  (){
    const [name ,setName]=useState('');
    const [description, setDescription]=useState('');
    const [region ,setRegion] = useState('');
    const [country ,setCountry] = useState('');
    const [image ,setImage] = useState('');

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const response = await fetch ('/api/destinations',{
            method: 'POST',
            headers :{
                'content-Type':'application/JSON',
            },
            body:JSON.stringify({name,description,region,country,image}),
        })
        const data = await response.json();
        console.log(data);
    }
    return (
        <div>
        <Header/>
            <div className={styles.destinatation}>
                <h1>destinatation</h1>
                <form onSubmit={handleSubmit} className={styles.fromdestinat}>
                    <input type="text" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder="name"
                    required
                    className={styles.input}
                    />
                    <input type="text"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="description"
                    required
                    className={styles.input}
                    />
                    <input type="text" 
                    value={region}
                    onChange={(e)=>setRegion(e.target.value)}
                    placeholder="region"
                    required
                    className={styles.input}
                    />
                    <input type="text" 
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                    placeholder="country"
                    required
                    className={styles.input}
                    />
                    <input type="text"
                    value={image}
                    onChange={(e)=>setImage(e.target.value)}
                    required
                    className={styles.input} />
                </form>
            </div>
        <Footer/>
        </div>
    )
}
