import { Link } from 'wouter';
import { ArrowRight, Users, Trophy, Heart, Zap } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { SEOHead } from '@/components/SEOHead';

export default function Home() {
  const { data: programs } = trpc.programs.list.useQuery();
  const { data: testimonials } = trpc.testimonials.featured.useQuery({ limit: 3 });
  const { data: galleryItems } = trpc.gallery.featured.useQuery({ limit: 6 });

  return (
    <>
      <SEOHead page="home" structuredDataType="organization" />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                More Than Soccer
              </h1>
              <p className="text-xl md:text-2xl text-slate-100 mb-8 leading-relaxed">
                Empower youth through sports, education, and mentorship in a safe and supportive environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="btn-primary flex items-center justify-center gap-2">
                  Register Now <ArrowRight size={20} />
                </Link>
                <Link href="/support" className="btn-secondary text-slate-900">
                  Support Our Mission
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block animate-slide-in-right">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚽</div>
                    <p className="text-white font-semibold">Youth Soccer Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">What drives SEYO Academy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Trophy, label: 'Discipline', color: 'from-orange-500' },
              { icon: Users, label: 'Teamwork', color: 'from-blue-500' },
              { icon: Zap, label: 'Leadership', color: 'from-green-500' },
              { icon: Heart, label: 'Confidence', color: 'from-red-500' },
              { icon: Users, label: 'Community', color: 'from-purple-500' },
              { icon: Zap, label: 'Growth', color: 'from-yellow-500' },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className={`bg-gradient-to-br ${value.color} to-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">{value.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Programs</h2>
            <p className="section-subtitle">Year-round soccer development for ages 5-15</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {['Fall', 'Winter', 'Spring', 'Summer'].map((season) => (
              <div key={season} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 border border-slate-200 card-hover">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{season}</h3>
                <p className="text-slate-600 mb-6">
                  Professional soccer training with focus on skill development and teamwork.
                </p>
                <Link href="/programs" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-2">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/programs" className="btn-primary inline-flex items-center gap-2">
              View All Programs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose SEYO */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Why Choose SEYO Academy?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Expert Coaching', desc: 'Professional coaches with years of experience in youth development' },
                  { title: 'Safe Environment', desc: 'Structured programs prioritizing player safety and well-being' },
                  { title: 'Holistic Development', desc: 'Soccer training combined with life skills and academic support' },
                  { title: 'Community Focus', desc: 'Strong community engagement and mentorship opportunities' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-900">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl p-12 text-center">
              <div className="text-7xl mb-6">⚽</div>
              <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
              <p className="text-lg mb-8 text-slate-100">
                Become part of a thriving soccer community dedicated to youth excellence.
              </p>
              <Link href="/register" className="btn-secondary text-slate-900 inline-block">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">What Parents & Players Say</h2>
              <p className="section-subtitle">Real stories from our community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.authorName}</p>
                    <p className="text-sm text-slate-500">{testimonial.authorRole}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {galleryItems && galleryItems.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="section-title">Gallery Highlights</h2>
              <p className="section-subtitle">Moments from our training and events</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {galleryItems.slice(0, 3).map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-lg h-64 card-hover group">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-slate-200">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/gallery" className="btn-primary inline-flex items-center gap-2">
                View Full Gallery <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join SEYO Academy?</h2>
          <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
            Start your journey with us today. Register for a program or learn more about our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-secondary text-slate-900 inline-block">
              Register Now
            </Link>
            <Link href="/about" className="btn-outline inline-block">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
