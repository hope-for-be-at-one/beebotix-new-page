
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <h1 className="heading-lg mb-6">
            <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-beebotix-gray-dark text-lg mb-12">
            Browse and purchase our exclusive range of BeeBotix products.
          </p>
          
          {/* Placeholder content */}
          <div className="text-center my-20">
            <div className="bg-beebotix-gray-light rounded-xl p-12">
              <h2 className="text-2xl font-bold text-beebotix-navy mb-4">
                Marketplace Coming Soon
              </h2>
              <p className="text-lg text-beebotix-gray-dark mb-6">
                We're currently setting up our marketplace with all our BeeBotix products.
                Check back soon to explore our offerings.
              </p>
              <Button className="button-primary">
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
