import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Lock, Eye, EyeOff, Loader2, BookOpen } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { signIn } from '../../store/slices/authSlice';
import { signInSchema } from '../../utils/validationSchemas';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner@2.0.3';

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - in production, validate against backend
      const mockUsers = [
        { email: 'test@example.com', password: 'Test123!', name: 'Test User' },
        { email: 'user@taaluma.world', password: 'User123!', name: 'Taaluma User' },
      ];

      const user = mockUsers.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        dispatch(
          signIn({
            email: user.email,
            fullName: user.name,
            role: 'user',
          })
        );

        toast.success('Welcome back!', {
          description: 'You have successfully signed in.',
        });

        navigate(from);
      } else {
        toast.error('Invalid credentials', {
          description: 'Please check your email and password.',
        });
      }
    } catch (error) {
      toast.error('Sign in failed', {
        description: 'An error occurred. Please try again.',
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
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Sign in to continue your reading journey</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signInSchema}
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

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 ${touched.password && errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <Link to="/auth/signup" className="text-primary font-semibold hover:underline">
                    Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
          <div className="text-xs text-blue-800 space-y-1">
            <p>Email: test@example.com</p>
            <p>Password: Test123!</p>
          </div>
        </div>
      </div>
    </div>
  );
}