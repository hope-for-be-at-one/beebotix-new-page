
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Box, CircleDashed, CircleDot } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="container-custom min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
        {/* Background elements with 3D icons */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[20%] left-[10%] bg-beebotix-yellow opacity-20 rounded-full w-64 h-64 blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[15%] bg-beebotix-orange opacity-10 rounded-full w-96 h-96 blur-3xl"></div>
          <div className="absolute top-[40%] right-[15%] bg-beebotix-teal opacity-10 rounded-full w-72 h-72 blur-3xl"></div>
          
          {/* 3D Effect Elements */}
          <div className="absolute top-[15%] left-[20%] animate-float">
            <CircleDot className="h-10 w-10 text-beebotix-yellow opacity-70" />
          </div>
          <div className="absolute bottom-[25%] left-[15%] animate-float" style={{ animationDelay: "1s" }}>
            <Box className="h-16 w-16 text-beebotix-navy opacity-60" />
          </div>
          <div className="absolute top-[30%] right-[20%] animate-float" style={{ animationDelay: "2s" }}>
            <Bot className="h-12 w-12 text-beebotix-orange opacity-70" />
          </div>
          <div className="absolute bottom-[15%] right-[25%] animate-float" style={{ animationDelay: "1.5s" }}>
            <CircleDashed className="h-8 w-8 text-beebotix-teal opacity-60" />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="relative">
            <h1 className={`heading-xl mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              Welcome to <span className="gradient-text">BeeBotix</span>
            </h1>
            
            {/* 3D animated rings around the heading */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
              <div className="absolute w-[120%] h-[120%] border-2 border-beebotix-yellow/20 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
              <div className="absolute w-[140%] h-[140%] border border-beebotix-orange/10 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}></div>
              <div className="absolute w-[160%] h-[160%] border border-beebotix-teal/10 rounded-full animate-spin" style={{ animationDuration: "25s" }}></div>
            </div>
          </div>
          
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
            
            <Link to="/products">
              <Button className="button-secondary">
                Visit Marketplace
              </Button>
            </Link>
            
            <Link to="/rent-robot">
              <Button className="button-primary">
                <Bot className="mr-2 h-4 w-4" />
                Rent A Robot
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button className="button-outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
