import * as Yup from 'yup';

// Sign In Validation Schema
export const signInSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Sign Up Validation Schema
export const signUpSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// Forgot Password Validation Schema
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// Profile Update Validation Schema
export const profileUpdateSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// Create Book Validation Schema
export const createBookSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Book title is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Description is required'),
  categoryId: Yup.string()
    .required('Category is required'),
  subcategoryId: Yup.string()
    .required('Subcategory is required'),
  tags: Yup.string(),
  coverImageUrl: Yup.string()
    .url('Please enter a valid URL')
    .required('Cover image is required'),
  pricingType: Yup.string()
    .oneOf(['chapter', 'book'], 'Invalid pricing type')
    .required('Pricing type is required'),
  bookPrice: Yup.number()
    .when('pricingType', {
      is: 'book',
      then: (schema) => schema
        .min(0.01, 'Price must be greater than 0')
        .required('Book price is required when selling complete book'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

// Create Chapter Validation Schema
export const createChapterSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Chapter title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .required('Description is required'),
  featuredImage: Yup.string()
    .url('Please enter a valid URL')
    .required('Featured image is required'),
  content: Yup.string()
    .min(50, 'Content must be at least 50 characters')
    .required('Content is required'),
  isFree: Yup.boolean(),
  price: Yup.number()
    .when('isFree', {
      is: false,
      then: (schema) => schema
        .min(0.01, 'Price must be greater than 0')
        .required('Price is required when chapter is not free'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

// Contact Form Validation Schema
export const contactFormSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
});

// Newsletter Subscription Validation Schema
export const newsletterSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// Review Form Validation Schema
export const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, 'Please select a rating')
    .max(5, 'Rating cannot exceed 5')
    .required('Rating is required'),
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Review title is required'),
  comment: Yup.string()
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review must be less than 500 characters')
    .required('Review comment is required'),
});

// Checkout Validation Schema
export const checkoutSchema = Yup.object({
  paymentMethod: Yup.string()
    .oneOf(['card', 'paypal', 'crypto'], 'Please select a valid payment method')
    .required('Payment method is required'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) =>
      schema
        .test('card-number', 'Card number must be 16 digits', (value) => {
          if (!value) return false;
          const digitsOnly = value.replace(/\s/g, '');
          return /^[0-9]{16}$/.test(digitsOnly);
        })
        .required('Card number is required'),
  }),
  cardHolder: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) =>
      schema
        .min(3, 'Cardholder name must be at least 3 characters')
        .required('Cardholder name is required'),
  }),
  expiryDate: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) =>
      schema
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format')
        .required('Expiry date is required'),
  }),
  cvv: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) =>
      schema
        .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
        .required('CVV is required'),
  }),
});