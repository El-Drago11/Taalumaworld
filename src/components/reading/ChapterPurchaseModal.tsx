import { X, Lock, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import type { Chapter, Book } from '../../data/mockData';

interface ChapterPurchaseModalProps {
  chapter: Chapter;
  book?: Book;
  onClose: () => void;
  onAddToCart: (chapterId: string, bookId: string) => void;
  onPurchase: (chapterId: string) => Promise<boolean> | void;
}

export function ChapterPurchaseModal({
  chapter,
  book,
  onClose,
  onAddToCart,
  onPurchase,
}: ChapterPurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleQuickPurchase = async () => {
    setIsProcessing(true);
    
    try {
      // Call the purchase function and wait for validation
      const result = onPurchase(chapter.id);
      
      // If onPurchase returns a Promise, wait for it
      const isSuccess = result instanceof Promise ? await result : true;
      
      if (isSuccess !== false) {
        // Payment successful - the parent component will show success toast
        onClose();
      } else {
        // Payment failed
        toast.error('Payment Failed', {
          description: 'Please try again or contact support.',
        });
        setIsProcessing(false);
      }
    } catch (error) {
      // Handle any errors during payment processing
      toast.error('Payment Error', {
        description: 'An error occurred during payment processing.',
      });
      setIsProcessing(false);
    }
  };

  const handleAddToCart = () => {
    if (book) {
      onAddToCart(chapter.id, book.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-warning" />
            </div>
            <h2 className="text-xl font-bold">Chapter Locked</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Chapter Info */}
          <div className="bg-accent/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full">
                Chapter {chapter.sequence}
              </Badge>
            </div>
            <h3 className="font-bold text-lg">{chapter.title}</h3>
            {chapter.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {chapter.description}
              </p>
            )}
            {book && (
              <p className="text-sm text-muted-foreground">
                From: <span className="font-medium text-foreground">{book.title}</span>
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-foreground">
              You need to purchase this chapter to continue reading.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-foreground">Chapter Price:</span>
                <span className="text-2xl font-bold text-primary">
                  ${chapter.price?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleQuickPurchase}
              className="w-full rounded-full text-base py-6 gap-2"
              size="lg"
              disabled={isProcessing}
            >
              <ShoppingCart className="h-5 w-5" />
              {isProcessing ? 'Processing Payment...' : 'Purchase & Continue Reading'}
            </Button>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full rounded-full text-base py-6"
              size="lg"
            >
              Add to Cart for Later
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full rounded-full"
            >
              Go Back
            </Button>
          </div>

          {/* Info Note */}
          <div className="text-xs text-muted-foreground text-center bg-accent/20 rounded-2xl p-3">
            💡 Once purchased, you'll have unlimited access to this chapter and can read it anytime.
          </div>
        </div>
      </div>
    </div>
  );
}