
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import MainCarousel from '../components/MainCarousel';
import FeaturedToys from '../components/FeaturedToys';
import CategorySection from '../components/CategorySection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import NintendoCharactersBanner from '../components/NintendoCharactersBanner';
import VideosSection from '../components/VideosSection';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, CheckCircle, Truck } from 'lucide-react';
import { Button } from "../components/ui/button";
import { ProdutosList } from "../components/ProdutosList";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        {/* Main Carousel */}
        <MainCarousel />
        
        {/* Hero section */}
        <div className="mt-12">
          <Hero />
        </div>
        
        {/* Nintendo Characters Banner */}
        <NintendoCharactersBanner />
        
        {/* Destaques / Benefícios */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-lg mb-2">Produtos Raros</h3>
                <p className="text-gray-600 text-sm">Brinquedos de colecionador difíceis de encontrar em qualquer outro lugar.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-lg mb-2">Verificados</h3>
                <p className="text-gray-600 text-sm">Todos os produtos são verificados quanto à autenticidade e condição.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-lg mb-2">Avaliações 5 Estrelas</h3>
                <p className="text-gray-600 text-sm">Atendimento ao cliente premiado e clientes satisfeitos.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-lg mb-2">Envio Seguro</h3>
                <p className="text-gray-600 text-sm">Embalagem especializada para garantir que os itens cheguem em perfeito estado.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
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
                  Sobre a MUHLSTORE
                </span>
                <h2 className="text-3xl font-bold mb-6">
                  Colecionáveis raros para entusiastas e colecionadores
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Na MUHLSTORE, somos especializados em encontrar e oferecer brinquedos raros, usados e colecionáveis que trazem alegria e nostalgia. Nossa coleção apresenta itens únicos cuidadosamente selecionados por sua singularidade, significado histórico e condição.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Cada brinquedo em nosso catálogo vem com uma descrição detalhada de sua condição, história e autenticidade, garantindo que você saiba exatamente o que está adicionando à sua coleção.
                </p>
                <Button asChild>
                  <Link to="/about" className="inline-flex items-center">
                    Conheça nossa história
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden aspect-square shadow-md hover-scale">
                    <img 
                      src="https://images.unsplash.com/photo-1651175821419-853795544808?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Brinquedos vintage" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square shadow-md hover-scale">
                    <img 
                      src="https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Figura colecionável" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-lg overflow-hidden aspect-square shadow-md hover-scale">
                    <img 
                      src="https://images.unsplash.com/photo-1561149877-84d268ba65b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Jogos de tabuleiro clássicos" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square shadow-md hover-scale">
                    <img 
                      src="https://images.unsplash.com/photo-1505156730572-92addc93c4a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Carro de brinquedo antigo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Videos Section */}
        <VideosSection />
        
        {/* Featured toys */}
        <FeaturedToys />
        
        {/* Categories */}
        <CategorySection />
        
        {/* Produtos List */}
        <section className="py-20">
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Catálogo de Brinquedos Raros</h1>
            <ProdutosList />
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Encontre o brinquedo perfeito para sua coleção</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Explore nossa coleção de brinquedos raros e colecionáveis. Registre-se hoje para acesso exclusivo a itens recém-chegados e ofertas especiais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/collection">Ver coleção completa</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/register">Criar conta</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter */}
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
