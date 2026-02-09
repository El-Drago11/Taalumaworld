import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectIsAuthenticated } from './store/slices/authSlice';
import { useGetAllBooksQuery } from './store/api/booksApi';
import { useGetAllChaptersQuery } from './store/api/chaptersApi';
import { useGetAuthorsQuery } from './store/api/authorsApi';
import { toast } from 'sonner@2.0.3';

// Original Components
import { WebsiteView } from './components/website/WebsiteView';
import { UserDashboard } from './components/user-dashboard/UserDashboard';
import { DashboardView } from './components/dashboard/DashboardView';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { FAQPage } from './components/pages/FAQPage';
import { SignInPage } from './components/auth/SignInPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { LoginRequiredModal } from './components/auth/LoginRequiredModal';
import { Header } from './components/global/Header';
import { Footer } from './components/global/Footer';
import { Toaster } from './components/ui/sonner';
import { ReadingViewer } from './components/reading/ReadingViewer';
import { MyBooks } from './components/website/MyBooks';
import { MyChapters } from './components/website/MyChapters';
import { CartPage } from './components/website/CartPage';
import { CheckoutPage } from './components/website/CheckoutPage';
import DesignSystemPage from './pages/DesignSystemPage';
import { useCart } from './hooks/useCart';
import { useContentMode } from './hooks/useContentMode';

