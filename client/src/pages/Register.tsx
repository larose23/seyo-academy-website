import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const registrationSchema = z.object({
  programId: z.number().min(1, 'Please select a program'),
  parentName: z.string().min(2, 'Parent name is required'),
  parentEmail: z.string().email('Valid email is required'),
  parentPhone: z.string().min(10, 'Valid phone number is required'),
  childName: z.string().min(2, 'Child name is required'),
  childAge: z.number().min(5).max(15, 'Age must be between 5 and 15'),
  childGender: z.enum(['male', 'female', 'other']).optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  notes: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Register() {
  return (
    <>
      <SEOHead page="register" structuredDataType="localBusiness" />
      <RegisterContent />
    </>
  );
}

function RegisterContent() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const createRegistration = trpc.registrations.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Registration submitted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to submit registration. Please try again.');
      console.error(error);
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    createRegistration.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <section className="py-20 md:py-32">
          <div className="container max-w-2xl">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-12 border-2 border-green-500 text-center">
              <div className="text-6xl mb-6">✓</div>
              <h1 className="text-4xl font-bold text-green-900 mb-4">Registration Submitted!</h1>
              <p className="text-lg text-green-800 mb-6">
                Thank you for registering with SEYO Academy. We've received your application and will contact you shortly with next steps.
              </p>
              <div className="bg-white rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-slate-900 mb-4">What happens next?</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="text-green-500 font-bold">1.</span>
                    <span>We'll review your registration and confirm your program placement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500 font-bold">2.</span>
                    <span>You'll receive payment details via email</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500 font-bold">3.</span>
                    <span>Your child will receive a welcome package with program details</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500 font-bold">4.</span>
                    <span>Training begins on the scheduled start date</span>
                  </li>
                </ul>
              </div>
              <p className="text-slate-600 mb-8">
                Questions? Contact us at <a href="mailto:Seyofootballclub@gmail.com" className="text-orange-500 font-semibold hover:underline">Seyofootballclub@gmail.com</a>
              </p>
              <a href="/" className="btn-primary">
                Return to Home
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-600 to-orange-500 text-white py-20 md:py-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Register for a Program</h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl">
            Join SEYO Academy and start your soccer journey today.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Player Registration Form</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Program Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Select Program *
                </label>
                <select
                  {...register('programId', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Choose a program...</option>
                  <option value="1">Youth Soccer Fundamentals (Ages 5-8)</option>
                  <option value="2">Intermediate Soccer Development (Ages 9-12)</option>
                  <option value="3">Elite Soccer Academy (Ages 12-15)</option>
                </select>
                {errors.programId && <p className="text-red-500 text-sm mt-1">{errors.programId.message}</p>}
              </div>

              {/* Parent Information */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Parent/Guardian Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('parentName')}
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                    {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('parentEmail')}
                      type="email"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('parentPhone')}
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="(416) 555-0123"
                    />
                    {errors.parentPhone && <p className="text-red-500 text-sm mt-1">{errors.parentPhone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Child Information */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Player Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('childName')}
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Jane Doe"
                    />
                    {errors.childName && <p className="text-red-500 text-sm mt-1">{errors.childName.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Age *
                      </label>
                      <input
                        {...register('childAge', { valueAsNumber: true })}
                        type="number"
                        min="5"
                        max="15"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="10"
                      />
                      {errors.childAge && <p className="text-red-500 text-sm mt-1">{errors.childAge.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Gender
                      </label>
                      <select
                        {...register('childGender')}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Emergency Contact</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Name
                    </label>
                    <input
                      {...register('emergencyContactName')}
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Jane Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('emergencyContactPhone')}
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="(416) 555-0124"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="border-t border-slate-200 pt-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Additional Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="Any additional information you'd like us to know..."
                />
              </div>

              {/* Submit Button */}
              <div className="border-t border-slate-200 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || createRegistration.isPending}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || createRegistration.isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Secure Your Spot'
                  )}
                </button>
                <p className="text-sm text-slate-600 text-center mt-4">
                  * Required fields. We'll contact you within 24 hours to confirm your registration.
                </p>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-slate-900 mb-2">Payment Information</h3>
            <p className="text-slate-600 mb-3">
              After registration confirmation, payment can be made via E-transfer to:
            </p>
            <p className="font-mono text-slate-900 bg-white p-3 rounded border border-slate-300">
              Seyofootballclub@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

