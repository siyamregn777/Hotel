// src/app/layout.tsx
import Header from '@/components/header/Header'; // Adjust the path as necessary
import Footer from '@/components/footer/Footer'; // Adjust the path as necessary
import './globals.css'; // Optional: Global styles

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}