# 🎨 Taaluma Design System

## Overview
A complete, centralized design system for **Taaluma.world** - a professional learning platform for college graduates and young professionals.

---

## 🚀 Quick Start

### 1. View the Live Design System
Navigate to **`/design-system`** in your browser to see all components with interactive examples.

### 2. Import Components
```tsx
// Import from centralized index
import { Button, Card, Input, Label } from '@/components/ui';

// Use in your component
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### 3. Follow Design System Rules
- ✅ **Always** use components from `/components/ui/`
- ✅ **Always** use CSS variables for colors (e.g., `text-primary`, `bg-card`)
- ✅ **Always** use component variants instead of custom styling
- ❌ **Never** hard-code colors or create one-off components
- ❌ **Never** use inline styles for values that exist in the design system

---

## 📂 File Structure

```
/
├── components/
│   ├── ui/                           # ⭐ All reusable UI components (SINGLE SOURCE OF TRUTH)
│   │   ├── button.tsx                # Button component
│   │   ├── card.tsx                  # Card components
│   │   ├── input.tsx                 # Input field
│   │   ├── dialog.tsx                # Modal dialogs
│   │   ├── ...                       # 50+ components
│   │   └── index.ts                  # ⭐ Central export file
│   │
│   ├── DesignSystemReference.tsx    # Quick copy-paste examples
│   ├── global/                       # Global components (Header, Footer)
│   ├── pages/                        # Page-specific components
│   └── ...
│
├── pages/
│   └── DesignSystemPage.tsx         # ⭐ Interactive component showcase
│
├── styles/
│   └── globals.css                   # ⭐ Design tokens (colors, spacing, typography)
│
├── DESIGN_SYSTEM.md                  # ⭐ Complete documentation
└── README_DESIGN_SYSTEM.md          # ⭐ This file (quick reference)
```

---

## 🎨 Design Tokens

### Colors (LinkedIn Professional Blue Theme)
```css
Primary:     #0A66C2  (LinkedIn Blue)
Background:  #FAFAFA  (Light mode)
Foreground:  #1A1A1A  (Primary text)
Muted:       #6B6B6B  (Secondary text)
Border:      #E5E5E5  (Dividers)
Success:     #10B981  (Green)
Warning:     #F59E0B  (Amber)
Error:       #EF4444  (Red)
```

### Typography
```
H1: text-3xl, font-bold
H2: text-2xl, font-semibold
H3: text-xl, font-semibold
H4: text-lg, font-medium
P:  text-base, font-normal
```

### Spacing Scale
```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
```

---

## 📦 Available Components

### Forms
- **Button** - All button variants (primary, secondary, outline, ghost, destructive, link)
- **Input** - Text inputs with variants
- **Textarea** - Multi-line text input
- **Label** - Form labels
- **Select** - Dropdown selects
- **Checkbox** - Checkboxes
- **RadioGroup** - Radio buttons
- **Switch** - Toggle switches
- **Slider** - Range sliders

### Layout
- **Card** - Content containers with header/footer
- **Separator** - Horizontal/vertical dividers
- **Tabs** - Tabbed interfaces
- **Accordion** - Collapsible sections
- **Sidebar** - Navigation sidebars

### Feedback
- **Alert** - Alert messages (info, success, warning, error)
- **Badge** - Status badges
- **Progress** - Progress bars
- **Skeleton** - Loading placeholders
- **Toast** - Toast notifications (via Sonner)

### Overlays
- **Dialog** - Modal dialogs
- **AlertDialog** - Confirmation dialogs
- **Sheet** - Side drawers
- **Tooltip** - Hover tooltips
- **Popover** - Popover menus
- **DropdownMenu** - Dropdown menus

### Navigation
- **Breadcrumb** - Breadcrumb navigation
- **Tabs** - Tab navigation
- **NavigationMenu** - Complex navigation menus
- **Pagination** - Page navigation

### Data Display
- **Avatar** - User avatars
- **Table** - Data tables
- **Calendar** - Date pickers
- **Chart** - Chart components (Recharts)

---

## 🎯 Component Usage Examples

### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button disabled>Disabled</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Form
```tsx
import { Input, Label, Button } from '@/components/ui';

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
  <Button>Submit</Button>
