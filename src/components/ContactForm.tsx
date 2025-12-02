'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from '@/i18n/routing';
import { getLocaleFromPath } from '@/utils/locale-helper';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/request';

const FORM_ACTION_URL = 'https://frontend-example-panel.pentademo.com.tr/wp-admin/admin-ajax.php';

interface ContactFormProps {
  locale?: Locale;
}

export default function ContactForm({ locale: propLocale }: ContactFormProps = {}) {
  const pathname = usePathname();
  const locale = propLocale || getLocaleFromPath(pathname);
  const t = getTranslations(locale);
  
  const formSchema = z.object({
    name: z.string().min(2, t.contact.nameMin),
    phone: z.string().min(10, t.contact.phoneMin),
    email: z.string().email(t.contact.emailInvalid),
    subject: z.string().min(3, t.contact.subjectMin),
    message: z.string().min(10, t.contact.messageMin),
    gdpr: z.boolean().refine((val) => val === true, {
      message: t.contact.gdprRequired,
    }),
  });

  type ContactFormData = z.infer<typeof formSchema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      gdpr: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('action', 'contact_form_submit');
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);
      formData.append('gdpr', data.gdpr ? '1' : '0');
      formData.append('createdAt', new Date().toISOString());

      const response = await fetch(FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">{t.contact.title}</CardTitle>
        <CardDescription>
          {t.contact.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.contact.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.contact.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.contact.phone}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder={t.contact.phone} {...field} />
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
                  <FormLabel>{t.contact.email}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t.contact.email} {...field} />
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
                  <FormLabel>{t.contact.subject}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.contact.subject} {...field} />
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
                  <FormLabel>{t.contact.message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.contact.message}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gdpr"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t.contact.gdpr}
                    </FormLabel>
                    <FormDescription>
                      {t.contact.gdprInfo}
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-500">
                {t.contact.success}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
                {t.contact.error}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? t.contact.submitting : t.contact.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

