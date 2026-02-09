/**
 * DESIGN SYSTEM FLOATING ACCESS BUTTON
 * 
 * A floating button for quick access to the Design System
 * Only shows in development mode or when enabled
 * 
 * To use: Add to App.tsx or any page
 */

import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface DesignSystemFloatingButtonProps {
  /** Show only in development mode */
  devOnly?: boolean;
  /** Custom position */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function DesignSystemFloatingButton({ 
  devOnly = true,
  position = 'bottom-right' 
}: DesignSystemFloatingButtonProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Hide in production if devOnly is true
  const isDev = process.env.NODE_ENV === 'development';
  if (devOnly && !isDev) return null;

  // Don't show on design system page itself
  if (window.location.pathname === '/design-system') return null;

  if (!isVisible) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsVisible(true)}
              className={`fixed ${getPositionClass(position)} z-50 bg-primary/20 hover:bg-primary/30 rounded-full p-2 transition-all`}
            >
              <Palette className="h-4 w-4 text-primary" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show Design System Access</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={`fixed ${getPositionClass(position)} z-50 flex flex-col gap-2`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/design-system">
              <Button 
                size="icon" 
                className="rounded-full shadow-lg hover:shadow-xl transition-all h-14 w-14"
              >
                <Palette className="h-6 w-6" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side={position.includes('right') ? 'left' : 'right'}>
            <p className="font-medium">Design System</p>
            <p className="text-xs text-muted-foreground">View all UI components</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="self-end bg-muted hover:bg-muted/80 rounded-full p-1.5 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

function getPositionClass(position: string): string {
  switch (position) {
    case 'bottom-right':
      return 'bottom-6 right-6';
    case 'bottom-left':
      return 'bottom-6 left-6';
    case 'top-right':
      return 'top-6 right-6';
    case 'top-left':
      return 'top-6 left-6';
    default:
      return 'bottom-6 right-6';
  }
}
