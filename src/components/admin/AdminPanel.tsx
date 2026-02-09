/**
 * Admin Panel - Rebuilt from Scratch
 * Comprehensive admin interface with RBAC, content mode switching, and design system consistency
 * Taaluma.world - Professional Admin System
 */

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Settings, 
  BookOpen, 
  FileText, 
  Users, 
  FolderTree, 
  MessageSquare, 
  FileEdit, 
  BarChart3, 
  DollarSign,
  Home,
  LogOut,
  Book,
  Bell,
  Search,
  Shield,
  Activity,
  Receipt,
  AlertCircle,
  FileSpreadsheet,
  UserCircle,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '../ui/utils';
import { useAdminUser } from '../../hooks/useAdminUser';
import { canAccessSection, getRoleName, getRoleDescription } from '../../utils/adminPermissions';
import type { AdminSection, ContentMode, AdminRole } from '../../types/admin';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectContentMode, setContentMode as setReduxContentMode } from '../../store/slices/contentModeSlice';

// Import Tab Components
import { AdminDashboardTab } from './AdminDashboardTab';
import { AdminBooksTab } from './AdminBooksTab';
import { AdminChaptersTab } from './AdminChaptersTab';
import { AdminCategoriesTab } from './AdminCategoriesTab';
import { AdminAuthorsTab } from './AdminAuthorsTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminRolesTab } from './AdminRolesTab';
import { AdminActivityLogsTab } from './AdminActivityLogsTab';
import { AdminPaymentsTab } from './AdminPaymentsTab';
import { AdminTransactionsTab } from './AdminTransactionsTab';
import { AdminReviewsTab } from './AdminReviewsTab';
import { AdminModerationTab } from './AdminModerationTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import { AdminPagesTab } from './AdminPagesTab';
import { AdminAnalyticsTab } from './AdminAnalyticsTab';
import { AdminReportsTab } from './AdminReportsTab';

interface AdminPanelProps {
  onNavigateToWebsite: () => void;
  onLogout: () => void;
}

interface NavItem {
  id: AdminSection;
  label: string;
  icon: React.ElementType;
  category: 'content' | 'users' | 'commerce' | 'community' | 'system' | 'analytics';
  badge?: number;
}

