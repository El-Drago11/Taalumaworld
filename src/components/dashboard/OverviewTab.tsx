import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Users, DollarSign, BookOpen, Eye, Clock } from 'lucide-react';

const dailyStats = [
  { date: 'Jan 1', users: 245, views: 1250, revenue: 890 },
  { date: 'Jan 2', users: 268, views: 1340, revenue: 920 },
  { date: 'Jan 3', users: 292, views: 1480, revenue: 1050 },
  { date: 'Jan 4', users: 310, views: 1560, revenue: 1120 },
  { date: 'Jan 5', users: 335, views: 1680, revenue: 1240 },
  { date: 'Jan 6', users: 358, views: 1790, revenue: 1320 },
  { date: 'Jan 7', users: 382, views: 1920, revenue: 1450 },
];

const bookPerformance = [
  { book: 'Science Explorer', sales: 145, revenue: 4350, rating: 4.8 },
  { book: 'Math Mastery', sales: 132, revenue: 3960, rating: 4.6 },
  { book: 'History Unveiled', sales: 98, revenue: 2940, rating: 4.7 },
  { book: 'Literature Journey', sales: 87, revenue: 2610, rating: 4.5 },
  { book: 'Art & Culture', sales: 76, revenue: 2280, rating: 4.4 },
];

const userGrowth = [
  { month: 'Aug', total: 450, active: 380, new: 120 },
  { month: 'Sep', total: 580, active: 490, new: 130 },
  { month: 'Oct', total: 720, active: 610, new: 140 },
  { month: 'Nov', total: 890, active: 750, new: 170 },
  { month: 'Dec', total: 1050, active: 890, new: 160 },
  { month: 'Jan', total: 1247, active: 1050, new: 197 },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">$28,450</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+18.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">1,247</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Users className="h-4 w-4" />
              <span>+23.5% growth</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl">538</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <DollarSign className="h-4 w-4" />
              <span>+15.8% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Page Views</CardDescription>
            <CardTitle className="text-3xl">45.2K</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>Last 30 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity Overview</CardTitle>
          <CardDescription>User engagement and revenue trends for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={dailyStats}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFA800" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFA800" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#FFA800" fillOpacity={1} fill="url(#colorUsers)" name="Active Users" />
              <Area type="monotone" dataKey="revenue" stroke="#4ECDC4" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Book Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Books</CardTitle>
            <CardDescription>Sales and revenue by book</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="book" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#FFA800" name="Sales" />
                <Bar dataKey="revenue" fill="#4ECDC4" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
            <CardDescription>Total, active, and new users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#FFA800" strokeWidth={2} name="Total Users" />
                <Line type="monotone" dataKey="active" stroke="#4ECDC4" strokeWidth={2} name="Active Users" />
                <Line type="monotone" dataKey="new" stroke="#95E1D3" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Session Duration</CardDescription>
            <CardTitle className="text-2xl">12m 34s</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>+2m 15s from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Books Published</CardDescription>
            <CardTitle className="text-2xl">6 Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>69 chapters total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-2xl">3.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+0.5% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
