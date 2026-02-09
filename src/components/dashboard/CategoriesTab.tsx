import { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface Category {
  id: string;
  name: string;
  description: string;
  booksCount: number;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  booksCount: number;
}

const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Science',
    description: 'Books about scientific topics and discoveries',
    booksCount: 12,
    subcategories: [
      { id: 'sub-1', name: 'Physics', booksCount: 5 },
      { id: 'sub-2', name: 'Chemistry', booksCount: 4 },
      { id: 'sub-3', name: 'Biology', booksCount: 3 },
    ]
  },
  {
    id: 'cat-2',
    name: 'Mathematics',
    description: 'Mathematical concepts and problem solving',
    booksCount: 8,
    subcategories: [
      { id: 'sub-4', name: 'Algebra', booksCount: 3 },
      { id: 'sub-5', name: 'Calculus', booksCount: 3 },
      { id: 'sub-6', name: 'Geometry', booksCount: 2 },
    ]
  },
  {
    id: 'cat-3',
    name: 'History',
    description: 'Historical events and civilizations',
    booksCount: 10,
    subcategories: [
      { id: 'sub-7', name: 'Ancient History', booksCount: 4 },
      { id: 'sub-8', name: 'Modern History', booksCount: 6 },
    ]
  },
  {
    id: 'cat-4',
    name: 'Literature',
    description: 'Classic and modern literature',
    booksCount: 15,
    subcategories: [
      { id: 'sub-9', name: 'Poetry', booksCount: 5 },
      { id: 'sub-10', name: 'Fiction', booksCount: 7 },
      { id: 'sub-11', name: 'Non-Fiction', booksCount: 3 },
    ]
  },
];

export function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCategoryName,
      description: newCategoryDesc,
      booksCount: 0,
      subcategories: []
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryDesc('');
    setIsAddCategoryOpen(false);
    toast.success('Category added successfully');
  };

  const handleAddSubcategory = () => {
    if (!newSubcategoryName.trim() || !selectedCategoryId) {
      toast.error('Please enter a subcategory name and select a category');
      return;
    }

    setCategories(categories.map(cat => {
      if (cat.id === selectedCategoryId) {
        return {
          ...cat,
          subcategories: [
            ...cat.subcategories,
            {
              id: `sub-${Date.now()}`,
              name: newSubcategoryName,
              booksCount: 0
            }
          ]
        };
      }
      return cat;
    }));

    setNewSubcategoryName('');
    setSelectedCategoryId('');
    setIsAddSubcategoryOpen(false);
    toast.success('Subcategory added successfully');
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast.success('Category deleted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Categories</CardDescription>
            <CardTitle className="text-3xl">{categories.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderTree className="h-4 w-4" />
              <span>Main categories</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Subcategories</CardDescription>
            <CardTitle className="text-3xl">
              {categories.reduce((acc, cat) => acc + cat.subcategories.length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderTree className="h-4 w-4" />
              <span>Total subcategories</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Categorized Books</CardDescription>
            <CardTitle className="text-3xl">
              {categories.reduce((acc, cat) => acc + cat.booksCount, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Books in categories</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Categories & Subcategories</CardTitle>
              <CardDescription>Organize your books into categories</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddSubcategoryOpen} onOpenChange={setIsAddSubcategoryOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Subcategory
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Subcategory</DialogTitle>
                    <DialogDescription>Create a new subcategory under an existing category</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-category">Parent Category</Label>
                      <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                        <SelectTrigger id="parent-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subcategory-name">Subcategory Name</Label>
                      <Input
                        id="subcategory-name"
                        placeholder="e.g., Physics"
                        value={newSubcategoryName}
                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddSubcategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>Create a new main category for organizing books</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        id="category-name"
                        placeholder="e.g., Science"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-desc">Description</Label>
                      <Textarea
                        id="category-desc"
                        placeholder="Brief description of this category"
                        value={newCategoryDesc}
                        onChange={(e) => setNewCategoryDesc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory}>Add Category</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Books</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.booksCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map(sub => (
                        <Badge key={sub.id} variant="outline" className="text-xs">
                          {sub.name} ({sub.booksCount})
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
