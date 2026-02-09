import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Eye, BookOpen, FileText, ToggleLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';
import { useContentMode } from '../../hooks/useContentMode';

export function AdminSettingsTab() {
  const [heroBackgroundUrl, setHeroBackgroundUrl] = useState('');
  const [tempUrl, setTempUrl] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isChaptersMode, setIsChaptersMode] = useState(true); // Default to chapters mode

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('hero-background-url');
    if (savedUrl) {
      setHeroBackgroundUrl(savedUrl);
      setTempUrl(savedUrl);
    } else {
      // Set default image if none exists
      const defaultUrl = 'https://images.unsplash.com/photo-1716654716572-7b13ad56ba63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';
      localStorage.setItem('hero-background-url', defaultUrl);
      setHeroBackgroundUrl(defaultUrl);
      setTempUrl(defaultUrl);
      // Dispatch event to notify WebsiteView
      window.dispatchEvent(new Event('hero-background-updated'));
    }

    // Load display mode setting
    const savedMode = localStorage.getItem('display-mode');
    if (savedMode === 'books') {
      setIsChaptersMode(false);
    } else {
      // Default to chapters mode
      setIsChaptersMode(true);
      localStorage.setItem('display-mode', 'chapters');
    }
  }, []);

  const handleToggleMode = (checked: boolean) => {
    setIsChaptersMode(checked);
    const mode = checked ? 'chapters' : 'books';
    localStorage.setItem('display-mode', mode);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('display-mode-changed', { detail: { mode } }));
    
    toast.success(`Switched to ${checked ? 'Chapters' : 'Books'} Mode`, {
      description: `The website will now prioritize ${checked ? 'chapters' : 'books'} in the browsing experience.`
    });
  };

  const handleSaveBackground = () => {
    if (!tempUrl.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    // Validate URL format
    try {
      new URL(tempUrl);
    } catch (e) {
      toast.error('Please enter a valid URL');
      return;
    }

    localStorage.setItem('hero-background-url', tempUrl);
    setHeroBackgroundUrl(tempUrl);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('hero-background-updated'));
    
    toast.success('Hero background updated successfully');
  };

  const handleRemoveBackground = () => {
    localStorage.removeItem('hero-background-url');
    setHeroBackgroundUrl('');
    setTempUrl('');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('hero-background-updated'));
    
    toast.success('Hero background removed');
  };

  const handleUseDefaultImage = () => {
    const defaultImageUrl = 'figma:asset/8aeaae5e2469ba428651bd378a1ffc19cd1d068d.png';
    setTempUrl(defaultImageUrl);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Background</CardTitle>
          <CardDescription>
            Manage the background image for the main hero section on the website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Background Preview */}
          {heroBackgroundUrl && (
            <div className="space-y-2">
              <Label>Current Background</Label>
              <div className="relative aspect-[21/9] rounded-lg overflow-hidden border bg-gray-100">
                <img
                  src={heroBackgroundUrl}
                  alt="Hero background"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">Discover Amazing Stories</h2>
                    <p className="text-lg">Read chapter by chapter or get the full book.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="background-url">Background Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="background-url"
                placeholder="https://example.com/image.jpg or figma:asset/..."
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleUseDefaultImage}
                title="Use default image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter an image URL or use the default image from your design
            </p>
          </div>

          {/* Preview */}
          {tempUrl && tempUrl !== heroBackgroundUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative aspect-[21/9] rounded-lg overflow-hidden border bg-gray-100">
                <img
                  src={tempUrl}
                  alt="Background preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">Discover Amazing Stories</h2>
                    <p className="text-lg">Read chapter by chapter or get the full book.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleSaveBackground} className="gap-2">
              <Upload className="h-4 w-4" />
              Save Background
            </Button>
            {heroBackgroundUrl && (
              <Button
                variant="destructive"
                onClick={handleRemoveBackground}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Remove Background
              </Button>
            )}
          </div>

          {/* Helper Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Use a high-resolution image (recommended: 1920x600px or larger)</li>
              <li>The image will have a dark overlay for text readability</li>
              <li>Images are stored locally in your browser</li>
              <li>For production use, consider connecting to Supabase for persistent storage</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Mode</CardTitle>
          <CardDescription>
            Choose between chapters-first and books-first browsing experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Toggle Control */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-accent/30">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isChaptersMode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <FileText className="h-5 w-5" />
                <span className="font-medium">Chapters Mode</span>
              </div>
              <Switch
                checked={isChaptersMode}
                onCheckedChange={handleToggleMode}
                className="data-[state=checked]:bg-primary"
              />
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                !isChaptersMode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Books Mode</span>
              </div>
            </div>
          </div>

          {/* Mode Description */}
          <div className={`p-4 rounded-lg border-2 transition-all ${
            isChaptersMode ? 'border-primary bg-primary/5' : 'border-muted bg-muted/30'
          }`}>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              {isChaptersMode ? (
                <>
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Chapters Mode (Active)</span>
                </>
              ) : (
                <>
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>Books Mode (Active)</span>
                </>
              )}
            </h4>
            <p className="text-sm text-muted-foreground">
              {isChaptersMode ? (
                <>
                  <strong>Primary:</strong> Individual chapters are featured prominently with dedicated browsing, filtering, and search.
                  <br />
                  <strong>Secondary:</strong> Books are shown as collections and context for chapters.
                </>
              ) : (
                <>
                  <strong>Primary:</strong> Full books are featured prominently with dedicated browsing and search.
                  <br />
                  <strong>Secondary:</strong> Chapters are shown within book details and as purchase options.
                </>
              )}
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What this affects:</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Home page layout and featured content</li>
              <li>Main browsing grid (chapters vs books)</li>
              <li>Search and filtering options</li>
              <li>Navigation menu and CTAs</li>
              <li>Analytics and dashboard metrics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}