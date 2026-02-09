# Taaluma Design System Documentation

## Overview
This is the complete design system for **Taaluma.world** - a professional learning platform for college graduates and young professionals. All UI components are centralized, reusable, and follow strict design consistency rules.

---

## 🎨 Design Philosophy
- **Professional LinkedIn-style** aesthetic with blue (#0A66C2), white, and black
- **Consistent spacing, typography, and colors** across all pages
- **Single source of truth** - all components live in `/components/ui/`
- **No one-off styles** - always use design system components

---

## 📍 Accessing the Design System
Visit `/design-system` in your browser to see the complete interactive component library with all variants, sizes, and states.

---

## 🎨 Color Palette

### Primary Colors (LinkedIn Blue)
```css
--primary: #0A66C2           /* Main brand color */
--primary-light: #378FE9     /* Hover states */
--primary-lighter: #70B5F9   /* Light backgrounds */
--primary-dark: #004182      /* Active states */
--primary-darker: #003366    /* Deep emphasis */
--accent: #EFF6FC            /* Light blue accent backgrounds */
```

### Neutral Colors
```css
--background: #FAFAFA        /* Page background (light mode) */
--foreground: #1A1A1A        /* Primary text color */
--card: #FFFFFF              /* Card backgrounds */
--muted: #F5F5F5             /* Muted backgrounds */
--muted-foreground: #6B6B6B  /* Secondary text */
--border: #E5E5E5            /* Borders and dividers */
```

### Status Colors
```css
--success: #10B981           /* Success messages */
--warning: #F59E0B           /* Warning alerts */
--destructive: #EF4444       /* Error states */
--info: #3B82F6              /* Info messages */
```

### Usage
Always use CSS variables:
```tsx
<div className="bg-primary text-primary-foreground">Primary Button</div>
<div className="text-muted-foreground">Secondary text</div>
<div className="border border-border">Card with border</div>
```

---

## 📝 Typography

### Headings
```tsx
<h1>Heading 1</h1>  {/* text-3xl, font-bold, line-height: 1.3 */}
<h2>Heading 2</h2>  {/* text-2xl, font-semibold, line-height: 1.4 */}
<h3>Heading 3</h3>  {/* text-xl, font-semibold, line-height: 1.5 */}
<h4>Heading 4</h4>  {/* text-lg, font-medium, line-height: 1.5 */}
<h5>Heading 5</h5>  {/* text-base, font-medium, line-height: 1.5 */}
<h6>Heading 6</h6>  {/* text-sm, font-medium, muted-foreground */}
```

### Body Text
```tsx
<p className="text-lg">Large paragraph</p>
<p>Regular paragraph</p>
<p className="text-sm">Small paragraph</p>
<p className="text-xs">Extra small text</p>
```

### Font Weights
```tsx
<p className="font-bold">Bold (700)</p>
<p className="font-semibold">Semibold (600)</p>
<p className="font-medium">Medium (500)</p>
<p className="font-normal">Normal (400)</p>
```

**Important:** Do NOT use Tailwind font size or weight classes unless overriding default styles. Use semantic HTML elements (h1, h2, p) which inherit global typography styles from `/styles/globals.css`.

---

## 🔘 Buttons

### Import
```tsx
import { Button } from '@/components/ui/button';
```

### Variants
```tsx
<Button variant="default">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete Button</Button>
<Button variant="link">Link Button</Button>
```

### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### States
```tsx
<Button disabled>Disabled</Button>
<Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading...</Button>
```

### With Icons
```tsx
<Button><Plus className="mr-2 h-4 w-4" />Create New</Button>
<Button>Send<Send className="ml-2 h-4 w-4" /></Button>
```

---

## 📋 Form Components

### Input Fields
```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Textarea
```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Type your message..." rows={4} />
```

### Select Dropdown
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose an option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox
```tsx
import { Checkbox } from '@/components/ui/checkbox';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>
```

### Radio Buttons
```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
</RadioGroup>
```

### Switch (Toggle)
```tsx
import { Switch } from '@/components/ui/switch';

<div className="flex items-center justify-between">
  <Label>Enable notifications</Label>
  <Switch />
</div>
```

---

## 🃏 Cards

### Import
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
```

### Basic Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Card with Footer
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Interactive Card
```tsx
<Card className="hover-lift cursor-pointer transition-all">
  {/* Adds hover elevation effect */}
</Card>
```

---

## 🎯 Badges

```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge className="bg-green-500">Custom Color</Badge>
```

---

## ⚠️ Alerts & Feedback

### Alerts
```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an info alert.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

### Toast Notifications
```tsx
import { toast } from 'sonner@2.0.3';

toast.success('Success!', { description: 'Action completed successfully.' });
toast.error('Error!', { description: 'Something went wrong.' });
toast.info('Info', { description: 'Information message.' });
toast('Default toast');
```

### Progress Bar
```tsx
import { Progress } from '@/components/ui/progress';

<Progress value={60} />
```

### Skeleton Loaders
```tsx
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-4 w-full" />
<Skeleton className="h-12 w-12 rounded-full" />
```

---

## 🧭 Navigation

### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Breadcrumbs
```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Dropdown Menu
```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Accordion
```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 🪟 Overlays & Modals

### Dialog (Modal)
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description here</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Alert Dialog (Confirmation)
```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Sheet (Side Drawer)
```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Drawer</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## 👤 Data Display

### Avatar
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/path/to/image.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Separator
```tsx
import { Separator } from '@/components/ui/separator';

<Separator />  {/* Horizontal */}
<Separator orientation="vertical" />
```

### Slider
```tsx
import { Slider } from '@/components/ui/slider';

<Slider defaultValue={[50]} max={100} step={1} />
```

---

## 🎯 Icons

We use **Lucide React** for all icons:

```tsx
import { Home, User, Settings, Search, Mail, Phone, Calendar, BookOpen, Star, Heart } from 'lucide-react';

<Home className="h-4 w-4" />
<User className="h-6 w-6 text-primary" />
```

**Common sizes:**
- Small: `h-4 w-4` (16px)
- Medium: `h-5 w-5` (20px)
- Large: `h-6 w-6` (24px)
- Extra Large: `h-8 w-8` (32px)

---

## 📏 Spacing System

Use consistent spacing tokens:
```css
--spacing-xs: 0.25rem   (4px)   → space-1, gap-1, p-1, m-1
--spacing-sm: 0.5rem    (8px)   → space-2, gap-2, p-2, m-2
--spacing-md: 1rem      (16px)  → space-4, gap-4, p-4, m-4
--spacing-lg: 1.5rem    (24px)  → space-6, gap-6, p-6, m-6
--spacing-xl: 2rem      (32px)  → space-8, gap-8, p-8, m-8
--spacing-2xl: 3rem     (48px)  → space-12, gap-12, p-12, m-12
```

---

## 🔄 Utility Classes

### Hover Effects
```tsx
<div className="hover-lift">Lifts on hover with shadow</div>
<div className="hover-glow">Glows with primary color on hover</div>
```

### Elevation
```tsx
<div className="elevation-1">Subtle shadow</div>
<div className="elevation-2">Light shadow</div>
<div className="elevation-3">Medium shadow</div>
<div className="elevation-4">Strong shadow</div>
<div className="elevation-5">Extra strong shadow</div>
```

### Gradients
```tsx
<div className="gradient-primary">Primary blue gradient</div>
<div className="gradient-secondary">Purple gradient</div>
<div className="gradient-success">Green gradient</div>
```

### Animations
```tsx
<div className="animate-fade-in">Fades in with slide up</div>
<div className="animate-slide-up">Slides up animation</div>
```

---

## ✅ Design System Rules

### 1. **Single Source of Truth**
All components must come from `/components/ui/`. Never create one-off components.

### 2. **No Hard-coded Styles**
Always use design tokens (CSS variables) or Tailwind classes that reference tokens.

```tsx
❌ BAD: <div style={{color: '#0A66C2'}}>
✅ GOOD: <div className="text-primary">
```

### 3. **Component Variants Over Custom Styles**
Use built-in variants instead of custom classes.

```tsx
❌ BAD: <Button className="bg-red-500">Delete</Button>
✅ GOOD: <Button variant="destructive">Delete</Button>
```

### 4. **Consistent Spacing**
Use spacing scale tokens (space-4, gap-6, p-8, etc.)

### 5. **Typography Hierarchy**
Use semantic HTML (`<h1>`, `<h2>`, `<p>`) which inherit global styles. Only override when necessary.

### 6. **Accessibility First**
- Always use `<Label>` with form inputs
- Include `aria-label` for icon buttons
- Ensure proper keyboard navigation

### 7. **Global Updates**
When a component in `/components/ui/` is updated, the change propagates everywhere automatically. This is intentional.

### 8. **New Component Checklist**
When creating a new component:
- [ ] Add it to `/components/ui/`
- [ ] Document it in this file
- [ ] Add examples to `/pages/DesignSystemPage.tsx`
- [ ] Use design tokens (no hard-coded values)
- [ ] Support variants if applicable
- [ ] Make it reusable

---

## 🚀 Best Practices

### Component Composition
```tsx
// ✅ GOOD: Composable, reusable
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">john@example.com</p>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Edit Profile</Button>
  </CardFooter>
</Card>
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

### Dark Mode Support
All components automatically support dark mode via CSS variables. No additional work needed.

---

## 📦 Available Components

### Forms
- `Button` - All button variants
- `Input` - Text inputs
- `Textarea` - Multi-line text
- `Label` - Form labels
- `Select` - Dropdown select
- `Checkbox` - Checkboxes
- `RadioGroup` - Radio buttons
- `Switch` - Toggle switches
- `Slider` - Range sliders

### Layout
- `Card` - Content containers
- `Separator` - Dividers
- `Tabs` - Tabbed navigation
- `Accordion` - Collapsible sections
- `Sheet` - Side drawers

### Feedback
- `Alert` - Alert messages
- `Badge` - Status badges
- `Progress` - Progress bars
- `Skeleton` - Loading placeholders
- `Toaster` - Toast notifications

### Overlays
- `Dialog` - Modal dialogs
- `AlertDialog` - Confirmation dialogs
- `Tooltip` - Hover tooltips
- `DropdownMenu` - Context menus

### Navigation
- `Breadcrumb` - Breadcrumb navigation
- `Tabs` - Tab navigation

### Display
- `Avatar` - User avatars
- `Table` - Data tables
- `Calendar` - Date pickers

---

## 🔗 Quick Links

- **Live Design System**: `/design-system`
- **Component Library**: `/components/ui/`
- **Global Styles**: `/styles/globals.css`
- **Color Tokens**: Search for `--primary`, `--muted`, etc. in `globals.css`

---

## 📞 Support

For questions or to propose new components, consult this documentation first. All components follow these strict rules to ensure consistency across the entire Taaluma platform.

**Last Updated**: January 2026  
**Version**: 1.0.0
