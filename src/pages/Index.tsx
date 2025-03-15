
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeaturedToys from '@/components/FeaturedToys';
import CategorySection from '@/components/CategorySection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <Hero />
        
        {/* About section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  About MUHLSTORE
                </span>
                <h2 className="text-3xl font-bold mb-6">
                  Curating Rare & Collectible Toys For Enthusiasts
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  At MUHLSTORE, we specialize in sourcing and offering rare, used, and collectible toys that bring joy and nostalgia. Our collection features one-of-a-kind items carefully selected for their uniqueness, historical significance, and condition.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Each toy in our catalog comes with a detailed description of its condition, history, and authenticity, ensuring you know exactly what you're adding to your collection.
                </p>
                <Link to="/about" className="inline-flex items-center text-primary font-medium hover:underline">
                  Learn more about us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1651175821419-853795544808?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Vintage toys" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Collectible figure" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-lg overflow-hidden aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1561149877-84d268ba65b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Classic board games" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1505156730572-92addc93c4a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Antique toy car" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured toys */}
        <FeaturedToys />
        
        {/* Categories */}
        <CategorySection />
        
        {/* Newsletter */}
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
