
import { motion } from 'framer-motion';

const CategoriesHeader = () => {
  return (
    <section className="py-8 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Categorias</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Navegue por nossa coleção por categoria para encontrar exatamente o que você está procurando.
            De action figures a jogos de tabuleiro vintage, temos algo para cada colecionador.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesHeader;
