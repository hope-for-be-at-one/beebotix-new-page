
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-beebotix-navy py-16 md:py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start your robotics journey?
            </h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Get in touch with our team to discuss your project requirements and how BeeBotix can help bring your robotics vision to life.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button className="bg-beebotix-yellow hover:bg-yellow-400 text-beebotix-navy font-medium px-6 py-3 rounded-md text-lg">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/services">
              <Button className="border-2 border-white bg-transparent hover:bg-white/10 text-white font-medium px-6 py-3 rounded-md text-lg">
                Explore Services
                <Bot className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
