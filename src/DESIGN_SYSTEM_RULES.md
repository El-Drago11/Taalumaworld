# Design System Rules & Best Practices

## 🎯 Core Principles

### 1. Single Source of Truth
All UI components must originate from `/components/ui/`. This is non-negotiable.

### 2. Global Consistency
Design system updates propagate globally. This ensures visual consistency across the entire platform.

### 3. No Hard-Coding
Always use design tokens (CSS variables) instead of hard-coded values.

### 4. Component Composition
Build complex UIs by composing simple, reusable components.

### 5. Accessibility First
Every component must be keyboard navigable and screen reader friendly.

---

## ✅ Best Practices

### Component Imports

```tsx
// ✅ CORRECT - Import from centralized index
import { Button, Card, Input, Label } from '@/components/ui';

// ❌ WRONG - Direct file imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ❌ WRONG - Relative imports
import { Button } from '../ui/button';
```

### Color Usage

```tsx
// ✅ CORRECT - Use CSS variables
<div className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
<div className="border border-border">

// ❌ WRONG - Hard-coded colors
<div style={{ backgroundColor: '#0A66C2' }}>
<p className="text-gray-500">
<div className="border border-gray-200">
```

### Button Variants

```tsx
// ✅ CORRECT - Use built-in variants
<Button variant="default">Primary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Secondary</Button>

// ❌ WRONG - Custom styling
<Button className="bg-red-500 hover:bg-red-600">Delete</Button>
<Button style={{ backgroundColor: 'red' }}>Delete</Button>
```

### Typography

```tsx
// ✅ CORRECT - Use semantic HTML (inherits global styles)
<h1>Main Heading</h1>
<h2>Subheading</h2>
<p>Body text</p>

// ❌ WRONG - Manual font sizing
<div className="text-3xl font-bold">Main Heading</div>
<span className="text-2xl font-semibold">Subheading</span>
```

### Spacing

```tsx
// ✅ CORRECT - Use spacing scale
<div className="space-y-4">
<div className="gap-6">
<div className="p-8">

// ❌ WRONG - Random spacing values
<div className="space-y-[17px]">
<div className="gap-[23px]">
<div className="p-[31px]">
```

### Component Composition

```tsx
// ✅ CORRECT - Compose from design system components
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
</Card>

// ❌ WRONG - Creating custom one-off components
<div className="bg-white rounded-lg shadow-md p-6">
  <div className="flex items-center">
    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
      <span className="text-white">JD</span>
    </div>
    <div className="ml-4">
      <div className="font-semibold">John Doe</div>
      <div className="text-gray-600 text-sm">john@example.com</div>
    </div>
  </div>
</div>
```

### Form Structure

```tsx
// ✅ CORRECT - Proper form structure
<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="you@example.com"
    aria-describedby="email-description"
  />
  <p id="email-description" className="text-xs text-muted-foreground">
    We'll never share your email.
  </p>
</div>

// ❌ WRONG - Missing labels and accessibility
<div>
  <input 
    type="email" 
    placeholder="Email" 
    className="border rounded px-3 py-2"
  />
</div>
```

### Dialog Usage

```tsx
// ✅ CORRECT - Complete dialog structure
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Settings</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      <DialogDescription>
        Configure your preferences
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// ❌ WRONG - Missing header/footer structure
<Dialog>
  <DialogTrigger>
    <button>Open</button>
  </DialogTrigger>
  <DialogContent>
    <div>
      <h3>Settings</h3>
      <div>Content</div>
      <button>Save</button>
    </div>
  </DialogContent>
</Dialog>
```

---

## ❌ Anti-Patterns (What NOT to Do)

### 1. Creating One-Off Components

```tsx
// ❌ WRONG - Custom button outside design system
function CustomBlueButton({ children }) {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      {children}
    </button>
  );
}

// ✅ CORRECT - Use design system Button
import { Button } from '@/components/ui';

<Button>{children}</Button>
```

### 2. Inline Styles for Design Tokens

```tsx
// ❌ WRONG - Inline styles
<div style={{ 
  color: '#1A1A1A', 
  backgroundColor: '#FAFAFA',
  padding: '16px'
}}>

// ✅ CORRECT - Tailwind classes with design tokens
<div className="text-foreground bg-background p-4">
```

