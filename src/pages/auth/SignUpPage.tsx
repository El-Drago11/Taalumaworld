import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Lock, Eye, EyeOff, Loader2, User, BookOpen, Camera, X } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { signUp } from '../../store/slices/authSlice';
import { signUpSchema } from '../../utils/validationSchemas';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { toast } from 'sonner@2.0.3';

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: 'Please select an image smaller than 5MB',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success('Photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: { fullName: string; email: string; password: string; confirmPassword: string },
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock email existence check
      const existingEmails = ['test@example.com', 'user@taaluma.world'];
      
      if (existingEmails.includes(values.email)) {
        setFieldError('email', 'This email is already registered');
        setSubmitting(false);
        return;
      }

      dispatch(
        signUp({
          email: values.email,
          fullName: values.fullName,
          photo: profilePhoto,
          role: 'user',
        })
      );

      toast.success('Welcome to TaalumaWorld!', {
        description: 'Your account has been created successfully.',
      });

      navigate('/');
    } catch (error) {
      toast.error('Sign up failed', {
        description: 'An error occurred. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
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
          <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join thousands of readers today</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <Formik
            initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors, values }) => (
              <Form className="space-y-6">
                {/* Profile Photo Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <UserAvatar
                      userName={values.fullName || 'User'}
                      userPhoto={profilePhoto}
                      size="lg"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    {profilePhoto && (
                      <button
                        type="button"
                        onClick={() => setProfilePhoto('')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Optional profile photo</p>
                </div>

                {/* Full Name Field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      as={Input}
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className={`pl-10 ${touched.fullName && errors.fullName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

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
                      placeholder="Create a password"
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

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      as={Input}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 ${
                        touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary font-semibold hover:underline">
                    Sign In
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