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
      <body
        style={{
          height: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
