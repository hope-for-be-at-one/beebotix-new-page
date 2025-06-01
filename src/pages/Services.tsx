import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  Bot,
  Code,
  Briefcase,
  Package,
  ChevronRight,
  GraduationCap,
  Truck
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const Services = () => {
  const [activeTab, setActiveTab] = useState("pcb");
  const [serviceFormData, setServiceFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmittingService, setIsSubmittingService] = useState(false);

  // Initialize EmailJS
  emailjs.init("K9PmDAw2eoItuAJgX");
  
  const services = [
    {
      id: "pcb",
      title: "Custom PCB Design",
      icon: <Wrench className="h-8 w-8" />,
      description: "Professional PCB design and layout for your electronics projects. From concept to manufacturing-ready files.",
      benefits: [
        "Professional schematic design",
        "PCB layout optimization",
        "Component selection assistance",
        "Manufacturing preparation",
        "Design validation and review"
      ],
      techStack: ["Altium Designer", "KiCad", "Eagle", "Fusion 360", "CircuitMaker"],
      process: [
        { step: "Requirements Gathering", details: "We work closely with you to understand your project requirements and specifications." },
        { step: "Schematic Design", details: "Creating detailed schematics based on your requirements." },
        { step: "PCB Layout", details: "Optimized component placement and routing with DFM considerations." },
        { step: "Design Review", details: "Thorough review and validation of the design before finalizing." },
        { step: "Manufacturing Files", details: "Preparation of Gerber files and BOM for production." }
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-blue-50"
    },
    {
      id: "robot",
      title: "Custom Robot Prototyping",
      icon: <Bot className="h-8 w-8" />,
      description: "End-to-end robot prototype development from concept design to working demonstration models.",
      benefits: [
        "Tailored design for specific use cases",
        "Integrated electronics and mechanics",
        "Custom firmware development",
        "3D printed components",
        "Iterative testing and refinement"
      ],
      techStack: ["ROS", "Arduino", "Raspberry Pi", "SolidWorks", "Fusion 360", "Python", "C++"],
      process: [
        { step: "Concept Development", details: "Collaborative design sessions to define robot functionality and requirements." },
        { step: "Mechanical Design", details: "3D modeling and simulation of robot structure and mechanisms." },
        { step: "Electronics Integration", details: "Custom PCB design and sensor/actuator integration." },
        { step: "Firmware Development", details: "Programming control systems and interfaces." },
        { step: "Testing & Refinement", details: "Iterative testing and optimization of the prototype." }
      ],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-purple-50"
    },
    {
      id: "software",
      title: "Embedded Software Development",
      icon: <Code className="h-8 w-8" />,
      description: "Custom firmware and embedded software solutions for your hardware products and systems.",
      benefits: [
        "Optimized code for resource-constrained systems",
        "RTOS implementation and optimization",
        "Driver development for custom hardware",
        "Firmware update systems",
        "Performance optimization"
      ],
      techStack: ["C", "C++", "Python", "FreeRTOS", "MicroPython", "Zephyr", "PlatformIO", "ARM Mbed"],
      process: [
        { step: "Requirements Analysis", details: "Understanding system constraints and software requirements." },
        { step: "Architecture Design", details: "Creating efficient software architecture for embedded systems." },
        { step: "Implementation", details: "Writing optimized, reliable code for your hardware." },
        { step: "Testing & Debugging", details: "Comprehensive testing on actual hardware." },
        { step: "Documentation & Delivery", details: "Complete documentation and knowledge transfer." }
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-green-50"
    },
    {
      id: "academic",
      title: "Academic Project Support",
      icon: <GraduationCap className="h-8 w-8" />,
      description: "Expert guidance and project development support for B.Tech and M.Tech students working on robotics and electronics projects.",
      benefits: [
        "Technical mentoring from industry experts",
        "Hands-on guidance with hardware implementation",
        "Project development and documentation support",
        "Research paper preparation assistance",
        "Comprehensive report formulation"
      ],
      techStack: ["Arduino", "Raspberry Pi", "MATLAB", "Python", "IoT Platforms", "Robotics", "Machine Learning", "Embedded Systems"],
      process: [
        { step: "Project Topic Selection", details: "Assistance in selecting viable and innovative project topics aligned with academic requirements." },
        { step: "Technical Guidance", details: "Regular mentoring sessions to guide implementation and overcome technical challenges." },
        { step: "Hardware & Software Development", details: "Hands-on support for developing the project components and integrating systems." },
        { step: "Documentation", details: "Guidance on preparing professional-quality project reports and research papers." },
        { step: "Presentation Preparation", details: "Support for preparing effective project demonstrations and presentations." }
      ],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-indigo-50"
    },
    {
      id: "consultancy",
      title: "R&D and Product Consultancy",
      icon: <Briefcase className="h-8 w-8" />,
      description: "Expert advice and support for your robotics and hardware R&D projects and product development.",
      benefits: [
        "Access to specialized expertise",
        "Cost-effective R&D solutions",
        "Accelerated development cycles",
        "Market-focused product strategy",
        "Technical feasibility assessment"
      ],
      techStack: ["Project Management", "Product Strategy", "Technical Assessment", "Market Analysis", "Regulatory Compliance"],
      process: [
        { step: "Initial Assessment", details: "Evaluating your project needs and defining objectives." },
        { step: "Strategic Planning", details: "Developing a roadmap for successful implementation." },
        { step: "Technical Guidance", details: "Expert advice on technology selection and implementation." },
        { step: "Progress Review", details: "Regular checkpoints to ensure project alignment." },
        { step: "Final Recommendations", details: "Comprehensive guidance for next steps and future development." }
      ],
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-yellow-50"
    },
    {
      id: "oem",
      title: "White-label OEM Module Services",
      icon: <Package className="h-8 w-8" />,
      description: "Custom white-label electronic modules for integration into your products, manufactured to your specifications.",
      benefits: [
        "Customized to your product requirements",
        "Scalable manufacturing options",
        "Quality assurance and testing",
        "Documentation and support",
        "Cost optimization"
      ],
      techStack: ["Custom PCB", "Supply Chain Management", "Quality Control", "Manufacturing", "Certification Support"],
      process: [
        { step: "Module Specification", details: "Defining the module requirements and interfaces." },
        { step: "Design & Prototyping", details: "Creating and validating module designs." },
        { step: "Manufacturing Setup", details: "Preparing for production with quality controls." },
        { step: "Production", details: "Manufacturing modules to specification." },
        { step: "Delivery & Support", details: "Delivering finished modules with documentation and support." }
      ],
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-red-50"
    }
  ];

  // Get current active service
  const activeService = services.find(service => service.id === activeTab) || services[0];

  // Handle tab change
  const handleTabChange = (id: string) => {
    setActiveTab(id);
  };

  const handleServiceFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setServiceFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingService(true);

    const selectedService = services.find(s => s.id === serviceFormData.service)?.title || serviceFormData.service;

    const templateParams = {
      from_name: serviceFormData.name,
      from_email: serviceFormData.email,
      company: serviceFormData.company,
      service_type: selectedService,
      project_description: serviceFormData.message,
      subject: `Service Request: ${selectedService}`,
      message: `
New Service Request Details:

Name: ${serviceFormData.name}
Email: ${serviceFormData.email}
Company: ${serviceFormData.company}
Service Interested In: ${selectedService}

Project Description:
${serviceFormData.message}

Please contact this client to discuss their project requirements.
      `,
      to_name: "BeeBotix Team",
    };

    const serviceID = "service_rwc5cf5";
    const templateID = "template_tkr2wgr";

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      
      toast({
        title: "Request Submitted Successfully! 🎉",
        description: "Thank you for your interest! We've received your service request and will get back to you within 24 hours to discuss your project.",
      });
      
      setServiceFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: ""
      });
    } catch (error) {
      console.error("Email.js error:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a few minutes or reach out to us on social media. We're here to help!",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingService(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading-lg mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-beebotix-gray-dark mb-8">
                Comprehensive robotics and electronics services designed to support businesses,
                researchers, and innovators in bringing their ideas to life.
              </p>
              
              {/* Track Order Button */}
              <div className="mb-8">
                <Link to="/order-tracking">
                  <Button className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy font-semibold px-6 py-3">
                    <Truck className="h-5 w-5 mr-2" />
                    Track My Order
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
              {services.map(service => (
                <div 
                  key={service.id}
                  className={`${service.color} rounded-xl p-6 cursor-pointer transition-all hover:shadow-md 
                    ${activeTab === service.id ? 'ring-2 ring-beebotix-orange' : ''}`}
                  onClick={() => handleTabChange(service.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-beebotix-navy">
                      {service.icon}
                    </div>
                    <h3 className="font-bold">{service.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Service Details Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${activeService.color} p-3 rounded-lg`}>
                    {activeService.icon}
                  </div>
                  <h2 className="heading-md">{activeService.title}</h2>
                </div>
                
                <p className="text-beebotix-gray-dark text-lg mb-8">
                  {activeService.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {activeService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-beebotix-navy font-bold text-sm">✓</span>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeService.techStack.map((tech, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Button className="button-primary">
                    Request a Quote <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="rounded-xl overflow-hidden mb-8 h-64">
                  <img 
                    src={activeService.image} 
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="font-bold text-xl mb-4">Our Process</h3>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-beebotix-navy/20 -ml-0.5"></div>
                    
                    {/* Timeline steps */}
                    <div className="space-y-6">
                      {activeService.process.map((process, index) => (
                        <div key={index} className="pl-12 relative">
                          <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center z-10 -ml-4">
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <h4 className="font-bold text-lg">{process.step}</h4>
                          <p className="text-beebotix-gray-dark">{process.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Success Stories */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  client: "TechRobotics Inc.",
                  service: "Custom PCB Design",
                  description: "We helped TechRobotics develop a compact, power-efficient control board for their autonomous drone system, reducing power consumption by 30%.",
                  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                },
                {
                  client: "EduBots",
                  service: "Custom Robot Prototyping",
                  description: "Created a series of educational robot prototypes for classroom use, featuring modular designs that could be assembled by students.",
                  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                },
                {
                  client: "AgriTech Solutions",
                  service: "Embedded Software Development",
                  description: "Developed firmware for agricultural monitoring sensors with 6-month battery life, enabling remote deployment in fields.",
                  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                }
              ].map((story, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100">
                    <img 
                      src={story.image} 
                      alt={story.client}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-beebotix-yellow/20 text-beebotix-navy px-2 py-1 rounded-full">
                        {story.service}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{story.client}</h3>
                    <p className="text-sm text-beebotix-gray-dark">
                      {story.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Why Choose Us Section */}
          <section className="mb-16 bg-gray-50 rounded-xl p-8">
            <h2 className="heading-md mb-8 text-center">Why Choose BeeBotix</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Technical Expertise",
                  description: "Our team includes specialists in electronics, robotics, software, and manufacturing.",
                  icon: "🔧"
                },
                {
                  title: "End-to-End Solutions",
                  description: "From concept and design through to prototyping and production support.",
                  icon: "🔄"
                },
                {
                  title: "Customized Approach",
                  description: "Every project is unique, and we tailor our services to your specific requirements.",
                  icon: "🎯"
                },
                {
                  title: "Timely Delivery",
                  description: "We understand the importance of deadlines in product development cycles.",
                  icon: "⏱️"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-beebotix-gray-dark">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Industries We Serve */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Industries We Serve</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Consumer Electronics", icon: "📱" },
                { name: "Healthcare", icon: "🏥" },
                { name: "Agriculture", icon: "🌾" },
                { name: "Education", icon: "🎓" },
                { name: "Industrial Automation", icon: "🏭" },
                { name: "Research Institutions", icon: "🔬" },
              ].map((industry, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">{industry.icon}</div>
                  <h3 className="font-medium text-sm">{industry.name}</h3>
                </div>
              ))}
            </div>
          </section>
          
          {/* Service Request Form */}
          <section className="mb-16">
            <div className="bg-beebotix-navy rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                  <p className="text-white/80 mb-8">
                    Fill out the form to discuss your project requirements with our team.
                    We'll get back to you within 24 hours.
                  </p>
                  
                  <form onSubmit={handleServiceFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input 
                          id="name" 
                          name="name"
                          value={serviceFormData.name}
                          onChange={handleServiceFormChange}
                          placeholder="Your name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={serviceFormData.email}
                          onChange={handleServiceFormChange}
                          placeholder="your@email.com" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-white/90 text-sm font-medium mb-1">
                        Company
                      </label>
                      <Input 
                        id="company" 
                        name="company"
                        value={serviceFormData.company}
                        onChange={handleServiceFormChange}
                        placeholder="Your company" 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-white/90 text-sm font-medium mb-1">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={serviceFormData.service}
                        onChange={handleServiceFormChange}
                        className="w-full rounded-md border border-white/20 bg-white/10 text-white py-2 px-3"
                        required
                      >
                        <option value="" disabled>Select a service</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id} className="text-black">
                            {service.title}
                          </option>
                        ))}
                        <option value="multiple" className="text-black">Multiple Services</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-1">
                        Project Description
                      </label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={serviceFormData.message}
                        onChange={handleServiceFormChange}
                        placeholder="Tell us about your project and requirements..." 
                        className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmittingService} className="button-primary w-full">
                      {isSubmittingService ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </div>
                
                <div className="hidden lg:block">
                  <div className="h-full bg-[url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQs */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "What is the typical project timeline?",
                  a: "Project timelines vary based on scope and complexity. Simple PCB designs might take 2-3 weeks, while complex robot prototypes could take several months. We'll provide a detailed timeline during initial consultation."
                },
                {
                  q: "Do you sign NDAs before discussing projects?",
                  a: "Yes, we routinely sign Non-Disclosure Agreements before detailed project discussions to protect your intellectual property and business information."
                },
                {
                  q: "Can you work with existing designs or prototypes?",
                  a: "Absolutely! We can review, refine, or expand upon existing designs and prototypes. Many clients come to us to improve or scale up their initial concepts."
                },
                {
                  q: "What payment terms do you offer?",
                  a: "For most projects, we work on a milestone-based payment schedule: initial deposit, progress payments at key milestones, and final payment upon delivery. For ongoing services, we offer monthly retainers."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-beebotix-gray-dark">{faq.a}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/contact">
                <Button variant="outline">
                  Have More Questions? Contact Us
                </Button>
              </Link>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/80 rounded-xl p-8 text-white text-center">
            <h2 className="heading-md mb-4">Ready to Innovate?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Let's bring your robotics and electronics projects to life with our comprehensive services.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="button-primary">
                Start a Project
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Schedule a Consultation
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
