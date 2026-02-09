import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useLocation } from 'react-router';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Filters } from './Filters';
import { ChapterFilters } from './ChapterFilters';
import { FilterModal } from './FilterModal';
import { BookCard } from './BookCard';
import { ChapterCard } from './ChapterCard';
import { ContinueReadingCard } from './ContinueReadingCard';
import { BookDetailModal } from './BookDetailModal';
import { ChapterDetailModal } from './ChapterDetailModal';
import { Cart } from './Cart';
import { SearchBar } from './SearchBar';
import { useContentMode } from '../../hooks/useContentMode';
import { useGetAllBooksQuery } from '../../store/api/booksApi';
import { useGetAllChaptersQuery } from '../../store/api/chaptersApi';
import { useGetAuthorsQuery } from '../../store/api/authorsApi';
import { useGetCategoriesQuery } from '../../store/api/categoriesApi';
import type { Book, Chapter } from '../../data/mockData';
import heroImage from 'figma:asset/442868109564fe41dab345cad8f1279792755c14.png';

interface WebsiteViewProps {
  onStartReading?: (bookId: string, chapterId: string) => void;
  ownedChapters: string[];
  onPurchaseChapters: (chapterIds: string[]) => void;
  onBookSelect?: (book: Book) => void;
  onChapterSelect?: (chapter: Chapter) => void;
  selectedBook?: Book | null;
  selectedChapter?: Chapter | null;
  recentlyViewed?: string[];
  addToCart?: (chapterId: string, bookId: string) => void;
  isInCart?: (chapterId: string) => boolean;
  isAuthenticated?: boolean;
  readingProgress?: Array<{ bookId: string; chapterId: string; progress: number; lastReadAt: Date }>;
}

