
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              Stay Updated
            </span>
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive updates on new arrivals, special offers, and rare toy availability. Be the first to know when we add unique pieces to our collection.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow focus:ring-2 focus:ring-primary/20"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive marketing emails from MUHLSTORE. 
              You can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
