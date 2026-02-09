import { useState } from 'react';
import { FileText, Eye, EyeOff, Plus, Edit, Trash2, Save, Power, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface PageSection {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  order: number;
}

interface Page {
  id: string;
  name: string;
  slug: string;
  isPublished: boolean;
  sections: PageSection[];
}

const initialPages: Page[] = [
  {
    id: 'privacy',
    name: 'Privacy Policy',
    slug: 'privacy',
    isPublished: true,
    sections: [
      {
        id: 'privacy-1',
        title: 'Information We Collect',
        content: 'We collect personal information (name, email, age verification), payment information (processed securely through third-party providers), reading preferences and purchase history, device and browser information, and cookies and usage data.',
        isActive: true,
        order: 1
      },
      {
        id: 'privacy-2',
        title: 'How We Use Your Information',
        content: 'We use your information to provide and improve our services, process transactions, personalize your reading experience, send important updates, prevent fraud, and comply with legal obligations.',
        isActive: true,
        order: 2
      },
      {
        id: 'privacy-3',
        title: 'Data Protection',
        content: 'We use industry-standard encryption (SSL/TLS), secure payment processing through certified providers, regular security audits, limited access to personal data, and data backup procedures.',
        isActive: true,
        order: 3
      },
      {
        id: 'privacy-4',
        title: 'Information Sharing',
        content: 'We DO NOT sell your personal information. Authors receive anonymized sales data only. Third-party service providers operate under strict agreements. We share data with law enforcement when legally required.',
        isActive: true,
        order: 4
      },
      {
        id: 'privacy-5',
        title: 'Your Rights',
        content: 'You can access your personal data, request correction of inaccurate information, delete your account, opt-out of marketing, export your data, and object to certain data processing activities.',
        isActive: true,
        order: 5
      }
    ]
  },
  {
    id: 'terms',
    name: 'Terms of Service',
    slug: 'terms',
    isPublished: true,
    sections: [
      {
        id: 'terms-1',
        title: 'Agreement to Terms',
        content: 'By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        isActive: true,
        order: 1
      },
      {
        id: 'terms-2',
        title: 'User Accounts & Responsibilities',
        content: 'You must be at least 12 years old to create an account. You are responsible for maintaining account security and providing accurate information.',
        isActive: true,
        order: 2
      },
      {
        id: 'terms-3',
        title: 'Purchases & Payments',
        content: 'All purchases are final unless otherwise stated. Prices are subject to change. You can purchase individual chapters or entire books. Refunds are available within 7 days.',
        isActive: true,
        order: 3
      },
      {
        id: 'terms-4',
        title: 'Content & Intellectual Property',
        content: 'Authors retain copyright of their works. Users receive a non-transferable license for personal use. Platform content is owned by Taaluma and protected by copyright laws.',
        isActive: true,
        order: 4
      },
      {
        id: 'terms-5',
        title: 'Prohibited Activities',
        content: 'Users are prohibited from illegal activities, hacking, sharing credentials, harassment, uploading malware, and scraping content without permission.',
        isActive: true,
        order: 5
      }
    ]
  },
  {
    id: 'about',
    name: 'About Us',
    slug: 'about',
    isPublished: true,
    sections: [
      {
        id: 'about-1',
        title: 'Our Mission',
        content: 'Taaluma was founded with a vision to make high-quality books and educational content accessible to teenagers aged 12-19 around the world. We believe every teenager deserves access to engaging stories and educational materials.',
        isActive: true,
        order: 1
      },
      {
        id: 'about-2',
        title: 'What We Offer',
        content: 'Our unique chapter-by-chapter purchasing model allows readers to explore content at their own pace and budget, while giving authors the flexibility to reach wider audiences.',
        isActive: true,
        order: 2
      },
      {
        id: 'about-3',
        title: 'Our Values',
        content: 'We are committed to quality content, community building, fostering a passion for reading, and delivering excellence in every aspect of our platform.',
        isActive: true,
        order: 3
      }
    ]
  }
];

export function PageManagementTab() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<string>('privacy');
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState({ title: '', content: '' });

  const currentPage = pages.find(p => p.id === selectedPage);

  const handleBackToDashboard = () => {
    // Emit a custom event to go back to Overview tab
    window.dispatchEvent(new CustomEvent('navigate-dashboard', { detail: { tab: 'overview' } }));
  };

  const togglePagePublish = (pageId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const newStatus = !page.isPublished;
        toast.success(`Page ${newStatus ? 'published' : 'unpublished'} successfully`);
        return { ...page, isPublished: newStatus };
      }
      return page;
    }));
  };

  const toggleSectionActive = (pageId: string, sectionId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === sectionId) {
              const newStatus = !section.isActive;
              toast.success(`Section ${newStatus ? 'enabled' : 'disabled'}`);
              return { ...section, isActive: newStatus };
            }
            return section;
          })
        };
      }
      return page;
    }));
  };

  const deleteSection = (pageId: string, sectionId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        toast.success('Section deleted successfully');
        return {
          ...page,
          sections: page.sections.filter(section => section.id !== sectionId)
        };
      }
      return page;
    }));
  };

  const saveSection = (pageId: string, updatedSection: PageSection) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => 
            section.id === updatedSection.id ? updatedSection : section
          )
        };
      }
      return page;
    }));
    setEditingSection(null);
    toast.success('Section updated successfully');
  };

  const addNewSection = () => {
    if (!newSection.title || !newSection.content) {
      toast.error('Please fill in all fields');
      return;
    }

    const page = pages.find(p => p.id === selectedPage);
    if (!page) return;

    const newSectionData: PageSection = {
      id: `${selectedPage}-${Date.now()}`,
      title: newSection.title,
      content: newSection.content,
      isActive: true,
      order: page.sections.length + 1
    };

    setPages(pages.map(p => {
      if (p.id === selectedPage) {
        return {
          ...p,
          sections: [...p.sections, newSectionData]
        };
      }
      return p;
    }));

    setNewSection({ title: '', content: '' });
    setIsAddDialogOpen(false);
    toast.success('Section added successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Page Management CMS</h2>
          <p className="text-muted-foreground">Manage static pages, sections, and content</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleBackToDashboard}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Page Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Pages</CardDescription>
            <CardTitle className="text-3xl">{pages.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Static pages</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Published</CardDescription>
            <CardTitle className="text-3xl">{pages.filter(p => p.isPublished).length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Eye className="h-4 w-4" />
              <span>Live on website</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sections</CardDescription>
            <CardTitle className="text-3xl">
              {pages.reduce((acc, page) => acc + page.sections.length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Content sections</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Sections</CardDescription>
            <CardTitle className="text-3xl">
              {pages.reduce((acc, page) => acc + page.sections.filter(s => s.isActive).length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Power className="h-4 w-4" />
              <span>Enabled</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pages List */}
        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>Select a page to manage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPage === page.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => setSelectedPage(page.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{page.name}</h4>
                  <Badge variant={page.isPublished ? 'default' : 'secondary'}>
                    {page.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{page.sections.length} sections</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePagePublish(page.id);
                    }}
                    className={`flex items-center gap-1 px-2 py-1 rounded ${
                      page.isPublished
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page.isPublished ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sections Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentPage?.name}</CardTitle>
                <CardDescription>Manage sections and content</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Section
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                    <DialogDescription>
                      Create a new content section for {currentPage?.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        placeholder="Enter section title"
                        value={newSection.title}
                        onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Content</Label>
                      <Textarea
                        placeholder="Enter section content"
                        rows={6}
                        value={newSection.content}
                        onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addNewSection}>Add Section</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentPage?.sections.map((section) => (
              <Card key={section.id} className={!section.isActive ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  {editingSection?.id === section.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={editingSection.title}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Content</Label>
                        <Textarea
                          rows={6}
                          value={editingSection.content}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, content: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveSection(selectedPage, editingSection)}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSection(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{section.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {section.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Switch
                            checked={section.isActive}
                            onCheckedChange={() => toggleSectionActive(selectedPage, section.id)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSection(section)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteSection(selectedPage, section.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant={section.isActive ? 'default' : 'secondary'} className="text-xs">
                        {section.isActive ? 'Active' : 'Disabled'}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}