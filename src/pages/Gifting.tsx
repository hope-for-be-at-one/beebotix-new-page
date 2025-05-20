
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Gifting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <h1 className="heading-lg mb-6">
            <span className="gradient-text">Custom Gifting</span>
          </h1>
          <p className="text-beebotix-gray-dark text-lg mb-12">
            Unique tech and robotics-themed gifts for all occasions.
          </p>
          
          {/* Placeholder content */}
          <div className="text-center my-20">
            <div className="bg-beebotix-gray-light rounded-xl p-12">
              <h2 className="text-2xl font-bold text-beebotix-navy mb-4">
                Gifting Options Coming Soon
              </h2>
              <p className="text-lg text-beebotix-gray-dark mb-6">
                We're curating our collection of custom robotics and tech gifts.
                Check back soon to see our unique offerings.
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

export default Gifting;
