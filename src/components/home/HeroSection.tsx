
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="container-custom min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[20%] left-[10%] bg-beebotix-yellow opacity-20 rounded-full w-64 h-64 blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[15%] bg-beebotix-orange opacity-10 rounded-full w-96 h-96 blur-3xl"></div>
          <div className="absolute top-[40%] right-[15%] bg-beebotix-teal opacity-10 rounded-full w-72 h-72 blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className={`heading-xl mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Welcome to <span className="gradient-text">BeeBotix</span>
          </h1>
          
          <p className={`text-xl md:text-2xl font-medium mb-4 text-beebotix-navy transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            "Buzz in Robotics, and we are the buzzing army"
          </p>
          
          <p className={`text-lg text-beebotix-gray-dark mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Innovative Robotics as a Service solutions for industries, hobbyists, and innovators alike. Custom robotics, development boards, and 3D printing services.
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <Link to="/services">
              <Button className="button-primary">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/marketplace">
              <Button className="button-secondary">
                Visit Marketplace
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button className="button-outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Bottom illustration */}
        <div className={`absolute bottom-0 w-full max-w-5xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
          <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto">
            <div className="absolute inset-0 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
                alt="Robotic Innovation" 
                className="object-cover rounded-t-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
