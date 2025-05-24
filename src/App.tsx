
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import { CartProvider } from "./hooks/useCart";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Hardware from "./pages/Hardware";
import Software from "./pages/Software";
import Printing from "./pages/Printing";
import Gifting from "./pages/Gifting";
import Contact from "./pages/Contact";
import ClassRoom from "./pages/ClassRoom";
import Cart from "./pages/Cart";
import RequestQuote from "./pages/RequestQuote";
import PlaceOrder from "./pages/PlaceOrder";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <style dangerouslySetInnerHTML={{__html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .rotate-y-0 {
            transform: rotateY(0deg);
          }
          .book-open {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
          }
          .book-closed {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          /* Currency global formatting */
          .price::before {
            content: '₹';
          }
          .currency-inr {
            font-family: system-ui, -apple-system, sans-serif;
          }
          .currency-inr::before {
            content: '₹';
          }
        `}} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/hardware" element={<Hardware />} />
            <Route path="/products/software" element={<Software />} />
            <Route path="/3d-printing" element={<Printing />} />
            <Route path="/gifting" element={<Gifting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/classroom" element={<ClassRoom />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
