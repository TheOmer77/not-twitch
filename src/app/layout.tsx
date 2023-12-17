import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { clerkTheme } from '@/constants/clerkTheme';
import './styles/index.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-family',
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: 'NotTwitch',
  description: 'This is definitely not Twitch.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={clerkTheme}>
      <html lang='en' className={manrope.variable}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
