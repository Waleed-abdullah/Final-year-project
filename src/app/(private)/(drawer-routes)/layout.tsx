// app/(private)/layout.tsx
import { getServerSession } from 'next-auth';
import { SessionProvider } from './SessionProvider';
import type { ReactNode } from 'react';

import { DrawerLayout } from './DrawerLayout';

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DrawerLayout>{children}</DrawerLayout>;
}
