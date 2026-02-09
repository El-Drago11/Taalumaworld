import { Outlet } from 'react-router';
import { Toaster } from '../components/ui/sonner';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <Outlet />
      <Toaster />
    </div>
  );
}