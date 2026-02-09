import { useState } from 'react';
import { Users, UserPlus, Search, MoreVertical, Mail, Shield, Ban, Power } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner';

const initialUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'author', status: 'active', books: 3, joined: '2025-12-15', avatar: '' },
  { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', role: 'reader', status: 'active', books: 0, joined: '2025-12-20', avatar: '' },
  { id: 3, name: 'Emily Davis', email: 'emily.d@email.com', role: 'author', status: 'active', books: 2, joined: '2025-11-10', avatar: '' },
  { id: 4, name: 'James Wilson', email: 'james.w@email.com', role: 'admin', status: 'active', books: 1, joined: '2025-10-05', avatar: '' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.a@email.com', role: 'reader', status: 'active', books: 0, joined: '2026-01-02', avatar: '' },
  { id: 6, name: 'David Brown', email: 'david.b@email.com', role: 'author', status: 'suspended', books: 1, joined: '2025-09-18', avatar: '' },
  { id: 7, name: 'Anna Martinez', email: 'anna.m@email.com', role: 'reader', status: 'active', books: 0, joined: '2026-01-05', avatar: '' },
  { id: 8, name: 'Tom Clark', email: 'tom.c@email.com', role: 'author', status: 'active', books: 4, joined: '2025-08-22', avatar: '' },
];

export function UserManagementTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(initialUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'author': return 'secondary';
      default: return 'outline';
    }
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'suspended' : 'active';
        toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">1,247</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Users className="h-4 w-4" />
              <span>+42 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Authors</CardDescription>
            <CardTitle className="text-3xl">87</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>7% of total users</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Readers</CardDescription>
            <CardTitle className="text-3xl">1,148</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>92% of total users</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New This Month</CardDescription>
            <CardTitle className="text-3xl">128</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <UserPlus className="h-4 w-4" />
              <span>+25% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage and monitor all platform users</CardDescription>
            </div>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Books</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-sm transition-colors ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      title={`Click to ${user.status === 'active' ? 'suspend' : 'activate'}`}
                    >
                      <Power className={`h-4 w-4 ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`} />
                      <span>{user.status}</span>
                    </button>
                  </TableCell>
                  <TableCell>{user.books}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}