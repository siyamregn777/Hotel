'use client';
import { useState } from 'react';
import styles from './middle3.module.css';

interface FAQ {
  question: string;
  answer: string;
}

const Middle3: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    { question: "What is sustainable travel?", answer: "Sustainable travel refers to tourism that minimizes the impact on the environment and supports local communities." },
    { question: "How can I travel more sustainably?", answer: "You can travel more sustainably by using public transportation, reducing waste, and supporting local businesses." },
    { question: "Are there eco-friendly accommodations?", answer: "Yes, many hotels and hostels now offer eco-friendly options, including energy-efficient practices and sustainable sourcing." },
    { question: "What should I pack for a sustainable trip?", answer: "Pack reusable items like water bottles, bags, and utensils, and choose eco-friendly toiletries." },
    { question: "How does my travel choice impact the environment?", answer: "Your travel choices can affect the environment through carbon emissions, waste generation, and resource consumption." },
  ];

  const handleQuestionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.middle3}>
      <h2>Travel Sustainably</h2>
      <h5>Make Mindful Choices as You Travel</h5>
      <p>Frequently Asked Questions</p>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            onClick={() => handleQuestionClick(index)}
          >
            <h3 className={styles.question}>
              {faq.question}
            </h3>
            {openIndex === index && (
              <p className={styles.answer}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Middle3;