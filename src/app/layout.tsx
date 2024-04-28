import { ScreenWidthProvider } from './ScreenWidthProvider';
import './global.css';
import ProgressBarProvider from '@/components/ProgressBarProvider';

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
        <ProgressBarProvider>
          <ScreenWidthProvider>{children}</ScreenWidthProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
