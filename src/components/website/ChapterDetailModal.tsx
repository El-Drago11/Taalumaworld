import { X, FileText, User, BookOpen, DollarSign, ShoppingCart, Download, Lock, Unlock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Chapter, Book, Author } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface ChapterDetailModalProps {
  chapter: Chapter;
  book?: Book;
  author?: Author;
  onClose: () => void;
  onAddToCart?: (chapterId: string, bookId: string) => void;
  onStartReading?: (bookId: string, chapterId: string) => void;
  isOwned?: boolean;
}

export function ChapterDetailModal({
  chapter,
  book,
  author,
  onClose,
  onAddToCart,
  onStartReading,
  isOwned = false,
}: ChapterDetailModalProps) {
  const canRead = chapter.isFree || isOwned;

  const handleAddToCart = () => {
    if (isOwned) {
      toast.info('You already own this chapter!');
      return;
    }
    if (chapter.isFree) {
      toast.info('This chapter is free, just start reading!');
      return;
    }
    if (onAddToCart && book) {
      onAddToCart(chapter.id, book.id);
      // Toast is now handled in useCart hook
    }
  };

  const handleReadClick = () => {
    if (!canRead) {
      toast.error('Please purchase this chapter to read it');
      return;
    }
    if (book && onStartReading) {
      onStartReading(book.id, chapter.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[300] px-6 py-12 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[65vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header with Featured Image */}
        <div className="relative flex-shrink-0">
          {chapter.featuredImage && (
            <div className="aspect-[3/1] overflow-hidden bg-muted">
              <img
                src={chapter.featuredImage}
                alt={chapter.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 bg-white/90 hover:bg-white rounded-full p-2 transition-colors backdrop-blur-sm shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content - Scrollable if needed but optimized to fit */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 min-w-0">
          {/* Chapter Header */}
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-1 text-xs font-medium">
                Chapter {chapter.sequence}
              </Badge>
              {chapter.isFree && (
                <Badge className="bg-success/10 text-success border-success/20 rounded-full px-3 py-1 text-xs font-medium">
                  Free
                </Badge>
              )}
              {book && (
                <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-medium max-w-[200px]">
                  <BookOpen className="h-3 w-3 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{book.title}</span>
                </Badge>
              )}
            </div>

            <h2 className="text-2xl font-semibold leading-tight tracking-tight break-words">{chapter.title}</h2>

            {author && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm tracking-tight min-w-0">
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{author.name}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {chapter.description && (
            <div className="min-w-0">
              <h3 className="font-semibold text-sm mb-1.5 tracking-tight">About this Chapter</h3>
              <p className="text-sm text-muted-foreground leading-relaxed tracking-tight break-words">
                {chapter.description}
              </p>
            </div>
          )}

          {/* Chapter Details - More Compact Grid */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-accent/30 rounded-2xl">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground tracking-tight">Pages</div>
                <div className="font-semibold text-sm tracking-tight">{chapter.pageCount || 0}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground tracking-tight">Price</div>
                <div className="font-semibold text-sm tracking-tight">
                  {chapter.isFree ? 'Free' : `$${chapter.price?.toFixed(2) || '0.00'}`}
                </div>
              </div>
            </div>
            {book && (
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground tracking-tight">Part of</div>
                  <div className="font-semibold text-sm line-clamp-1 tracking-tight">{book.title}</div>
                </div>
              </div>
            )}
          </div>

          {/* Book Context - More Compact */}
          {book && (
            <div className="border-t pt-3">
              <h3 className="font-semibold text-sm mb-2 tracking-tight">About the Book</h3>
              <div className="flex gap-3">
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-2xl flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1 tracking-tight">{book.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed tracking-tight">
                    {book.description}
                  </p>
                  {book.tags && book.tags.length > 0 && (
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {book.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-full px-2 py-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="flex gap-3 p-4 border-t bg-white flex-shrink-0">
          {chapter.isFree ? (
            <Button 
              className="flex-1 gap-2 rounded-full" 
              size="lg"
              onClick={handleReadClick}
            >
              <BookOpen className="h-4 w-4" />
              Read Free Chapter
            </Button>
          ) : (
            <Button
              className="flex-1 gap-2 rounded-full"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart - ${chapter.price?.toFixed(2) || '0.00'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}