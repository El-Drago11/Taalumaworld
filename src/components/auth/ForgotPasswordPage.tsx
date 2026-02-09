import { Formik, Form, Field } from 'formik';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner@2.0.3';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import { useState } from 'react';

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to{' '}
              <span className="font-semibold text-foreground">{submittedEmail}</span>
            </p>

            <div className="bg-accent/30 rounded-2xl p-4 mb-6 text-sm text-left">
              <p className="font-semibold mb-2">What to do next:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Check your email inbox</li>
                <li>• Click the password reset link</li>
                <li>• Create a new password</li>
                <li>• If you don't see it, check your spam folder</li>
              </ul>
            </div>

            <Button
              onClick={() => onNavigate('signin')}
              className="w-full h-12 rounded-2xl text-base font-semibold"
            >
              Back to Sign In
            </Button>

            {/* Resend Link */}
            <div className="mt-4">
              <button
                onClick={() => {
                  toast.success('Reset link resent!');
                }}
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Didn't receive the email? Resend
              </button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Forgot Password Form Card */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                // Simulate sending reset email
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Mock check - in production, check if email exists in database
                const existingEmails = ['test@example.com', 'user@taaluma.world', values.email];
                const emailExists = existingEmails.includes(values.email.toLowerCase()) || Math.random() > 0.3;

                if (!emailExists) {
                  setFieldError('email', 'No account found with this email address');
                  return;
                }

                toast.success('Password reset link sent!');
                setSubmittedEmail(values.email);
                setIsSubmitted(true);
              } catch (error) {
                setFieldError('email', 'Something went wrong. Please try again later.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Info Box */}
                <div className="bg-accent/30 border border-accent-border rounded-2xl p-4 text-sm">
                  <p className="text-foreground">
                    <span className="font-semibold">💡 Tip:</span> Make sure to enter the email address associated with your account.
                  </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className={`pl-12 h-12 rounded-2xl ${
                            errors.email && touched.email ? 'border-red-500' : ''
                          }`}
                          disabled={isSubmitting}
                        />
                      )}
                    </Field>
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Sending Reset Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>

                {/* Back to Sign In */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => onNavigate('signin')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 mx-auto"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Sign In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
