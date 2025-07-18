
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
import NotFound from "./pages/NotFound";

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
    element: <Admin />,
  },
  {
    path: "/client-area",
    element: <ClientArea />,
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
    path: "*",
    element: <NotFound />,
  },
]);
