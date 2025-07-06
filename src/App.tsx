
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CarouselProvider } from "./contexts/CarouselContext";
import { CartProvider } from "./contexts/CartContext";
import { ClientProvider } from "./contexts/ClientContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CarouselProvider>
        <CartProvider>
          <ClientProvider>
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
          </ClientProvider>
        </CartProvider>
      </CarouselProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
