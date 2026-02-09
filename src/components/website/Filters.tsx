import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Category, Author } from '../../data/mockData';

interface FiltersProps {
  categories: Category[];
  authors: Author[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedAuthors: string[];
  selectedTags: string[];
  onCategoryChange: (categories: string[]) => void;
  onSubcategoryChange: (subcategories: string[]) => void;
  onAuthorChange: (authors: string[]) => void;
  onTagChange: (tags: string[]) => void;
}

const popularTags = [
  'Adventure',
  'Science Fiction',
  'Mystery',
  'Technology',
  'Learning',
  'Survival',
  'Space',
  'Programming',
];

export function Filters({
  categories,
  authors,
  selectedCategories,
  selectedSubcategories,
  selectedAuthors,
  selectedTags,
  onCategoryChange,
  onSubcategoryChange,
  onAuthorChange,
  onTagChange,
}: FiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    categories: true,
    authors: true,
    tags: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const toggleSubcategory = (subcategoryId: string) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      onSubcategoryChange(selectedSubcategories.filter((id) => id !== subcategoryId));
    } else {
      onSubcategoryChange([...selectedSubcategories, subcategoryId]);
    }
  };

  const toggleAuthor = (authorId: string) => {
    if (selectedAuthors.includes(authorId)) {
      onAuthorChange(selectedAuthors.filter((id) => id !== authorId));
    } else {
      onAuthorChange([...selectedAuthors, authorId]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0 ||
    selectedAuthors.length > 0 ||
    selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Mode Indicator */}
      <div className="bg-primary/5 border border-primary/20 rounded-3xl p-3">
        <div className="flex items-center gap-2 mb-0.5">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm text-primary tracking-tight">Books Mode</span>
        </div>
        <p className="text-xs text-muted-foreground tracking-tight">
          Browsing complete books and collections
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold tracking-tight">Filter Books</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => {
              onCategoryChange([]);
              onSubcategoryChange([]);
              onAuthorChange([]);
              onTagChange([]);
            }}
          >
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('categories')}
        >
          <h4 className="font-medium text-sm tracking-tight">By Category</h4>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                    className="rounded-md"
                  />
                  <label
                    htmlFor={`cat-${category.id}`}
                    className="text-sm cursor-pointer tracking-tight"
                  >
                    {category.name}
                  </label>
                </div>
                {selectedCategories.includes(category.id) && (
                  <div className="ml-6 space-y-2">
                    {category.subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sub-${sub.id}`}
                          checked={selectedSubcategories.includes(sub.id)}
                          onCheckedChange={() => toggleSubcategory(sub.id)}
                          className="rounded-md"
                        />
                        <label
                          htmlFor={`sub-${sub.id}`}
                          className="text-sm cursor-pointer text-muted-foreground tracking-tight"
                        >
                          {sub.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Authors */}
      <div className="space-y-3">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('authors')}
        >
          <h4 className="font-medium text-sm tracking-tight">By Author</h4>
          {expandedSections.authors ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.authors && (
          <div className="space-y-2">
            {authors.map((author) => (
              <div key={author.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`author-${author.id}`}
                  checked={selectedAuthors.includes(author.id)}
                  onCheckedChange={() => toggleAuthor(author.id)}
                  className="rounded-md"
                />
                <label
                  htmlFor={`author-${author.id}`}
                  className="text-sm cursor-pointer tracking-tight"
                >
                  {author.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Tags */}
      <div className="space-y-3">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('tags')}
        >
          <h4 className="font-medium text-sm tracking-tight">By Genre & Topics</h4>
          {expandedSections.tags ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.tags && (
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all tracking-tight ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-white'
                    : 'bg-accent hover:bg-accent/80 border border-border'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}