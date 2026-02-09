import { CreateChapterModal } from './CreateChapterModal';
import { useGetAllBooksQuery } from '../../store/api/booksApi';
import { useGetAllChaptersQuery } from '../../store/api/chaptersApi';

interface ManageChaptersTabProps {
  selectedBookId: string | null;
}

export function ManageChaptersTab({ selectedBookId }: ManageChaptersTabProps) {
  const [bookId, setBookId] = useState(selectedBookId || '');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: books = [] } = useGetAllBooksQuery();
  const { data: chapters = [] } = useGetAllChaptersQuery();

  const currentAuthorId = 'author-1';
  const myBooks = books.filter((book) => book.authorId === currentAuthorId);
  const selectedBook = myBooks.find((b) => b.id === bookId);
  const bookChapters = bookId
    ? [...chapters.filter((ch) => ch.bookId === bookId)].sort(
        (a, b) => a.sequence - b.sequence
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 max-w-md space-y-2">
          <label className="text-sm font-medium">Select Book</label>
          <Select value={bookId} onValueChange={setBookId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a book to manage chapters" />
            </SelectTrigger>
            <SelectContent>
              {myBooks.map((book) => (
                <SelectItem key={book.id} value={book.id}>
                  {book.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {bookId && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Chapter
          </Button>
        )}
      </div>

      {bookId && selectedBook ? (
        <div className="space-y-6">
          {/* Book Info */}
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <h3>{selectedBook.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedBook.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge>
                      {selectedBook.pricingType === 'book'
                        ? 'Full Book Pricing'
                        : 'Per Chapter Pricing'}
                    </Badge>
                    <Badge variant="outline">
                      {bookChapters.length} chapters
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chapters List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Chapters</CardTitle>
              <span className="text-sm text-muted-foreground">
                Drag to reorder
              </span>
            </CardHeader>
            <CardContent>
              {bookChapters.length > 0 ? (
                <div className="space-y-3">
                  {bookChapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <button className="cursor-grab hover:text-primary">
                        <GripVertical className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={chapter.featuredImage}
                          alt={chapter.title}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              Ch. {chapter.sequence}
                            </Badge>
                            {chapter.isFree && (
                              <Badge className="text-xs bg-green-500">
                                FREE
                              </Badge>
                            )}
                          </div>
                          <h4 className="text-sm line-clamp-1">
                            {chapter.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {chapter.description}
                          </p>
                          {!chapter.isFree && (
                            <p className="text-sm font-medium mt-1">
                              ${chapter.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={index === 0}
                          title="Move up"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={index === bookChapters.length - 1}
                          title="Move down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Delete"
                          className="hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No chapters yet. Add your first chapter to get started.
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Chapter
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedBook.pricingType === 'chapter' && bookChapters.length > 0 && (
            <Card className="bg-accent/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chapter Pricing Summary</p>
                    <p className="text-sm text-muted-foreground">
                      {bookChapters.filter((ch) => ch.isFree).length} free chapters,{' '}
                      {bookChapters.filter((ch) => !ch.isFree).length} paid chapters
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      $
                      {bookChapters
                        .reduce((sum, ch) => sum + (ch.isFree ? 0 : ch.price), 0)
                        .toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total if bought separately</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3>Select a book to manage chapters</h3>
              <p className="text-muted-foreground">
                Choose a book from the dropdown above to add and organize chapters
              </p>
            </div>
          </div>
        </Card>
      )}

      {bookId && (
        <CreateChapterModal
          open={isCreateModalOpen}
          bookId={bookId}
          nextSequence={bookChapters.length + 1}
          pricingType={selectedBook?.pricingType || 'chapter'}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}