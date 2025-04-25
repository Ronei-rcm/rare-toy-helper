import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, MapPin, Phone, Clock, ChevronRight } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/50 via-secondary/30 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Nossa Paixão por <span className="text-primary">Brinquedos Raros</span> e Colecionáveis
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                  Bem-vindo à MUHLSTORE, onde nosso amor por brinquedos vintage e colecionáveis se transforma em uma experiência de compra inigualável para entusiastas e colecionadores.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link to="/collection">
                      Explorar Coleção
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="#contato">
                      Fale Conosco
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full"></div>
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Coleção de brinquedos" 
                    className="w-full h-auto rounded-2xl shadow-lg relative z-10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Nossa História */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span
                className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Nossa História
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                De uma paixão de colecionador para uma loja especializada
              </motion.h2>
              <motion.p
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A MUHLSTORE nasceu da paixão de Paulo Mühl, um colecionador de brinquedos antigos que transformou seu hobby em uma missão: conectar pessoas a lembranças da infância através de brinquedos raros e colecionáveis.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-primary text-2xl font-bold mb-4">2010</span>
                <h3 className="text-xl font-semibold mb-3">O Começo</h3>
                <p className="text-gray-600">
                  Paulo começou a colecionar brinquedos vintage em feiras de antiguidades e eventos de colecionadores, criando uma pequena comunidade online.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-block text-primary text-2xl font-bold mb-4">2015</span>
                <h3 className="text-xl font-semibold mb-3">Primeira Loja</h3>
                <p className="text-gray-600">
                  A primeira loja física da MUHLSTORE foi aberta, oferecendo um espaço para colecionadores encontrarem peças raras e compartilharem histórias.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="inline-block text-primary text-2xl font-bold mb-4">2023</span>
                <h3 className="text-xl font-semibold mb-3">Expansão Digital</h3>
                <p className="text-gray-600">
                  Lançamos nossa plataforma online, permitindo que colecionadores de todo o Brasil tenham acesso à nossa curadoria de brinquedos raros.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Nossa Missão */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1560543899-58ce3bc3c8fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Nossa equipe trabalhando" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Nossa Missão
                </span>
                <h2 className="text-3xl font-bold mb-6">
                  Preservar memórias e conectar gerações
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nossa missão vai além de vender brinquedos raros - queremos preservar a história dos brinquedos, criar conexões entre gerações e despertar a nostalgia que só um brinquedo especial pode trazer.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Autenticidade Garantida</h4>
                      <p className="text-gray-600 text-sm">Cada item é verificado e autenticado por especialistas.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Histórias Preservadas</h4>
                      <p className="text-gray-600 text-sm">Documentamos a história de cada brinquedo raro que passa por nossas mãos.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Comunidade Engajada</h4>
                      <p className="text-gray-600 text-sm">Criamos espaços para colecionadores compartilharem suas paixões.</p>
                    </div>
                  </div>
                </div>
                
                <Button asChild>
                  <Link to="/collection">
                    Explore Nossa Coleção <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Equipe */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span
                className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Nossa Equipe
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Conheça quem faz a MUHLSTORE acontecer
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Nossa equipe é formada por colecionadores, entusiastas e especialistas apaixonados por brinquedos raros e colecionáveis.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Paulo Mühl - Fundador" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Paulo Mühl</h3>
                <p className="text-primary mb-4">Fundador & CEO</p>
                <p className="text-gray-600 text-sm">
                  Colecionador há mais de 20 anos, Paulo transformou sua paixão em um negócio que conecta pessoas a memórias especiais.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Ana Costa - Curadora" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Ana Costa</h3>
                <p className="text-primary mb-4">Curadora Chefe</p>
                <p className="text-gray-600 text-sm">
                  Especialista em história dos brinquedos, Ana lidera nossa equipe de autenticação e curadoria de peças raras.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Ricardo Mendes - Restaurador" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Ricardo Mendes</h3>
                <p className="text-primary mb-4">Restaurador</p>
                <p className="text-gray-600 text-sm">
                  Com habilidades meticulosas, Ricardo restaura brinquedos antigos preservando sua autenticidade e valor histórico.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Contato */}
        <section id="contato" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Contato
                </span>
                <h2 className="text-3xl font-bold mb-6">Entre em contato conosco</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Estamos sempre à disposição para atender colecionadores, responder dúvidas sobre peças específicas ou discutir parcerias.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Endereço</h4>
                      <p className="text-gray-600">Av. Paulista, 1000 - São Paulo/SP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-gray-600">contato@muhlstore.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Telefone</h4>
                      <p className="text-gray-600">(11) 99999-8888</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Horário de Funcionamento</h4>
                      <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-gray-600">Sábado: 10h às 16h</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-6">Envie-nos uma mensagem</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="O motivo do contato"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
