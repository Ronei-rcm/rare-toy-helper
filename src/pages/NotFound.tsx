
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ShoppingCart, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const isCartPath = location.pathname.includes("carrinho");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <div className="flex justify-center mb-4">
            {isCartPath ? (
              <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-red-400" />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-400" />
              </div>
            )}
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-2">Página não encontrada</p>
          
          <p className="text-gray-500 mb-6">
            {isCartPath ? 
              "O caminho para o carrinho que você tentou acessar não existe. Por favor, utilize nosso menu de navegação." : 
              "A página que você está procurando não existe ou foi movida."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" className="w-full sm:w-auto">
              <Link to="/">Página Inicial</Link>
            </Button>
            
            {isCartPath && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/cart">Ir para Carrinho</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
