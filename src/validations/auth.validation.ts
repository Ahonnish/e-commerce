import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  email: z.string().trim().email('Please provide a valid email address'),

  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const loginSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
});

type SignupDto = z.infer<typeof signupSchema>;
type LoginDto = z.infer<typeof loginSchema>;
type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export { changePasswordSchema, loginSchema, signupSchema };
export type { ChangePasswordDto, LoginDto, SignupDto };
