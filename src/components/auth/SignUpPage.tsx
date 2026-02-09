import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Camera, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserAvatar } from '../ui/UserAvatar';
import { toast } from 'sonner@2.0.3';
import { signUpSchema } from '../../utils/validationSchemas';
import { useAppDispatch } from '../../store/hooks';
import { signUp } from '../../store/slices/authSlice';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
  onSignUp: (email: string, fullName: string, photo?: string) => void;
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const dispatch = useAppDispatch();

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 4) return { strength: 2, label: 'Good', color: 'bg-yellow-500' };
    return { strength: 3, label: 'Strong', color: 'bg-green-500' };
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success('Profile photo uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-2">Create Account</h1>
          <p className="text-muted-foreground">
            Join <span className="text-foreground font-semibold">Taaluma<span className="text-primary">World</span></span> and start your reading journey!
          </p>
        </div>

        {/* Sign Up Form Card */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                // Simulate registration
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Mock email existence check
                const existingEmails = ['test@example.com', 'user@taaluma.world'];
                if (existingEmails.includes(values.email.toLowerCase())) {
                  setFieldError('email', 'This email is already registered. Please sign in instead.');
                  return;
                }

                // Update Redux store
                dispatch(signUp({
                  email: values.email,
                  fullName: values.fullName,
                  photo: profilePhoto,
                  role: 'user',
                }));

                toast.success('Welcome to TaalumaWorld! 🎉');
                onSignUp(values.email, values.fullName, profilePhoto);
                
                // Redirect to home page
                setTimeout(() => {
                  onNavigate('home');
                }, 500);
              } catch (error) {
                setFieldError('email', 'Something went wrong. Please try again later.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting, values }) => (
              <Form className="space-y-6">
                {/* Profile Photo Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      disabled={isSubmitting}
                    />
                    {profilePhoto ? (
                      <div className="relative group">
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setProfilePhoto('')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <label
                          htmlFor="photo-upload"
                          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Camera className="h-8 w-8 text-white" />
                        </label>
                      </div>
                    ) : (
                      <label
                        htmlFor="photo-upload"
                        className="w-24 h-24 rounded-full border-2 border-dashed border-primary/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <Camera className="h-8 w-8 text-primary/50 mb-1" />
                        <span className="text-xs text-muted-foreground">Upload</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Full Name Field */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Field name="fullName">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          id="fullName"
                          type="text"
                          placeholder="John Doe"
                          className={`pl-12 h-12 rounded-2xl ${
                            errors.fullName && touched.fullName ? 'border-red-500' : ''
                          }`}
                          disabled={isSubmitting}
                        />
                      )}
                    </Field>
                  </div>
                  {errors.fullName && touched.fullName && (
                    <p className="text-sm text-red-600">{errors.fullName}</p>
                  )}
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
                          placeholder="Create a strong password"
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

                  {/* Password Strength Indicator */}
                  {values.password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => {
                          const { strength, color } = getPasswordStrength(values.password);
                          return (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full transition-all ${
                                level <= strength ? color : 'bg-gray-200'
                              }`}
                            />
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className="font-medium">{getPasswordStrength(values.password).label}</span>
                      </p>
                    </div>
                  )}

                  {errors.password && touched.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Field name="confirmPassword">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className={`pl-12 pr-12 h-12 rounded-2xl ${
                            errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
                          }`}
                          disabled={isSubmitting}
                        />
                      )}
                    </Field>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                {/* Terms and Conditions */}
                <p className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('terms')}
                    className="text-primary hover:underline"
                  >
                    Terms & Conditions
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy')}
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
              </Form>
            )}
          </Formik>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('signin')}
              className="text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              Sign In
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