import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 4200, transactions: 145 },
  { month: 'Feb', revenue: 3800, transactions: 132 },
  { month: 'Mar', revenue: 5100, transactions: 178 },
  { month: 'Apr', revenue: 4600, transactions: 156 },
  { month: 'May', revenue: 5400, transactions: 189 },
  { month: 'Jun', revenue: 6200, transactions: 215 },
];

const revenueByBook = [
  { name: 'The Science Explorer', value: 1240, color: '#FFA800' },
  { name: 'History Unveiled', value: 980, color: '#FF6B6B' },
  { name: 'Math Mastery', value: 1560, color: '#4ECDC4' },
  { name: 'Literature Journey', value: 720, color: '#95E1D3' },
  { name: 'Others', value: 745, color: '#C7CEEA' },
];

const recentTransactions = [
  { id: 'TXN-001', user: 'Sarah Johnson', book: 'The Science Explorer', amount: 29.99, date: '2026-01-07', status: 'completed' },
  { id: 'TXN-002', user: 'Mike Chen', book: 'Math Mastery', amount: 24.99, date: '2026-01-07', status: 'completed' },
  { id: 'TXN-003', user: 'Emily Davis', book: 'History Unveiled', amount: 19.99, date: '2026-01-06', status: 'completed' },
  { id: 'TXN-004', user: 'James Wilson', book: 'Literature Journey', amount: 34.99, date: '2026-01-06', status: 'pending' },
  { id: 'TXN-005', user: 'Lisa Anderson', book: 'The Science Explorer', amount: 29.99, date: '2026-01-05', status: 'completed' },
  { id: 'TXN-006', user: 'David Brown', book: 'Math Mastery', amount: 24.99, date: '2026-01-05', status: 'completed' },
];

export function PaymentReportsTab() {
  return (
    <div className="space-y-6">
      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue (MTD)</CardDescription>
            <CardTitle className="text-3xl">$6,245</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+23.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-3xl">215</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CreditCard className="h-4 w-4" />
              <span>+18% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Order Value</CardDescription>
            <CardTitle className="text-3xl">$29.05</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue and transactions over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#FFA800" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Book</CardTitle>
            <CardDescription>Distribution of earnings across books</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByBook}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `$${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueByBook.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payment transactions from your readers</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.book}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                      {transaction.status}
                    </Badge>
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
