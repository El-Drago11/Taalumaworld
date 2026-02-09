import { Link } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Loader2, BookOpen, ArrowLeft } from 'lucide-react';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner@2.0.3';

export function ForgotPasswordPage() {
  const handleSubmit = async (values: { email: string }, { setSubmitting, resetForm }: any) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Reset link sent!', {
        description: 'Check your email for instructions to reset your password.',
      });

      resetForm();
    } catch (error) {
      toast.error('Failed to send reset link', {
        description: 'Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary rounded-xl p-2">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-bold text-2xl">
              Taaluma<span className="text-primary">World</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-gray-600">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 ${touched.email && errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>

                {/* Back to Sign In Link */}
                <div className="text-center">
                  <Link
                    to="/auth/signin"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Sign In
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}