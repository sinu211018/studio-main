import { DataProvider } from '@/components/providers/DataProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      {children}
    </DataProvider>
  );
}
