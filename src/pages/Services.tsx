
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Cpu, 
  Bot, 
  Code, 
  Settings, 
  GraduationCap, 
  Briefcase,
  CheckCircle,
  Package,
  Waves
} from "lucide-react";
import emailjs from "emailjs-com";

const Services = () => {
  const { toast } = useToast();
  
  const serviceData = [
    {
      id: 1,
      title: "Custom PCB Design",
      description: "Professional PCB design services for embedded systems, IoT devices, and robotics applications. From schematic design to manufacturing-ready files.",
      icon: Cpu,
      features: [
        "Schematic design and simulation",
        "Multi-layer PCB layout",
        "Component selection and sourcing",
        "Manufacturing file generation",
        "Testing and validation"
      ]
    },
    {
      id: 2,
      title: "Custom Robot Prototyping",
      description: "End-to-end robot development from concept to working prototype. Specializing in autonomous systems, manipulators, and mobile robots.",
      icon: Bot,
      features: [
        "Mechanical design and CAD modeling",
        "Sensor integration and calibration",
        "Motor control and actuation",
        "Autonomous navigation systems",
        "Custom chassis and enclosures"
      ]
    },
    {
      id: 3,
      title: "Embedded Software Development",
      description: "Firmware and embedded software solutions for microcontrollers, SBCs, and custom hardware platforms.",
      icon: Code,
      features: [
        "Microcontroller programming (Arduino, ESP32, STM32)",
        "Real-time operating systems (RTOS)",
        "Communication protocols (UART, SPI, I2C, CAN)",
        "Sensor data processing and filtering",
        "Custom bootloaders and drivers"
      ]
    },
    {
      id: 4,
      title: "White Labeling & OEM Solutions",
      description: "Complete product development and manufacturing services for companies looking to bring robotics products to market under their brand.",
      icon: Settings,
      features: [
        "Product design and development",
        "Custom branding and packaging",
        "Manufacturing and quality control",
        "Technical documentation",
        "After-sales support setup"
      ]
    },
    {
      id: 5,
      title: "R&D and Project Consultancy",
      description: "Expert consultancy services for research and development projects in robotics, automation, and embedded systems.",
      icon: Briefcase,
      features: [
        "Feasibility studies and technical analysis",
        "Technology selection and architecture",
        "Project planning and management",
        "Prototype development and testing",
        "Market research and competitive analysis"
      ]
    },
    {
      id: 6,
      title: "Student Project Support",
      description: "Comprehensive guidance for B.Tech and M.Tech students on robotics and electronics projects, including report and paper writing assistance.",
      icon: GraduationCap,
      features: [
        "Project topic selection and planning",
        "Technical implementation guidance",
        "Report writing and documentation",
        "Research paper preparation",
        "Presentation and demo support"
      ]
    }
  ];

  const [serviceFormData, setServiceFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    requirements: ""
  });
  const [isSubmittingService, setIsSubmittingService] = useState(false);

  // Initialize EmailJS
  emailjs.init("K9PmDAw2eoItuAJgX");

  const handleServiceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!serviceFormData.name || !serviceFormData.email || !serviceFormData.service || !serviceFormData.requirements) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmittingService(true);

    const templateParams = {
      name: serviceFormData.name,
      email: serviceFormData.email,
      phone: serviceFormData.phone || "Not provided",
      company: serviceFormData.company || "Not provided",
      service: serviceFormData.service,
      budget: serviceFormData.budget || "Not specified",
      timeline: serviceFormData.timeline || "Not specified",
      requirements: serviceFormData.requirements,
      subject: `Service Request - ${serviceFormData.service}`,
      message: `
Service Request Details:

Name: ${serviceFormData.name}
Email: ${serviceFormData.email}
Phone: ${serviceFormData.phone || "Not provided"}
Company: ${serviceFormData.company || "Not provided"}
Requested Service: ${serviceFormData.service}
Budget Range: ${serviceFormData.budget || "Not specified"}
Timeline: ${serviceFormData.timeline || "Not specified"}

Requirements:
${serviceFormData.requirements}
      `,
      to_name: "BeeBotix Team",
      from_name: serviceFormData.name
    };

    const serviceID = "service_rwc5cf5";
    const templateID = "template_tkr2wgr";

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      
      toast({
        title: "Request Sent Successfully! 🎉",
        description: "Thank you for your interest! Our team will review your requirements and get back to you within 24 hours.",
      });
      
      // Reset form
      setServiceFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        requirements: ""
      });
    } catch (error) {
      console.error("Email.js error:", error);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: "Please try again in a few minutes or reach out to us on social media. We're here to help!",
      });
    } finally {
      setIsSubmittingService(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">Our Services</h1>
            <p className="text-beebotix-gray-dark text-lg max-w-3xl mx-auto mb-8">
              Specializing in robotics, embedded systems, and custom hardware solutions. 
              From PCB design to complete robot prototyping, we bring your innovative ideas to life.
            </p>
            
            {/* Order Tracking Button */}
            <div className="mb-8">
              <Link to="/order-tracking">
                <Button className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy font-semibold px-8 py-3">
                  <Package className="h-5 w-5 mr-2" />
                  Track Your Order
                </Button>
              </Link>
            </div>

            {/* Enhanced Aquatic Vision */}
            <div className="relative bg-gradient-to-br from-blue-900/20 via-teal-800/15 to-blue-950/25 rounded-2xl p-8 max-w-3xl mx-auto overflow-hidden border border-blue-200/30">
              {/* ROV Background Image */}
              <div 
                className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                }}
              ></div>
              
              {/* Ocean Wave Animation */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-500/20 to-transparent opacity-30 animate-pulse"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                    <Waves className="h-10 w-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">Our Underwater Vision</h3>
                </div>
                <p className="text-blue-800 text-lg leading-relaxed mb-4">
                  Dive deep into the future of marine exploration with our cutting-edge underwater robotics. 
                  Our long-term mission is to revolutionize ocean discovery through autonomous underwater vehicles (AUVs) 
                  and remotely operated vehicles (ROVs).
                </p>
                <p className="text-blue-700">
                  From deep-sea research to marine conservation, we're building the technology that will unlock 
                  the mysteries of our planet's last frontier - the ocean depths.
                </p>
                
                {/* Ocean Elements */}
                <div className="flex justify-center items-center mt-6 space-x-4 opacity-60">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.map(service => (
              <Card key={service.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-beebotix-yellow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <service.icon className="h-8 w-8 text-beebotix-yellow" />
                    <h2 className="text-xl font-bold text-beebotix-navy">{service.title}</h2>
                  </div>
                  <p className="text-beebotix-gray-dark mb-4">{service.description}</p>
                  <ul className="list-none space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-beebotix-gray-dark">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Request Form */}
          <div className="mt-16">
            <h2 className="heading-md mb-8 text-center">Request a Service</h2>
            <Card className="shadow-lg max-w-4xl mx-auto">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={serviceFormData.name}
                      onChange={handleServiceFormChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={serviceFormData.email}
                      onChange={handleServiceFormChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={serviceFormData.phone}
                      onChange={handleServiceFormChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={serviceFormData.company}
                      onChange={handleServiceFormChange}
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={serviceFormData.service}
                      onChange={handleServiceFormChange}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-beebotix-yellow"
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceData.map(service => (
                        <option key={service.id} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <Input
                      id="budget"
                      name="budget"
                      value={serviceFormData.budget}
                      onChange={handleServiceFormChange}
                      placeholder="Approximate budget"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                      Timeline
                    </label>
                    <Input
                      id="timeline"
                      name="timeline"
                      value={serviceFormData.timeline}
                      onChange={handleServiceFormChange}
                      placeholder="Desired timeline"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                      Specific Requirements <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={serviceFormData.requirements}
                      onChange={handleServiceFormChange}
                      placeholder="Please provide detailed requirements for the service"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy"
                      disabled={isSubmittingService}
                    >
                      {isSubmittingService ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-beebotix-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
