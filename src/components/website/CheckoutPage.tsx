import { useState } from 'react';
import { useFormik } from 'formik';
import { CheckCircle, Lock, CreditCard, BookOpen, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { checkoutSchema } from '../../utils/validationSchemas';
import { useGetAllBooksQuery } from '../../store/api/booksApi';
import { useGetAllChaptersQuery } from '../../store/api/chaptersApi';
import { useGetAuthorsQuery } from '../../store/api/authorsApi';
import type { Book, Chapter, Author } from '../../data/mockData';

interface CartItem {
  chapterId: string;
  bookId: string;
}

interface CheckoutPageProps {
  cartItems: CartItem[];
  onPurchaseComplete: (chapterIds: string[]) => void;
  onNavigate: (page: string) => void;
}

export function CheckoutPage({
  cartItems,
  onPurchaseComplete,
  onNavigate,
}: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  const [purchasedChapters, setPurchasedChapters] = useState<Chapter[]>([]);

  // Fetch data using RTK Query
  const { data: books = [] } = useGetAllBooksQuery();
  const { data: chapters = [] } = useGetAllChaptersQuery();
  const { data: authors = [] } = useGetAuthorsQuery();

  const formik = useFormik({
    initialValues: {
      paymentMethod: 'card',
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema: checkoutSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      // Validate cart is not empty
      if (cartItems.length === 0) {
        console.error('No valid chapters to purchase');
        return;
      }
      
      setIsProcessing(true);

      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const chapterIds = cartItems.map(item => item.chapterId);
        const purchasedChaps = chapterIds
          .map(id => chapters.find(c => c.id === id))
          .filter(Boolean) as Chapter[];
        
        setPurchasedChapters(purchasedChaps);
        onPurchaseComplete(chapterIds);
        
        setIsPurchaseComplete(true);
      } catch (error) {
        console.error('Payment processing error:', error);
      } finally {
        setIsProcessing(false);
      }
    },
  });

  // Get full chapter details for cart items
  const cartChapters = cartItems
    .map(item => chapters.find(c => c.id === item.chapterId))
    .filter(Boolean) as Chapter[];

  // Calculate totals
  const subtotal = cartChapters.reduce((sum, chapter) => {
    return sum + (chapter.isFree ? 0 : chapter.price || 0);
  }, 0);

  const total = subtotal;

  // Success State
  if (isPurchaseComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center">
            <div className="bg-success/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            
            <h1 className="text-3xl font-bold mb-3">Purchase Complete! 🎉</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your chapters are now unlocked and ready to read
            </p>

            {/* Purchased Chapters */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
              <h2 className="font-bold mb-4">Your New Chapters</h2>
              <div className="space-y-3">
                {purchasedChapters.map(chapter => {
                  const book = books.find(b => b.id === chapter.bookId);
                  return (
                    <div
                      key={chapter.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl"
                    >
                      <img
                        src={chapter.featuredImage}
                        alt={chapter.title}
                        className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">
                          {chapter.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {book?.title}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => {
                  // Navigate to first purchased chapter
                  const firstChapter = purchasedChapters[0];
                  if (firstChapter) {
                    onNavigate(`#chapter-${firstChapter.id}`);
                  }
                }}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Reading
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => onNavigate('#my-books')}
              >
                Go to My Library
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
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Secure payment processing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Payment Method */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 rounded-full p-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formik.values.cardHolder}
                      onChange={formik.handleChange}
                      required
                      className="rounded-2xl"
                      name="cardHolder"
                    />
                    {formik.touched.cardHolder && formik.errors.cardHolder ? (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.cardHolder}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={formik.values.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        if (value.length <= 16 && /^\d*$/.test(value)) {
                          formik.setFieldValue('cardNumber', value.replace(/(\d{4})/g, '$1 ').trim());
                        }
                      }}
                      required
                      className="rounded-2xl"
                      name="cardNumber"
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber ? (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.cardNumber}
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={formik.values.expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            const formatted = value.length >= 2
                              ? `${value.slice(0, 2)}/${value.slice(2)}`
                              : value;
                            formik.setFieldValue('expiryDate', formatted);
                          }
                        }}
                        required
                        className="rounded-2xl"
                        name="expiryDate"
                      />
                      {formik.touched.expiryDate && formik.errors.expiryDate ? (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.expiryDate}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <Input
                        placeholder="123"
                        type="password"
                        value={formik.values.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            formik.setFieldValue('cvv', value);
                          }
                        }}
                        required
                        className="rounded-2xl"
                        name="cvv"
                      />
                      {formik.touched.cvv && formik.errors.cvv ? (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.cvv}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex gap-3">
                  <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Secure Payment
                    </p>
                    <p className="text-xs text-blue-700">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Chapter List */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartChapters.map(chapter => {
                  const book = books.find(b => b.id === chapter.bookId);
                  return (
                    <div key={chapter.id} className="flex gap-3 text-sm">
                      <img
                        src={chapter.featuredImage}
                        alt={chapter.title}
                        className="w-12 h-16 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold line-clamp-2 text-xs mb-1">
                          {chapter.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {book?.title}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {chapter.isFree ? (
                          <span className="text-xs text-success font-medium">Free</span>
                        ) : (
                          <span className="text-sm font-semibold">
                            ${chapter.price?.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6 pb-6 border-t pt-6">
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

              {/* Action Buttons */}
              <Button
                size="lg"
                className="w-full rounded-full mb-3"
                onClick={formik.handleSubmit}
                disabled={isProcessing || !formik.isValid}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Purchase
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full"
                onClick={() => onNavigate('#')}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}