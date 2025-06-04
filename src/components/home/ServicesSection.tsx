
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Bot, Code, Settings, Briefcase, GraduationCap, Box, Package, Truck } from "lucide-react";

const services = [
  {
    title: "Custom PCB Design",
    description: "Professional PCB design services for embedded systems, IoT devices, and robotics applications.",
    icon: <Cpu className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#pcb-design"
  },
  {
    title: "Custom Robot Prototyping",
    description: "End-to-end robot development from concept to working prototype, specializing in autonomous systems.",
    icon: <Bot className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#robot-prototyping"
  },
  {
    title: "Embedded Software Development",
    description: "Firmware and embedded software solutions for microcontrollers, SBCs, and custom hardware platforms.",
    icon: <Code className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#embedded-software"
  },
  {
    title: "White Labeling & OEM",
    description: "Complete product development and manufacturing services for companies bringing robotics products to market.",
    icon: <Settings className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#white-labeling"
  },
  {
    title: "R&D and Project Consultancy",
    description: "Expert consultancy services for research and development projects in robotics and automation.",
    icon: <Briefcase className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#consultancy"
  },
  {
    title: "Student Project Support",
    description: "Comprehensive guidance for B.Tech and M.Tech students on robotics projects, reports, and papers.",
    icon: <GraduationCap className="h-8 w-8 text-beebotix-yellow" />,
    link: "/services#student-support"
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
            Comprehensive robotics and embedded systems solutions tailored to your needs, from PCB design to complete robot prototyping.
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/services">
              <Button className="button-primary">
                View All Services
              </Button>
            </Link>
            <Link to="/order-tracking">
              <Button className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy relative overflow-hidden group px-6 py-3 font-medium">
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute top-1/2 -translate-y-1/2 -left-8 group-hover:left-full transition-all duration-1000 ease-in-out">
                    <Truck className="h-4 w-4 text-beebotix-navy/70" />
                  </div>
                </div>
                <Package className="h-4 w-4 mr-2 relative z-10" />
                <span className="relative z-10">Track Your Order</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
