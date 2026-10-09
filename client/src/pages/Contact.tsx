import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.enum(['general', 'sponsorship', 'volunteer', 'partnership', 'other']),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  return (
    <>
      <SEOHead page="contact" structuredDataType="localBusiness" />
      <ContactContent />
    </>
  );
}

function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      reset();
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error) => {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    submitContact.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-600 to-orange-500 text-white py-20 md:py-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl">
            Have questions? We'd love to hear from you. Get in touch with SEYO Academy.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Address */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Address</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                201-1949 Weston Rd<br/>
                Toronto, ON M6N 3P1<br/>
                Canada
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
              <a href="mailto:Seyofootballclub@gmail.com" className="text-orange-500 font-semibold hover:text-orange-600 text-sm">
                Seyofootballclub@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Phone</h3>
              <p className="text-slate-600 text-sm">
                Contact us via email for<br/>
                phone inquiries
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Hours</h3>
              <p className="text-slate-600 text-sm">
                Mon-Fri: 9 AM - 6 PM<br/>
                Sat-Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>
              
              {submitted && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
                  <p className="text-green-800 font-semibold">
                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="(416) 555-0123"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    {...register('inquiryType')}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  >
                    <option value="">Select an inquiry type...</option>
                    <option value="general">General Question</option>
                    <option value="sponsorship">Sponsorship Inquiry</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="What is this about?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitContact.isPending}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || submitContact.isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Map and Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Location</h2>
              
              {/* Map Placeholder */}
              <div className="bg-slate-200 rounded-lg h-96 mb-8 flex items-center justify-center border-2 border-slate-300">
                <div className="text-center">
                  <MapPin size={48} className="text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-600 font-semibold">
                    SEYO Academy<br/>
                    Toronto, Ontario
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Get in Touch</h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Whether you have questions about our programs, want to sponsor SEYO Academy, or are interested in volunteering, we'd love to hear from you!
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <a href="mailto:Seyofootballclub@gmail.com" className="text-blue-600 hover:text-blue-800">
                        Seyofootballclub@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <p className="text-slate-600">
                        201-1949 Weston Rd<br/>
                        Toronto, ON M6N 3P1
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 p-8 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    f
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    📷
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    𝕏
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <h2 className="section-title text-center mb-16">Quick Answers</h2>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How quickly will you respond?',
                a: 'We aim to respond to all inquiries within 24 hours during business days.',
              },
              {
                q: 'Can I visit the facility?',
                a: 'Yes! Contact us to schedule a tour of our training facilities.',
              },
              {
                q: 'Do you have a newsletter?',
                a: 'Yes! Sign up via email to receive updates about programs and events.',
              },
              {
                q: 'What if I have urgent questions?',
                a: 'For urgent matters, please email us and mark it as urgent in the subject line.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
            Have any questions? Reach out to us and we'll be happy to help!
          </p>
          <a href="mailto:Seyofootballclub@gmail.com" className="btn-secondary text-slate-900">
            Send us an Email
          </a>
        </div>
      </section>
    </div>
  );
}

