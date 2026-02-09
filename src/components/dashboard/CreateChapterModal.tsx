import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';
import { createChapterSchema } from '../../utils/validationSchemas';

interface CreateChapterModalProps {
  open: boolean;
  bookId: string;
  nextSequence: number;
  pricingType: 'chapter' | 'book';
  onClose: () => void;
}

interface ChapterFormData {
  title: string;
  description: string;
  featuredImage: string;
  content: string;
  price: string;
  isFree: boolean;
}

export function CreateChapterModal({
  open,
  bookId,
  nextSequence,
  pricingType,
  onClose,
}: CreateChapterModalProps) {
  const formik = useFormik<ChapterFormData>({
    initialValues: {
      title: '',
      description: '',
      featuredImage: '',
      content: '',
      price: '',
      isFree: nextSequence === 1, // First chapter is free by default
    },
    validationSchema: createChapterSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Creating chapter:', {
        ...values,
        bookId,
        sequence: nextSequence,
      });
      toast.success('Chapter created successfully!');
      resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Chapter {nextSequence}
          </p>
          <DialogDescription>
            Add a new chapter to your book with a title, description, featured image, content, and pricing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Chapter Title *</Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter chapter title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Brief description of what happens in this chapter"
              rows={3}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image URL *</Label>
            <Input
              id="featuredImage"
              name="featuredImage"
              value={formik.values.featuredImage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="https://example.com/chapter-image.jpg"
            />
            {formik.touched.featuredImage && formik.errors.featuredImage && (
              <p className="text-sm text-red-500">{formik.errors.featuredImage}</p>
            )}
            <p className="text-xs text-muted-foreground">
              This image will be displayed alongside the chapter
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Chapter Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your chapter content here..."
              rows={8}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="text-sm text-red-500">{formik.errors.content}</p>
            )}
          </div>

          {pricingType === 'chapter' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="isFree">Mark as Free Chapter</Label>
                  <p className="text-xs text-muted-foreground">
                    {nextSequence === 1
                      ? 'First chapters are typically free to attract readers'
                      : 'Allow readers to access this chapter for free'}
                  </p>
                </div>
                <Switch
                  id="isFree"
                  checked={formik.values.isFree}
                  onCheckedChange={(checked) => formik.setFieldValue('isFree', checked)}
                />
              </div>

              {!formik.values.isFree && (
                <div className="space-y-2">
                  <Label htmlFor="price">Chapter Price (USD) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="2.99"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <p className="text-sm text-red-500">{formik.errors.price}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Set a competitive price for this chapter
                  </p>
                </div>
              )}
            </div>
          )}

          {pricingType === 'book' && (
            <div className="p-4 bg-accent rounded-lg">
              <p className="text-sm text-muted-foreground">
                This book uses full book pricing. Individual chapter prices are not
                applicable. You can still mark the first chapter as free to give readers a
                preview.
              </p>
              {nextSequence === 1 && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="isFree">Offer First Chapter Free</Label>
                    <p className="text-xs text-muted-foreground">
                      Let readers preview before buying
                    </p>
                  </div>
                  <Switch
                    id="isFree"
                    checked={formik.values.isFree}
                    onCheckedChange={(checked) => formik.setFieldValue('isFree', checked)}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              Add Chapter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}