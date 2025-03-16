
import { motion } from 'framer-motion';

const CollectionHeader = () => {
  return (
    <section className="py-8 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Nossa Coleção</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa coleção única de brinquedos raros e colecionáveis. 
            Cada item é verificado quanto à autenticidade e vem com uma descrição detalhada.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CollectionHeader;
