import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { Provider } from '@/components/providers';
import { Toaster } from '@/components/ui/Toast';
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
      <Provider>
        <html lang='en' className={manrope.variable}>
          <body>
            {children}
            <Toaster />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
};

export default RootLayout;
