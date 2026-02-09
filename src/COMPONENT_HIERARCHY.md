# Component Hierarchy & Usage Guide

## 📊 Component Organization

```
Taaluma Design System
│
├─── 🔘 BUTTONS & ACTIONS
│    ├── Button (Primary, Secondary, Outline, Ghost, Destructive, Link)
│    ├── Toggle
│    └── ToggleGroup
│
├─── 📝 FORMS & INPUTS
│    ├── Input (Text, Email, Password, Search)
│    ├── Textarea
│    ├── Label
│    ├── Select (with Trigger, Content, Item)
│    ├── Checkbox
│    ├── RadioGroup (with RadioGroupItem)
│    ├── Switch
│    ├── Slider
│    ├── InputOTP
│    └── Form (FormField, FormItem, FormLabel, FormControl, FormMessage)
│
├─── 🃏 CARDS & CONTAINERS
│    ├── Card (Header, Title, Description, Content, Footer)
│    ├── AspectRatio
│    └── ScrollArea
│
├─── ⚠️ FEEDBACK & NOTIFICATIONS
│    ├── Alert (with Title, Description)
│    ├── AlertDialog (Trigger, Content, Header, Footer, Action, Cancel)
│    ├── Badge (Default, Secondary, Outline, Destructive)
│    ├── Progress
│    ├── Skeleton
│    └── Toast (Sonner) [Programmatic]
│
├─── 🧭 NAVIGATION
│    ├── Tabs (TabsList, TabsTrigger, TabsContent)
│    ├── Breadcrumb (List, Item, Link, Page, Separator)
│    ├── NavigationMenu (List, Item, Trigger, Content, Link)
│    ├── Menubar (Menu, Trigger, Content, Item, Separator)
│    ├── Pagination (Content, Item, Previous, Next, Ellipsis)
│    └── Sidebar (Provider, Content, Header, Footer, Menu, MenuItem)
│
├─── 🪟 OVERLAYS & MODALS
│    ├── Dialog (Trigger, Content, Header, Title, Description, Footer)
│    ├── AlertDialog (Trigger, Content, Header, Footer, Action, Cancel)
│    ├── Sheet (Trigger, Content, Header, Footer) [Side Drawer]
│    ├── Drawer (Trigger, Content, Header, Footer)
│    ├── Popover (Trigger, Content)
│    ├── HoverCard (Trigger, Content)
│    └── Tooltip (Provider, Trigger, Content)
│
├─── 📋 MENUS
│    ├── DropdownMenu (Trigger, Content, Item, Label, Separator, Sub)
│    ├── ContextMenu (Trigger, Content, Item, Label, Separator)
│    └── Command (Dialog, Input, List, Group, Item, Empty)
│
├─── 📐 LAYOUT
│    ├── Separator (Horizontal, Vertical)
│    ├── Accordion (Item, Trigger, Content)
│    ├── Collapsible (Trigger, Content)
│    └── Resizable (PanelGroup, Panel, Handle)
│
├─── 📊 DATA DISPLAY
│    ├── Avatar (Image, Fallback)
│    ├── UserAvatar [Custom]
│    ├── Table (Header, Body, Footer, Row, Head, Cell, Caption)
│    ├── Calendar
│    ├── Carousel (Content, Item, Previous, Next)
│    └── Chart (Container, Tooltip, Legend)
│
└─── 🛠️ UTILITIES
     ├── useMobile (Hook)
     └── cn (Utility function)
```

---

## 🔗 Component Relationships

### Card Component Family
```tsx
<Card>                          // Container
  <CardHeader>                  // Top section
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>                 // Main content
    Content goes here
  </CardContent>
  <CardFooter>                  // Bottom section (optional)
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog Component Family
```tsx
<Dialog>                                    // Root component
  <DialogTrigger>                          // Opens dialog
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>                          // Modal content
    <DialogHeader>                         // Header section
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div>Main content</div>
    <DialogFooter>                         // Footer section
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Form Component Family
```tsx
<Form {...form}>                           // Form context provider
  <form>
    <FormField                             // Single form field
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>                         // Field container
          <FormLabel>Label</FormLabel>
          <FormControl>                    // Input wrapper
            <Input {...field} />
          </FormControl>
          <FormDescription>              // Help text
            Optional description
          </FormDescription>
          <FormMessage />                  // Error message
        </FormItem>
      )}
    />
  </form>
</Form>
```

### Select Component Family
```tsx
<Select>                                   // Root component
  <SelectTrigger>                          // Dropdown trigger
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>                          // Dropdown content
    <SelectGroup>                          // Optional grouping
      <SelectLabel>Group Label</SelectLabel>
      <SelectItem value="1">Option 1</SelectItem>
      <SelectItem value="2">Option 2</SelectItem>
    </SelectGroup>
    <SelectSeparator />                    // Optional divider
  </SelectContent>
</Select>
```

### Dropdown Menu Family
```tsx
<DropdownMenu>                             // Root component
  <DropdownMenuTrigger>                    // Menu trigger
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>                    // Menu content
    <DropdownMenuLabel>Section</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>                      // Nested submenu
      <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tabs Component Family
```tsx
<Tabs defaultValue="tab1">                 // Root with default
  <TabsList>                               // Tab navigation
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">              // Content for tab1
    Tab 1 content
  </TabsContent>
  <TabsContent value="tab2">              // Content for tab2
    Tab 2 content
  </TabsContent>
</Tabs>
```

### Alert Component Family
```tsx
<Alert>                                    // Container
  <AlertCircle className="h-4 w-4" />    // Icon (optional)
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

