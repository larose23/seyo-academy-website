import { useState } from 'react';
import { Clock, Users, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { SEOHead } from '@/components/SEOHead';

export default function Programs() {
  return (
    <>
      <SEOHead page="programs" structuredDataType="localBusiness" />
      <ProgramsContent />
    </>
  );
}

function ProgramsContent() {
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const { data: programs } = trpc.programs.list.useQuery();

  const seasons = ['fall', 'winter', 'spring', 'summer'];
  const skillLevels = ['beginner', 'intermediate', 'advanced', 'elite'];

  const filteredPrograms = selectedSeason
    ? programs?.filter(p => p.season === selectedSeason)
    : programs;

  // Mock program data for display (in production, this would come from the database)
  const programDetails = [
    {
      id: 1,
      name: 'Youth Soccer Fundamentals',
      season: 'fall',
      ageMin: 5,
      ageMax: 8,
      skillLevel: 'beginner',
      description: 'Perfect for young beginners! Learn basic soccer skills, ball control, and the fundamentals of the game in a fun, supportive environment.',
      sessionsPerWeek: 1,
      sessionsTotal: 12,
      dayOfWeek: 'Monday',
      timeStart: '18:00',
      timeEnd: '19:00',
      location: 'Weston Park',
      maxParticipants: 25,
      price: '150.00',
      benefits: ['Basic ball control', 'Game awareness', 'Teamwork introduction', 'Fun and confidence building'],
    },
    {
      id: 2,
      name: 'Intermediate Soccer Development',
      season: 'fall',
      ageMin: 9,
      ageMax: 12,
      skillLevel: 'intermediate',
      description: 'Build on fundamentals with improved technique, tactical understanding, and competitive play. For players with some soccer experience.',
      sessionsPerWeek: 1,
      sessionsTotal: 12,
      dayOfWeek: 'Tuesday',
      timeStart: '18:00',
      timeEnd: '19:30',
      location: 'Weston Park',
      maxParticipants: 28,
      price: '180.00',
      benefits: ['Advanced ball control', 'Tactical positioning', 'Small-sided games', 'Leadership development'],
    },
    {
      id: 3,
      name: 'Elite Soccer Academy',
      season: 'fall',
      ageMin: 12,
      ageMax: 15,
      skillLevel: 'advanced',
      description: 'Intensive training for advanced players focused on elite-level development, competitive play, and preparation for higher levels.',
      sessionsPerWeek: 2,
      sessionsTotal: 24,
      dayOfWeek: 'Wednesday & Friday',
      timeStart: '18:00',
      timeEnd: '20:00',
      location: 'Weston Park',
      maxParticipants: 20,
      price: '300.00',
      benefits: ['Advanced technique', 'Competitive match play', 'Individual development plans', 'Mentorship from coaches'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-600 to-orange-500 text-white py-20 md:py-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl">
            Year-round soccer development for ages 5-15 with focus on skill, character, and community.
          </p>
        </div>
      </section>

      {/* Season Filter */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="container">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Filter by Season</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSeason('')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedSeason === ''
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-orange-500'
              }`}
            >
              All Seasons
            </button>
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${
                  selectedSeason === season
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-orange-500'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programDetails.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-slate-200 flex flex-col">
                {/* Program Header */}
                <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                      {program.skillLevel.charAt(0).toUpperCase() + program.skillLevel.slice(1)}
                    </span>
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold capitalize">
                      {program.season}
                    </span>
                  </div>
                </div>

                {/* Program Details */}
                <div className="p-6 flex-grow">
                  <p className="text-slate-600 mb-6 leading-relaxed">{program.description}</p>

                  {/* Key Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-700">
                      <Users size={18} className="text-orange-500 flex-shrink-0" />
                      <span className="text-sm">Ages {program.ageMin}-{program.ageMax}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Clock size={18} className="text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{program.dayOfWeek}, {program.timeStart}-{program.timeEnd}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <MapPin size={18} className="text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{program.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <DollarSign size={18} className="text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-semibold">${program.price} per season</span>
                    </div>
                  </div>

                  {/* Sessions Info */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-slate-600">
                      <strong>{program.sessionsPerWeek}</strong> session{program.sessionsPerWeek > 1 ? 's' : ''} per week • <strong>{program.sessionsTotal}</strong> total sessions
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-orange-500 font-bold mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="p-6 border-t border-slate-200">
                  <Link href="/register" className="w-full btn-primary flex items-center justify-center gap-2">
                    Register Now <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <h2 className="section-title text-center mb-16">What's Included in Every Program</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Coaching',
                desc: 'Experienced coaches with proven track records in youth development and soccer instruction.',
              },
              {
                title: 'Safe Environment',
                desc: 'Structured programs prioritizing player safety, well-being, and positive youth development.',
              },
              {
                title: 'Skill Development',
                desc: 'Progressive training focused on technical skills, tactical understanding, and game awareness.',
              },
              {
                title: 'Life Skills',
                desc: 'Teamwork, leadership, communication, and confidence building integrated into training.',
              },
              {
                title: 'Community Connection',
                desc: 'Build friendships and connections with teammates in a supportive, inclusive environment.',
              },
              {
                title: 'Mentorship',
                desc: 'Access to experienced coaches and community leaders for guidance and support.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'What age groups do you serve?',
                a: 'We offer programs for children and youth ages 5-15. Each program is tailored to the appropriate age and skill level.',
              },
              {
                q: 'Do I need prior soccer experience?',
                a: 'No! We have beginner programs designed for players with no experience. Our coaches will help you develop from day one.',
              },
              {
                q: 'How many sessions are in each program?',
                a: 'Most programs include 12-15 sessions per season, with 1-2 sessions per week depending on the program level.',
              },
              {
                q: 'What is the cost?',
                a: 'Pricing varies by program level and age group, ranging from $150-$300 per season. Payment options include E-transfer.',
              },
              {
                q: 'How do I register?',
                a: 'Visit our Registration page to fill out the form with your child\'s information. You\'ll receive confirmation and payment details.',
              },
              {
                q: 'Are there scholarships available?',
                a: 'We believe in making soccer accessible to all youth. Contact us to discuss scholarship opportunities.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-8 border border-slate-200">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
            Join SEYO Academy and start your soccer journey today.
          </p>
          <Link href="/register" className="btn-secondary text-slate-900 inline-block">
            Register for a Program
          </Link>
        </div>
      </section>
    </div>
  );
}

