import { useState, useEffect } from 'react';
import { Home, BookOpen, Book, Clock, User, Settings, Library } from 'lucide-react';
import { cn } from '../ui/utils';
import { DashboardHome } from './DashboardHome';
import { MyChaptersPage } from './MyChaptersPage';
import { MyBooksPage } from './MyBooksPage';
import { ReadingHistory } from './ReadingHistory';
import { ProfilePage } from './ProfilePage';
import { SettingsPage } from './SettingsPage';

interface UserDashboardProps {
  userEmail: string;
  userName: string;
  userPhoto: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  ownedChapters?: string[];
  ownedBooks?: string[];
  readingProgress?: Record<string, number>;
  isAuthenticated?: boolean;
}

type DashboardPage = 'home' | 'my-chapters' | 'my-books' | 'history' | 'profile' | 'settings';

export function UserDashboard({
  userEmail,
  userName,
  userPhoto,
  onNavigate,
  onLogout,
  ownedChapters = [],
  ownedBooks = [],
  readingProgress = {},
  isAuthenticated = false
}: UserDashboardProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('home');
  const [displayMode, setDisplayMode] = useState<'chapters' | 'books'>('chapters');

  // Load display mode from localStorage
  useEffect(() => {
    const loadDisplayMode = () => {
      const savedMode = localStorage.getItem('display-mode');
      if (savedMode === 'books' || savedMode === 'chapters') {
        setDisplayMode(savedMode);
      }
    };

    loadDisplayMode();

    const handleDisplayModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode: 'chapters' | 'books' }>;
      setDisplayMode(customEvent.detail.mode);
    };

    window.addEventListener('display-mode-changed', handleDisplayModeChange as EventListener);

    return () => {
      window.removeEventListener('display-mode-changed', handleDisplayModeChange as EventListener);
    };
  }, []);

  // Navigation items based on display mode
  const navItems = [
    { id: 'profile' as DashboardPage, label: 'Profile', icon: User, show: true },
    { id: 'my-chapters' as DashboardPage, label: 'My Chapters', icon: BookOpen, show: displayMode === 'chapters' },
    { id: 'my-books' as DashboardPage, label: 'My Books', icon: Book, show: displayMode === 'books' },
    { id: 'history' as DashboardPage, label: 'Reading History', icon: Clock, show: true },
    { id: 'settings' as DashboardPage, label: 'Settings', icon: Settings, show: true },
  ].filter(item => item.show);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <DashboardHome
            userName={userName}
            displayMode={displayMode}
            ownedChapters={ownedChapters}
            ownedBooks={ownedBooks}
            readingProgress={readingProgress}
            onNavigate={onNavigate}
            onPageChange={setCurrentPage}
          />
        );
      case 'my-chapters':
        return (
          <MyChaptersPage
            ownedChapters={ownedChapters}
            readingProgress={readingProgress}
            onNavigate={onNavigate}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'my-books':
        return (
          <MyBooksPage
            ownedBooks={ownedBooks}
            readingProgress={readingProgress}
            onNavigate={onNavigate}
          />
        );
      case 'history':
        return (
          <ReadingHistory
            readingProgress={readingProgress}
            displayMode={displayMode}
            onNavigate={onNavigate}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            userEmail={userEmail}
            userName={userName}
            userPhoto={userPhoto}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            onLogout={onLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                        currentPage === item.id
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}