import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Play } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export default function Gallery() {
  return (
    <>
      <SEOHead page="gallery" structuredDataType="event" />
      <GalleryContent />
    </>
  );
}

function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { data: galleryItems } = trpc.gallery.list.useQuery();

  const categories = ['training', 'match', 'event', 'team', 'coaching'];

  const filteredItems = selectedCategory
    ? galleryItems?.filter(item => item.category === selectedCategory)
    : galleryItems;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-600 to-orange-500 text-white py-20 md:py-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl">
            Moments from our training sessions, matches, and community events.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="container">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${
                selectedCategory === ''
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-orange-500'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-orange-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          {filteredItems && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg h-80 group cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Video overlay */}
                  {item.videoUrl && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-all">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-slate-200 text-sm line-clamp-2">{item.description}</p>
                    )}
                    <span className="inline-block mt-3 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full w-fit capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600">No gallery items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Want to Be Part of Our Story?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join SEYO Academy and create your own moments with our community.
          </p>
          <a href="/register" className="btn-primary">
            Register Now
          </a>
        </div>
      </section>
    </div>
  );
}

