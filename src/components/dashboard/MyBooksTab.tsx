import { useState } from 'react';
import { Plus, BookOpen, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CreateBookModal } from './CreateBookModal';
import { useGetAllBooksQuery } from '../../store/api/booksApi';
import { useGetAuthorsQuery } from '../../store/api/authorsApi';
import { useGetCategoriesQuery } from '../../store/api/categoriesApi';
import { useGetAllChaptersQuery } from '../../store/api/chaptersApi';

interface MyBooksTabProps {
  onSelectBook: (bookId: string) => void;
}

export function MyBooksTab({ onSelectBook }: MyBooksTabProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: books = [] } = useGetAllBooksQuery();
  const { data: authors = [] } = useGetAuthorsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: chapters = [] } = useGetAllChaptersQuery();

  // For demo, we'll assume the current author is author-1
  const currentAuthorId = 'author-1';
  const myBooks = books.filter((book) => book.authorId === currentAuthorId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>My Books</h2>
          <p className="text-muted-foreground">Manage your published books</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Book
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBooks.map((book) => {
          const category = categories.find((c) => c.id === book.categoryId);
          const subcategory = category?.subcategories.find(
            (s) => s.id === book.subcategoryId
          );
          const bookChapters = chapters.filter((ch) => ch.bookId === book.id);

          return (
            <Card key={book.id} className="overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 backdrop-blur"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Book
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Book
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="line-clamp-1">{book.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {category?.name}
                  </Badge>
                  {subcategory && (
                    <Badge variant="outline" className="text-xs">
                      {subcategory.name}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pb-3 space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Chapters:</span>
                    <span className="ml-1 font-medium">{bookChapters.length}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-1 font-medium capitalize">
                      {book.pricingType}
                    </span>
                  </div>
                </div>

                {book.pricingType === 'book' && book.bookPrice && (
                  <div className="pt-2">
                    <span className="text-lg font-bold text-primary">
                      ${book.bookPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      full book
                    </span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onSelectBook(book.id)}
                >
                  Manage Chapters
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {myBooks.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3>No books yet</h3>
              <p className="text-muted-foreground">
                Create your first book to get started
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Book
            </Button>
          </div>
        </Card>
      )}

      <CreateBookModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}