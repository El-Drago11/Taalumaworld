import { useState } from 'react';
import { ShoppingCart, Trash2, X, Lock, Unlock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import type { Chapter, Book } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface CartProps {
  cartItems: string[];
  chapters: Chapter[];
  books: Book[];
  ownedChapters: string[];
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onCheckout: (itemIds: string[]) => void;
}

export function Cart({
  cartItems,
  chapters,
  books,
  ownedChapters,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
}: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter out items that are already owned or don't exist
  const validCartItems = cartItems.filter(itemId => {
    const chapter = chapters.find(c => c.id === itemId);
    return chapter && !ownedChapters.includes(itemId) && !chapter.isFree;
  });

  const cartChapters = validCartItems
    .map(id => chapters.find(c => c.id === id))
    .filter((c): c is Chapter => c !== undefined);

  const totalPrice = cartChapters.reduce((sum, chapter) => sum + (chapter.price || 0), 0);

  const handleCheckout = () => {
    if (validCartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    onCheckout(validCartItems);
    setIsOpen(false);
    toast.success(`Successfully purchased ${validCartItems.length} chapter${validCartItems.length > 1 ? 's' : ''}!`, {
      description: 'Your chapters are now available in "My Books"'
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative rounded-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {validCartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
              {validCartItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({validCartItems.length})
          </SheetTitle>
          <SheetDescription>
            {validCartItems.length === 0 
              ? 'Add chapters to your cart to purchase them' 
              : 'Review your selected chapters and complete your purchase'}
          </SheetDescription>
        </SheetHeader>

        {validCartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={() => setIsOpen(false)} className="rounded-full">
                Browse Chapters
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {cartChapters.map((chapter) => {
                const book = books.find(b => b.id === chapter.bookId);
                return (
                  <div
                    key={chapter.id}
                    className="bg-accent/30 rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={chapter.featuredImage}
                        alt={chapter.title}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-semibold text-sm line-clamp-1">
                          {chapter.title}
                        </h4>
                        {book && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {book.title}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs font-medium">
                            Chapter {chapter.sequence}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromCart(chapter.id)}
                        className="rounded-full h-8 w-8 p-0 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="font-semibold">${chapter.price.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full rounded-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  <Unlock className="h-4 w-4 mr-2" />
                  Complete Purchase
                </Button>
                <Button
                  variant="ghost"
                  className="w-full rounded-full"
                  onClick={onClearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}