type PageType = 'home' | 'books' | 'categories' | 'authors' | 'about' | 'contact' | 'privacy' | 'terms' | 'faq' | 'dashboard' | 'admin-dashboard' | 'my-books' | 'my-chapters' | 'cart' | 'checkout' | 'signin' | 'signup' | 'forgot-password';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // RTK Query hooks
  const { data: books = [] } = useGetAllBooksQuery();
  const { data: chapters = [] } = useGetAllChaptersQuery();
  const { data: authors = [] } = useGetAuthorsQuery();
  
  const [isReading, setIsReading] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalAction, setLoginModalAction] = useState<'cart' | 'read' | 'view'>('read');
  const [loginModalItemType, setLoginModalItemType] = useState<'book' | 'chapter'>('chapter');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [currentReadingBook, setCurrentReadingBook] = useState<string | null>(null);
  const [currentReadingChapter, setCurrentReadingChapter] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [readingProgress, setReadingProgress] = useState<any[]>([]);
  const [ownedChapters, setOwnedChapters] = useState<string[]>([]);
  
  // Cart hook
  const { cartItems, addToCart, removeFromCart, clearCart, isInCart, cartCount } = useCart();
  
  // Content mode hook
  const { contentMode } = useContentMode();

  // Load owned chapters from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('owned_chapters');
    if (stored) {
      try {
        setOwnedChapters(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse owned chapters:', e);
      }
    }
  }, []);

  // Load reading progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('reading_progress');
    if (stored) {
      try {
        setReadingProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse reading progress:', e);
      }
    }
  }, []);

  // Function to update reading progress
  const updateReadingProgress = (bookId: string, chapterId: string, progress: number) => {
    setReadingProgress((prev: any[]) => {
      const existing = prev.find(p => p.chapterId === chapterId);
      const updated = existing
        ? prev.map(p => p.chapterId === chapterId ? { ...p, progress, lastReadAt: new Date() } : p)
        : [...prev, { bookId, chapterId, progress, lastReadAt: new Date() }];
      
      localStorage.setItem('reading_progress', JSON.stringify(updated));
      return updated;
    });
  };

  // Get current page from URL
  const getCurrentPage = (): PageType => {
    const path = location.pathname.slice(1) || 'home';
    return path as PageType;
  };

  const currentPage = getCurrentPage();

  // Check if we're on the admin panel route
  const isAdminRoute = location.pathname === '/admin';

  // Handle navigation
  const handleNavigate = (page: PageType, bookId?: string) => {
    const pathMap: Record<PageType, string> = {
      'home': '/',
      'books': '/books',
      'categories': '/categories',
      'authors': '/authors',
      'about': '/about',
      'contact': '/contact',
      'privacy': '/privacy',
      'terms': '/terms',
      'faq': '/faq',
      'dashboard': '/user-dashboard',
      'admin-dashboard': '/admin',
      'my-books': '/my-books',
      'my-chapters': '/my-chapters',
      'cart': '/cart',
      'checkout': '/checkout',
      'signin': '/auth/signin',
      'signup': '/auth/signup',
      'forgot-password': '/auth/forgot-password',
    };
    navigate(pathMap[page] || '/');
  };

  // Authentication handlers
  const handleSignIn = (email: string, name: string, photo?: string) => {
    setUserEmail(email);
    setUserName(name);
    if (photo) setUserPhoto(photo);
    handleNavigate('home');
    
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleSignUp = (email: string, name: string, photo?: string) => {
    setUserEmail(email);
    setUserName(name);
    if (photo) setUserPhoto(photo);
    handleNavigate('home');
    
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleSignOut = () => {
    setUserEmail('');
    setUserName('');
    setUserPhoto('');
    handleNavigate('signin');
  };

  const handleLogout = () => {
    handleSignOut();
  };

  // Reading handlers
  const handleStartReading = (bookId: string, chapterId: string) => {
    // Get the chapter details to check if it's free
    const chapter = chapters.find(c => c.id === chapterId);
    
    if (!chapter) {
      console.error('Chapter not found');
      return;
    }

    // Check 1: Free chapter + not logged in → prompt login
    if (chapter.isFree && !isAuthenticated) {
      setLoginModalAction('read');
      setLoginModalItemType('chapter');
      setLoginModalOpen(true);
      setPendingAction(() => () => {
        setCurrentReadingBook(bookId);
        setCurrentReadingChapter(chapterId);
        setIsReading(true);
      });
      return;
    }

    // Check 2: Free chapter + logged in → allow reading
    if (chapter.isFree && isAuthenticated) {
      setCurrentReadingBook(bookId);
      setCurrentReadingChapter(chapterId);
      setIsReading(true);
      
      if (!recentlyViewed.includes(chapterId)) {
        const newRecentlyViewed = [chapterId, ...recentlyViewed.slice(0, 9)];
        setRecentlyViewed(newRecentlyViewed);
        localStorage.setItem('recently_viewed', JSON.stringify(newRecentlyViewed));
      }
      return;
    }

    // Check 3: Paid chapter + not logged in → prompt login first
    if (!chapter.isFree && !isAuthenticated) {
      setLoginModalAction('purchase');
      setLoginModalItemType('chapter');
      setLoginModalOpen(true);
      setPendingAction(() => () => {
        // After login, re-check if they need to purchase
        handleStartReading(bookId, chapterId);
      });
      return;
    }

    // Check 4: Paid chapter + logged in + not purchased → show purchase requirement
    if (!chapter.isFree && !ownedChapters.includes(chapterId)) {
      // User needs to purchase this chapter
      // Navigate to chapter detail or book detail page where they can purchase
      toast.error('Purchase Required', {
        description: `Please purchase "${chapter.title}" to continue reading.`,
        action: {
          label: 'View Chapter',
          onClick: () => {
            handleNavigate('book', bookId);
          }
        }
      });
      return;
    }

    // Check 5: Paid chapter + logged in + purchased → allow reading
    if (!chapter.isFree && ownedChapters.includes(chapterId)) {
      setCurrentReadingBook(bookId);
      setCurrentReadingChapter(chapterId);
      setIsReading(true);
      
      if (!recentlyViewed.includes(chapterId)) {
        const newRecentlyViewed = [chapterId, ...recentlyViewed.slice(0, 9)];
        setRecentlyViewed(newRecentlyViewed);
        localStorage.setItem('recently_viewed', JSON.stringify(newRecentlyViewed));
      }
      return;
    }
  };

  const handleExitReading = () => {
    setIsReading(false);
    setCurrentReadingBook(null);
    setCurrentReadingChapter(null);
  };

  // Purchase handler
  const handlePurchaseChapters = (chapterIds: string[]) => {
    const newOwnedChapters = [...new Set([...ownedChapters, ...chapterIds])];
    localStorage.setItem('owned_chapters', JSON.stringify(newOwnedChapters));
    setOwnedChapters(newOwnedChapters);
  };

  // Single chapter purchase handler (for ReadingViewer)
  const handlePurchaseChapter = async (chapterId: string): Promise<boolean> => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add chapter to owned chapters
      const newOwnedChapters = [...new Set([...ownedChapters, chapterId])];
      localStorage.setItem('owned_chapters', JSON.stringify(newOwnedChapters));
      setOwnedChapters(newOwnedChapters);
      
      // Show success message
      const chapter = chapters.find(c => c.id === chapterId);
      if (chapter) {
        toast.success('Purchase Successful!', {
          description: `You now have access to "${chapter.title}". Enjoy reading!`
        });
      }
      
      return true;
    } catch (error) {
      toast.error('Purchase Failed', {
        description: 'Something went wrong. Please try again.'
      });
      return false;
    }
  };

  // Cart handlers
  const handleAddToCart = (chapterId: string, bookId: string) => {
    if (!isAuthenticated) {
      setLoginModalAction('cart');
      setLoginModalItemType('chapter');
      setLoginModalOpen(true);
      setPendingAction(() => () => addToCart(chapterId, bookId));
      return;
    }
    addToCart(chapterId, bookId);
  };

  const handleBookSelect = (book: any) => {
    setSelectedBook(book);
  };

  const handleChapterSelect = (chapter: any) => {
    setSelectedChapter(chapter);
  };

  // Show reading viewer
  if (isReading && currentReadingChapter) {
    const chapter = chapters.find(c => c.id === currentReadingChapter);
    const book = books.find(b => b.id === currentReadingBook);
    
    if (chapter && book) {
      return (
        <ReadingViewer
          chapter={chapter}
          book={book}
          allChapters={chapters.filter(ch => ch.bookId === book.id)}
          ownedChapters={ownedChapters}
          onClose={handleExitReading}
          onUpdateProgress={(chapterId, progress) => {
            updateReadingProgress(book.id, chapterId, progress);
          }}
          onPurchaseChapter={handlePurchaseChapter}
          onAddToCart={handleAddToCart}
        />
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <WebsiteView
              onStartReading={handleStartReading}
              ownedChapters={ownedChapters}
              onPurchaseChapters={handlePurchaseChapters}
              onBookSelect={handleBookSelect}
              onChapterSelect={handleChapterSelect}
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              recentlyViewed={recentlyViewed}
              addToCart={handleAddToCart}
              isInCart={isInCart}
              isAuthenticated={isAuthenticated}
              readingProgress={readingProgress}
            />
          } />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Design System Page - Available to all users */}
          <Route path="/design-system" element={<DesignSystemPage />} />
          
          <Route path="/auth/signin" element={
            <SignInPage
              onSignIn={handleSignIn}
              onNavigate={handleNavigate}
            />
          } />
          
          <Route path="/auth/signup" element={
            <SignUpPage
              onSignUp={handleSignUp}
              onNavigate={handleNavigate}
            />
          } />
          
          <Route path="/auth/forgot-password" element={
            <ForgotPasswordPage onNavigate={handleNavigate} />
          } />
          
          {isAuthenticated && (
            <>
              <Route path="/user-dashboard" element={
                <UserDashboard
                  onNavigate={handleNavigate}
                  userEmail={userEmail}
                  userName={userName}
                  userPhoto={userPhoto}
                  onLogout={handleLogout}
                  ownedChapters={ownedChapters}
                />
              } />
              
              <Route path="/admin" element={
                <DashboardView onNavigate={handleNavigate} />
              } />
              
              <Route path="/my-books" element={
                <MyBooks
                  books={books.filter(b => ownedChapters.some(chId => chapters.find(ch => ch.id === chId && ch.bookId === b.id)))}
                  chapters={chapters}
                  readingProgress={readingProgress}
                  onContinueReading={handleStartReading}
                  onStartReading={(bookId) => {
                    const firstChapter = chapters.find(ch => ch.bookId === bookId);
                    if (firstChapter) {
                      handleStartReading(bookId, firstChapter.id);
                    }
                  }}
                />
              } />
              
              <Route path="/my-chapters" element={
                <MyChapters
                  chapters={chapters}
                  books={books}
                  authors={authors}
                  ownedChapterIds={ownedChapters}
                  readingProgress={readingProgress}
                  onChapterClick={(chapter) => handleStartReading(chapter.bookId, chapter.id)}
                  onContinueReading={handleStartReading}
                  onStartReading={handleStartReading}
                  isAuthenticated={isAuthenticated}
                />
              } />
              
              <Route path="/cart" element={
                <CartPage
                  cartItems={cartItems}
                  onRemoveFromCart={removeFromCart}
                  onCheckout={() => handleNavigate('checkout')}
                />
              } />
              
              <Route path="/checkout" element={
                <CheckoutPage
                  cartItems={cartItems}
                  onPurchaseComplete={(chapterIds) => {
                    handlePurchaseChapters(chapterIds);
                    clearCart();
                    handleNavigate('home');
                  }}
                  onNavigate={handleNavigate}
                />
              } />
            </>
          )}
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSignIn={() => {
          setLoginModalOpen(false);
          handleNavigate('signin');
        }}
        onSignUp={() => {
          setLoginModalOpen(false);
          handleNavigate('signup');
        }}
        action={loginModalAction}
        itemType={loginModalItemType}
      />

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}