import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CategoriesHeader from '../components/categories/CategoriesHeader';
import FeaturedCategories from '../components/categories/FeaturedCategories';
import PopularProducts from '../components/categories/PopularProducts';
import AllCategories from '../components/categories/AllCategories';
import { categories } from '../data/categoriesData';
import { popularProducts } from '../data/popularProductsData';

const Categories = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <CategoriesHeader />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FeaturedCategories categories={categories} />
            <PopularProducts products={popularProducts} categories={categories} />
            <AllCategories categories={categories} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
