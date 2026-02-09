/**
 * DESIGN SYSTEM - COMPONENT INDEX
 * 
 * Central export file for all UI components.
 * Import components from here for consistency:
 * 
 * import { Button, Card, Input } from '@/components/ui';
 * 
 * This ensures all components come from the single source of truth.
 */

// ========== BUTTONS ==========
export { Button, buttonVariants } from './button';

// ========== FORMS ==========
export { Input } from './input';
export { Label } from './label';
export { Textarea } from './textarea';
export { Checkbox } from './checkbox';
export { RadioGroup, RadioGroupItem } from './radio-group';
export { Switch } from './switch';
export { Slider } from './slider';
export { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollDownButton,
  SelectScrollUpButton
} from './select';

// ========== CARDS & CONTAINERS ==========
export { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from './card';

// ========== FEEDBACK & ALERTS ==========
export { Alert, AlertDescription, AlertTitle } from './alert';
export { Badge, badgeVariants } from './badge';
export { Progress } from './progress';
export { Skeleton } from './skeleton';
export { Toaster } from './sonner';

// ========== NAVIGATION ==========
export { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from './tabs';
export { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from './breadcrumb';
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from './navigation-menu';
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from './menubar';
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './pagination';

// ========== OVERLAYS & MODALS ==========
export { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogPortal,
  DialogOverlay
} from './dialog';
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay
} from './alert-dialog';
export { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose,
  SheetFooter,
  SheetPortal,
  SheetOverlay
} from './sheet';
export { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip';
export {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from './popover';
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from './hover-card';
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
} from './drawer';

// ========== MENUS ==========
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './dropdown-menu';
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from './context-menu';
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from './command';

// ========== LAYOUT ==========
export { Separator } from './separator';
export { ScrollArea, ScrollBar } from './scroll-area';
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './accordion';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from './resizable';
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from './sidebar';

// ========== DATA DISPLAY ==========
export { Avatar, AvatarFallback, AvatarImage } from './avatar';
export { UserAvatar } from './UserAvatar';
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from './table';
export { AspectRatio } from './aspect-ratio';
export { Calendar } from './calendar';
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from './carousel';
export {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent
} from './chart';

// ========== FORM UTILITIES ==========
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from './form';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';

// ========== TOGGLES ==========
export { Toggle, toggleVariants } from './toggle';
export { ToggleGroup, ToggleGroupItem } from './toggle-group';

// ========== HOOKS ==========
export { useMobile } from './use-mobile';

// ========== UTILITIES ==========
export { cn } from './utils';

/**
 * USAGE EXAMPLES:
 * 
 * // Import multiple components
 * import { Button, Card, Input, Label } from '@/components/ui';
 * 
 * // Use in component
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Form</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <div className="space-y-2">
 *       <Label htmlFor="name">Name</Label>
 *       <Input id="name" placeholder="Enter your name" />
 *     </div>
 *     <Button>Submit</Button>
 *   </CardContent>
 * </Card>
 */
