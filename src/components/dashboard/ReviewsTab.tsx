import { Star, ThumbsUp, MessageSquare, Flag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

const reviews = [
  {
    id: 1,
    user: 'Sarah Johnson',
    book: 'The Science Explorer',
    rating: 5,
    comment: 'Absolutely amazing book! The explanations are clear and engaging.',
    date: '2026-01-07',
    helpful: 24,
    reported: false
  },
  {
    id: 2,
    user: 'Mike Chen',
    book: 'Math Mastery',
    rating: 4,
    comment: 'Great content but some chapters could be more detailed.',
    date: '2026-01-06',
    helpful: 18,
    reported: false
  },
  {
    id: 3,
    user: 'Emily Davis',
    book: 'History Unveiled',
    rating: 5,
    comment: 'Best history book I\'ve read. Highly recommend!',
    date: '2026-01-05',
    helpful: 32,
    reported: false
  },
  {
    id: 4,
    user: 'James Wilson',
    book: 'Literature Journey',
    rating: 3,
    comment: 'Good book but not what I expected from the description.',
    date: '2026-01-05',
    helpful: 8,
    reported: true
  },
  {
    id: 5,
    user: 'Lisa Anderson',
    book: 'The Science Explorer',
    rating: 5,
    comment: 'Perfect for teenagers! My daughter loved it.',
    date: '2026-01-04',
    helpful: 41,
    reported: false
  },
];

const ratingDistribution = [
  { stars: 5, count: 487, percentage: 65 },
  { stars: 4, count: 189, percentage: 25 },
  { stars: 3, count: 52, percentage: 7 },
  { stars: 2, count: 15, percentage: 2 },
  { stars: 1, count: 7, percentage: 1 },
];

export function ReviewsTab() {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Reviews</CardDescription>
            <CardTitle className="text-3xl">750</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>+34 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rating</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              4.8
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ThumbsUp className="h-4 w-4" />
              <span>+0.3 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>5-Star Reviews</CardDescription>
            <CardTitle className="text-3xl">487</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>65% of all reviews</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reported Reviews</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-red-600">
              <Flag className="h-4 w-4" />
              <span>Needs attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
          <CardDescription>Breakdown of ratings across all books</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating.stars}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress value={rating.percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-16 text-right">
                  {rating.count} ({rating.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest reviews from your readers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Helpful</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(review.user)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{review.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{review.book}</TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground truncate">{review.comment}</p>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{review.helpful}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {review.reported ? (
                      <Badge variant="destructive">Reported</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
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
