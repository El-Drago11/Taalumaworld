import { LogIn, ShoppingCart, BookOpen, Lock } from 'lucide-react';
import { Button } from '../ui/button';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  action: 'cart' | 'read' | 'view';
  itemType?: 'book' | 'chapter';
}

export function LoginRequiredModal({ 
  isOpen, 
  onClose, 
  onSignIn, 
  action,
  itemType = 'chapter'
}: LoginRequiredModalProps) {
  if (!isOpen) return null;

  const getContent = () => {
    switch (action) {
      case 'cart':
        return {
          icon: <ShoppingCart className="h-12 w-12 text-primary" />,
          title: 'Sign In to Add to Cart',
          description: 'Create an account or sign in to start building your library and unlock amazing stories.',
        };
      case 'read':
        return {
          icon: <BookOpen className="h-12 w-12 text-primary" />,
          title: 'Sign In to Read',
          description: `Sign in to start reading this ${itemType}. All our content requires authentication to ensure the best experience.`,
        };
      case 'view':
        return {
          icon: <Lock className="h-12 w-12 text-primary" />,
          title: 'Sign In to View Details',
          description: `Create an account or sign in to view ${itemType} details and explore our full collection.`,
        };
      default:
        return {
          icon: <LogIn className="h-12 w-12 text-primary" />,
          title: 'Sign In Required',
          description: 'Please sign in to continue.',
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 rounded-full p-6">
            {content.icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">{content.title}</h2>
          <p className="text-muted-foreground">
            {content.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 mb-6">
          <p className="text-sm font-semibold text-foreground mb-2">With a TaalumaWorld account:</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Access your purchased chapters and books anytime</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Track your reading progress across devices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Build your personal library of stories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Get personalized recommendations</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onSignIn}
            className="w-full h-12 rounded-2xl text-base font-semibold"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full h-12 rounded-2xl text-base font-semibold"
          >
            Cancel
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={onSignIn}
              className="text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}