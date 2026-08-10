import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .email('Please provide a valid email address');

const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  email: emailSchema,

  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z
  .object({
    email: emailSchema,
  })
  .strict();

type SignupDto = z.infer<typeof signupSchema>;
type LoginDto = z.infer<typeof loginSchema>;
type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export { forgotPasswordSchema, loginSchema, signupSchema };
export type { ForgotPasswordDto, LoginDto, SignupDto };
