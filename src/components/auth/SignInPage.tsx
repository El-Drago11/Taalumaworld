import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner@2.0.3';
import { signInSchema } from '../../utils/validationSchemas';
import { useAppDispatch } from '../../store/hooks';
import { signIn } from '../../store/slices/authSlice';

interface SignInPageProps {
  onNavigate: (page: string) => void;
  onSignIn: (email: string, name?: string, photo?: string) => void;
}

export function SignInPage({ onNavigate, onSignIn }: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-2">Sign In</h1>
          <p className="text-muted-foreground">
            Continue your learning journey with <span className="text-foreground font-semibold">Taaluma<span className="text-primary">World</span></span>
          </p>
        </div>

        {/* Sign In Form Card */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signInSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                // Simulate authentication
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Mock authentication - in production, this would be a real API call
                const isValidCredentials = true;

                if (isValidCredentials) {
                  // Update Redux store
                  dispatch(signIn({
                    email: values.email,
                    fullName: values.email.split('@')[0],
                    role: 'user',
                  }));

                  toast.success('Welcome back to TaalumaWorld!');
                  onSignIn(values.email, values.email.split('@')[0]);
                  
                  // Redirect to home page
                  setTimeout(() => {
                    onNavigate('home');
                  }, 500);
                } else {
                  setFieldError('password', 'Invalid email or password');
                }
              } catch (error) {
                setFieldError('password', 'Something went wrong. Please try again later.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6">
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

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Field name="password">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className={`pl-12 pr-12 h-12 rounded-2xl ${
                            errors.password && touched.password ? 'border-red-500' : ''
                          }`}
                          disabled={isSubmitting}
                        />
                      )}
                    </Field>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => onNavigate('forgot-password')}
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    disabled={isSubmitting}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
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