
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">
              <span className="text-primary">MUHL</span>
              <span className="text-gray-700">STORE</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Specializing in rare and collectible toys, bringing joy and nostalgia to collectors around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Collector Street, Toy City, TC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  info@muhlstore.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} MUHLSTORE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
