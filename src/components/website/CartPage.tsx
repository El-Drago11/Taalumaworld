import { Trash2, ShoppingCart, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useGetAllBooksQuery } from '../../store/api/booksApi';
import { useGetAllChaptersQuery } from '../../store/api/chaptersApi';
import { useGetAuthorsQuery } from '../../store/api/authorsApi';
import type { Book, Chapter, Author } from '../../data/mockData';

interface CartItem {
  chapterId: string;
  bookId: string;
}

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (chapterId: string) => void;
  onCheckout: () => void;
}

export function CartPage({
  cartItems,
  onRemoveFromCart,
  onCheckout,
}: CartPageProps) {
  // Fetch data using RTK Query
  const { data: books = [] } = useGetAllBooksQuery();
  const { data: chapters = [] } = useGetAllChaptersQuery();
  const { data: authors = [] } = useGetAuthorsQuery();

  // Get full chapter details for cart items
  const cartChapters = cartItems
    .map(item => chapters.find(c => c.id === item.chapterId))
    .filter(Boolean) as Chapter[];

  // Calculate totals
  const subtotal = cartChapters.reduce((sum, chapter) => {
    return sum + (chapter.isFree ? 0 : chapter.price || 0);
  }, 0);

  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-12 shadow-sm">
              <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding chapters to your cart to begin your reading journey!
              </p>
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => window.history.back()}
              >
                Browse Chapters
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartChapters.length} {cartChapters.length === 1 ? 'chapter' : 'chapters'} ready for checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartChapters.map(chapter => {
              const book = books.find(b => b.id === chapter.bookId);
              const author = book ? authors.find(a => a.id === book.authorId) : null;

              return (
                <div
                  key={chapter.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-border"
                >
                  <div className="flex gap-4">
                    {/* Chapter Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={chapter.featuredImage}
                        alt={chapter.title}
                        className="w-24 h-32 object-cover rounded-2xl"
                      />
                    </div>

                    {/* Chapter Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs rounded-full">
                              Chapter {chapter.sequence}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg mb-1 line-clamp-2">
                            {chapter.title}
                          </h3>
                          {book && (
                            <p className="text-sm text-muted-foreground mb-1 line-clamp-1">
                              <BookOpen className="h-3.5 w-3.5 inline mr-1" />
                              {book.title}
                            </p>
                          )}
                          {author && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              by {author.name}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          {chapter.isFree ? (
                            <Badge className="bg-success/10 text-success border-success/20 rounded-full">
                              Free
                            </Badge>
                          ) : (
                            <p className="text-xl font-bold text-primary">
                              ${chapter.price?.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromCart(chapter.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full -ml-2"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{cartChapters.length}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 pb-6 border-b">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full rounded-full mb-3"
                onClick={onCheckout}
                disabled={cartChapters.length === 0}
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              {cartChapters.length === 0 && (
                <p className="text-xs text-center text-muted-foreground">
                  All chapters in your cart are already owned
                </p>
              )}

              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => window.history.back()}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}