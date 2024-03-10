import { ScreenWidthProvider } from './ScreenWidthProvider';
import './global.css';
import Providers from '@/components/ProgressBarProvider';

export const metadata = {
  title: 'Waza Fitness',
  description: 'One platform for all your fitness needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <ScreenWidthProvider>{children}</ScreenWidthProvider>
        </Providers>
      </body>
    </html>
  );
}
