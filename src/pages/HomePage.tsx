import { useGetAllBooksQuery } from '../store/api/booksApi';
import { useGetAllChaptersQuery } from '../store/api/chaptersApi';
import { useAppSelector } from '../store/hooks';
import { selectContentMode } from '../store/slices/contentModeSlice';
import { PageLoading } from '../components/global/LoadingState';
import { ErrorState } from '../components/global/StateComponents';

export function HomePage() {
  const contentMode = useAppSelector(selectContentMode);
  const { data: books, isLoading: booksLoading, error: booksError } = useGetAllBooksQuery();
  const { data: chapters, isLoading: chaptersLoading, error: chaptersError } = useGetAllChaptersQuery();

  if (booksLoading || chaptersLoading) {
    return <PageLoading message="Loading content..." />;
  }

  if (booksError || chaptersError) {
    return (
      <ErrorState
        title="Failed to load content"
        message="We couldn't load the page content. Please try again."
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Taaluma<span className="text-primary">World</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing {contentMode === 'books' ? 'books' : 'chapters'} from talented authors worldwide
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                Start Reading
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured {contentMode === 'books' ? 'Books' : 'Chapters'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contentMode === 'books'
            ? books?.slice(0, 8).map((book) => (
                <div key={book.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4">
                  <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl mb-4" />
                  <h3 className="font-semibold mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.category}</p>
                  <p className="text-primary font-bold mt-2">${book.price}</p>
                </div>
              ))
            : chapters?.slice(0, 8).map((chapter) => (
                <div key={chapter.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4">
                  <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl mb-4" />
                  <h3 className="font-semibold mb-2">{chapter.title}</h3>
                  <p className="text-sm text-gray-600">Chapter {chapter.chapterNumber}</p>
                  <p className="text-primary font-bold mt-2">
                    {chapter.price === 0 ? 'Free' : `$${chapter.price}`}
                  </p>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}