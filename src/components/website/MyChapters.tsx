import { useState } from 'react';
import { BookOpen, TrendingUp, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { Book, Chapter, Author } from '../../data/mockData';

export interface ReadingProgress {
  bookId: string;
  chapterId: string;
  progress: number; // 0-100
  lastReadAt: Date;
  currentPage?: number;
  totalPages?: number;
}

interface MyChaptersProps {
  chapters: Chapter[];
  books: Book[];
  authors: Author[];
  ownedChapterIds: string[];
  readingProgress: ReadingProgress[];
  onChapterClick: (chapter: Chapter) => void;
  onContinueReading: (bookId: string, chapterId?: string) => void;
  onStartReading: (bookId: string, chapterId?: string) => void;
  isAuthenticated?: boolean;
}

type FilterTab = 'all' | 'reading' | 'completed' | 'unread';

export function MyChapters({
  chapters,
  books,
  authors,
  ownedChapterIds,
  readingProgress,
  onChapterClick,
  onContinueReading,
  onStartReading,
  isAuthenticated = false,
}: MyChaptersProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // If not authenticated, show empty state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-10">
        <div className="container mx-auto px-4 pt-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">My Chapters</h1>
            <p className="text-muted-foreground text-lg">
              Your personal collection of purchased chapters
            </p>
          </div>

          {/* Stats Cards - All Zero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">0</div>
                  <div className="text-sm text-muted-foreground tracking-tight">Total Chapters</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-200 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">0</div>
                  <div className="text-sm text-muted-foreground tracking-tight">In Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-200 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">0</div>
                  <div className="text-sm text-muted-foreground tracking-tight">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State Message */}
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Please Log In</h3>
              <p className="text-muted-foreground">
                You need to be logged in to view your chapter collection.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get owned chapters with progress
  const ownedChapters = chapters.filter(ch => ownedChapterIds.includes(ch.id));

  const chaptersWithProgress = ownedChapters.map(chapter => {
    const progress = readingProgress.find(p => p.chapterId === chapter.id);
    const book = books.find(b => b.id === chapter.bookId);
    const author = book ? authors.find(a => a.id === book.authorId) : undefined;

    return {
      ...chapter,
      book,
      author,
      progress: progress?.progress || 0,
      lastReadAt: progress?.lastReadAt,
      isCompleted: (progress?.progress || 0) >= 99,
      isReading: (progress?.progress || 0) > 0 && (progress?.progress || 0) < 99,
      isUnread: !progress || progress.progress === 0,
    };
  });

  // Filter chapters based on active tab
  const filteredChapters = chaptersWithProgress.filter(chapter => {
    if (activeFilter === 'reading') return chapter.isReading;
    if (activeFilter === 'completed') return chapter.isCompleted;
    if (activeFilter === 'unread') return chapter.isUnread;
    return true;
  });

  // Sort by last read date (most recent first), then by sequence
  const sortedChapters = [...filteredChapters].sort((a, b) => {
    if (a.lastReadAt && b.lastReadAt) {
      return new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime();
    }
    if (a.lastReadAt) return -1;
    if (b.lastReadAt) return 1;
    return a.sequence - b.sequence;
  });

  // Calculate stats
  const stats = {
    total: ownedChapters.length,
    reading: chaptersWithProgress.filter(ch => ch.isReading).length,
    completed: chaptersWithProgress.filter(ch => ch.isCompleted).length,
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container mx-auto px-4 pt-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">My Chapters</h1>
          <p className="text-muted-foreground text-lg">
            Your personal collection of purchased chapters
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-full">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">{stats.total}</div>
                <div className="text-sm text-muted-foreground tracking-tight">Total Chapters</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-200 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">{stats.reading}</div>
                <div className="text-sm text-muted-foreground tracking-tight">In Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-200 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">{stats.completed}</div>
                <div className="text-sm text-muted-foreground tracking-tight">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              className="rounded-full"
            >
              All ({stats.total})
            </Button>
            <Button
              variant={activeFilter === 'reading' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('reading')}
              className="rounded-full"
            >
              Reading ({stats.reading})
            </Button>
            <Button
              variant={activeFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('completed')}
              className="rounded-full"
            >
              Completed ({stats.completed})
            </Button>
            <Button
              variant={activeFilter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('unread')}
              className="rounded-full"
            >
              Unread
            </Button>
          </div>

          <p className="text-muted-foreground text-sm">
            {filteredChapters.length} chapter{filteredChapters.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Chapters Grid - Same as Home Page */}
        {sortedChapters.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
            <p className="text-muted-foreground">
              {activeFilter === 'all' && 'Start purchasing chapters to build your library'}
              {activeFilter === 'reading' && "You haven't started reading any chapters yet"}
              {activeFilter === 'completed' && "You haven't completed any chapters yet"}
              {activeFilter === 'unread' && "All your chapters have been started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedChapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="overflow-hidden cursor-pointer hover-lift transition-all hover:border-primary/50 rounded-3xl flex flex-col h-full"
                onClick={() => onChapterClick(chapter)}
              >
                {/* Chapter Featured Image */}
                {chapter.featuredImage && (
                  <div className="aspect-[2/1] overflow-hidden bg-muted relative flex-shrink-0">
                    <ImageWithFallback
                      src={chapter.featuredImage}
                      alt={chapter.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    {/* Progress Badge on Image */}
                    {chapter.isCompleted && (
                      <div className="absolute top-3.5 right-3.5">
                        <Badge className="bg-success/10 text-success border-success/20 backdrop-blur-sm bg-white/90 rounded-full px-3 py-1 text-xs font-medium">
                          Completed
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <CardContent className="px-4 space-y-1.5 flex flex-col flex-1">
                  {/* Book Title and Chapter Number Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {chapter.book && (
                      <Badge variant="outline" className="text-xs font-medium rounded-full px-3 py-1 max-w-[150px]">
                        <BookOpen className="h-3 w-3 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{chapter.book.title}</span>
                      </Badge>
                    )}
                    <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-1 text-xs font-medium">
                      Chapter {chapter.sequence}
                    </Badge>
                  </div>

                  {/* Chapter Title */}
                  <h3 className="font-semibold text-lg line-clamp-2 tracking-tight">
                    {chapter.title}
                  </h3>

                  {/* Description */}
                  {chapter.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 tracking-tight h-10">
                      {chapter.description}
                    </p>
                  )}

                  {/* Spacer to push footer to bottom */}
                  <div className="flex-1" />

                  {/* Progress Bar - Only for in-progress chapters */}
                  {chapter.isReading && !chapter.isCompleted && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 tracking-tight">
                        <span>Reading progress</span>
                        <span>{chapter.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${chapter.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-2">
                    <Button
                      className="w-full rounded-full text-sm"
                      variant={chapter.isCompleted ? 'outline' : 'default'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // For continue reading, use the same flow as home page
                        if (chapter.isReading && !chapter.isCompleted) {
                          onContinueReading(chapter.bookId, chapter.id);
                        } else {
                          onChapterClick(chapter);
                        }
                      }}
                    >
                      {chapter.isCompleted ? 'Read Again' : chapter.isReading ? 'Continue Reading' : 'Start Reading'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}