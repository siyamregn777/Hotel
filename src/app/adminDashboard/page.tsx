
'use client'; // Marking this file as a client component
import styles from './adminDashboard.module.css'; // Assuming you have CSS in a separate file
import Link from 'next/link';
export default function AdminDashboard(){
  return(
    <div className={styles.mainn}>
      <Link href="/adminDashboard/register">register</Link>
      <Link href="/adminDashboard/upload">Upload images</Link>
      <Link href="/buy">Buy</Link>
    </div>
  );
}









