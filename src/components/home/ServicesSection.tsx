
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Robot, Cube, Box, Wrench, Settings, Briefcase } from "lucide-react";

const services = [
  {
    title: "Development Boards",
    description: "Custom and standard development boards for industry, hobbyists, and innovators.",
    icon: <Cube className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#development-boards"
  },
  {
    title: "Custom Robots & Embedded Systems",
    description: "Fully tailored robotic solutions and embedded systems designed to your specifications.",
    icon: <Robot className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#custom-robots"
  },
  {
    title: "3D Printing Services",
    description: "High-quality 3D printing in PLA, PETG, TPU materials with 20x20x25cm bed size.",
    icon: <Cube className="h-8 w-8 text-beebotix-yellow" />,
    link: "/3d-printing"
  },
  {
    title: "BeeBotix Product Line",
    description: "Our proprietary products and development boards for robotics enthusiasts.",
    icon: <Box className="h-8 w-8 text-beebotix-yellow" />,
    link: "/marketplace"
  },
  {
    title: "Consultancy Services",
    description: "Expert consultancy in robotics, R&D, product development, and embedded software.",
    icon: <Briefcase className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#consultancy"
  },
  {
    title: "Education & Development",
    description: "Workshops and 1-to-1 online classes for robotics education and development.",
    icon: <Settings className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#education"
  }
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-beebotix-gray-light">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-2">
            <span className="gradient-text">What We Provide</span>
          </h2>
          <div className="w-20 h-1 bg-beebotix-yellow mx-auto mb-6"></div>
          <p className="text-beebotix-gray-dark text-lg">
            Comprehensive robotics solutions tailored to your needs, from development boards to custom systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${100 * index}ms` }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-beebotix-yellow transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <CardHeader className="pb-2">
                  <div className="mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-beebotix-navy">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardDescription className="text-beebotix-gray-dark text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to={service.link}>
                    <Button className="bg-beebotix-navy hover:bg-opacity-90 text-white">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <Button className="button-primary">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
