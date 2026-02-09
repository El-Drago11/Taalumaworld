import { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Book, Chapter, Author } from '../../data/mockData';

interface SearchBarProps {
  books: Book[];
  chapters: Chapter[];
  authors: Author[];
  ownedChapters?: string[];
  recentlyViewed?: string[];
  onBookSelect?: (book: Book) => void;
  onChapterSelect?: (chapter: Chapter) => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

type SearchMode = 'all' | 'books' | 'chapters';

export function SearchBar({
  books,
  chapters,
  authors,
  ownedChapters,
  recentlyViewed,
  onBookSelect,
  onChapterSelect,
  onSearchChange,
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [displayMode, setDisplayMode] = useState<'chapters' | 'books'>('chapters');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external query if provided, otherwise use internal
  const query = externalSearchQuery !== undefined ? externalSearchQuery : internalQuery;
  const setQuery = externalSetSearchQuery || setInternalQuery;

  // Load display mode from localStorage and listen for changes
  useEffect(() => {
    const loadDisplayMode = () => {
      const savedMode = localStorage.getItem('display-mode');
      if (savedMode === 'books' || savedMode === 'chapters') {
        setDisplayMode(savedMode);
        // In Chapters Mode, default search to chapters only
        if (savedMode === 'chapters') {
          setSearchMode('chapters');
        }
      } else {
        setDisplayMode('chapters');
        setSearchMode('chapters');
      }
    };

    loadDisplayMode();

    const handleDisplayModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode: 'chapters' | 'books' }>;
      setDisplayMode(customEvent.detail.mode);
      // In Chapters Mode, switch search to chapters only
      if (customEvent.detail.mode === 'chapters') {
        setSearchMode('chapters');
      } else {
        setSearchMode('all');
      }
    };

    window.addEventListener('display-mode-changed', handleDisplayModeChange as EventListener);

    return () => {
      window.removeEventListener('display-mode-changed', handleDisplayModeChange as EventListener);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('taaluma_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    onSearchChange?.(value);
  };

  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('taaluma_recent_searches', JSON.stringify(updated));
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    onSearchChange?.('');
  };

  const handleBookClick = (book: Book) => {
    saveSearch(book.title);
    onBookSelect?.(book);
    setIsOpen(false);
    setQuery('');
  };

  const handleChapterClick = (chapter: Chapter) => {
    saveSearch(chapter.title);
    onChapterSelect?.(chapter);
    setIsOpen(false);
    setQuery('');
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    setIsOpen(true);
  };

  // Filter results based on search mode and query
  const filteredBooks = searchMode !== 'chapters' && displayMode !== 'chapters'
    ? books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const filteredChapters = searchMode !== 'books'
    ? chapters.filter(chapter => 
        chapter.title.toLowerCase().includes(query.toLowerCase()) ||
        chapter.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  // Get personalized suggestions
  const ownedChapterItems = [...chapters].filter(c => ownedChapters?.includes(c.id)).slice(0, 3);
  const recentlyViewedChapters = (recentlyViewed || [])
    .map(id => chapters.find(c => c.id === id))
    .filter((c): c is Chapter => c !== undefined)
    .slice(0, 3);
  const popularChapters = [...chapters]
    .sort((a, b) => {
      // Sort by a combination of factors for better "popular" results
      const scoreA = (a.isFree ? 1 : 0) + (Math.random() * 0.5);
      const scoreB = (b.isFree ? 1 : 0) + (Math.random() * 0.5);
      return scoreB - scoreA;
    })
    .slice(0, 5);

  const hasResults = filteredBooks.length > 0 || filteredChapters.length > 0;
  const showSuggestions = !query;
  const hasSuggestionsContent = recentSearches.length > 0 || recentlyViewedChapters.length > 0 || ownedChapterItems.length > 0 || popularChapters.length > 0;

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Container */}
      <div className={`
        relative bg-white rounded-full border-2 transition-all duration-300
        ${isOpen ? 'border-primary' : 'border-border'}
      `}>
        <div className="flex items-center gap-2 px-3 py-2">
          <Search className={`h-4 w-4 flex-shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for books, chapters, or authors..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground min-w-0"
          />

          {query && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-accent rounded-full transition-colors flex-shrink-0"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}

          {/* Search Mode Toggle - Only show in Books Mode */}
          {displayMode === 'books' && (
            <div className="flex items-center gap-0.5 bg-accent rounded-full p-0.5 flex-shrink-0">
              <button
                onClick={() => setSearchMode('all')}
                className={`
                  px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200
                  ${searchMode === 'all' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                All
              </button>
              <button
                onClick={() => setSearchMode('books')}
                className={`
                  px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200
                  ${searchMode === 'books' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <BookOpen className="h-3 w-3 inline mr-1" />
                Books
              </button>
              <button
                onClick={() => setSearchMode('chapters')}
                className={`
                  px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200
                  ${searchMode === 'chapters' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <FileText className="h-3 w-3 inline mr-1" />
                Chapters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-3xl border border-border max-h-[600px] overflow-y-auto z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4">
            {/* No Results Message */}
            {query && !hasResults && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <p className="text-sm text-muted-foreground mt-1">Try different keywords or browse by category</p>
              </div>
            )}

            {/* Search Results - Books */}
            {query && filteredBooks.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Books</h3>
                </div>
                <div className="space-y-1">
                  {filteredBooks.map(book => {
                    const author = authors.find(a => a.id === book.authorId);
                    const bookChapters = chapters.filter(c => c.bookId === book.id);
                    return (
                      <button
                        key={book.id}
                        onClick={() => handleBookClick(book)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-accent transition-all group"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 text-left min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {author?.name} • {bookChapters.length} chapters
                          </p>
                        </div>
                        {book.price ? (
                          <span className="text-sm font-semibold text-primary">${book.price.toFixed(2)}</span>
                        ) : (
                          <Badge className="bg-success/10 text-success border-success/20 rounded-full text-xs">Free</Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Search Results - Chapters */}
            {query && filteredChapters.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Chapters</h3>
                </div>
                <div className="space-y-1">
                  {filteredChapters.map(chapter => {
                    const book = books.find(b => b.id === chapter.bookId);
                    const isOwned = ownedChapters?.includes(chapter.id);
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterClick(chapter)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-accent transition-all group"
                      >
                        <img
                          src={chapter.featuredImage}
                          alt={chapter.title}
                          className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge variant="outline" className="text-xs rounded-full px-2 py-0">
                              Ch. {chapter.sequence}
                            </Badge>
                            {isOwned && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full text-xs px-2 py-0">
                                Owned
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h4>
                          {book && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{book.title}</p>
                          )}
                        </div>
                        {chapter.isFree ? (
                          <Badge className="bg-success/10 text-success border-success/20 rounded-full text-xs">Free</Badge>
                        ) : chapter.price ? (
                          <span className="text-sm font-semibold text-primary">${chapter.price.toFixed(2)}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {showSuggestions && recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Recent Searches</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('taaluma_recent_searches');
                    }}
                    className="h-auto py-1 px-2 text-xs rounded-full"
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recently Viewed */}
            {showSuggestions && recentlyViewedChapters.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Continue Reading</h3>
                </div>
                <div className="space-y-1">
                  {recentlyViewedChapters.map(chapter => {
                    const book = books.find(b => b.id === chapter.bookId);
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterClick(chapter)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-accent transition-all group"
                      >
                        <img
                          src={chapter.featuredImage}
                          alt={chapter.title}
                          className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 text-left min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h4>
                          {book && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{book.title}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* For You Recommendations */}
            {showSuggestions && ownedChapterItems.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Your Library</h3>
                </div>
                <div className="space-y-1">
                  {ownedChapterItems.map(chapter => {
                    const book = books.find(b => b.id === chapter.bookId);
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterClick(chapter)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-accent transition-all group"
                      >
                        <img
                          src={chapter.featuredImage}
                          alt={chapter.title}
                          className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 text-left min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h4>
                          {book && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{book.title}</p>
                          )}
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full text-xs">
                          Owned
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Popular Now */}
            {showSuggestions && popularChapters.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Popular Now</h3>
                </div>
                <div className="space-y-1">
                  {popularChapters.map(chapter => {
                    const book = books.find(b => b.id === chapter.bookId);
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterClick(chapter)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-accent transition-all group"
                      >
                        <img
                          src={chapter.featuredImage}
                          alt={chapter.title}
                          className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 text-left min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h4>
                          {book && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{book.title}</p>
                          )}
                        </div>
                        {chapter.isFree ? (
                          <Badge className="bg-success/10 text-success border-success/20 rounded-full text-xs">Free</Badge>
                        ) : chapter.price ? (
                          <span className="text-sm font-semibold text-primary">${chapter.price.toFixed(2)}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}