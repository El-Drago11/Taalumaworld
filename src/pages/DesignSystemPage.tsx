import { useState } from 'react';
import { 
  Check, 
  X, 
  Search, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  XCircle,
  Loader2,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Star,
  Heart,
  Share2,
  Bookmark,
  Send,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  User,
  Users,
  Settings,
  LogOut,
  BookOpen,
  FileText,
  CreditCard,
  Home,
  Library
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Slider } from '../components/ui/slider';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '../components/ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../components/ui/alert-dialog';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '../components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { toast } from 'sonner@2.0.3';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Skeleton } from '../components/ui/skeleton';

export default function DesignSystemPage() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [progress, setProgress] = useState(60);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Taaluma Design System</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Professional UI Components Library - Single Source of Truth
              </p>
            </div>
            <Badge variant="default" className="text-sm">v1.0.0</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-9 gap-2 h-auto p-2">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="overlays">Overlays</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
          </TabsList>

          {/* ===== COLORS SECTION ===== */}
          <TabsContent value="colors" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Color Palette</h2>
              <p className="text-muted-foreground mb-6">
                Professional LinkedIn-style blue, white, and black color scheme for college graduates and young professionals.
              </p>

              {/* Primary Colors */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Primary Colors - LinkedIn Blue</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Primary</span>
                    </div>
                    <p className="text-xs font-mono">#0A66C2</p>
                    <p className="text-xs text-muted-foreground">--primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#378FE9] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Light</span>
                    </div>
                    <p className="text-xs font-mono">#378FE9</p>
                    <p className="text-xs text-muted-foreground">--primary-light</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#70B5F9] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Lighter</span>
                    </div>
                    <p className="text-xs font-mono">#70B5F9</p>
                    <p className="text-xs text-muted-foreground">--primary-lighter</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#004182] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Dark</span>
                    </div>
                    <p className="text-xs font-mono">#004182</p>
                    <p className="text-xs text-muted-foreground">--primary-dark</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#003366] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Darker</span>
                    </div>
                    <p className="text-xs font-mono">#003366</p>
                    <p className="text-xs text-muted-foreground">--primary-darker</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#EFF6FC] border border-border flex items-center justify-center">
                      <span className="text-foreground font-medium text-sm">Accent</span>
                    </div>
                    <p className="text-xs font-mono">#EFF6FC</p>
                    <p className="text-xs text-muted-foreground">--accent</p>
                  </div>
                </div>
              </div>

              {/* Neutral Colors */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Neutral Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#FAFAFA] border border-border flex items-center justify-center">
                      <span className="text-foreground font-medium text-sm">Background</span>
                    </div>
                    <p className="text-xs font-mono">#FAFAFA</p>
                    <p className="text-xs text-muted-foreground">--background</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Foreground</span>
                    </div>
                    <p className="text-xs font-mono">#1A1A1A</p>
                    <p className="text-xs text-muted-foreground">--foreground</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#FFFFFF] border border-border flex items-center justify-center">
                      <span className="text-foreground font-medium text-sm">Card</span>
                    </div>
                    <p className="text-xs font-mono">#FFFFFF</p>
                    <p className="text-xs text-muted-foreground">--card</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#F5F5F5] border border-border flex items-center justify-center">
                      <span className="text-foreground font-medium text-sm">Muted</span>
                    </div>
                    <p className="text-xs font-mono">#F5F5F5</p>
                    <p className="text-xs text-muted-foreground">--muted</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#E5E5E5] border border-border flex items-center justify-center">
                      <span className="text-foreground font-medium text-sm">Border</span>
                    </div>
                    <p className="text-xs font-mono">#E5E5E5</p>
                    <p className="text-xs text-muted-foreground">--border</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#6B6B6B] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Muted FG</span>
                    </div>
                    <p className="text-xs font-mono">#6B6B6B</p>
                    <p className="text-xs text-muted-foreground">--muted-foreground</p>
                  </div>
                </div>
              </div>

              {/* Status Colors */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Status Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#10B981] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Success</span>
                    </div>
                    <p className="text-xs font-mono">#10B981</p>
                    <p className="text-xs text-muted-foreground">--success</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#F59E0B] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Warning</span>
                    </div>
                    <p className="text-xs font-mono">#F59E0B</p>
                    <p className="text-xs text-muted-foreground">--warning</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#EF4444] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Error</span>
                    </div>
                    <p className="text-xs font-mono">#EF4444</p>
                    <p className="text-xs text-muted-foreground">--destructive</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Info</span>
                    </div>
                    <p className="text-xs font-mono">#3B82F6</p>
                    <p className="text-xs text-muted-foreground">--info</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ===== TYPOGRAPHY SECTION ===== */}
          <TabsContent value="typography" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Typography System</h2>
              <p className="text-muted-foreground mb-6">
                Professional, readable typography for college graduates and young professionals.
              </p>

              {/* Headings */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Headings</h3>
                <Card>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                      <h1>Heading 1 - The quick brown fox jumps over the lazy dog</h1>
                      <p className="text-sm text-muted-foreground">text-3xl • font-bold • line-height: 1.3 • letter-spacing: -0.02em</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h2>Heading 2 - The quick brown fox jumps over the lazy dog</h2>
                      <p className="text-sm text-muted-foreground">text-2xl • font-semibold • line-height: 1.4 • letter-spacing: -0.01em</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3>Heading 3 - The quick brown fox jumps over the lazy dog</h3>
                      <p className="text-sm text-muted-foreground">text-xl • font-semibold • line-height: 1.5</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4>Heading 4 - The quick brown fox jumps over the lazy dog</h4>
                      <p className="text-sm text-muted-foreground">text-lg • font-medium • line-height: 1.5</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h5>Heading 5 - The quick brown fox jumps over the lazy dog</h5>
                      <p className="text-sm text-muted-foreground">text-base • font-medium • line-height: 1.5</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h6>Heading 6 - The quick brown fox jumps over the lazy dog</h6>
                      <p className="text-sm text-muted-foreground">text-sm • font-medium • line-height: 1.5 • color: muted-foreground</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Body Text */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Body Text</h3>
                <Card>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                      <p className="text-lg">Large Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <p className="text-sm text-muted-foreground">text-lg • font-normal • line-height: 1.6</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p>Regular Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <p className="text-sm text-muted-foreground">text-base • font-normal • line-height: 1.6</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm">Small Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <p className="text-sm text-muted-foreground">text-sm • font-normal • line-height: 1.6</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-xs">Extra Small Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p className="text-sm text-muted-foreground">text-xs • font-normal • line-height: 1.6</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Special Text */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Special Text Styles</h3>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-bold">Bold Text</p>
                        <p className="text-xs text-muted-foreground mt-1">font-bold (700)</p>
                      </div>
                      <div>
                        <p className="font-semibold">Semibold Text</p>
                        <p className="text-xs text-muted-foreground mt-1">font-semibold (600)</p>
                      </div>
                      <div>
                        <p className="font-medium">Medium Text</p>
                        <p className="text-xs text-muted-foreground mt-1">font-medium (500)</p>
                      </div>
                      <div>
                        <p className="font-normal">Normal Text</p>
                        <p className="text-xs text-muted-foreground mt-1">font-normal (400)</p>
                      </div>
                      <div>
                        <p className="italic">Italic Text</p>
                        <p className="text-xs text-muted-foreground mt-1">italic</p>
                      </div>
                      <div>
                        <p className="underline">Underlined Text</p>
                        <p className="text-xs text-muted-foreground mt-1">underline</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Muted Text</p>
                        <p className="text-xs text-muted-foreground mt-1">text-muted-foreground</p>
                      </div>
                      <div>
                        <p className="text-primary">Primary Colored Text</p>
                        <p className="text-xs text-muted-foreground mt-1">text-primary</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== BUTTONS SECTION ===== */}
          <TabsContent value="buttons" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Button Components</h2>
              <p className="text-muted-foreground mb-6">
                All button variants with different sizes, states, and styles.
              </p>

              {/* Variants */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Button Variants</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label>Default (Primary)</Label>
                        <Button variant="default" className="w-full">Primary Button</Button>
                        <p className="text-xs text-muted-foreground">variant="default"</p>
                      </div>
                      <div className="space-y-3">
                        <Label>Secondary</Label>
                        <Button variant="secondary" className="w-full">Secondary Button</Button>
                        <p className="text-xs text-muted-foreground">variant="secondary"</p>
                      </div>
                      <div className="space-y-3">
                        <Label>Outline</Label>
                        <Button variant="outline" className="w-full">Outline Button</Button>
                        <p className="text-xs text-muted-foreground">variant="outline"</p>
                      </div>
                      <div className="space-y-3">
                        <Label>Ghost</Label>
                        <Button variant="ghost" className="w-full">Ghost Button</Button>
                        <p className="text-xs text-muted-foreground">variant="ghost"</p>
                      </div>
                      <div className="space-y-3">
                        <Label>Destructive</Label>
                        <Button variant="destructive" className="w-full">Destructive Button</Button>
                        <p className="text-xs text-muted-foreground">variant="destructive"</p>
                      </div>
                      <div className="space-y-3">
                        <Label>Link</Label>
                        <Button variant="link" className="w-full">Link Button</Button>
                        <p className="text-xs text-muted-foreground">variant="link"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="space-y-2">
                        <Button size="sm">Small</Button>
                        <p className="text-xs text-muted-foreground">size="sm"</p>
                      </div>
                      <div className="space-y-2">
                        <Button size="default">Default</Button>
                        <p className="text-xs text-muted-foreground">size="default"</p>
                      </div>
                      <div className="space-y-2">
                        <Button size="lg">Large</Button>
                        <p className="text-xs text-muted-foreground">size="lg"</p>
                      </div>
                      <div className="space-y-2">
                        <Button size="icon"><Plus className="h-4 w-4" /></Button>
                        <p className="text-xs text-muted-foreground">size="icon"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* States */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Button States</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label>Normal</Label>
                        <Button className="w-full">Normal State</Button>
                      </div>
                      <div className="space-y-3">
                        <Label>Disabled</Label>
                        <Button disabled className="w-full">Disabled State</Button>
                      </div>
                      <div className="space-y-3">
                        <Label>Loading</Label>
                        <Button disabled className="w-full">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* With Icons */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Buttons with Icons</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="secondary">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <Button variant="ghost">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button>
                        Send
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== FORMS SECTION ===== */}
          <TabsContent value="forms" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Form Components</h2>
              <p className="text-muted-foreground mb-6">
                Input fields, textareas, selects, checkboxes, radios, and switches.
              </p>

              {/* Text Inputs */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Text Inputs</h3>
                <Card>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="default-input">Default Input</Label>
                      <Input id="default-input" placeholder="Enter text here..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-input">Email Input</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email-input" type="email" placeholder="you@example.com" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-input">Password Input</Label>
                      <div className="relative">
                        <Input id="password-input" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="search-input">Search Input</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="search-input" placeholder="Search..." className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disabled-input">Disabled Input</Label>
                      <Input id="disabled-input" placeholder="Disabled..." disabled />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Textarea */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Textarea</h3>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="textarea">Message</Label>
                      <Textarea 
                        id="textarea" 
                        placeholder="Type your message here..." 
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Select */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Select Dropdown</h3>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label>Select an Option</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                          <SelectItem value="option4">Option 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Checkbox & Radio */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Checkboxes & Radio Buttons</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Checkboxes */}
                      <div className="space-y-4">
                        <Label>Checkboxes</Label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="checkbox1" />
                            <label htmlFor="checkbox1" className="text-sm cursor-pointer">
                              Checkbox Option 1
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="checkbox2" checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
                            <label htmlFor="checkbox2" className="text-sm cursor-pointer">
                              Checkbox Option 2 (Checked)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="checkbox3" disabled />
                            <label htmlFor="checkbox3" className="text-sm cursor-not-allowed opacity-50">
                              Checkbox Option 3 (Disabled)
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Radio Buttons */}
                      <div className="space-y-4">
                        <Label>Radio Buttons</Label>
                        <RadioGroup defaultValue="option1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option1" id="radio1" />
                            <Label htmlFor="radio1" className="cursor-pointer">Radio Option 1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option2" id="radio2" />
                            <Label htmlFor="radio2" className="cursor-pointer">Radio Option 2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option3" id="radio3" disabled />
                            <Label htmlFor="radio3" className="cursor-not-allowed opacity-50">Radio Option 3 (Disabled)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Switch */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Toggle Switch</h3>
                <Card>
                  <CardContent className="space-y-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="switch1">Enable notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications</p>
                      </div>
                      <Switch id="switch1" checked={switchChecked} onCheckedChange={setSwitchChecked} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="switch2">Marketing emails</Label>
                        <p className="text-sm text-muted-foreground">Receive marketing communications</p>
                      </div>
                      <Switch id="switch2" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between opacity-50">
                      <div>
                        <Label htmlFor="switch3">Disabled switch</Label>
                        <p className="text-sm text-muted-foreground">This option is not available</p>
                      </div>
                      <Switch id="switch3" disabled />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== CARDS SECTION ===== */}
          <TabsContent value="cards" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Card Components</h2>
              <p className="text-muted-foreground mb-6">
                Various card layouts for different content types.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Card</CardTitle>
                    <CardDescription>Simple card with header and content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a basic card component with a header and content area.
                    </p>
                  </CardContent>
                </Card>

                {/* Card with Footer */}
                <Card>
                  <CardHeader>
                    <CardTitle>Card with Footer</CardTitle>
                    <CardDescription>Includes action buttons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This card includes a footer section for actions.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                  </CardFooter>
                </Card>

                {/* Card with Image */}
                <Card className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-50" />
                  </div>
                  <CardHeader>
                    <CardTitle>Image Card</CardTitle>
                    <CardDescription>Card with visual header</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Perfect for book covers or featured content.
                    </p>
                  </CardContent>
                </Card>

                {/* Stat Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                {/* User Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">John Doe</CardTitle>
                        <CardDescription>john@example.com</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Badge>Professional</Badge>
                      <Badge variant="secondary">Verified</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Card */}
                <Card className="hover-lift cursor-pointer transition-all">
                  <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                    <CardDescription>Hover to see effect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This card has hover effects for better interactivity.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Learn More
                      <span className="ml-2">→</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== FEEDBACK SECTION ===== */}
          <TabsContent value="feedback" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Feedback Components</h2>
              <p className="text-muted-foreground mb-6">
                Alerts, badges, progress bars, and toast notifications.
              </p>

              {/* Alerts */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Alerts</h3>
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert message.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">Success</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      Your changes have been saved successfully!
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="text-yellow-600">Warning</AlertTitle>
                    <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                      Please review your information before proceeding.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Something went wrong. Please try again.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* Badges */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Badges</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge className="bg-green-500">Success</Badge>
                      <Badge className="bg-yellow-500">Warning</Badge>
                      <Badge className="bg-blue-500">Info</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bars */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Progress Indicators</h3>
                <Card>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Progress: {progress}%</Label>
                        <span className="text-muted-foreground">{progress}/100</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                    <div className="space-y-2">
                      <Label>25% Complete</Label>
                      <Progress value={25} />
                    </div>
                    <div className="space-y-2">
                      <Label>50% Complete</Label>
                      <Progress value={50} />
                    </div>
                    <div className="space-y-2">
                      <Label>75% Complete</Label>
                      <Progress value={75} />
                    </div>
                    <div className="space-y-2">
                      <Label>100% Complete</Label>
                      <Progress value={100} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skeletons */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Loading Skeletons</h3>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Toast Notifications */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Toast Notifications</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button onClick={() => toast.success('Success!', { description: 'Your action was successful.' })}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Success Toast
                      </Button>
                      <Button variant="destructive" onClick={() => toast.error('Error!', { description: 'Something went wrong.' })}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Error Toast
                      </Button>
                      <Button variant="outline" onClick={() => toast.info('Info', { description: 'This is an information message.' })}>
                        <Info className="mr-2 h-4 w-4" />
                        Info Toast
                      </Button>
                      <Button variant="secondary" onClick={() => toast('Default', { description: 'This is a default toast.' })}>
                        Default Toast
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== NAVIGATION SECTION ===== */}
          <TabsContent value="navigation" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Navigation Components</h2>
              <p className="text-muted-foreground mb-6">
                Tabs, breadcrumbs, pagination, and menus.
              </p>

              {/* Tabs */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Tabs</h3>
                <Card>
                  <CardContent className="pt-6">
                    <Tabs defaultValue="tab1">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="tab1">Account</TabsTrigger>
                        <TabsTrigger value="tab2">Password</TabsTrigger>
                        <TabsTrigger value="tab3">Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab1" className="mt-4">
                        <p className="text-sm text-muted-foreground">Account settings content goes here.</p>
                      </TabsContent>
                      <TabsContent value="tab2" className="mt-4">
                        <p className="text-sm text-muted-foreground">Password settings content goes here.</p>
                      </TabsContent>
                      <TabsContent value="tab3" className="mt-4">
                        <p className="text-sm text-muted-foreground">General settings content goes here.</p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Breadcrumbs */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Breadcrumbs</h3>
                <Card>
                  <CardContent className="pt-6">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Library</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Books</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </CardContent>
                </Card>
              </div>

              {/* Dropdown Menu */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Dropdown Menu</h3>
                <Card>
                  <CardContent className="pt-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <User className="mr-2 h-4 w-4" />
                          Profile Menu
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </div>

              {/* Accordion */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Accordion</h3>
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What is Taaluma?</AccordionTrigger>
                        <AccordionContent>
                          Taaluma is a professional learning platform designed for college graduates and young professionals.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How does it work?</AccordionTrigger>
                        <AccordionContent>
                          Access curated content from thought leaders, organized into focused areas relevant to your career.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes, Taaluma is built with accessibility in mind and follows best practices.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== OVERLAYS SECTION ===== */}
          <TabsContent value="overlays" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overlay Components</h2>
              <p className="text-muted-foreground mb-6">
                Dialogs, sheets, tooltips, and popovers.
              </p>

              {/* Dialog */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Dialog (Modal)</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                            <DialogDescription>
                              This is a dialog component for important actions or information.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              Dialog content goes here. You can add forms, information, or any other content.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Confirm</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Item</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your item.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sheet (Drawer) */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Sheet (Side Drawer)</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 flex-wrap">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">Open Right Sheet</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Sheet Title</SheetTitle>
                            <SheetDescription>
                              This is a sheet component that slides from the side.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              Perfect for filters, settings, or additional information.
                            </p>
                          </div>
                        </SheetContent>
                      </Sheet>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">Open Left Sheet</Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                          <SheetHeader>
                            <SheetTitle>Left Sheet</SheetTitle>
                            <SheetDescription>
                              Slides from the left side.
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tooltip */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Tooltips</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 flex-wrap">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Hover me</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is a tooltip</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Additional information</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== DATA DISPLAY SECTION ===== */}
          <TabsContent value="data" className="space-y-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Data Display Components</h2>
              <p className="text-muted-foreground mb-6">
                Avatars, separators, and other data presentation elements.
              </p>

              {/* Avatars */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Avatars</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-6 items-center">
                      <div className="text-center space-y-2">
                        <Avatar className="h-20 w-20 mx-auto">
                          <AvatarFallback>XL</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">Extra Large</p>
                      </div>
                      <div className="text-center space-y-2">
                        <Avatar className="h-16 w-16 mx-auto">
                          <AvatarFallback>LG</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">Large</p>
                      </div>
                      <div className="text-center space-y-2">
                        <Avatar className="h-12 w-12 mx-auto">
                          <AvatarFallback>MD</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">Medium</p>
                      </div>
                      <div className="text-center space-y-2">
                        <Avatar className="h-10 w-10 mx-auto">
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">Small</p>
                      </div>
                      <div className="text-center space-y-2">
                        <Avatar className="h-8 w-8 mx-auto">
                          <AvatarFallback className="text-xs">XS</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">Extra Small</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Separators */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Separators</h3>
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <p className="text-sm mb-4">Horizontal Separator</p>
                      <Separator />
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm">Vertical</p>
                      <Separator orientation="vertical" className="h-8" />
                      <p className="text-sm">Separator</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Icons Grid */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Common Icons</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                      <TooltipProvider>
                        {[
                          { icon: Home, name: 'Home' },
                          { icon: User, name: 'User' },
                          { icon: Settings, name: 'Settings' },
                          { icon: Search, name: 'Search' },
                          { icon: Mail, name: 'Mail' },
                          { icon: Phone, name: 'Phone' },
                          { icon: Calendar, name: 'Calendar' },
                          { icon: Clock, name: 'Clock' },
                          { icon: BookOpen, name: 'Book' },
                          { icon: FileText, name: 'File' },
                          { icon: Star, name: 'Star' },
                          { icon: Heart, name: 'Heart' },
                          { icon: Share2, name: 'Share' },
                          { icon: Download, name: 'Download' },
                          { icon: Upload, name: 'Upload' },
                          { icon: Trash2, name: 'Delete' },
                        ].map(({ icon: Icon, name }) => (
                          <Tooltip key={name}>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                <Icon className="h-6 w-6" />
                                <p className="text-xs text-muted-foreground">{name}</p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{name} Icon</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Slider */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Slider</h3>
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Value: {sliderValue[0]}</Label>
                      </div>
                      <Slider 
                        value={sliderValue} 
                        onValueChange={setSliderValue}
                        max={100}
                        step={1}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