export function AdminPanel({ onNavigateToWebsite, onLogout }: AdminPanelProps) {
  const { adminUser, isLoading, switchRole } = useAdminUser();
  const dispatch = useAppDispatch();
  const contentMode = useAppSelector(selectContentMode);
  const [activeTab, setActiveTab] = useState<AdminSection>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Save content mode and dispatch to Redux
  const handleContentModeToggle = (checked: boolean) => {
    const newMode: ContentMode = checked ? 'books' : 'chapters';
    dispatch(setReduxContentMode(newMode));
  };

  // Navigation items with categories
  const allNavItems: NavItem[] = [
    // System
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'system' },
    { id: 'pages', label: 'Pages', icon: FileEdit, category: 'system' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'system' },
    
    // Content Management
    { id: 'books', label: 'Books', icon: Book, category: 'content' },
    { id: 'chapters', label: 'Chapters', icon: FileText, category: 'content' },
    { id: 'categories', label: 'Categories', icon: FolderTree, category: 'content' },
    { id: 'authors', label: 'Thought Leaders', icon: Users, category: 'content' },
    
    // User Management
    { id: 'users', label: 'Users', icon: UserCircle, category: 'users' },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield, category: 'users' },
    { id: 'activity_logs', label: 'Activity Logs', icon: Activity, category: 'users' },
    
    // Commerce
    { id: 'payments', label: 'Payments', icon: DollarSign, category: 'commerce' },
    { id: 'transactions', label: 'Transactions', icon: Receipt, category: 'commerce' },
    
    // Community
    { id: 'reviews', label: 'Reviews', icon: MessageSquare, category: 'community' },
    { id: 'moderation', label: 'Moderation', icon: AlertCircle, category: 'community', badge: 5 },
    
    // Analytics
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'analytics' },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet, category: 'analytics' },
  ];

  // Filter nav items based on user permissions
  const accessibleNavItems = adminUser 
    ? allNavItems.filter(item => canAccessSection(adminUser, item.id))
    : [];

  // Group items by category
  const navItemsByCategory = accessibleNavItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const categoryLabels = {
    system: 'System',
    content: 'Content Management',
    users: 'User Management',
    commerce: 'Commerce',
    community: 'Community',
    analytics: 'Analytics & Reports',
  };

  // Set default accessible tab on load
  useEffect(() => {
    if (adminUser && !canAccessSection(adminUser, activeTab)) {
      const firstAccessible = accessibleNavItems[0];
      if (firstAccessible) {
        setActiveTab(firstAccessible.id);
      }
    }
  }, [adminUser, activeTab]);

  // Render active tab content
  const renderTabContent = () => {
    if (!adminUser) return null;

    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardTab contentMode={contentMode} adminUser={adminUser} />;
      case 'pages':
        return <AdminPagesTab />;
      case 'books':
        return <AdminBooksTab />;
      case 'chapters':
        return <AdminChaptersTab contentMode={contentMode} />;
      case 'categories':
        return <AdminCategoriesTab />;
      case 'authors':
        return <AdminAuthorsTab />;
      case 'users':
        return <AdminUsersTab />;
      case 'roles':
        return <AdminRolesTab adminUser={adminUser} />;
      case 'activity_logs':
        return <AdminActivityLogsTab />;
      case 'payments':
        return <AdminPaymentsTab contentMode={contentMode} />;
      case 'transactions':
        return <AdminTransactionsTab />;
      case 'reviews':
        return <AdminReviewsTab />;
      case 'moderation':
        return <AdminModerationTab />;
      case 'settings':
        return <AdminSettingsTab contentMode={contentMode} onContentModeChange={handleContentModeToggle} />;
      case 'analytics':
        return <AdminAnalyticsTab contentMode={contentMode} />;
      case 'reports':
        return <AdminReportsTab contentMode={contentMode} />;
      default:
        return <AdminDashboardTab contentMode={contentMode} adminUser={adminUser} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have permission to access the admin panel.</p>
          <Button onClick={onNavigateToWebsite}>Go to Website</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Sticky at top */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Announcement Bar with Content Mode Toggle */}
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              {/* Left: Admin Panel Title */}
              <div className="flex items-center gap-2">
                <span className="font-medium hidden sm:inline">Admin Panel - Taaluma.world</span>
                <span className="font-medium sm:hidden">Admin</span>
              </div>
              
              {/* Right: Content Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs hidden md:inline">Content Mode:</span>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <span className={cn(
                    "text-xs transition-all duration-200", 
                    contentMode === 'chapters' ? 'font-semibold' : 'opacity-70'
                  )}>
                    Chapters
                  </span>
                  <Switch
                    checked={contentMode === 'books'}
                    onCheckedChange={handleContentModeToggle}
                    className="data-[state=checked]:bg-white/90 data-[state=unchecked]:bg-white/20 border-2 border-white/40"
                  />
                  <span className={cn(
                    "text-xs transition-all duration-200", 
                    contentMode === 'books' ? 'font-semibold' : 'opacity-70'
                  )}>
                    Books
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="bg-primary rounded-xl p-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">
                    Taaluma<span className="text-primary">World</span>
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">Admin Panel</span>
                </div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users, books, chapters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full rounded-full"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Back to Website - Desktop */}
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToWebsite}
                className="gap-2 hidden md:flex"
              >
                <Home className="h-4 w-4" />
                <span className="hidden lg:inline">Website</span>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={adminUser.avatar} />
                      <AvatarFallback>{adminUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{adminUser.name}</span>
                    <ChevronDown className="h-4 w-4 hidden md:inline" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{adminUser.name}</p>
                      <p className="text-xs text-muted-foreground">{adminUser.email}</p>
                      <Badge variant="secondary" className="w-fit mt-1">
                        {getRoleName(adminUser.role)}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Role Switcher - For Demo Purposes */}
                  <div className="px-2 py-2">
                    <label className="text-xs text-muted-foreground mb-2 block">Switch Role (Demo)</label>
                    <Select value={adminUser.role} onValueChange={(value) => switchRole(value as AdminRole)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="content_manager">Content Manager</SelectItem>
                        <SelectItem value="support_agent">Support Agent</SelectItem>
                        <SelectItem value="analytics_manager">Analytics Manager</SelectItem>
                        <SelectItem value="finance_manager">Finance Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onNavigateToWebsite}>
                    <Home className="mr-2 h-4 w-4" />
                    Back to Website
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden border-t px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Desktop */}
          <aside className={cn(
            "lg:w-64 flex-shrink-0",
            "lg:block",
            mobileMenuOpen ? "block" : "hidden"
          )}>
            <div className="bg-white rounded-3xl p-6 shadow-sm lg:sticky lg:top-24">
              {/* Role Badge */}
              <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{getRoleName(adminUser.role)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {getRoleDescription(adminUser.role)}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-6">
                {Object.entries(navItemsByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h4>
                    <div className="space-y-1">
                      {items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                              activeTab === item.id
                                ? "bg-primary text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <Badge variant={activeTab === item.id ? "secondary" : "default"} className="h-5 px-2">
                                {item.badge}
                              </Badge>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
}