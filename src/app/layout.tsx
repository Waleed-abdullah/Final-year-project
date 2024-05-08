import { ScreenWidthProvider } from './ScreenWidthProvider';
import './global.css';
import ProgressBarProvider from '@/components/ProgressBarProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
          <ScreenWidthProvider>
            <div className='h-screen w-full place-items-center'>{children}</div>{' '}
          </ScreenWidthProvider>
        </ProgressBarProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