### 3. Overriding Component Styles Unnecessarily

```tsx
// ❌ WRONG - Fighting the component's default styles
<Button className="rounded-none bg-purple-500 text-yellow-300">
  Custom Button
</Button>

// ✅ CORRECT - Use appropriate variant or create new variant in design system
<Button variant="secondary">
  Secondary Button
</Button>
```

### 4. Duplicating Design System Components

```tsx
// ❌ WRONG - Recreating existing component
function MyCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// ✅ CORRECT - Use existing Card component
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
</Card>
```

### 5. Inconsistent Spacing

```tsx
// ❌ WRONG - Random spacing values
<div className="mt-3 mb-5 px-7">
<div className="gap-[13px]">

// ✅ CORRECT - Use spacing scale
<div className="my-4 px-6">
<div className="gap-4">
```

### 6. Not Using Semantic HTML

```tsx
// ❌ WRONG - Div soup
<div className="text-3xl font-bold">Page Title</div>
<div className="text-xl font-semibold">Section Title</div>
<div onClick={handleClick} className="cursor-pointer">
  Click me
</div>

// ✅ CORRECT - Semantic HTML
<h1>Page Title</h1>
<h2>Section Title</h2>
<Button onClick={handleClick}>
  Click me
</Button>
```

### 7. Missing Accessibility Props

```tsx
// ❌ WRONG - No accessibility
<div className="flex items-center">
  <input type="checkbox" id="terms" />
  <div className="ml-2">Accept terms</div>
</div>

// ✅ CORRECT - Proper accessibility
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label 
    htmlFor="terms" 
    className="text-sm cursor-pointer"
  >
    Accept terms and conditions
  </label>
</div>
```

### 8. Not Handling Loading States

```tsx
// ❌ WRONG - No loading state
<Button onClick={handleSubmit}>
  Submit
</Button>

// ✅ CORRECT - Show loading state
<Button onClick={handleSubmit} disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

---

## 🔧 Component Modification Rules

### When Can You Modify a Design System Component?

#### ✅ ALLOWED:
- Adding new variants to existing components
- Extending functionality while maintaining API
- Fixing bugs or accessibility issues
- Adding new sub-components (e.g., new CardSection)
- Improving performance

#### ❌ NOT ALLOWED:
- Changing existing variant behavior (breaks existing usage)
- Removing props (breaks existing usage)
- Changing default styles drastically
- Removing accessibility features
- Hard-coding colors or spacing

### Proper Way to Add a Component Variant

```tsx
// ✅ CORRECT - In /components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...",
        secondary: "bg-secondary text-secondary-foreground...",
        // ADD NEW VARIANT
        success: "bg-success text-success-foreground hover:bg-success/90",
      },
    },
  }
);

// Then use it:
<Button variant="success">Save Successfully</Button>
```

---

## 📋 Pre-Commit Checklist

Before committing code, verify:

- [ ] All components are imported from `@/components/ui`
- [ ] No hard-coded colors (using CSS variables instead)
- [ ] No hard-coded spacing values
- [ ] Using semantic HTML where appropriate
- [ ] Forms have proper labels and accessibility
- [ ] Loading states are handled
- [ ] Error states are handled
- [ ] Responsive design is considered
- [ ] Dark mode compatibility (components support this automatically)
- [ ] No one-off custom components duplicating design system

---

## 🎨 Color Usage Matrix

| Use Case | DO | DON'T |
|----------|-----|-------|
| Primary action | `bg-primary` | `bg-blue-600` |
| Text color | `text-foreground` | `text-black` |
| Muted text | `text-muted-foreground` | `text-gray-500` |
| Borders | `border-border` | `border-gray-200` |
| Success state | `text-success` or `bg-success` | `text-green-500` |
| Error state | `text-destructive` or `bg-destructive` | `text-red-500` |
| Card background | `bg-card` | `bg-white` |

---

## 📐 Spacing Usage Matrix

| Use Case | DO | DON'T |
|----------|-----|-------|
| Component gap | `gap-4` (16px) | `gap-[17px]` |
| Section spacing | `space-y-6` (24px) | `space-y-[23px]` |
| Card padding | `p-6` or `p-8` | `p-[27px]` |
| Button padding | Use size prop | `px-[13px] py-[9px]` |
| Margins | `mt-4`, `mb-6`, `my-8` | `mt-[15px]` |

**Use spacing scale:**
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px

---

## 🚨 Common Mistakes to Avoid

### Mistake 1: Creating "Wrapper" Components
```tsx
// ❌ WRONG
function PrimaryButton({ children, ...props }) {
  return <Button variant="default" {...props}>{children}</Button>;
}