export function WebsiteView({ 
  onStartReading, 
  ownedChapters, 
  onPurchaseChapters,
  selectedBook: externalSelectedBook,
  selectedChapter: externalSelectedChapter,
  recentlyViewed: externalRecentlyViewed = [],
  addToCart,
  isInCart,
  isAuthenticated,
  readingProgress = []
}: WebsiteViewProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProgressFilters, setSelectedProgressFilters] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(externalSelectedBook || null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(externalSelectedChapter || null);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [heroBackground, setHeroBackground] = useState<string>('https://images.unsplash.com/photo-1612909000917-fb13c94ce179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuJTIwcmVhZGluZyUyMGJvb2tzfGVufDF8fHx8MTc2Nzc4MzQ0MHww&ixlib=rb-4.1.0&q=80&w=1080');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Use content mode hook to get current mode
  const { contentMode } = useContentMode();
  const displayMode = contentMode; // Use contentMode from the hook

  // Fetch data from API
  const { data: booksData, isLoading: booksLoading } = useGetAllBooksQuery();
  const { data: chaptersData, isLoading: chaptersLoading } = useGetAllChaptersQuery();
  const { data: authorsData, isLoading: authorsLoading } = useGetAuthorsQuery();
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();

  // Memoize books and chapters to avoid unnecessary re-renders
  const books = useMemo(() => booksData || [], [booksData]);
  const chapters = useMemo(() => chaptersData || [], [chaptersData]);
  const authors = useMemo(() => authorsData || [], [authorsData]);
  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  // Function to scroll to content section
  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Function to scroll to categories (filters sidebar)
  const scrollToCategories = () => {
    const filtersSection = document.getElementById('filters-section');
    if (filtersSection) {
      filtersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle navigation state for chapter selection from search
  useEffect(() => {
    const state = location.state as { selectedChapterId?: string; selectedBookId?: string } | null;
    
    if (state?.selectedChapterId && chapters.length > 0) {
      const chapter = chapters.find(ch => ch.id === state.selectedChapterId);
      if (chapter) {
        setSelectedChapter(chapter);
        // Clear the state to prevent re-opening on page refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, chapters]);

  // Update when external props change
  useEffect(() => {
    if (externalSelectedBook) {
      setSelectedBook(externalSelectedBook);
    }
  }, [externalSelectedBook]);

  useEffect(() => {
    if (externalSelectedChapter) {
      setSelectedChapter(externalSelectedChapter);
    }
  }, [externalSelectedChapter]);

  // Save recently viewed when chapter is selected
  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  // Load hero background from localStorage
  useEffect(() => {
    const loadHeroBackground = () => {
      const savedUrl = localStorage.getItem('hero-background-url');
      if (savedUrl) {
        setHeroBackground(savedUrl);
      }
    };

    loadHeroBackground();

    // Listen for background updates
    const handleBackgroundUpdate = () => {
      loadHeroBackground();
    };

    window.addEventListener('hero-background-updated', handleBackgroundUpdate);

    return () => {
      window.removeEventListener('hero-background-updated', handleBackgroundUpdate);
    };
  }, []);

  const addToCartInternal = (itemId: string) => {
    if (!cartItems.includes(itemId)) {
      setCartItems([...cartItems, itemId]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(id => id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = (itemIds: string[]) => {
    onPurchaseChapters(itemIds);
    clearCart();
  };

  // Filter books based on selected filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search query filter
      if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !book.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(book.category)) {
        return false;
      }

      // Author filter
      if (selectedAuthors.length > 0 && !selectedAuthors.includes(book.authorId)) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const bookTags = book.tags || [];
        if (!selectedTags.some(tag => bookTags.includes(tag))) {
          return false;
        }
      }

      return true;
    });
  }, [books, searchQuery, selectedCategories, selectedAuthors, selectedTags]);

  // Filter chapters based on selected filters
  const filteredChapters = useMemo(() => {
    return chapters.filter((chapter) => {
      const book = books.find((b) => b.id === chapter.bookId);
      if (!book) return false;

      // Search query filter
      if (searchQuery && !chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !chapter.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(book.category)) {
        return false;
      }

      // Author filter
      if (selectedAuthors.length > 0 && !selectedAuthors.includes(book.authorId)) {
        return false;
      }

      // Book filter (for chapter mode)
      if (selectedBooks.length > 0 && !selectedBooks.includes(chapter.bookId)) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const chapterTags = chapter.tags || [];
        if (!selectedTags.some(tag => chapterTags.includes(tag))) {
          return false;
        }
      }

      // Progress filters
      if (selectedProgressFilters.length > 0) {
        const isOwned = ownedChapters.includes(chapter.id);
        const isFree = chapter.isFree;

        if (selectedProgressFilters.includes('owned') && !isOwned) return false;
        if (selectedProgressFilters.includes('free') && !isFree) return false;
        if (selectedProgressFilters.includes('premium') && (isFree || isOwned)) return false;
      }

      return true;
    });
  }, [chapters, books, searchQuery, selectedCategories, selectedAuthors, selectedBooks, selectedTags, selectedProgressFilters, ownedChapters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ maxHeight: '900px' }}>
            {/* Left Column - Text Content */}
            <div className="space-y-6 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-foreground">
                  📚 Now live and ready to explore!
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Discover the joy of{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">reading</span>
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/30 -rotate-1"></span>
                  </span>
                  .
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                  Read chapter by chapter or get the full book. Your learning journey, your way.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 rounded-full hover-lift"
                  onClick={scrollToContent}
                >
                  {displayMode === 'chapters' ? 'Explore Chapters' : 'Explore Books'}
                </Button>
                {displayMode === 'books' && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-10 py-6 rounded-full hover:shadow-md transition-all"
                    onClick={scrollToCategories}
                  >
                    Browse Categories
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium border-2 border-background">
                      A
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary-accent flex items-center justify-center text-white text-sm font-medium border-2 border-background">
                      B
                    </div>
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white text-sm font-medium border-2 border-background">
                      C
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center text-white text-xs font-medium border-2 border-background">
                      +5
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    500+ active readers
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative animate-slide-up lg:block hidden">
              <div className="relative">
                {/* Main Illustration */}
                <div className="relative z-10 rounded-3xl overflow-hidden" style={{ maxHeight: '650px' }}>
                  <img
                    src={heroImage}
                    alt="Teen reading on laptop"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary-accent/20 rounded-full blur-2xl"></div>

                {/* Decorative Shapes */}
                <div className="absolute top-1/4 -left-12 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-primary/30"></div>
                <div className="absolute bottom-1/4 -right-12 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-secondary-accent/30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="content-section" className="container mx-auto px-4 pt-4 pb-10">
        {/* Main Grid - Full Width */}
        <main className="w-full">
          {/* Continue Reading Section - Chapters Mode Only */}
          {displayMode === 'chapters' && isAuthenticated && ownedChapters.length > 0 && (() => {
            // Filter out completed chapters (progress >= 100)
            const inProgressChapters = chapters
              .filter((ch) => {
                if (!ownedChapters.includes(ch.id)) return false;
                
                // Check if chapter is completed
                const chapterProgress = readingProgress.find(p => p.chapterId === ch.id);
                if (chapterProgress && chapterProgress.progress >= 100) {
                  return false; // Exclude completed chapters
                }
                
                return true; // Include chapters that are not completed
              })
              .slice(0, 6);
            
            // Only show section if there are chapters in progress
            if (inProgressChapters.length === 0) return null;
            
            return (
              <div className="mb-6 pb-10">
                <div className="mb-6 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Continue Reading</h2>
                  <p className="text-muted-foreground mt-1 text-lg">
                    Pick up where you left off
                  </p>
                </div>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                  {inProgressChapters.map((chapter, index) => {
                    const book = books.find((b) => b.id === chapter.bookId);
                    const author = book ? authors.find((a) => a.id === book.authorId) : undefined;
                    
                    // Get actual progress from readingProgress data
                    const chapterProgress = readingProgress.find(p => p.chapterId === chapter.id);
                    const progressPercentage = chapterProgress ? Math.round(chapterProgress.progress) : 0;
                    
                    return (
                      <div key={chapter.id} className="flex-shrink-0 w-[90%] sm:w-[48%] lg:w-[30%] snap-start">
                        <ContinueReadingCard
                          chapter={chapter}
                          book={book}
                          author={author}
                          onClick={() => {
                            if (book && onStartReading) {
                              onStartReading(book.id, chapter.id);
                            }
                          }}
                          progress={progressPercentage}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Content Grid */}
          {displayMode === 'chapters' ? (
            <>
              {/* Section Header */}
              <div className="mb-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse All Chapters</h2>
                <p className="text-muted-foreground mt-1 text-lg">
                  Discover stories from every genre and find your next great read
                </p>
              </div>

              {/* Filter Button and Results Count */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsFilterModalOpen(true)}
                    className="rounded-full gap-2 hover:border-primary/30 transition-all"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filters</span>
                    {(selectedCategories.length +
                      selectedAuthors.length +
                      selectedBooks.length +
                      selectedTags.length +
                      selectedProgressFilters.length) > 0 && (
                      <Badge className="ml-1 bg-primary text-white rounded-full">
                        {selectedCategories.length +
                          selectedAuthors.length +
                          selectedBooks.length +
                          selectedTags.length +
                          selectedProgressFilters.length}
                      </Badge>
                    )}
                  </Button>
                  
                  <p className="text-muted-foreground">
                    {filteredChapters.length} chapter{filteredChapters.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredChapters.map((chapter) => {
                  const book = books.find((b) => b.id === chapter.bookId);
                  const author = book ? authors.find((a) => a.id === book.authorId) : undefined;
                  return (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      book={book}
                      author={author}
                      onClick={() => handleChapterSelect(chapter)}
                    />
                  );
                })}
              </div>

              {filteredChapters.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No chapters found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories([]);
                      setSelectedSubcategories([]);
                      setSelectedAuthors([]);
                      setSelectedBooks([]);
                      setSelectedTags([]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Section Header */}
              <div className="mb-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse All Books</h2>
                <p className="text-muted-foreground mt-1 text-lg">
                  Explore complete collections and find your perfect book
                </p>
              </div>

              {/* Filter Button and Results Count */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsFilterModalOpen(true)}
                    className="rounded-full gap-2 hover:border-primary/30 transition-all"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filters</span>
                    {(selectedCategories.length +
                      selectedAuthors.length +
                      selectedTags.length) > 0 && (
                      <Badge className="ml-1 bg-primary text-white rounded-full">
                        {selectedCategories.length +
                          selectedAuthors.length +
                          selectedTags.length}
                      </Badge>
                    )}
                  </Button>
                  
                  <p className="text-muted-foreground">
                    {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBooks.map((book) => {
                  const author = authors.find((a) => a.id === book.authorId);
                  const bookChapters = chapters.filter((ch) => ch.bookId === book.id);
                  return (
                    <BookCard
                      key={book.id}
                      book={book}
                      author={author}
                      chaptersCount={bookChapters.length}
                      onClick={() => setSelectedBook(book)}
                    />
                  );
                })}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No books found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories([]);
                      setSelectedSubcategories([]);
                      setSelectedAuthors([]);
                      setSelectedTags([]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Testimonials Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Readers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of young readers discovering amazing stories, one chapter at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "I love that I can buy just one chapter to see if I like a book before getting the whole thing. It's perfect for my budget!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  A
                </div>
                <div>
                  <p className="font-semibold">Alex, 16</p>
                  <p className="text-sm text-muted-foreground">High School Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "The platform is super easy to use and the stories are amazing! I've discovered so many new authors I wouldn't have found otherwise."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-accent/10 flex items-center justify-center text-secondary-accent font-semibold">
                  M
                </div>
                <div>
                  <p className="font-semibold">Maya, 14</p>
                  <p className="text-sm text-muted-foreground">Middle School Reader</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "As a busy student, reading chapter by chapter works perfectly with my schedule. I can take breaks and come back whenever I want!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success font-semibold">
                  J
                </div>
                <div>
                  <p className="font-semibold">Jordan, 17</p>
                  <p className="text-sm text-muted-foreground">Senior Year Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "The free first chapters are awesome! I can try different genres without spending money and find what I really enjoy reading."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark font-semibold">
                  S
                </div>
                <div>
                  <p className="font-semibold">Sam, 15</p>
                  <p className="text-sm text-muted-foreground">Avid Reader</p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "Great selection of books! The categories make it really easy to find exactly what I'm looking for. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  E
                </div>
                <div>
                  <p className="font-semibold">Emma, 13</p>
                  <p className="text-sm text-muted-foreground">Book Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "This platform has helped me read more than ever! I love supporting authors directly and reading at my own pace."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-accent/20 flex items-center justify-center text-secondary-accent font-semibold">
                  R
                </div>
                <div>
                  <p className="font-semibold">Riley, 18</p>
                  <p className="text-sm text-muted-foreground">College Freshman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Taaluma
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="How does chapter-by-chapter purchasing work?"
              answer="You can buy individual chapters to read at your own pace! Each chapter is priced separately, and many books offer the first chapter free so you can try before you buy. If you love the book, you can also purchase all remaining chapters at once."
            />
            <FAQItem
              question="Can I buy the entire book instead of individual chapters?"
              answer="Absolutely! While we focus on chapter-by-chapter reading, many authors also offer a 'full book' option. You'll see both options on the book detail page. Buying the full book is often a better value if you're already hooked!"
            />
            <FAQItem
              question="Are there free chapters available?"
              answer="Yes! Most books offer their first chapter completely free. This lets you explore different genres, discover new authors, and find stories you love without spending anything upfront."
            />
            <FAQItem
              question="How do I know which books are right for me?"
              answer="Use our filtering system to browse by category, author, or tags. Each book and chapter has a detailed description, and you can read reviews from other readers. Plus, with free first chapters, you can try before you commit!"
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit and debit cards, as well as digital payment methods like PayPal and Apple Pay. All transactions are secure and encrypted to protect your information."
            />
            <FAQItem
              question="Can I access my purchased chapters on different devices?"
              answer="Yes! Once you purchase a chapter or book, it's linked to your account and you can access it from any device where you're logged in - your phone, tablet, or computer."
            />
            <FAQItem
              question="How do authors benefit from this platform?"
              answer="Authors earn money every time someone purchases their chapters or books. We provide them with tools to manage their content, set their own prices, and connect directly with readers like you. When you buy, you're directly supporting the authors you love!"
            />
            <FAQItem
              question="Is my information safe?"
              answer="Yes! We take your privacy seriously. We use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your permission."
            />
          </div>
        </div>
      </section>

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          author={authors.find((a) => a.id === selectedBook.authorId)}
          chapters={chapters.filter((ch) => ch.bookId === selectedBook.id)}
          onClose={() => setSelectedBook(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Chapter Detail Modal */}
      {selectedChapter && (
        <ChapterDetailModal
          chapter={selectedChapter}
          book={books.find((b) => b.id === selectedChapter.bookId)}
          author={authors.find((a) => {
            const book = books.find((b) => b.id === selectedChapter.bookId);
            return book && a.id === book.authorId;
          })}
          isOwned={ownedChapters.includes(selectedChapter.id)}
          onClose={() => setSelectedChapter(null)}
          onAddToCart={addToCart}
          onStartReading={onStartReading}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        displayMode={displayMode}
        categories={categories}
        authors={authors}
        books={books}
        selectedCategories={selectedCategories}
        selectedAuthors={selectedAuthors}
        selectedBooks={selectedBooks}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedCategories}
        onAuthorChange={setSelectedAuthors}
        onBookChange={setSelectedBooks}
        onTagChange={setSelectedTags}
        selectedProgressFilters={selectedProgressFilters}
        onProgressFilterChange={setSelectedProgressFilters}
      />
    </div>
  );
}

// FAQItem component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-3xl overflow-hidden bg-white hover:border-primary/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/30 transition-colors"
      >
        <span className="font-semibold pr-4">{question}</span>
        <span className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}