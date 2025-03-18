import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
  isRouteErrorResponse
} from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientArea from "./pages/ClientArea";
import Collection from "./pages/Collection";
import Categories from "./pages/Categories";
import About from "./pages/About";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Componente de erro para o React Router
function RouterError() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">{error.status}</h1>
              <p className="text-gray-600 mb-4">{error.statusText}</p>
              <a href="/" className="text-primary hover:underline">
                Voltar para a página inicial
              </a>
            </div>
          </div>
        }
      />
    );
  }

  return <ErrorBoundary />;
}

// Configuração do React Router com flags futuras e ErrorBoundary
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<RouterError />}>
      <Route path="/" element={<Index />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cliente" element={<ClientArea />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