// ✅ CORRECT - Just use Button directly
<Button variant="default">{children}</Button>
```

### Mistake 2: Not Using Component Variants
```tsx
// ❌ WRONG
<Button className="bg-red-500 text-white hover:bg-red-600">
  Delete
</Button>

// ✅ CORRECT
<Button variant="destructive">
  Delete
</Button>
```

### Mistake 3: Fighting the Design System
```tsx
// ❌ WRONG - Fighting default styles
<Card className="!rounded-none !shadow-none !border-4 !border-purple-500">

// ✅ CORRECT - If you need different styles, discuss adding a new variant
<Card>  {/* Use as designed, or propose new variant */}
```

### Mistake 4: Not Checking Design System First
```tsx
// ❌ WRONG - Creating custom alert
<div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
  <p className="text-yellow-700">Warning message</p>
</div>

// ✅ CORRECT - Use existing Alert
<Alert className="border-yellow-500 bg-yellow-50">
  <AlertCircle className="h-4 w-4 text-yellow-600" />
  <AlertTitle className="text-yellow-600">Warning</AlertTitle>
  <AlertDescription className="text-yellow-700">
    Warning message
  </AlertDescription>
</Alert>
```

---

## 🎯 When to Create a New Component

Create a new component in `/components/ui/` when:

1. **Pattern is used 3+ times** across the application
2. **Component is truly reusable** and not page-specific
3. **No existing component** serves the purpose
4. **Component follows design system** colors, spacing, typography
5. **Component is accessible** and keyboard navigable

### New Component Workflow

1. **Check existing components** in `/design-system`
2. **Search documentation** in `/DESIGN_SYSTEM.md`
3. **If truly needed**, create in `/components/ui/new-component.tsx`
4. **Follow naming convention**: PascalCase, descriptive
5. **Add to index**: Export from `/components/ui/index.ts`
6. **Document it**: Add to `/DESIGN_SYSTEM.md`
7. **Show examples**: Add to `/pages/DesignSystemPage.tsx`
8. **Test variants**: Ensure all states work (hover, disabled, etc.)

---

## 🔍 Code Review Checklist

When reviewing code:

- [ ] Components imported from `@/components/ui`
- [ ] No hard-coded colors
- [ ] No hard-coded spacing
- [ ] Semantic HTML used correctly
- [ ] Accessibility props present
- [ ] Responsive design considered
- [ ] Loading/error states handled
- [ ] No duplicate components
- [ ] Follows component hierarchy
- [ ] Uses appropriate variants

---

## 📚 Resources

- **Live Examples**: `/design-system`
- **Full Documentation**: `/DESIGN_SYSTEM.md`
- **Quick Start**: `/README_DESIGN_SYSTEM.md`
- **Component Tree**: `/COMPONENT_HIERARCHY.md`
- **Code Examples**: `/components/DesignSystemReference.tsx`

---

## 🎓 Learning Path

1. **Start**: Visit `/design-system` to see all components
2. **Learn**: Read `/DESIGN_SYSTEM.md` for comprehensive guide
3. **Reference**: Use `/COMPONENT_HIERARCHY.md` for relationships
4. **Practice**: Copy examples from `/components/DesignSystemReference.tsx`
5. **Follow**: Adhere to rules in this file (`/DESIGN_SYSTEM_RULES.md`)
6. **Master**: Contribute new components following the workflow

---

## ✨ Remember

> "The design system is not a constraint—it's a foundation for consistency, speed, and quality."

Every rule exists to:
- ✅ Ensure visual consistency
- ✅ Speed up development
- ✅ Reduce bugs
- ✅ Improve accessibility
- ✅ Make maintenance easier
- ✅ Enable global updates

**When in doubt, check the design system first!**

---

**Last Updated**: January 2026  
**Version**: 1.0.0
