import {
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  Eye,
  ShoppingCart,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 1240 },
  { month: 'Feb', revenue: 1890 },
  { month: 'Mar', revenue: 2340 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 2890 },
  { month: 'Jun', revenue: 3245 },
];

const topBooksData = [
  { name: 'The Quantum Quest', sales: 342, revenue: 1023 },
  { name: 'Island Survivors', sales: 289, revenue: 867 },
  { name: 'Code Warriors Academy', sales: 156, revenue: 4678 },
  { name: 'Mysteries of Moonlight Manor', sales: 201, revenue: 402 },
];

const salesByTypeData = [
  { name: 'Full Books', value: 45, color: '#FFA800' },
  { name: 'Individual Chapters', value: 55, color: '#FFD166' },
];

const readerEngagementData = [
  { day: 'Mon', readers: 120 },
  { day: 'Tue', readers: 145 },
  { day: 'Wed', readers: 189 },
  { day: 'Thu', readers: 167 },
  { day: 'Fri', readers: 201 },
  { day: 'Sat', readers: 234 },
  { day: 'Sun', readers: 198 },
];

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Analytics & Insights</h2>
        <p className="text-muted-foreground">Track your performance and earnings</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,245</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">988</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Readers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">
              Reading your books now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground mt-1">
              From 456 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FFA800"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Reader Engagement</CardTitle>
            <CardDescription>Active readers in the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={readerEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="readers" fill="#FFA800" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Books</CardTitle>
            <CardDescription>Books ranked by total sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBooksData.map((book, index) => (
                <div key={book.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium text-sm">{book.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${book.revenue}</div>
                      <div className="text-xs text-muted-foreground">
                        {book.sales} sales
                      </div>
                    </div>
                  </div>
                  {index < topBooksData.length - 1 && (
                    <div className="h-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Type</CardTitle>
            <CardDescription>Full books vs individual chapters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salesByTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Personalized recommendations for growth</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Strong Growth Trend</p>
              <p className="text-sm text-muted-foreground">
                Your revenue has increased by 12.5% this month. Keep up the great work!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Popular Content</p>
              <p className="text-sm text-muted-foreground">
                "The Quantum Quest" is your top performer. Consider creating similar content
                or a sequel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Weekend Peak</p>
              <p className="text-sm text-muted-foreground">
                Your readers are most active on weekends. Consider releasing new chapters
                on Fridays.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