### Tooltip Component Family
```tsx
<TooltipProvider>                          // Required provider
  <Tooltip>                                // Root component
    <TooltipTrigger>                       // Element to hover
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>                       // Tooltip content
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Accordion Component Family
```tsx
<Accordion type="single" collapsible>      // Root component
  <AccordionItem value="item-1">          // Single item
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 🎯 Component Selection Guide

### When to use which component?

#### Need a button?
- **Primary action**: `<Button variant="default">`
- **Secondary action**: `<Button variant="secondary">`
- **Subtle action**: `<Button variant="ghost">`
- **Bordered button**: `<Button variant="outline">`
- **Delete/Remove**: `<Button variant="destructive">`
- **Text link style**: `<Button variant="link">`

#### Need user input?
- **Single line text**: `<Input />`
- **Multi-line text**: `<Textarea />`
- **Choose from list**: `<Select />`
- **Yes/No choice**: `<Checkbox />` or `<Switch />`
- **One from many**: `<RadioGroup />`
- **Range value**: `<Slider />`

#### Need to show information?
- **Structured content**: `<Card />`
- **Important message**: `<Alert />`
- **Status indicator**: `<Badge />`
- **User profile**: `<Avatar />`
- **Data table**: `<Table />`

#### Need user confirmation?
- **Important action**: `<AlertDialog />`
- **General modal**: `<Dialog />`
- **Side panel**: `<Sheet />` or `<Drawer />`

#### Need navigation?
- **Tabs**: `<Tabs />`
- **Breadcrumbs**: `<Breadcrumb />`
- **Dropdown menu**: `<DropdownMenu />`
- **Page numbers**: `<Pagination />`

#### Need feedback?
- **Loading state**: `<Skeleton />`
- **Progress**: `<Progress />`
- **Notification**: `toast()` from Sonner
- **Success/Error**: `<Alert />` with variants

---

## 📦 Common Component Combinations

### Login Form
```tsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Sign In</CardTitle>
    <CardDescription>Enter your credentials</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Sign In</Button>
  </CardFooter>
</Card>
```

### Settings Panel
```tsx
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    <div className="flex items-center justify-between">
      <Label>Notifications</Label>
      <Switch />
    </div>
    <Separator />
    <div className="flex items-center justify-between">
      <Label>Marketing</Label>
      <Switch />
    </div>
  </CardContent>
</Card>
```

### Confirmation Dialog
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### User Profile Card
```tsx
<Card>
  <CardHeader>
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle>John Doe</CardTitle>
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
```

### Stat Card
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
    <Users className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">2,543</div>
    <p className="text-xs text-muted-foreground">
      +12% from last month
    </p>
  </CardContent>
</Card>
```

---

## 🔄 Component Update Flow

```
1. Developer identifies need for UI change
   ↓
2. Check /design-system for existing component
   ↓
3a. Component exists → Use it directly
3b. Component doesn't exist → Create new component
   ↓
4. If creating new component:
   - Create in /components/ui/new-component.tsx
   - Export from /components/ui/index.ts
   - Add to /pages/DesignSystemPage.tsx
   - Document in /DESIGN_SYSTEM.md
   ↓
5. Import from @/components/ui
   ↓
6. Use in page/component
   ↓
7. Component automatically updates everywhere when changed
```

---

## 📏 Component Size Guide

### Button Sizes
```tsx
<Button size="sm">Small (32px)</Button>
<Button size="default">Default (40px)</Button>
<Button size="lg">Large (48px)</Button>
<Button size="icon">Icon (40x40px)</Button>
```

### Icon Sizes
```tsx
<Icon className="h-3 w-3" />  {/* 12px - Tiny */}
<Icon className="h-4 w-4" />  {/* 16px - Small (most common) */}
<Icon className="h-5 w-5" />  {/* 20px - Medium */}
<Icon className="h-6 w-6" />  {/* 24px - Large */}
<Icon className="h-8 w-8" />  {/* 32px - Extra Large */}
```

### Avatar Sizes
```tsx
<Avatar className="h-6 w-6" />   {/* Extra Small */}
<Avatar className="h-8 w-8" />   {/* Small */}
<Avatar className="h-10 w-10" /> {/* Medium (default) */}
<Avatar className="h-12 w-12" /> {/* Large */}
<Avatar className="h-16 w-16" /> {/* Extra Large */}
```

---

## ✅ Component Checklist

Before using a component, ensure:
- [ ] You've checked `/design-system` for the component
- [ ] You're importing from `@/components/ui`
- [ ] You're using the correct variant/size
- [ ] You're following the component hierarchy
- [ ] You're not creating a one-off duplicate
- [ ] You've included all required sub-components
- [ ] Accessibility props are included (labels, aria-*, etc.)

---

## 🚀 Quick Reference

| Need | Component | Import |
|------|-----------|--------|
| Button | `Button` | `import { Button } from '@/components/ui'` |
| Text input | `Input` | `import { Input } from '@/components/ui'` |
| Dropdown | `Select` | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'` |
| Modal | `Dialog` | `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui'` |
| Card | `Card` | `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'` |
| Alert | `Alert` | `import { Alert, AlertDescription, AlertTitle } from '@/components/ui'` |
| Toggle | `Switch` | `import { Switch } from '@/components/ui'` |
| Tabs | `Tabs` | `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'` |

---

**For complete examples and documentation, visit:**
- Live Design System: `/design-system`
- Full Documentation: `/DESIGN_SYSTEM.md`
- Quick Start: `/README_DESIGN_SYSTEM.md`
