import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Stack } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crishika - Empowering Agriculture Education',
  description:
    'Crishika - Empowering Agriculture Education | Access a vast collection of unique multiple-choice questions, practice at your own pace, and track your performance for comprehensive learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Stack justifyContent="space-between" minHeight="100vh">
          <Header />
          {children}
          <Footer />
        </Stack>
      </body>
    </html>
  );
}
