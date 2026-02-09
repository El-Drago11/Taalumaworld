import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BookOpen, Users, Heart, Target, Award, Sparkles, Briefcase, TrendingUp, Lightbulb, Upload } from 'lucide-react';
import { Link } from 'react-router';

export function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                About Taaluma
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Accelerating careers,{' '}
              <span className="relative inline-block">
                <span className="relative z-10">one insight</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/30 -rotate-1"></span>
              </span>{' '}
              at a time
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We're empowering college graduates and young professionals to navigate their careers with confidence. 
              With Taaluma, you're not just reading—you're accessing world-class expertise from thought leaders who shape industries.
            </p>
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
                To democratize access to professional knowledge by connecting college graduates and young 
                professionals with actionable insights from industry thought leaders. We make career development 
                accessible, affordable, and engaging for the next generation of leaders.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-secondary-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A world where every young professional has access to the insights and knowledge they need to 
                build successful, fulfilling careers. We envision a global community where expertise is shared 
                freely, careers are accelerated, and potential is unlocked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                How Taaluma came to be
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Taaluma was born from a simple observation: college graduates and young professionals are 
                hungry for knowledge, but traditional career development resources are often expensive, 
                inaccessible, or overwhelming. The best insights were locked behind paywalls, lengthy books, 
                or expensive conferences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We asked ourselves: what if you could access bite-sized, actionable insights from industry 
                thought leaders for the price of a coffee? What if you could learn at your own pace, focusing 
                on the topics that matter most to your career right now? What if experts could share their 
                knowledge directly and earn fairly for their expertise?
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, Taaluma is a thriving platform where thousands of young professionals discover 
                career-changing insights every day. We're proud to connect emerging talent with established 
                thought leaders, offer flexible learning options, and build a community that celebrates 
                professional growth and lifelong learning.
              </p>
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
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Professional Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We curate content from verified thought leaders and industry experts, ensuring every 
                insight you access is credible, relevant, and actionable for your career.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary-accent/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're building a vibrant community where young professionals and thought leaders connect, 
                share, and grow together through meaningful knowledge exchange.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Thought Leader Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in fair compensation for expertise. Thought leaders earn directly from every 
                purchase, supporting their work and encouraging more valuable content creation.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every piece of content on our platform is carefully vetted to ensure high-quality, 
                career-relevant insights that resonate with young professionals.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary-accent/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-secondary-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're constantly evolving our platform with new features and improvements 
                based on feedback from our amazing community of learners and experts.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Career Empowerment</h3>
              <p className="text-muted-foreground leading-relaxed">
                You're in control. Learn at your pace, focus on what matters to your career, and discover 
                insights that truly drive your professional growth.
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
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground font-medium">Young Professionals</p>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary-accent mb-2">500+</div>
                <p className="text-muted-foreground font-medium">Thought Leaders</p>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-success mb-2">2,500+</div>
                <p className="text-muted-foreground font-medium">Chapters Available</p>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground font-medium">Industries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-4">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Join Our Team
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Careers at Taaluma</h2>
              <p className="text-lg text-muted-foreground">
                Help us empower the next generation of professionals
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Work With Us</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Taaluma, we're building something special—a platform that changes how young 
                  professionals learn, grow, and succeed. We're looking for passionate, talented individuals 
                  who share our vision and want to make a real impact on careers worldwide.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're a developer, designer, marketer, content strategist, or operations expert, 
                  we want to hear from you. We value creativity, initiative, and a commitment to excellence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary-accent/5 rounded-2xl p-6 border border-primary/10">
                <h4 className="font-semibold text-lg mb-3">Why Work at Taaluma?</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Work on a product that makes a real difference in people's careers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Collaborate with a talented, passionate team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Flexible work arrangements and competitive compensation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Opportunities for growth and professional development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Be part of a fast-growing platform shaping the future of career development</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-4">Submit Your CV</h4>
                <p className="text-muted-foreground mb-6">
                  We're always interested in hearing from talented individuals. Even if we don't have an 
                  open position that matches your skills right now, we'd love to keep your CV on file for 
                  future opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="flex-1">
                    <Button 
                      size="lg" 
                      className="w-full rounded-full px-8 py-6 text-lg hover-lift"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Send Your CV
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1 rounded-full px-8 py-6 text-lg hover:shadow-md transition-all"
                    onClick={() => window.location.href = 'mailto:careers@taaluma.world'}
                  >
                    Email Us Directly
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Send your CV to: <a href="mailto:careers@taaluma.world" className="text-primary hover:underline">careers@taaluma.world</a>
                </p>
              </div>
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
              Start your professional development journey today and discover insights that inspire, challenge, 
              and accelerate your career. Your next breakthrough is just one insight away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link to="/auth/signup">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg hover-lift"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-lg hover:shadow-md transition-all"
                >
                  Explore Content
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}