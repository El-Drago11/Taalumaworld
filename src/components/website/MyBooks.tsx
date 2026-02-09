import { useState, useEffect } from 'react';
import { BookOpen, Clock, TrendingUp, Play, MoreVertical, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Book, Chapter } from '../../data/mockData';

export interface ReadingProgress {
  bookId: string;
  chapterId: string;
  progress: number; // 0-100
  lastReadAt: Date;
  currentPage?: number;
  totalPages?: number;
}

interface MyBooksProps {
  books: Book[];
  chapters: Chapter[];
  readingProgress: ReadingProgress[];
  onContinueReading: (bookId: string, chapterId: string) => void;
  onStartReading: (bookId: string) => void;
}

export function MyBooks({
  books,
  chapters,
  readingProgress,
  onContinueReading,
  onStartReading,
}: MyBooksProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'completed'>('all');

  // Get books with their reading progress
  const booksWithProgress = books.map(book => {
    const bookChapters = chapters.filter(c => c.bookId === book.id);
    const chapterProgress = readingProgress.filter(p => p.bookId === book.id);
    
    // Calculate overall book progress
    let overallProgress = 0;
    if (chapterProgress.length > 0) {
      overallProgress = chapterProgress.reduce((sum, p) => sum + p.progress, 0) / bookChapters.length;
    }

    // Get last read chapter
    const lastRead = chapterProgress.sort((a, b) => 
      new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
    )[0];

    return {
      ...book,
      progress: Math.round(overallProgress),
      lastReadChapterId: lastRead?.chapterId,
      lastReadAt: lastRead?.lastReadAt,
      isCompleted: overallProgress >= 99,
      isReading: overallProgress > 0 && overallProgress < 99,
    };
  });

  // Filter books based on active tab
  const filteredBooks = booksWithProgress.filter(book => {
    if (activeTab === 'reading') return book.isReading;
    if (activeTab === 'completed') return book.isCompleted;
    return true;
  });

  // Sort by last read date
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!a.lastReadAt) return 1;
    if (!b.lastReadAt) return -1;
    return new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Books</h1>
        <p className="text-muted-foreground">
          Your personal library of purchased books and reading progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">{books.length}</div>
              <div className="text-sm text-muted-foreground tracking-tight">Total Books</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-200 rounded-full">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">
                {booksWithProgress.filter(b => b.isReading).length}
              </div>
              <div className="text-sm text-muted-foreground tracking-tight">In Progress</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-200 rounded-full">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">
                {booksWithProgress.filter(b => b.isCompleted).length}
              </div>
              <div className="text-sm text-muted-foreground tracking-tight">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 font-medium text-sm transition-colors rounded-t-lg ${
            activeTab === 'all'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All Books ({booksWithProgress.length})
        </button>
        <button
          onClick={() => setActiveTab('reading')}
          className={`px-4 py-2 font-medium text-sm transition-colors rounded-t-lg ${
            activeTab === 'reading'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Reading ({booksWithProgress.filter(b => b.isReading).length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 font-medium text-sm transition-colors rounded-t-lg ${
            activeTab === 'completed'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Completed ({booksWithProgress.filter(b => b.isCompleted).length})
        </button>
      </div>

      {/* Books Grid */}
      {sortedBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">No books found</h3>
          <p className="text-sm text-muted-foreground">
            {activeTab === 'all' && 'Start purchasing books to build your library'}
            {activeTab === 'reading' && "You haven't started reading any books yet"}
            {activeTab === 'completed' && "You haven't completed any books yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-white border rounded-3xl overflow-hidden hover:shadow-lg hover-lift transition-all"
            >
              {/* Book Cover */}
              <div className="aspect-[3/2] relative overflow-hidden bg-muted">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                
                {/* Status Badge */}
                {book.isCompleted && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-success text-white rounded-full px-3 py-1 text-xs font-medium shadow-md">Completed</Badge>
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1 mb-1 tracking-tight">{book.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 tracking-tight">
                    {book.description}
                  </p>
                </div>

                {/* Progress Bar */}
                {book.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 tracking-tight">
                      <span>Reading progress</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Last Read Info */}
                {book.lastReadAt && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-tight">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      Last read {new Date(book.lastReadAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={() => {
                    if (book.lastReadChapterId) {
                      onContinueReading(book.id, book.lastReadChapterId);
                    } else {
                      onStartReading(book.id);
                    }
                  }}
                  className="w-full rounded-full gap-2"
                  variant={book.progress > 0 ? 'default' : 'outline'}
                >
                  <Play className="h-4 w-4" />
                  {book.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}