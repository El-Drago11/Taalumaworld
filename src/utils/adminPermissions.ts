/**
 * Admin Permission Utilities
 * Role-Based Access Control (RBAC) Helper Functions
 */

import type { AdminUser, AdminPermission, AdminRole, rolePermissions, AdminSection, adminTabConfigs } from '../types/admin';

/**
 * Check if an admin user has a specific permission
 */
export function hasPermission(user: AdminUser | null, permission: AdminPermission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

/**
 * Check if an admin user has ANY of the specified permissions
 */
export function hasAnyPermission(user: AdminUser | null, permissions: AdminPermission[]): boolean {
  if (!user) return false;
  return permissions.some(permission => user.permissions.includes(permission));
}

/**
 * Check if an admin user has ALL of the specified permissions
 */
export function hasAllPermissions(user: AdminUser | null, permissions: AdminPermission[]): boolean {
  if (!user) return false;
  return permissions.every(permission => user.permissions.includes(permission));
}

/**
 * Check if an admin user can access a specific section
 */
export function canAccessSection(user: AdminUser | null, section: AdminSection): boolean {
  if (!user) return false;
  
  // Import config inline to avoid circular dependencies
  const tabConfig = {
    'dashboard': ['view_dashboard'],
    'books': ['view_books'],
    'chapters': ['view_chapters'],
    'categories': ['view_categories'],
    'authors': ['view_authors'],
    'users': ['view_users'],
    'roles': ['manage_roles'],
    'activity_logs': ['view_activity_logs'],
    'payments': ['view_payments'],
    'transactions': ['view_transactions'],
    'reviews': ['view_reviews'],
    'comments': ['view_comments'],
    'moderation': ['moderate_reviews'],
    'settings': ['manage_settings'],
    'pages': ['manage_pages'],
    'email_templates': ['manage_email_templates'],
    'analytics': ['view_analytics'],
    'reports': ['export_reports'],
  } as Record<AdminSection, AdminPermission[]>;
  
  const requiredPermissions = tabConfig[section];
  if (!requiredPermissions) return false;
  
  return hasAnyPermission(user, requiredPermissions);
}

/**
 * Get all accessible sections for an admin user
 */
export function getAccessibleSections(user: AdminUser | null): AdminSection[] {
  if (!user) return [];
  
  const allSections: AdminSection[] = [
    'dashboard', 'books', 'chapters', 'categories', 'authors',
    'users', 'roles', 'activity_logs',
    'payments', 'transactions',
    'reviews', 'moderation',
    'settings', 'pages',
    'analytics', 'reports',
  ];
  
  return allSections.filter(section => canAccessSection(user, section));
}

/**
 * Get permissions for a specific role
 */
export function getPermissionsForRole(role: AdminRole): AdminPermission[] {
  return rolePermissions[role] || [];
}

/**
 * Get a friendly role name
 */
export function getRoleName(role: AdminRole): string {
  const roleNames: Record<AdminRole, string> = {
    super_admin: 'Super Admin',
    content_manager: 'Content Manager',
    support_agent: 'Support Agent',
    analytics_manager: 'Analytics Manager',
    finance_manager: 'Finance Manager',
  };
  
  return roleNames[role] || role;
}

/**
 * Get a role description
 */
export function getRoleDescription(role: AdminRole): string {
  const descriptions: Record<AdminRole, string> = {
    super_admin: 'Full access to all platform features and settings',
    content_manager: 'Manage books, chapters, categories, and content',
    support_agent: 'Assist users and moderate community content',
    analytics_manager: 'View analytics, reports, and performance metrics',
    finance_manager: 'Manage payments, transactions, and financial data',
  };
  
  return descriptions[role] || '';
}

/**
 * Check if a role is higher than another role (for hierarchy)
 */
export function isHigherRole(role1: AdminRole, role2: AdminRole): boolean {
  const hierarchy: Record<AdminRole, number> = {
    super_admin: 100,
    content_manager: 50,
    finance_manager: 50,
    analytics_manager: 40,
    support_agent: 30,
  };
  
  return (hierarchy[role1] || 0) > (hierarchy[role2] || 0);
}

/**
 * Filter items based on permissions
 */
export function filterByPermission<T extends { requiredPermissions?: AdminPermission[] }>(
  user: AdminUser | null,
  items: T[]
): T[] {
  if (!user) return [];
  
  return items.filter(item => {
    if (!item.requiredPermissions || item.requiredPermissions.length === 0) {
      return true;
    }
    return hasAnyPermission(user, item.requiredPermissions);
  });
}