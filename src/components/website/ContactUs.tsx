import { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Mail, MessageSquare, Phone, MapPin, Send, Clock, HelpCircle } from 'lucide-react';
import { contactFormSchema } from '../../utils/validationSchemas';
import { toast } from 'sonner';

export function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: contactFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Contact form submitted:', values);
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
      setTimeout(() => {
        setIsSubmitted(false);
        resetForm();
      }, 3000);
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Get in Touch
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              We'd love to{' '}
              <span className="relative inline-block">
                <span className="relative z-10">hear from you</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/30 -rotate-1"></span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Have a question, suggestion, or just want to say hi? Our team is here to help 
              and would be happy to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Send us an email anytime
              </p>
              <a 
                href="mailto:support@taaluma.world" 
                className="text-primary hover:text-primary-dark font-medium text-sm"
              >
                support@taaluma.world
              </a>
            </div>

            {/* Response Time Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-secondary-accent/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-secondary-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground mb-3">
                We typically respond within
              </p>
              <p className="text-primary font-semibold text-sm">24-48 hours</p>
            </div>

            {/* Help Center Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Help Center</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Find quick answers
              </p>
              <a 
                href="#" 
                className="text-primary hover:text-primary-dark font-medium text-sm"
              >
                Browse FAQs
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      required
                      className="rounded-full h-12 px-6"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    ) : null}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      required
                      className="rounded-full h-12 px-6"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    ) : null}
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      required
                      className="rounded-full h-12 px-6"
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <p className="text-red-500 text-sm">{formik.errors.subject}</p>
                    ) : null}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      required
                      className="w-full px-6 py-4 rounded-3xl border border-input-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all resize-none"
                    />
                    {formik.touched.message && formik.errors.message ? (
                      <p className="text-red-500 text-sm">{formik.errors.message}</p>
                    ) : null}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full h-12 text-base hover-lift"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Methods */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Other Ways to Reach Us</h2>
            <p className="text-lg text-muted-foreground">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Social Media Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Connect on Social Media</h3>
              <p className="text-muted-foreground mb-6">
                Follow us for updates, reading tips, and community highlights
              </p>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">f</span>
                  </div>
                  <span className="font-medium">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary-accent/10 flex items-center justify-center">
                    <span className="text-secondary-accent font-semibold">𝕏</span>
                  </div>
                  <span className="font-medium">Twitter / X</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-success font-semibold">in</span>
                  </div>
                  <span className="font-medium">Instagram</span>
                </a>
              </div>
            </div>

            {/* Business Inquiries Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Business Inquiries</h3>
              <p className="text-muted-foreground mb-6">
                For partnerships, press, or author onboarding
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Partnerships</p>
                    <a 
                      href="mailto:partners@taaluma.world" 
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      partners@taaluma.world
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-secondary-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Press & Media</p>
                    <a 
                      href="mailto:press@taaluma.world" 
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      press@taaluma.world
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Authors</p>
                    <a 
                      href="mailto:authors@taaluma.world" 
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      authors@taaluma.world
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Looking for Quick Answers?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Check out our FAQ section for commonly asked questions
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 py-6 text-lg hover:shadow-md transition-all"
            >
              Visit FAQ Page
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}