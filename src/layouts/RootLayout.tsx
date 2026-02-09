import { Outlet } from 'react-router';
import { Header } from '../components/global/Header';
import { Footer } from '../components/global/Footer';
import { Toaster } from '../components/ui/sonner';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}