</div>
```

### Alert
```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui';
import { AlertCircle } from 'lucide-react';

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Important information here.</AlertDescription>
</Alert>
```

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

---

## 📋 Design System Rules

### ✅ DO
- Use components from `/components/ui/`
- Use CSS variables (`text-primary`, `bg-card`, etc.)
- Use component variants (`variant="outline"`, `size="sm"`)
- Use design tokens for spacing (`gap-4`, `p-6`, `space-y-2`)
- Follow semantic HTML (`<h1>`, `<h2>`, `<p>`)
- Add new components to the design system when needed

### ❌ DON'T
- Create one-off components outside `/components/ui/`
- Hard-code colors (`#0A66C2`, `blue-500`)
- Use inline styles for design system values
- Override typography with random Tailwind classes
- Detach components from the design system
- Skip component documentation

---

## 🔄 Global Updates

**Important:** When a component in `/components/ui/` is updated, the change automatically propagates across the entire application. This is intentional and ensures consistency.

### Example:
If you update `Button` component to have rounded corners:
```tsx
// /components/ui/button.tsx
className: "rounded-xl" // Changed from rounded-lg
```

**All buttons** across the entire website will now have `rounded-xl` corners. This is the power of the single source of truth design system!

---

## 📘 Full Documentation

For complete documentation with detailed examples, color palettes, typography rules, and best practices:

👉 **Read `/DESIGN_SYSTEM.md`**

---

## 🛠️ Adding New Components

When creating a new component:

1. **Create the component** in `/components/ui/new-component.tsx`
2. **Export it** from `/components/ui/index.ts`
3. **Document it** in `/DESIGN_SYSTEM.md`
4. **Add examples** to `/pages/DesignSystemPage.tsx`
5. **Follow design tokens** (colors, spacing, typography)
6. **Support variants** if applicable (sizes, states, types)

---

## 🎨 Design Philosophy

1. **Professional LinkedIn-style aesthetic** - Blue, white, black color scheme
2. **Consistency first** - One design, one source of truth
3. **Scalability** - Components designed for reuse and extension
4. **Accessibility** - WCAG compliant, keyboard navigable
5. **Maintainability** - Update once, reflect everywhere
6. **Developer experience** - Easy to use, well documented

---

## 🔗 Quick Links

| Resource | Location | Purpose |
|----------|----------|---------|
| **Live Design System** | `/design-system` | Interactive component showcase |
| **Component Library** | `/components/ui/` | All reusable components |
| **Component Index** | `/components/ui/index.ts` | Central export file |
| **Reference Examples** | `/components/DesignSystemReference.tsx` | Copy-paste templates |
| **Full Documentation** | `/DESIGN_SYSTEM.md` | Complete guide |
| **Color Tokens** | `/styles/globals.css` | Design tokens & variables |

---

## 💡 Tips

### Importing Components
```tsx
// ✅ GOOD - Import from index
import { Button, Card, Input } from '@/components/ui';

// ❌ BAD - Direct imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### Using Colors
```tsx
// ✅ GOOD - Use CSS variables
<div className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">

// ❌ BAD - Hard-coded colors
<div style={{ backgroundColor: '#0A66C2' }}>
<p className="text-gray-500">
```

### Responsive Design
```tsx
// ✅ GOOD - Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Use breakpoints: sm: md: lg: xl: 2xl:
```

---

## 📊 Component Count

- **50+ UI Components** ready to use
- **9 Category Tabs** in Design System Page
- **100% Coverage** of common UI patterns
- **Full Dark Mode** support on all components

---

## 🎯 Target Audience

This design system is built for **Taaluma.world**, targeting:
- College graduates
- Young professionals
- Career-focused individuals
- Serious about learning and growth

The professional LinkedIn-style blue aesthetic reflects this audience's expectations.

---

## 📞 Support

For questions or issues:
1. Check `/DESIGN_SYSTEM.md` for detailed documentation
2. Visit `/design-system` for interactive examples
3. Review `/components/DesignSystemReference.tsx` for copy-paste templates
4. Consult `/components/ui/index.ts` for available components

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**License:** Proprietary - Taaluma.world

---

Built with ❤️ using React, TypeScript, Tailwind CSS v4, and Radix UI primitives.
