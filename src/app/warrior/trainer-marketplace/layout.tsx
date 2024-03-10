'use client';
import { TrainerFilterProvider } from './context/TrainerFilterContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TrainerFilterProvider>{children}</TrainerFilterProvider>;
}
