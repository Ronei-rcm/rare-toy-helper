
import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ClientArea from "./pages/ClientArea";
import Collection from "./pages/Collection";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/auth/AuthGuard";
import { Unauthorized } from "./components/auth/Unauthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
    {
      path: "/admin",
      element: (
        <AuthGuard requireAuth requireAdmin>
          <Admin />
        </AuthGuard>
      ),
    },
  {
    path: "/client-area",
    element: (
      <AuthGuard requireAuth>
        <ClientArea />
      </AuthGuard>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/cliente",
    element: <Navigate to="/client-area" replace />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categorias",
    element: <Navigate to="/categories" replace />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/carrinho",
    element: <Navigate to="/cart" replace />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/produtos",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/finalizar-compra",
    element: <Navigate to="/checkout" replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
