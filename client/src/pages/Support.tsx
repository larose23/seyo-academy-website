import { Heart, Users, Zap, Award } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Support() {
  return (
    <>
      <SEOHead page="support" structuredDataType="organization" />
      <SupportContent />
    </>
  );
}

function SupportContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-600 to-orange-500 text-white py-20 md:py-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Support SEYO Academy</h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl">
            Help us empower youth through soccer, education, and mentorship.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Your Support Makes a Difference</h2>
            <p className="section-subtitle">Every contribution helps us serve more youth in Toronto</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Heart, amount: '$25', desc: 'Provides equipment for one player' },
              { icon: Users, amount: '$50', desc: 'Supports one training session' },
              { icon: Zap, amount: '$100', desc: 'Funds coaching for one week' },
              { icon: Award, amount: '$250+', desc: 'Sponsors a player for a season' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center border-2 border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-500 mb-2">{item.amount}</div>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-16">How to Support Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* E-Transfer */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 border-2 border-orange-200">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">E-Transfer Donation</h3>
              <p className="text-slate-700 mb-6">
                Send a donation directly via E-transfer to support our programs and youth development initiatives.
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 border border-slate-300">
                <p className="text-sm text-slate-600 mb-2">Send E-transfer to:</p>
                <p className="font-mono font-bold text-slate-900 text-lg">Seyofootballclub@gmail.com</p>
              </div>
              <p className="text-sm text-slate-600">
                Your donation is tax-deductible. We'll send you a receipt for your records.
              </p>
            </div>

            {/* Sponsorship */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Corporate Sponsorship</h3>
              <p className="text-slate-700 mb-6">
                Partner with SEYO Academy and make a significant impact on youth development in Toronto.
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 border border-slate-300">
                <p className="text-sm text-slate-600 mb-2">Contact us for sponsorship opportunities:</p>
                <a href="mailto:Seyofootballclub@gmail.com" className="font-semibold text-blue-600 hover:text-blue-800">
                  Seyofootballclub@gmail.com
                </a>
              </div>
              <p className="text-sm text-slate-600">
                Sponsorship packages include branding, recognition, and community engagement opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Donations Fund */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <h2 className="section-title text-center mb-16">Where Your Donation Goes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Coaching & Instruction',
                desc: 'Professional coaches delivering quality soccer training and life skills development.',
                percentage: '40%',
              },
              {
                title: 'Equipment & Facilities',
                desc: 'Soccer balls, cones, uniforms, and access to quality training facilities.',
                percentage: '30%',
              },
              {
                title: 'Programs & Events',
                desc: 'Community events, tournaments, and special programs for youth development.',
                percentage: '20%',
              },
              {
                title: 'Scholarships',
                desc: 'Financial assistance for youth who cannot afford program fees.',
                percentage: '5%',
              },
              {
                title: 'Administration',
                desc: 'Operations, insurance, and organizational support.',
                percentage: '3%',
              },
              {
                title: 'Mentorship Programs',
                desc: 'One-on-one mentorship and academic support initiatives.',
                percentage: '2%',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 font-bold rounded-full text-sm">
                    {item.percentage}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-16">Stories of Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'From Shy to Confident',
                story: 'Marcus joined SEYO Academy as a quiet 8-year-old. Through soccer training and mentorship, he developed confidence both on and off the field. Today, he\'s a team leader and his grades have improved significantly.',
              },
              {
                title: 'Keeping Youth Off the Streets',
                story: 'Our programs provide a safe, structured environment where youth can develop skills and build positive relationships. Many participants credit SEYO Academy with keeping them focused on positive goals.',
              },
              {
                title: 'Breaking Barriers',
                story: 'Sofia came from a family that couldn\'t afford sports programs. Thanks to donor support, she received a scholarship and is now thriving in our Elite Academy program.',
              },
              {
                title: 'Community Connection',
                story: 'Through SEYO Academy, families from diverse backgrounds come together. Our programs have created a strong community where everyone feels welcome and valued.',
              },
            ].map((story, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{story.title}</h3>
                <p className="text-slate-600 leading-relaxed italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h2>
              <p className="text-xl text-slate-200 mb-8">
                Beyond financial support, we welcome volunteers who want to make a difference in youth development.
              </p>
              
              <div className="space-y-4">
                {[
                  'Coach or assist with training sessions',
                  'Help organize community events',
                  'Provide mentorship to youth',
                  'Support administrative tasks',
                  'Share your professional expertise',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">✓</span>
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-slate-300 mb-4">
                  Interested in volunteering? Contact us:
                </p>
                <a href="mailto:Seyofootballclub@gmail.com" className="btn-primary">
                  Volunteer with Us
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-6">🤝</div>
              <h3 className="text-3xl font-bold mb-4">Make a Difference</h3>
              <p className="text-lg text-slate-100 mb-6">
                Every contribution, whether financial or volunteer time, helps us serve more youth and create lasting impact in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <h2 className="section-title text-center mb-16">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Is my donation tax-deductible?',
                a: 'Yes! SEYO Academy is a registered Canadian non-profit corporation. All donations are tax-deductible. We\'ll provide a receipt for your records.',
              },
              {
                q: 'How can I track where my donation goes?',
                a: 'We provide annual reports detailing how funds are used. Contact us for more information about our financial transparency.',
              },
              {
                q: 'Can I sponsor a specific program or player?',
                a: 'Yes! We offer sponsorship opportunities for specific programs, events, or individual players. Contact us to discuss options.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'Currently, we accept E-transfer donations. Contact us to discuss other payment options or corporate sponsorship arrangements.',
              },
              {
                q: 'Can I make a recurring donation?',
                a: 'Yes! We welcome monthly or quarterly donations. Contact us to set up a recurring donation plan.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Support Youth Excellence?</h2>
          <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
            Your donation helps us continue our mission of empowering youth through sports, education, and mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:Seyofootballclub@gmail.com" className="btn-secondary text-slate-900">
              Send a Donation
            </a>
            <a href="mailto:Seyofootballclub@gmail.com" className="btn-outline">
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

