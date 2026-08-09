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

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty').optional(),
});

type SignupDto = z.infer<typeof signupSchema>;
type LoginDto = z.infer<typeof loginSchema>;
type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export { loginSchema, signupSchema, updateProfileSchema };
export type { LoginDto, SignupDto, UpdateProfileDto };
