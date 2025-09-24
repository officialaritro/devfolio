import * as z from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(20, {
    message: "Name must be at most 20 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }).max(50, {
    message: "Subject must be at most 50 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(250, {
    message: "Message must be at most 250 characters.",
  })
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const formDataWithRecaptcha = z.object({
  ...contactFormSchema.shape,
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required")
});

export type FormDataWithRecaptcha = z.infer<typeof formDataWithRecaptcha>;