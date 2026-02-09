import { AdminPanel } from '../admin/AdminPanel';

interface DashboardViewProps {
  onNavigate: (page: 'home' | 'books' | 'categories' | 'authors' | 'about' | 'contact' | 'privacy' | 'terms' | 'faq' | 'dashboard') => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const handleNavigateToWebsite = () => {
    onNavigate('home');
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <AdminPanel 
      onNavigateToWebsite={handleNavigateToWebsite}
      onLogout={handleLogout}
    />
  );
}
