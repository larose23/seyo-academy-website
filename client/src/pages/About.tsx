import { Award, Users, Heart, Lightbulb } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  return (
    <>
      <SEOHead page="about" structuredDataType="organization" />
      <AboutContent />
    </>
  );
}

function AboutContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-600 to-orange-500 text-white py-20 md:py-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About SEYO Academy</h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl">
            Empowering youth through sports, education, and mentorship since 2025.
          </p>
        </div>
      </section>

      {/* Organization Info */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Who We Are</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                SEYO Academy (Sports Education Youth Organization) is a registered Canadian non-profit corporation dedicated to developing youth through soccer, education, and mentorship. Based in Toronto, Ontario, we serve children and youth ages 5-15 with comprehensive programming that goes beyond the soccer field.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <p className="text-slate-700 font-semibold mb-2">Incorporation Details:</p>
                <p className="text-slate-600 text-sm">
                  <strong>Legal Name:</strong> Sports Education Youth Organization (S.E.Y.O.)<br/>
                  <strong>Incorporation Date:</strong> September 2, 2025<br/>
                  <strong>Corporation Number:</strong> 1728789-5<br/>
                  <strong>Location:</strong> Toronto, Ontario, Canada<br/>
                  <strong>Address:</strong> 201-1949 Weston Rd, Toronto, ON M6N 3P1
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl p-12 text-white text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h3 className="text-3xl font-bold mb-4">Registered Non-Profit</h3>
              <p className="text-lg text-slate-100 mb-6">
                Committed to transparent, community-focused youth development.
              </p>
              <p className="text-sm text-slate-200">
                All funds support youth programs, coaching, facilities, and community initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 border-2 border-orange-200">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                Empower youth through sports, education, and mentorship in a safe and supportive environment.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <Lightbulb size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-700 leading-relaxed">
                To be a leading youth development organization where every child grows physically, intellectually, and socially through soccer and community engagement.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border-2 border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Values</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Discipline</strong> - Commitment to excellence</li>
                <li>• <strong>Teamwork</strong> - Collaboration and support</li>
                <li>• <strong>Leadership</strong> - Inspiring others</li>
                <li>• <strong>Confidence</strong> - Belief in oneself</li>
                <li>• <strong>Community</strong> - Belonging and connection</li>
                <li>• <strong>Growth</strong> - Continuous improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">Dedicated to youth excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Omar Hussein',
                title: 'Head of Academy',
                bio: 'Founder and visionary leader with extensive experience in youth soccer development and community engagement.',
              },
              {
                name: 'Board of Directors',
                title: 'Community Leaders',
                bio: 'A dedicated team of community members committed to supporting youth development and organizational excellence.',
              },
              {
                name: 'Professional Coaching Staff',
                title: 'Technical Excellence',
                bio: 'Experienced coaches with proven track records in player development and tactical soccer instruction.',
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-orange-500 font-semibold mb-4">{member.title}</p>
                <p className="text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Impact</h2>
            <p className="section-subtitle">Making a difference in Toronto youth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '25-30', label: 'Players per Session' },
              { number: '4', label: 'Seasons per Year' },
              { number: '12-15', label: 'Sessions per Season' },
              { number: '5-15', label: 'Age Range Served' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 text-center border border-slate-200">
                <div className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <p className="text-slate-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Soccer Training',
                desc: 'Technical and tactical soccer instruction with focus on skill development, game understanding, and competitive play.',
              },
              {
                title: 'Life Skills Development',
                desc: 'Teamwork, leadership, communication, and confidence building integrated into every training session.',
              },
              {
                title: 'Mentorship Programs',
                desc: 'One-on-one and group mentorship connecting youth with experienced coaches and community leaders.',
              },
              {
                title: 'Academic Support',
                desc: 'Tutoring and academic assistance helping youth balance sports with educational excellence.',
              },
              {
                title: 'Community Events',
                desc: 'Regular tournaments, showcases, and community gatherings fostering connection and celebration.',
              },
              {
                title: 'Safe Environment',
                desc: 'Structured programs prioritizing player safety, well-being, and positive youth development.',
              },
            ].map((program, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
                <h3 className="text-xl font-bold mb-3 bg-blue-500 text-white px-2 py-1 rounded inline-block">{program.title}</h3>
                <p className="text-slate-900 leading-relaxed bg-blue-500 text-white px-3 py-2 rounded mt-3">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
            Become part of SEYO Academy and experience the difference sports, education, and mentorship can make.
          </p>
          <a href="/register" className="btn-secondary text-slate-900">
            Register for a Program
          </a>
        </div>
      </section>
    </div>
  );
}

