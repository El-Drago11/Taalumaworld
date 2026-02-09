import { Link, useLocation } from 'react-router';
import { Home, BookOpen, FileText, User, CreditCard, Star } from 'lucide-react';

export function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'My Books', path: '/dashboard/my-books' },
    { icon: FileText, label: 'My Chapters', path: '/dashboard/my-chapters' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
    { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
