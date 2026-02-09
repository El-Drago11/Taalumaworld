import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { BookOpen, Search, Menu, X, ShoppingCart, LogIn, HelpCircle, FileText, Library, BookMarked, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectIsAuthenticated, selectUser, signOut } from '../../store/slices/authSlice';
import { selectCartCount } from '../../store/slices/cartSlice';
import { selectContentMode } from '../../store/slices/contentModeSlice';
import { Button } from '../ui/button';
import { UserAvatar } from '../ui/UserAvatar';
import { Input } from '../ui/input';
import { GlobalSearchBar } from './GlobalSearchBar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const cartCount = useAppSelector(selectCartCount);
  const contentMode = useAppSelector(selectContentMode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleSignOut = () => {
    dispatch(signOut());
    setIsUserMenuOpen(false);
    navigate('/auth/signin');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Welcome to Taaluma - Empowering College Graduates & Young Professionals!</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/faq" className="hover:text-white/80 transition-colors flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Link>
              <Link to="/faq" className="hover:text-white/80 transition-colors flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary rounded-xl p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl whitespace-nowrap">
                Taaluma<span className="text-primary">World</span>
              </h1>
            </div>
          </Link>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden lg:block">
            <GlobalSearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* My Chapters / My Books */}
            {isAuthenticated && (
              <Link to={contentMode === 'chapters' ? '/my-chapters' : '/my-books'} className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                <BookMarked className="h-5 w-5" />
                <span className="font-medium text-sm">{contentMode === 'chapters' ? 'My Chapters' : 'My Books'}</span>
              </Link>
            )}

            {/* Cart */}
            {isAuthenticated && (
              <Link to="/cart" className="relative hidden lg:block">
                <button className="relative text-gray-700 hover:text-primary transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            )}

            {/* User Avatar */}
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative hidden lg:block">
                <div
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {user?.photo ? (
                    <img src={user.photo} alt={user.fullName || 'User'} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <span>{(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link to="/user-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="h-5 w-5 mr-2 inline-block" />
                        My Account
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-5 w-5 mr-2 inline-block" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth/signin">
                <Button size="sm" className="hidden lg:flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-primary transition-colors"
            />
          </form>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden md:flex items-center gap-8 border-t py-3">
          <Link
            to="/"
            className={`transition-colors font-medium ${
              isActive('/') ? 'text-primary' : 'hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`transition-colors font-medium ${
              isActive('/about') ? 'text-primary' : 'hover:text-primary'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`transition-colors font-medium ${
              isActive('/contact') ? 'text-primary' : 'hover:text-primary'
            }`}
          >
            Contact
          </Link>
          
          {contentMode === 'books' && (
            <>
              <Link
                to="/books"
                className={`transition-colors font-medium ${
                  isActive('/books') ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                Books
              </Link>
              <Link
                to="/categories"
                className={`transition-colors font-medium ${
                  isActive('/categories') ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                Categories
              </Link>
              <Link
                to="/authors"
                className={`transition-colors font-medium ${
                  isActive('/authors') ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                Thought Leaders
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                Home
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                About Us
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                Contact
              </Link>
              
              {contentMode === 'books' && (
                <>
                  <Link to="/books" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                    Books
                  </Link>
                  <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                    Categories
                  </Link>
                  <Link to="/authors" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                    Thought Leaders
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <Link to={contentMode === 'chapters' ? '/my-chapters' : '/my-books'} onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">
                  {contentMode === 'chapters' ? 'My Chapters' : 'My Books'}
                </Link>
              )}

              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <>
                    <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-3">
                        <UserAvatar
                          userName={user?.fullName || user?.email || ''}
                          userPhoto={user?.photo}
                          size="sm"
                        />
                        <span className="font-medium">{user?.fullName || 'My Account'}</span>
                      </button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}