import { X, ShoppingCart, User, BookOpen, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import type { Book, Author, Chapter } from "../../data/mockData";

interface BookDetailModalProps {
  book: Book;
  author?: Author;
  chapters: Chapter[];
  onClose: () => void;
  onAddToCart?: (chapterId: string, bookId: string) => void;
}

export function BookDetailModal({
  book,
  author,
  chapters,
  onClose,
  onAddToCart,
}: BookDetailModalProps) {
  const sortedChapters = [...chapters].sort(
    (a, b) => a.sequence - b.sequence
  );

  const handleAddToCart = () => {
    if (onAddToCart && book.pricingType === 'book') {
      onAddToCart(book.id, book.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[300] px-6 py-12 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[65vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header with Featured Image */}
        <div className="relative flex-shrink-0">
          {book.coverImage && (
            <div className="aspect-[3/1] overflow-hidden bg-muted">
              <img
                src={book.coverImage}
                alt={book.title}
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 space-y-3">
            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {book.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs font-medium rounded-full px-3 py-1 max-w-[150px]"
                >
                  <Tag className="h-3 w-3 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{tag}</span>
                </Badge>
              ))}
            </div>

            {/* Book Title */}
            <h2 className="text-2xl font-semibold tracking-tight">
              {book.title}
            </h2>

            {/* Description */}
            {book.description && (
              <p className="text-sm text-muted-foreground leading-relaxed tracking-tight">
                {book.description}
              </p>
            )}

            {/* Author Info */}
            {author && (
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground tracking-tight">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium text-foreground">{author.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground tracking-tight">
                    {author.booksCount} books published
                  </p>
                </div>
              </div>
            )}

            <Separator />

            {/* Pricing Information */}
            <div className="space-y-2">
              <h3 className="font-semibold tracking-tight">Purchase Options</h3>
              {book.pricingType === "book" && book.bookPrice && (
                <div className="bg-primary/5 border border-primary/20 rounded-3xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium tracking-tight">Complete Book</p>
                      <p className="text-sm text-muted-foreground tracking-tight">
                        Access all {chapters.length} chapters
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-primary">
                        ${book.bookPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {book.pricingType === "chapter" && (
                <div className="bg-accent/50 p-4 rounded-3xl">
                  <p className="text-sm text-muted-foreground tracking-tight">
                    Purchase individual chapters below
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Chapters List */}
            <div className="space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-semibold tracking-tight">
                  Chapters ({chapters.length})
                </h3>
              </div>

              <div className="space-y-2">
                {sortedChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border rounded-3xl p-3 space-y-2 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {chapter.featuredImage && (
                        <img
                          src={chapter.featuredImage}
                          alt={chapter.title}
                          className="w-20 h-20 object-cover rounded-2xl flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-1 text-xs font-medium">
                            Chapter {chapter.sequence}
                          </Badge>
                          {chapter.isFree && (
                            <Badge className="bg-success/10 text-success border-success/20 rounded-full px-3 py-1 text-xs font-medium">
                              Free
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm line-clamp-1 tracking-tight">
                          {chapter.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 tracking-tight">
                          {chapter.description}
                        </p>
                      </div>
                    </div>

                    {book.pricingType === "chapter" && (
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        {chapter.isFree ? (
                          <span className="text-sm font-medium text-success tracking-tight">
                            Free to read
                          </span>
                        ) : (
                          <span className="font-semibold text-lg text-primary">
                            ${chapter.price?.toFixed(2) || '0.00'}
                          </span>
                        )}
                        <Button
                          size="sm"
                          variant={chapter.isFree ? "outline" : "default"}
                          className="rounded-full"
                          onClick={() => {
                            if (onAddToCart) {
                              onAddToCart(chapter.id, book.id);
                            }
                          }}
                        >
                          {chapter.isFree ? "Read Now" : "Add to Cart"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            {author && (
              <>
                <Separator />
                <div className="space-y-2 pb-4">
                  <h3 className="font-semibold tracking-tight">
                    About the Author
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed tracking-tight">
                    {author.bio}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        {book.pricingType === "book" && book.bookPrice && (
          <div className="flex gap-2 p-4 border-t bg-white flex-shrink-0">
            <Button
              className="flex-1 gap-2 rounded-full"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Buy Complete Book - ${book.bookPrice.toFixed(2)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}