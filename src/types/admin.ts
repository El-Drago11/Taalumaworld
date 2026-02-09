/**
 * Admin Panel Types & Role-Based Access Control (RBAC)
 * Taaluma.world - Professional Admin System
 */

export type AdminRole = 'super_admin' | 'content_manager' | 'support_agent' | 'analytics_manager' | 'finance_manager';

export type ContentMode = 'chapters' | 'books';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar?: string;
  permissions: AdminPermission[];
  createdAt: Date;
  lastActive: Date;
}

export type AdminPermission =
  // Dashboard
  | 'view_dashboard'
  // Content Management
  | 'view_books'
  | 'create_books'
  | 'edit_books'
  | 'delete_books'
  | 'view_chapters'
  | 'create_chapters'
  | 'edit_chapters'
  | 'delete_chapters'
  | 'view_categories'
  | 'manage_categories'
  | 'view_authors'
  | 'manage_authors'
  // User Management
  | 'view_users'
  | 'edit_users'
  | 'delete_users'
  | 'manage_roles'
  | 'view_activity_logs'
  // Commerce
  | 'view_payments'
  | 'process_refunds'
  | 'view_transactions'
  | 'export_financial_data'
  // Community
  | 'view_reviews'
  | 'moderate_reviews'
  | 'delete_reviews'
  | 'view_comments'
  | 'moderate_comments'
  // System
  | 'manage_settings'
  | 'manage_content_mode'
  | 'manage_pages'
  | 'manage_email_templates'
  | 'view_system_logs'
  // Analytics
  | 'view_analytics'
  | 'export_reports'
  | 'view_performance_metrics';

export const rolePermissions: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    // All permissions
    'view_dashboard',
    'view_books', 'create_books', 'edit_books', 'delete_books',
    'view_chapters', 'create_chapters', 'edit_chapters', 'delete_chapters',
    'view_categories', 'manage_categories',
    'view_authors', 'manage_authors',
    'view_users', 'edit_users', 'delete_users', 'manage_roles', 'view_activity_logs',
    'view_payments', 'process_refunds', 'view_transactions', 'export_financial_data',
    'view_reviews', 'moderate_reviews', 'delete_reviews',
    'view_comments', 'moderate_comments',
    'manage_settings', 'manage_content_mode', 'manage_pages', 'manage_email_templates', 'view_system_logs',
    'view_analytics', 'export_reports', 'view_performance_metrics',
  ],
  
  content_manager: [
    'view_dashboard',
    'view_books', 'create_books', 'edit_books',
    'view_chapters', 'create_chapters', 'edit_chapters',
    'view_categories', 'manage_categories',
    'view_authors', 'manage_authors',
    'view_reviews', 'moderate_reviews',
    'manage_pages',
    'view_analytics',
  ],
  
  support_agent: [
    'view_dashboard',
    'view_users', 'edit_users',
    'view_reviews', 'moderate_reviews',
    'view_comments', 'moderate_comments',
    'view_activity_logs',
  ],
  
  analytics_manager: [
    'view_dashboard',
    'view_analytics',
    'export_reports',
    'view_performance_metrics',
    'view_payments',
    'view_transactions',
  ],
  
  finance_manager: [
    'view_dashboard',
    'view_payments',
    'process_refunds',
    'view_transactions',
    'export_financial_data',
    'view_analytics',
    'export_reports',
  ],
};

export type AdminSection =
  | 'dashboard'
  | 'books'
  | 'chapters'
  | 'categories'
  | 'authors'
  | 'users'
  | 'roles'
  | 'activity_logs'
  | 'payments'
  | 'transactions'
  | 'reviews'
  | 'comments'
  | 'moderation'
  | 'settings'
  | 'pages'
  | 'email_templates'
  | 'analytics'
  | 'reports';

export interface AdminTabConfig {
  id: AdminSection;
  label: string;
  icon: string;
  description: string;
  requiredPermissions: AdminPermission[];
  category: 'content' | 'users' | 'commerce' | 'community' | 'system' | 'analytics';
}

export const adminTabConfigs: AdminTabConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    description: 'Overview and quick stats',
    requiredPermissions: ['view_dashboard'],
    category: 'system',
  },
  {
    id: 'books',
    label: 'Books',
    icon: 'Book',
    description: 'Manage all books',
    requiredPermissions: ['view_books'],
    category: 'content',
  },
  {
    id: 'chapters',
    label: 'Focus Areas',
    icon: 'FileText',
    description: 'Manage chapters/focus areas',
    requiredPermissions: ['view_chapters'],
    category: 'content',
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: 'FolderTree',
    description: 'Organize content categories',
    requiredPermissions: ['view_categories'],
    category: 'content',
  },
  {
    id: 'authors',
    label: 'Thought Leaders',
    icon: 'Users',
    description: 'Manage authors and thought leaders',
    requiredPermissions: ['view_authors'],
    category: 'content',
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'UserCircle',
    description: 'Manage platform users',
    requiredPermissions: ['view_users'],
    category: 'users',
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    icon: 'Shield',
    description: 'Manage admin roles',
    requiredPermissions: ['manage_roles'],
    category: 'users',
  },
  {
    id: 'activity_logs',
    label: 'Activity Logs',
    icon: 'Activity',
    description: 'View user activity',
    requiredPermissions: ['view_activity_logs'],
    category: 'users',
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'DollarSign',
    description: 'Manage payments and revenue',
    requiredPermissions: ['view_payments'],
    category: 'commerce',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: 'Receipt',
    description: 'View transaction history',
    requiredPermissions: ['view_transactions'],
    category: 'commerce',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: 'MessageSquare',
    description: 'Moderate user reviews',
    requiredPermissions: ['view_reviews'],
    category: 'community',
  },
  {
    id: 'moderation',
    label: 'Moderation Queue',
    icon: 'AlertCircle',
    description: 'Review flagged content',
    requiredPermissions: ['moderate_reviews'],
    category: 'community',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    description: 'Platform configuration',
    requiredPermissions: ['manage_settings'],
    category: 'system',
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: 'FileEdit',
    description: 'Manage static pages',
    requiredPermissions: ['manage_pages'],
    category: 'system',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'BarChart3',
    description: 'Platform analytics and insights',
    requiredPermissions: ['view_analytics'],
    category: 'analytics',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileSpreadsheet',
    description: 'Generate and export reports',
    requiredPermissions: ['export_reports'],
    category: 'analytics',
  },
];

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalBooks: number;
  totalChapters: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingReviews: number;
  flaggedContent: number;
  userGrowth: number; // percentage
  revenueGrowth: number; // percentage
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}