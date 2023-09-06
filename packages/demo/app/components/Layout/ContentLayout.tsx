'use client';
import { useAccount } from 'wagmi';
import Unconnected from './Unconnected/Unconnected';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import useMounted from '@/app/hooks/useMounted';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useMounted();
  const { isConnected, address } = useAccount();

  if (!isMounted) {
    return null;
  }

  if (!isConnected) {
    return <Unconnected />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
