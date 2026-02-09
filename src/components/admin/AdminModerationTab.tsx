/**
 * Admin Moderation Tab
 * Review and moderate flagged content
 */

import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertCircle, Check, X, Eye } from 'lucide-react';

export function AdminModerationTab() {
  const flaggedItems = [
    { id: 1, type: 'review', content: 'Inappropriate language in review', user: 'John Doe', item: 'Leadership Book', flagged: '2 hours ago', severity: 'high' },
    { id: 2, type: 'comment', content: 'Spam comment detected', user: 'Jane Smith', item: 'Career Chapter', flagged: '5 hours ago', severity: 'medium' },
    { id: 3, type: 'review', content: 'Potential fake review', user: 'Bob Johnson', item: 'Communication Skills', flagged: '1 day ago', severity: 'low' },
  ];

  const severityColors = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
  } as const;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Moderation Queue</h2>
        <p className="text-muted-foreground">Review and moderate flagged content</p>
      </div>

      <Card className="p-6 bg-orange-50 border-orange-200">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Pending Items</h3>
            <p className="text-sm text-muted-foreground">
              You have {flaggedItems.length} items that require moderation.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {flaggedItems.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={severityColors[item.severity as keyof typeof severityColors]}>
                      {item.severity} severity
                    </Badge>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                  <h4 className="font-semibold">{item.content}</h4>
                  <p className="text-sm text-muted-foreground">
                    By {item.user} on {item.item} · Flagged {item.flagged}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="default" className="gap-2">
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" className="gap-2">
                  <X className="h-4 w-4" />
                  Remove
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Review
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
