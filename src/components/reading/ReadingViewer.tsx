import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ChapterPurchaseModal } from './ChapterPurchaseModal';
import type { Chapter, Book, ContentBlock } from '../../data/mockData';

interface ReadingViewerProps {
  chapter?: Chapter;
  book?: Book;
  allChapters?: Chapter[];
  ownedChapters?: string[];
  onClose: () => void;
  onUpdateProgress?: (chapterId: string, progress: number) => void;
  onAddToCart?: (chapterId: string, bookId: string) => void;
  onPurchaseChapter?: (chapterId: string) => Promise<boolean> | void;
}

export function ReadingViewer({
  chapter,
  book,
  allChapters = [],
  ownedChapters = [],
  onClose,
  onUpdateProgress,
  onAddToCart,
  onPurchaseChapter,
}: ReadingViewerProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    chapter ? allChapters.findIndex(c => c.id === chapter.id) : 0
  );
  const [showControls, setShowControls] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lockedChapter, setLockedChapter] = useState<Chapter | null>(null);

  const currentChapter = allChapters[currentChapterIndex] || chapter;

  // Validate we have a chapter to display
  if (!currentChapter) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center">
          <p className="text-lg font-semibold mb-4">Chapter not found</p>
          <Button onClick={onClose} className="rounded-full">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setScrollProgress(0);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < allChapters.length - 1) {
      const nextChapter = allChapters[currentChapterIndex + 1];
      
      // Check if user owns the next chapter (or if it's free)
      const isOwned = ownedChapters.includes(nextChapter.id) || nextChapter.isFree;
      
      if (!isOwned) {
        // Show purchase modal for locked chapter
        setLockedChapter(nextChapter);
        return;
      }
      
      // User owns the chapter, proceed to next chapter
      setCurrentChapterIndex(currentChapterIndex + 1);
      setScrollProgress(0);
      
      // Mark current chapter as completed
      if (onUpdateProgress && currentChapter) {
        onUpdateProgress(currentChapter.id, 100);
      }
    }
  };

  const handlePurchaseChapter = (chapterId: string) => {
    if (onPurchaseChapter) {
      const purchaseResult = onPurchaseChapter(chapterId);
      if (purchaseResult instanceof Promise) {
        purchaseResult.then(success => {
          if (success) {
            // After successful purchase, the ownedChapters prop will be updated by parent
            // and the user can retry navigating to the next chapter
            setLockedChapter(null);
            // Automatically move to the next chapter after purchase
            setCurrentChapterIndex(currentChapterIndex + 1);
            setScrollProgress(0);
          }
        });
      } else {
        // If onPurchaseChapter is not a promise, assume it's a void function
        setLockedChapter(null);
        // Automatically move to the next chapter after purchase
        setCurrentChapterIndex(currentChapterIndex + 1);
        setScrollProgress(0);
      }
    }
  };

  const handleAddToCartFromModal = (chapterId: string, bookId: string) => {
    if (onAddToCart) {
      onAddToCart(chapterId, bookId);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrolled = target.scrollTop;
    const maxScroll = target.scrollHeight - target.clientHeight;
    const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    setScrollProgress(progress);
    
    // Update reading progress
    if (onUpdateProgress && currentChapter) {
      onUpdateProgress(currentChapter.id, progress);
    }
  };

  const canGoPrevious = currentChapterIndex > 0;
  const canGoNext = currentChapterIndex < allChapters.length - 1;

  // Render content blocks (text and images)
  const renderContentBlock = (block: ContentBlock, index: number) => {
    if (block.type === 'text') {
      return (
        <div key={index} className="space-y-4">
          {block.content.split('\\n\\n').map((paragraph, pIndex) => (
            <p key={pIndex} className="leading-relaxed text-[var(--text-primary)]">
              {paragraph}
            </p>
          ))}
        </div>
      );
    } else if (block.type === 'image') {
      return (
        <figure key={index} className="my-8">
          <div className="relative w-full overflow-hidden rounded-2xl bg-accent">
            <ImageWithFallback
              src={block.content}
              alt={block.alt || 'Chapter illustration'}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '70vh' }}
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className={`bg-white border-b transition-transform duration-300 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-sm truncate">
                {currentChapter?.title || 'Reading'}
              </h1>
              {book && (
                <p className="text-xs text-muted-foreground truncate">
                  {book.title} • Chapter {currentChapter?.sequence}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-accent">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Reading Content */}
      <div
        className="flex-1 overflow-y-auto scroll-smooth"
        onClick={() => setShowControls(!showControls)}
        onScroll={handleScroll}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
          {/* Chapter Title */}
          <div className="mb-10 text-center">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
              Chapter {currentChapter?.sequence}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{currentChapter?.title}</h1>
            {currentChapter?.description && (
              <p className="text-muted-foreground text-base">{currentChapter.description}</p>
            )}
          </div>

          {/* Chapter Content - Mixed text and images */}
          <div className="prose prose-sm sm:prose-base max-w-none space-y-6">
            {currentChapter?.content && currentChapter.content.length > 0 ? (
              currentChapter.content.map((block, index) => renderContentBlock(block, index))
            ) : (
              <p className="leading-relaxed text-muted-foreground text-center py-12">
                No content available for this chapter.
              </p>
            )}
          </div>

          {/* End of Chapter Indicator */}
          {canGoNext && (
            <div className="mt-16 mb-8 text-center">
              <div className="inline-block border-t border-border w-32 mb-6"></div>
              <p className="text-sm text-muted-foreground mb-4">End of Chapter {currentChapter?.sequence}</p>
              <Button
                onClick={handleNextChapter}
                className="rounded-full"
              >
                Continue to Next Chapter
              </Button>
            </div>
          )}

          {!canGoNext && (
            <div className="mt-16 mb-8 text-center">
              <div className="inline-block border-t border-border w-32 mb-6"></div>
              <p className="text-sm text-muted-foreground">You've reached the end of available chapters</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={`bg-white border-t transition-transform duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousChapter}
            disabled={!canGoPrevious}
            className="rounded-full gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Chapter
          </Button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Chapter</span>
            <span className="font-semibold">{currentChapter?.sequence}</span>
            {allChapters.length > 0 && (
              <>
                <span className="text-muted-foreground">of</span>
                <span className="font-semibold">{allChapters.length}</span>
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={handleNextChapter}
            disabled={!canGoNext}
            className="rounded-full gap-2"
          >
            Next Chapter
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chapter Purchase Modal */}
      {lockedChapter && (
        <ChapterPurchaseModal
          chapter={lockedChapter}
          book={book}
          onClose={() => setLockedChapter(null)}
          onPurchase={handlePurchaseChapter}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
    </div>
  );
}