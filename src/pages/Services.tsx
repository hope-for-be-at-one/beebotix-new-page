
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <h1 className="heading-lg mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-beebotix-gray-dark text-lg mb-12">
            Discover our comprehensive range of robotics services designed to meet your unique needs.
          </p>
          
          {/* Placeholder content */}
          <div className="text-center my-20">
            <div className="bg-beebotix-gray-light rounded-xl p-12">
              <h2 className="text-2xl font-bold text-beebotix-navy mb-4">
                Services Page Coming Soon
              </h2>
              <p className="text-lg text-beebotix-gray-dark mb-6">
                We're working on building out our detailed services information.
                Check back soon for a complete overview of our offerings.
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

export default Services;
