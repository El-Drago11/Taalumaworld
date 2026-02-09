import { Eye, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chapterViews = [
  { chapter: 'Ch 1', views: 1245, avgTime: 8.5 },
  { chapter: 'Ch 2', views: 1120, avgTime: 7.2 },
  { chapter: 'Ch 3', views: 980, avgTime: 9.1 },
  { chapter: 'Ch 4', views: 845, avgTime: 6.8 },
  { chapter: 'Ch 5', views: 720, avgTime: 7.5 },
  { chapter: 'Ch 6', views: 650, avgTime: 8.2 },
];

const readingTrends = [
  { week: 'Week 1', reads: 420, completions: 325 },
  { week: 'Week 2', reads: 380, completions: 290 },
  { week: 'Week 3', reads: 510, completions: 410 },
  { week: 'Week 4', reads: 460, completions: 375 },
];

const topPerformingChapters = [
  { 
    id: 'ch-001', 
    title: 'Introduction to Quantum Physics',
    book: 'The Science Explorer',
    views: 1245,
    engagement: 92,
    avgReadTime: '8.5 min',
    completionRate: 87
  },
  { 
    id: 'ch-002', 
    title: 'The Fall of Rome',
    book: 'History Unveiled',
    views: 1120,
    engagement: 88,
    avgReadTime: '7.2 min',
    completionRate: 84
  },
  { 
    id: 'ch-003', 
    title: 'Calculus Fundamentals',
    book: 'Math Mastery',
    views: 980,
    engagement: 85,
    avgReadTime: '9.1 min',
    completionRate: 78
  },
  { 
    id: 'ch-004', 
    title: 'Shakespeare Analysis',
    book: 'Literature Journey',
    views: 845,
    engagement: 90,
    avgReadTime: '6.8 min',
    completionRate: 92
  },
  { 
    id: 'ch-005', 
    title: 'Chemical Reactions',
    book: 'The Science Explorer',
    views: 720,
    engagement: 82,
    avgReadTime: '7.5 min',
    completionRate: 80
  },
];

export function ChapterReportsTab() {
  return (
    <div className="space-y-6">
      {/* Chapter Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Chapter Views</CardDescription>
            <CardTitle className="text-3xl">15,247</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Eye className="h-4 w-4" />
              <span>+15.3% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Reading Time</CardDescription>
            <CardTitle className="text-3xl">7.8m</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Per chapter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completion Rate</CardDescription>
            <CardTitle className="text-3xl">83%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Chapters</CardDescription>
            <CardTitle className="text-3xl">69</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Across 6 books</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chapter Views by Position</CardTitle>
            <CardDescription>Views and average reading time per chapter</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chapterViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="chapter" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="views" fill="#FFA800" name="Views" />
                <Bar yAxisId="right" dataKey="avgTime" fill="#4ECDC4" name="Avg Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reading Trends</CardTitle>
            <CardDescription>Chapter reads vs completions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={readingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reads" stroke="#FFA800" strokeWidth={2} name="Started" />
                <Line type="monotone" dataKey="completions" stroke="#4ECDC4" strokeWidth={2} name="Completed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Chapters */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Chapters</CardTitle>
          <CardDescription>Chapters ranked by views and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chapter Title</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Avg Read Time</TableHead>
                <TableHead>Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformingChapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell className="font-medium">{chapter.title}</TableCell>
                  <TableCell>{chapter.book}</TableCell>
                  <TableCell>{chapter.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={chapter.engagement} className="w-16 h-2" />
                      <span className="text-sm text-muted-foreground">{chapter.engagement}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{chapter.avgReadTime}</TableCell>
                  <TableCell>
                    <Badge variant={chapter.completionRate >= 85 ? 'default' : 'secondary'}>
                      {chapter.completionRate}%
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
