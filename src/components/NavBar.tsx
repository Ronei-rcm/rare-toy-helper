
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Check if the navbar should be transparent or solid
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-primary">MUHL</span>
              <span className="text-gray-700">STORE</span>
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} label={item.name} />
            ))}
          </nav>
        )}

        {/* Search and Cart */}
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <div className="relative">
              <Input
                type="text"
                placeholder="Search rare toys..."
                className="w-60 pl-10 pr-4 py-2 rounded-full bg-secondary/50 border-0 focus:bg-white transition-colors duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Button>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 pt-2 pb-4 bg-white/95 backdrop-blur-md">
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search rare toys..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 border-0 focus:bg-white transition-colors duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative group">
      <span className={`transition-colors duration-200 ${isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
        {label}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left rounded-full"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {!isActive && (
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left rounded-full"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default NavBar;
