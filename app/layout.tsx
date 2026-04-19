import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AdminProvider } from '@/context/AdminContext';
import { Toaster } from 'sonner';
import AdminFloatingBar from '@/components/AdminFloatingBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Rudakiya Brothers | 100% Lab Grown Diamonds',
  description: '100% Lab Grown Diamonds | Free Shipping | 7-Day Easy Returns. Luxury lab-grown diamond jewelry.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <AdminProvider>
          <Toaster position="bottom-right" richColors />
          <Header />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
          <AdminFloatingBar />
        </AdminProvider>
      </body>
    </html>
  );
}
