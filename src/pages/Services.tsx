import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Cpu, 
  Smartphone, 
  Globe, 
  Bot, 
  Lightbulb, 
  Rocket, 
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  Shield
} from "lucide-react";
import emailjs from "emailjs-com";

const Services = () => {
  const { toast } = useToast();
  
  const serviceData = [
    {
      id: 1,
      title: "Web Development",
      description: "Crafting responsive and user-friendly websites tailored to your business needs. From simple landing pages to complex e-commerce platforms, we've got you covered.",
      icon: Globe,
      features: [
        "Custom website design",
        "E-commerce solutions",
        "SEO optimization",
        "Mobile responsiveness",
        "Content management systems (CMS)"
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Creating innovative and high-performance mobile applications for iOS and Android platforms. We focus on delivering seamless user experiences and robust functionality.",
      icon: Smartphone,
      features: [
        "Native iOS and Android apps",
        "Cross-platform development",
        "UI/UX design",
        "App store deployment",
        "Maintenance and support"
      ]
    },
    {
      id: 3,
      title: "Software Development",
      description: "Building custom software solutions to streamline your business processes and enhance productivity. We specialize in creating scalable and secure applications.",
      icon: Cpu,
      features: [
        "Custom software development",
        "Enterprise solutions",
        "Cloud-based applications",
        "API integration",
        "Software consulting"
      ]
    },
    {
      id: 4,
      title: "AI & Automation",
      description: "Implementing artificial intelligence and automation solutions to optimize your operations and drive growth. We leverage the latest technologies to deliver intelligent solutions.",
      icon: Bot,
      features: [
        "AI-powered solutions",
        "Process automation",
        "Machine learning",
        "Chatbot development",
        "Data analytics"
      ]
    },
    {
      id: 5,
      title: "Product Design",
      description: "Designing innovative and user-centered products that meet your business goals and customer needs. We focus on creating visually appealing and functional designs.",
      icon: Lightbulb,
      features: [
        "UI/UX design",
        "Prototyping",
        "User research",
        "Branding",
        "Design consulting"
      ]
    },
    {
      id: 6,
      title: "Digital Transformation",
      description: "Guiding your business through digital transformation to stay competitive and relevant in today's market. We provide strategic consulting and implementation services.",
      icon: Rocket,
      features: [
        "Digital strategy",
        "Technology consulting",
        "Change management",
        "Innovation workshops",
        "Training and support"
      ]
    },
    {
      id: 7,
      title: "IT Consulting",
      description: "Providing expert IT consulting services to help you make informed decisions and optimize your technology investments. We offer strategic guidance and practical solutions.",
      icon: Users,
      features: [
        "IT strategy",
        "Cybersecurity",
        "Cloud solutions",
        "Data management",
        "Risk assessment"
      ]
    },
    {
      id: 8,
      title: "Cybersecurity Solutions",
      description: "Protecting your business from cyber threats with our comprehensive cybersecurity solutions. We offer proactive measures and incident response services.",
      icon: Shield,
      features: [
        "Threat detection",
        "Data encryption",
        "Security audits",
        "Incident response",
        "Compliance"
      ]
    },
    {
      id: 9,
      title: "24/7 Support",
      description: "Providing round-the-clock support to ensure your systems are always up and running. We offer proactive monitoring and rapid response to any issues.",
      icon: Clock,
      features: [
        "Remote support",
        "On-site support",
        "Help desk services",
        "System monitoring",
        "Emergency response"
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
            <p className="text-beebotix-gray-dark text-lg max-w-3xl mx-auto">
              Explore our wide range of services designed to help your business thrive in the digital age. 
              From web and mobile app development to AI and cybersecurity solutions, we have the expertise 
              to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.map(service => (
              <Card key={service.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <service.icon className="h-8 w-8 text-beebotix-yellow" />
                    <h2 className="text-xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-beebotix-gray-dark mb-4">{service.description}</p>
                  <ul className="list-none space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-beebotix-gray-dark">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="heading-md mb-8 text-center">Request a Service</h2>
            <Card className="shadow-lg">
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
