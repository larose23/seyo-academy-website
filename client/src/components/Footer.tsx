import { Link } from 'wouter';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">SEYO Academy</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering youth through sports, education, and mentorship in a safe and supportive environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/programs" className="text-slate-300 hover:text-orange-500 transition-colors">Programs</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-300 hover:text-orange-500 transition-colors">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs" className="text-slate-300 hover:text-orange-500 transition-colors">Fall Season</Link>
              </li>
              <li>
                <Link href="/programs" className="text-slate-300 hover:text-orange-500 transition-colors">Winter Season</Link>
              </li>
              <li>
                <Link href="/programs" className="text-slate-300 hover:text-orange-500 transition-colors">Spring Season</Link>
              </li>
              <li>
                <Link href="/programs" className="text-slate-300 hover:text-orange-500 transition-colors">Summer Season</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-slate-300">201-1949 Weston Rd, Toronto, ON M6N 3P1</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:Seyofootballclub@gmail.com" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Seyofootballclub@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <span className="text-slate-300">Contact for details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2025 SEYO Academy. All rights reserved. | Registered Canadian Non-Profit Corporation #1728789-5</p>
        </div>
      </div>
    </footer>
  );
}
