import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BookOpen, Users, Heart, Target, Award, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Text Content */}
            <div className="space-y-6 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  About Taaluma
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Empowering young readers,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">one chapter</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/30 -rotate-1"></span>
                </span>{' '}
                at a time
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're on a mission to make reading more accessible, affordable, and exciting for teens everywhere. 
                With Taaluma, you're not just buying books—you're discovering stories that shape who you are.
              </p>
            </div>

            {/* Right - Hero Image */}
            <div className="relative animate-slide-up">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1663229048665-01e8b7807cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuJTIwcmVhZGluZyUyMGJvb2tzJTIwbGlicmFyeXxlbnwxfHx8fDE3Njc5MzgyODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Teen reading in library"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To revolutionize how young people experience literature by offering flexible, 
                chapter-by-chapter purchasing that fits every budget and reading style. We believe 
                every teen deserves access to incredible stories without barriers.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-secondary-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A world where reading is the most engaging and accessible form of entertainment for 
                teens. We envision a global community of young readers connecting through stories, 
                supporting authors directly, and building a lifelong love of literature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                How Taaluma came to be
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Story Image */}
              <div className="relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-lg h-full max-h-[300px]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1585521551422-497df464aa43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHN0YWNrJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY3OTM4Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Colorful stack of books"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-accent/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              </div>

              {/* Story Text */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Taaluma was born from a simple observation: teens love stories, but traditional book 
                  buying doesn't always fit their lives. Whether it's budget constraints, wanting to 
                  sample before committing, or preferring bite-sized reading sessions, the old model 
                  wasn't working.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We asked ourselves: what if you could try a book for the price of a coffee? What if 
                  you could read at your own pace, buying chapters as you go? What if authors could 
                  connect directly with their readers and earn fairly for their work?
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Today, Taaluma is a thriving platform where thousands of young readers discover 
                  amazing stories every day. We're proud to support independent authors, offer flexible 
                  reading options, and build a community that celebrates the joy of reading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What We Stand For</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do at Taaluma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Accessibility First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reading should be accessible to everyone. Our chapter-by-chapter model ensures 
                cost is never a barrier to discovering great stories.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary-accent/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're building a vibrant community where readers and authors connect, share, 
                and grow together through their love of storytelling.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Author Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in fair compensation for creators. Authors earn directly from every 
                chapter sold, supporting their craft and encouraging more great content.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every book on our platform is carefully curated to ensure high-quality, 
                age-appropriate content that resonates with teen readers.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-secondary-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're constantly evolving our platform with new features and improvements 
                based on feedback from our amazing community of readers.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Reader Empowerment</h3>
              <p className="text-muted-foreground leading-relaxed">
                You're in control. Read at your pace, choose what you buy, and discover 
                stories that truly speak to you without commitment or pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground font-medium">Active Readers</p>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary-accent mb-2">150+</div>
                <p className="text-muted-foreground font-medium">Authors</p>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-success mb-2">1,200+</div>
                <p className="text-muted-foreground font-medium">Chapters Available</p>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground font-medium">Genres</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Meet the Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Taaluma
            </p>
          </div>

          {/* Team Photo */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzY3OTM4Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Taaluma team working together"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold mx-auto mb-4">
                SK
              </div>
              <h3 className="font-semibold text-lg mb-1">Sarah Kim</h3>
              <p className="text-sm text-muted-foreground mb-3">Founder & CEO</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Former educator passionate about making reading accessible to all teens.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-secondary-accent/10 flex items-center justify-center text-secondary-accent text-3xl font-bold mx-auto mb-4">
                MJ
              </div>
              <h3 className="font-semibold text-lg mb-1">Marcus Johnson</h3>
              <p className="text-sm text-muted-foreground mb-3">Head of Product</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tech enthusiast focused on creating seamless user experiences.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center text-success text-3xl font-bold mx-auto mb-4">
                LP
              </div>
              <h3 className="font-semibold text-lg mb-1">Lisa Patel</h3>
              <p className="text-sm text-muted-foreground mb-3">Content Director</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Avid reader curating the best stories for our community.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold mx-auto mb-4">
                DW
              </div>
              <h3 className="font-semibold text-lg mb-1">David Wong</h3>
              <p className="text-sm text-muted-foreground mb-3">Community Manager</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building connections between readers and authors worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
            <p className="text-lg text-muted-foreground">
              Start your reading journey today and discover stories that inspire, challenge, 
              and entertain. Your next favorite book is just a chapter away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg hover-lift"
              >
                Start Reading
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-lg hover:shadow-md transition-all"
              >
                Browse Books
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}