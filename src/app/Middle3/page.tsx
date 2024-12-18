'use client'; // Add this line at the top to mark the component as a Client Component

import { useState } from 'react'; // Import useState from React
import styles from './middle3.module.css';

interface FAQ {
  question: string;
  answer: string;
}

const Middle3: React.FC = () => {
  // State to track which question is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Sample FAQs
  const faqs: FAQ[] = [
    { question: "What is sustainable travel?", answer: "Sustainable travel refers to tourism that minimizes the impact on the environment and supports local communities." },
    { question: "How can I travel more sustainably?", answer: "You can travel more sustainably by using public transportation, reducing waste, and supporting local businesses." },
    { question: "Are there eco-friendly accommodations?", answer: "Yes, many hotels and hostels now offer eco-friendly options, including energy-efficient practices and sustainable sourcing." },
    { question: "What should I pack for a sustainable trip?", answer: "Pack reusable items like water bottles, bags, and utensils, and choose eco-friendly toiletries." },
    { question: "How does my travel choice impact the environment?", answer: "Your travel choices can affect the environment through carbon emissions, waste generation, and resource consumption." },
  ];
  // Function to handle question click
  const handleQuestionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the answer visibility
  };
  return (
    <div className={styles.middle3}>
      <h2>Travel Sustainably</h2>
      <h5>Make Mindful Choices as You Travel</h5>
      <p>Frequently Asked Questions</p>
      <div className={styles.faqContainer}>
        {faqs.map((faq: FAQ, index: number) => (
          <div key={index} className={styles.faqItem}>
            <h3 onClick={() => handleQuestionClick(index)} className={styles.question}>
              {faq.question}
            </h3>
            {openIndex === index && <p className={styles.answer}>{faq.answer}</p>} {/* Display answer if the question is clicked */}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Middle3;