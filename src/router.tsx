
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import Collection from "./pages/Collection";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ClientArea from "./pages/ClientArea";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/about",
    element: <About />,
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
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/*",
    element: <Admin />,
  },
  {
    path: "/client",
    element: <ClientArea />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const Router = () => {
  // Remove v7_startTransition option that was causing error
  return <RouterProvider router={router} />;
};
