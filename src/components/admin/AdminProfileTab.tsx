import { useState } from 'react';
import { User, Mail, Shield, Key, Save, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

interface AdminProfileTabProps {
  contentMode: 'chapters' | 'books';
}

export function AdminProfileTab({ contentMode }: AdminProfileTabProps) {
  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@taaluma.world');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSaveProfile = () => {
    // Save profile logic
    console.log('Profile saved');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your admin account settings and preferences
            </p>
          </div>
          <Badge variant="outline" className="h-fit">
            {contentMode === 'chapters' ? 'Chapter Mode' : 'Book Mode'}
          </Badge>
        </div>
      </div>

      {/* Profile Information */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              <User className="inline h-4 w-4 mr-2" />
              Full Name
            </Label>
            <Input
              id="name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              <Mail className="inline h-4 w-4 mr-2" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Role Badge */}
          <div className="space-y-2">
            <Label>
              <Shield className="inline h-4 w-4 mr-2" />
              Role
            </Label>
            <div>
              <Badge variant="default" className="bg-primary">
                Super Admin
              </Badge>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveProfile} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
          <CardDescription>Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-2">
            <Label htmlFor="current-password">
              <Key className="inline h-4 w-4 mr-2" />
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about important updates
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" className="gap-2">
              Update Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
