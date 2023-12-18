import { ScreenWidthProvider } from './ScreenWidthProvider';
import './global.css';

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
      <body className='h-screen w-screen'>
        <ScreenWidthProvider>{children}</ScreenWidthProvider>
      </body>
    </html>
  );
}
