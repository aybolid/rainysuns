import { Inter } from 'next/font/google';

import './globals.css';
import MainContent from '../components/RootLayout/MainContent';
import Footer from '../components/RootLayout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RainySuns - Weather Forecast',
  description:
    'Get accurate weather information for any location with RainySuns, a user-friendly weather app. Check current weather conditions, forecasts, and more.',
  keywords:
    'rainysuns, rainy suns, weather, forecast, weather app, weather forecast, weather forecasting, weather forecasting app, weather information, weather information app',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainContent>{children}</MainContent>
        <Footer copyYear={new Date().getFullYear().toString()} />
      </body>
    </html>
  );
}
