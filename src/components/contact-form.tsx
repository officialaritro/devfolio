'use client';

import React, { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import { toast } from "react-toastify";

import useRecaptcha from '@/hooks/use-recaptcha';

import { sendEmail } from '@/app/actions/send-mail';

import { contactFormSchema, ContactFormSchema } from '@/schema/contact';

import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { executeRecaptcha } = useRecaptcha();

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      message: '',
      name: '',
      subject: ''
    },
    mode: 'all'
  });

  async function onSubmit(values: ContactFormSchema) {
    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA and get token
      const recaptchaToken = await executeRecaptcha();

      // Send the form data with the reCAPTCHA token
      await toast.promise(
        sendEmail({
          ...values,
          recaptchaToken
        }),
        {
          pending: 'Sending Message...',
          success: {
            render() {
              setTimeout(() => {
                form.reset();

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }, 0);

              return 'Message sent successfully!'
            }
          },
          error: {
            render({ data }: { data: Error }) {
              const errMsg = data.message || "Failed to send message. Please try again."
              return errMsg;
            }
          }
        })
        // Suppress error propagation since it's being handled in UI.
        .catch(() => { });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>
              <FormControl>
                <Input placeholder="Project Discussion" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me more about your project..."
                  className="min-h-[150px]"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full bg-zinc-800 border-none outline-none md:px-4 px-2' variant="outline" type='submit' disabled={isSubmitting}>
          {
            isSubmitting ?
              <>
                <Loader2 className='animate-spin' />
                Submitting...
              </>
              :
              'Send message'
          }
        </Button>

        <div className='text-xs text-white/50'>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className='underline'>
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className='underline'>
            Terms of Service
          </a>{' '}
          apply.
        </div>
      </form>
    </Form>
  )
}

export default ContactForm