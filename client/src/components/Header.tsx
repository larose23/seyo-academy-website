import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Register', href: '/register' },
    { label: 'Support', href: '/support' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚽</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-slate-900 text-lg">SEYO Academy</h1>
              <p className="text-xs text-slate-600">Youth Soccer Excellence</p>
            </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-700 hover:text-orange-500 font-medium transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth and Mobile Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user?.role === 'admin' && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-slate-600">Admin</span>
              <button
                onClick={() => logout()}
                className="text-sm px-3 py-2 bg-slate-200 text-slate-900 rounded hover:bg-slate-300 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
          
          {!isAuthenticated && (
            <a
              href={getLoginUrl()}
              className="hidden sm:inline-block text-sm px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Admin Login
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-slate-700 hover:text-orange-500 font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-200 pt-3 mt-3">
              {isAuthenticated && user?.role === 'admin' ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-sm px-3 py-2 bg-slate-200 text-slate-900 rounded hover:bg-slate-300 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <a
                  href={getLoginUrl()}
                  className="block text-sm px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-center"
                >
                  Admin Login
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
