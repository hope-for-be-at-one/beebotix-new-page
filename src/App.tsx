
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/hooks/useCart";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/utils/ScrollToTop";
import Home from "@/pages/Index";
import About from "@/pages/Index";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Products from "@/pages/Products";
import Hardware from "@/pages/Hardware";
import Software from "@/pages/Software";
import Gifting from "@/pages/Gifting";
import ThreeDPrinting from "@/pages/Printing";
import Marketplace from "@/pages/Marketplace";
import Cart from "@/pages/Cart";
import PlaceOrder from "@/pages/PlaceOrder";
import OrderTracking from "@/pages/OrderTracking";
import Classroom from "@/pages/Classroom";
import OurStories from "@/pages/OurStories";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/hardware" element={<Hardware />} />
              <Route path="/products/software" element={<Software />} />
              <Route path="/gifting" element={<Gifting />} />
              <Route path="/3d-printing" element={<ThreeDPrinting />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/our-stories" element={<OurStories />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
