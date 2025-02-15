// src/app/layout.tsx
import { UserProvider } from '../context/userContext'; // Adjust the path as necessary
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css'; // Optional: Global styles

// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}