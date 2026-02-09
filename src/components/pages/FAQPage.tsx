import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { HelpCircle, Search, BookOpen, CreditCard, Users, Shield, Settings, MessageSquare } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-3xl overflow-hidden bg-white hover:border-primary/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/30 transition-colors"
      >
        <span className="font-semibold pr-4">{question}</span>
        <span className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'reading', label: 'Reading & Chapters', icon: BookOpen },
    { id: 'payments', label: 'Payments & Pricing', icon: CreditCard },
    { id: 'account', label: 'Account & Settings', icon: Users },
  ];

  const faqs = [
    // Reading & Chapters
    {
      category: 'reading',
      question: 'How does chapter purchasing work?',
      answer: 'You can buy individual chapters to learn at your own pace! Each chapter is priced separately, and many books offer the first chapter free so you can try before you buy. If you love the content, you can also purchase all remaining chapters at once.'
    },
    {
      category: 'reading',
      question: 'Can I buy the entire book instead of individual chapters?',
      answer: 'Absolutely! While we focus on modular learning through chapters, many thought leaders also offer a "full book" option. You\'ll see both options on the book detail page. Buying the full book is often a better value if you\'re committed to the full learning journey!'
    },
    {
      category: 'reading',
      question: 'Are there free chapters available?',
      answer: 'Yes! Most books offer their first chapter completely free. This lets you explore different topics, discover new thought leaders, and find content that resonates with your career goals without spending anything upfront.'
    },
    {
      category: 'reading',
      question: 'Can I access my purchased chapters on different devices?',
      answer: 'Yes! Once you purchase a chapter or book, it\'s linked to your account and you can access it from any device where you\'re logged in - your phone, tablet, or computer.'
    },

    // Payments & Pricing
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards, as well as digital payment methods like PayPal and Apple Pay. All transactions are secure and encrypted to protect your information.'
    },
    {
      category: 'payments',
      question: 'How much do chapters cost?',
      answer: 'Chapter prices vary depending on the book and thought leader, typically ranging from $0.99 to $4.99 per chapter. Thought leaders set their own prices to ensure fair compensation for their expertise and insights.'
    },
    {
      category: 'payments',
      question: 'Can I get a refund if I don\'t like a chapter?',
      answer: 'All sales are final. However, most books offer a free first chapter so you can try before you buy. If you experience technical issues preventing access to purchased content, please contact our support team.'
    },

    // Account & Settings
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click the \"Sign Up\" button in the top right corner. You\'ll need to provide your name, email address, and create a password. Accounts are free and give you access to free chapters, the ability to purchase content, and personalized recommendations.'
    },
    {
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click \"Forgot Password\" on the login page. Enter your email address and we\'ll send you a link to reset your password. Make sure to check your spam folder if you don\'t see the email within a few minutes.'
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account > Delete Account. Please note that deleting your account will remove your profile, but you may retain access to previously purchased content in accordance with our Terms of Service.'
    },

    // Privacy & Security
    {
      category: 'privacy',
      question: 'Is my personal information safe?',
      answer: 'Yes! We use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your permission. Read our Privacy Policy for complete details.'
    },
    {
      category: 'privacy',
      question: 'Can I opt out of marketing emails?',
      answer: 'Absolutely! You can unsubscribe from marketing emails at any time by clicking the \"Unsubscribe\" link at the bottom of any email, or by adjusting your email preferences in Settings > Notifications.'
    },

    // Technical Support
    {
      category: 'technical',
      question: 'The platform isn\'t loading properly. What should I do?',
      answer: 'Try clearing your browser cache and cookies, or try a different browser. If the problem persists, please contact our support team at support@taaluma.world with details about your browser and device.'
    },
    {
      category: 'technical',
      question: 'I purchased a chapter but can\'t access it. Help!',
      answer: 'First, check your purchase history to confirm the transaction completed. If it did, try logging out and back in. If you still can\'t access your chapter, contact support@taaluma.world immediately with your order details.'
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Frequently Asked{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Questions</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/30 -rotate-1"></span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Find quick answers to common questions about Taaluma. Can't find what you're looking for? 
              Contact our support team.
            </p>
            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-full h-14 pl-14 pr-6 text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-foreground hover:bg-accent border border-border'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or browse a different category
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="rounded-full"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-secondary-accent/10 rounded-3xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-md">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Can't find the answer you're looking for? Our friendly support team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg hover-lift"
                >
                  Contact Support
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-lg hover:shadow-md transition-all"
                >
                  Browse Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}