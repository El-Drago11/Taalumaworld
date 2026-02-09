/**
 * DESIGN SYSTEM REFERENCE
 * 
 * This file serves as a quick reference for all reusable components.
 * Copy and paste examples from here into your pages.
 * 
 * DO NOT MODIFY COMPONENTS IN /components/ui/ without updating:
 * 1. This reference file
 * 2. /pages/DesignSystemPage.tsx
 * 3. /DESIGN_SYSTEM.md documentation
 */

import { 
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  Badge,
  Alert,
  AlertDescription,
  AlertTitle,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Skeleton,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';

// ====================
// BUTTON EXAMPLES
// ====================

export function ButtonExamples() {
  return (
    <>
      {/* Variants */}
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>

      {/* States */}
      <Button disabled>Disabled</Button>
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </>
  );
}

// ====================
// FORM EXAMPLES
// ====================

export function FormExamples() {
  return (
    <>
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message..." rows={4} />
      </div>

      {/* Select Dropdown */}
      <div className="space-y-2">
        <Label>Choose Option</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm cursor-pointer">
          Accept terms and conditions
        </label>
      </div>

      {/* Radio Group */}
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="r1" />
          <Label htmlFor="r1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="r2" />
          <Label htmlFor="r2">Option 2</Label>
        </div>
      </RadioGroup>

      {/* Switch */}
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Enable notifications</Label>
        <Switch id="notifications" />
      </div>
    </>
  );
}

// ====================
// CARD EXAMPLES
// ====================

export function CardExamples() {
  return (
    <>
      {/* Basic Card */}
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is the card content area.
          </p>
        </CardContent>
      </Card>

      {/* Card with Footer */}
      <Card>
        <CardHeader>
          <CardTitle>Confirm Action</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Are you sure you want to proceed?</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </CardFooter>
      </Card>

      {/* Interactive Card */}
      <Card className="hover-lift cursor-pointer transition-all">
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This card has hover effects
          </p>
        </CardContent>
      </Card>

      {/* Stat Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
    </>
  );
}

// ====================
// FEEDBACK EXAMPLES
// ====================

export function FeedbackExamples() {
  return (
    <>
      {/* Alert - Info */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational message.</AlertDescription>
      </Alert>

      {/* Alert - Success */}
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-600">Success</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-400">
          Operation completed successfully!
        </AlertDescription>
      </Alert>

      {/* Alert - Error */}
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>

      {/* Badges */}
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label>Progress</Label>
          <span className="text-muted-foreground">60%</span>
        </div>
        <Progress value={60} />
      </div>

      {/* Skeleton Loader */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Toast Notification (usage in code) */}
      {/* 
      import { toast } from 'sonner@2.0.3';
      toast.success('Success!', { description: 'Action completed.' });
      toast.error('Error!', { description: 'Something went wrong.' });
      */}
    </>
  );
}

// ====================
// NAVIGATION EXAMPLES
// ====================

export function NavigationExamples() {
  return (
    <>
      {/* Tabs */}
      <Tabs defaultValue="tab1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Password</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Account content</TabsContent>
        <TabsContent value="tab2">Password content</TabsContent>
        <TabsContent value="tab3">Settings content</TabsContent>
      </Tabs>

      {/* Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer to question 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Question 2</AccordionTrigger>
          <AccordionContent>Answer to question 2</AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Dropdown Menu */}
      {/*
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      */}
    </>
  );
}

// ====================
// OVERLAY EXAMPLES
// ====================

export function OverlayExamples() {
  return (
    <>
      {/* Dialog Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Dialog content goes here</p>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover Me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip text appears here</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

// ====================
// DATA DISPLAY EXAMPLES
// ====================

export function DataDisplayExamples() {
  return (
    <>
      {/* Avatar */}
      <Avatar>
        <AvatarImage src="/path/to/image.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Separator */}
      <>
        <div>Content above</div>
        <Separator className="my-4" />
        <div>Content below</div>
      </>
    </>
  );
}

// ====================
// QUICK COPY TEMPLATES
// ====================

/**
 * LOGIN FORM TEMPLATE
 */
export function LoginFormTemplate() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="text-sm cursor-pointer">
            Remember me
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">Sign In</Button>
        <Button variant="ghost" className="w-full">Forgot Password?</Button>
      </CardFooter>
    </Card>
  );
}

/**
 * SETTINGS PANEL TEMPLATE
 */
export function SettingsPanelTemplate() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates via email</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label>Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">Promotional content</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Language</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

/**
 * STATS DASHBOARD TEMPLATE
 */
export function StatsDashboardTemplate() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Books</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground">+8 new this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87%</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default {
  ButtonExamples,
  FormExamples,
  CardExamples,
  FeedbackExamples,
  NavigationExamples,
  OverlayExamples,
  DataDisplayExamples,
  LoginFormTemplate,
  SettingsPanelTemplate,
  StatsDashboardTemplate,
};
