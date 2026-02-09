import { Outlet } from 'react-router';
import { Header } from '../components/global/Header';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Toaster } from '../components/ui/sonner';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}