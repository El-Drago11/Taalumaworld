import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, BookOpen, BookMarked, Gift, CheckCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import type { Category, Author, Book } from '../../data/mockData';

interface ChapterFiltersProps {
  categories: Category[];
  authors: Author[];
  books: Book[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedAuthors: string[];
  selectedBooks: string[];
  selectedTags: string[];
  onCategoryChange: (categories: string[]) => void;
  onSubcategoryChange: (subcategories: string[]) => void;
  onAuthorChange: (authors: string[]) => void;
  onBookChange: (books: string[]) => void;
  onTagChange: (tags: string[]) => void;
  selectedProgressFilters?: string[];
  onProgressFilterChange?: (filters: string[]) => void;
}

export function ChapterFilters({
  categories,
  authors,
  books,
  selectedCategories,
  selectedSubcategories,
  selectedAuthors,
  selectedBooks,
  selectedTags,
  onCategoryChange,
  onSubcategoryChange,
  onAuthorChange,
  onBookChange,
  onTagChange,
  selectedProgressFilters = [],
  onProgressFilterChange = () => {},
}: ChapterFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    progress: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Progress-based filter options for Chapters Mode
  const progressFilters = [
    { id: 'continue', label: 'Continue Reading', icon: BookOpen, description: 'Chapters you started' },
    { id: 'unread', label: 'Unread Chapters', icon: BookMarked, description: 'New chapters to explore' },
    { id: 'free', label: 'Free to Read', icon: Gift, description: 'Free chapters available' },
    { id: 'purchased', label: 'Purchased', icon: CheckCircle, description: 'Chapters you own' },
  ];

  const handleProgressFilterToggle = (filterId: string) => {
    if (selectedProgressFilters.includes(filterId)) {
      onProgressFilterChange(selectedProgressFilters.filter((id) => id !== filterId));
    } else {
      onProgressFilterChange([...selectedProgressFilters, filterId]);
    }
  };

  const hasFilters = selectedProgressFilters.length > 0;

  return (
    <div className="space-y-4">
      {/* Mode Indicator */}
      <div className="bg-primary/5 border border-primary/20 rounded-[14px] p-3">
        <div className="flex items-center gap-2 mb-0.5">
          <FileText className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm text-primary tracking-tight">Chapters Mode</span>
        </div>
        <p className="text-xs text-muted-foreground tracking-tight">
          Reading progression focused
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold tracking-tight">Filter Chapters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => {
              onProgressFilterChange([]);
            }}
          >
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Progress-Based Filters */}
      <div className="space-y-3">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('progress')}
        >
          <h4 className="font-medium text-sm tracking-tight">Reading Progress</h4>
          {expandedSections.progress ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.progress && (
          <div className="space-y-2">
            {progressFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <div 
                  key={filter.id} 
                  className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedProgressFilters.includes(filter.id)
                      ? 'bg-primary/5 border-primary/30'
                      : 'bg-background border-border hover:border-primary/20'
                  }`}
                  onClick={() => handleProgressFilterToggle(filter.id)}
                >
                  <Checkbox
                    id={`progress-${filter.id}`}
                    checked={selectedProgressFilters.includes(filter.id)}
                    onCheckedChange={() => handleProgressFilterToggle(filter.id)}
                    className="rounded-md mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <label
                        htmlFor={`progress-${filter.id}`}
                        className="text-sm font-medium cursor-pointer tracking-tight"
                      >
                        {filter.label}
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 tracking-tight">
                      {filter.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}