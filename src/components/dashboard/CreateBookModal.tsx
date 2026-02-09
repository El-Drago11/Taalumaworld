import { useState } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useGetCategoriesQuery } from '../../store/api/categoriesApi';
import { toast } from 'sonner@2.0.3';
import { createBookSchema } from '../../utils/validationSchemas';

interface CreateBookModalProps {
  open: boolean;
  onClose: () => void;
}

interface BookFormData {
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  tags: string;
  coverImageUrl: string;
  pricingType: 'chapter' | 'book';
  bookPrice?: string;
}

export function CreateBookModal({ open, onClose }: CreateBookModalProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const formik = useFormik<BookFormData>({
    initialValues: {
      title: '',
      description: '',
      categoryId: '',
      subcategoryId: '',
      tags: '',
      coverImageUrl: '',
      pricingType: 'chapter',
      bookPrice: '',
    },
    validationSchema: createBookSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Creating book:', values);
      toast.success('Book created successfully!');
      resetForm();
      setSelectedCategoryId('');
      onClose();
    },
  });

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Book</DialogTitle>
          <DialogDescription>
            Add a new book to your library with detailed information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title *</Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter book title"
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
              placeholder="Describe your book"
              rows={4}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                onValueChange={(value) => {
                  setSelectedCategoryId(value);
                  formik.setFieldValue('categoryId', value);
                  formik.setFieldValue('subcategoryId', '');
                }}
                value={formik.values.categoryId}
                disabled={categoriesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <p className="text-sm text-red-500">{formik.errors.categoryId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory *</Label>
              <Select
                onValueChange={(value) => formik.setFieldValue('subcategoryId', value)}
                value={formik.values.subcategoryId}
                disabled={!selectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory?.subcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.subcategoryId && formik.errors.subcategoryId && (
                <p className="text-sm text-red-500">{formik.errors.subcategoryId}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter tags separated by commas (e.g., Adventure, Mystery)"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImageUrl">Cover Image URL *</Label>
            <Input
              id="coverImageUrl"
              name="coverImageUrl"
              value={formik.values.coverImageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="https://example.com/cover.jpg"
            />
            {formik.touched.coverImageUrl && formik.errors.coverImageUrl && (
              <p className="text-sm text-red-500">{formik.errors.coverImageUrl}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Pricing Type *</Label>
            <RadioGroup
              value={formik.values.pricingType}
              onValueChange={(value: 'chapter' | 'book') =>
                formik.setFieldValue('pricingType', value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chapter" id="chapter" />
                <Label htmlFor="chapter" className="cursor-pointer">
                  Sell by Chapter - Readers purchase individual chapters
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="book" id="book" />
                <Label htmlFor="book" className="cursor-pointer">
                  Sell Complete Book - Readers purchase the entire book
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formik.values.pricingType === 'book' && (
            <div className="space-y-2">
              <Label htmlFor="bookPrice">Book Price (USD) *</Label>
              <Input
                id="bookPrice"
                name="bookPrice"
                type="number"
                step="0.01"
                value={formik.values.bookPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="29.99"
              />
              {formik.touched.bookPrice && formik.errors.bookPrice && (
                <p className="text-sm text-red-500">{formik.errors.bookPrice}</p>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              Create Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}