import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuotePopup from "@/components/printing/QuotePopup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText,
  Truck,
  Upload,
  CheckCircle,
  IndianRupee
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";

const Printing = () => {
  const [activeTab, setActiveTab] = useState("materials");
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    material: "",
    length: "",
    width: "", 
    height: "",
    weight: "",
    description: ""
  });
  
  // This useEffect ensures page starts from the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Quote calculation function
  const calculateQuote = () => {
    const materialRates = {
      pla: 15,
      petg: 18,
      tpu: 22,
      abs: 20
    };

    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;
    const weight = parseFloat(formData.weight) || 0;

    if (!formData.material || length <= 0 || width <= 0 || height <= 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate a quote.",
        variant: "destructive"
      });
      return;
    }

    const volume = (length * width * height) / 1000; // Convert to cubic cm
    const materialRate = materialRates[formData.material as keyof typeof materialRates] || 15;
    
    // Basic formula: base cost + material cost + complexity factor
    const baseCost = 50; // Base processing cost
    const materialCost = Math.max(weight * (materialRate / 10), volume * materialRate * 0.5);
    const complexityFactor = volume > 100 ? 1.5 : volume > 50 ? 1.3 : 1.1;
    
    const estimatedCost = Math.round((baseCost + materialCost) * complexityFactor);
    const estimatedTime = volume > 100 ? "3-5 days" : volume > 50 ? "2-3 days" : "1-2 days";
    
    // Generate quote code
    const quoteCode = `BP${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;

    return {
      material: formData.material.toUpperCase(),
      length,
      width,
      height,
      weight: weight || Math.round(volume * 1.2), // Estimate weight if not provided
      estimatedCost,
      estimatedTime,
      quoteCode
    };
  };

  const [quoteData, setQuoteData] = useState<any>(null);

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const quote = calculateQuote();
    if (quote) {
      setQuoteData(quote);
      setShowQuotePopup(true);
    }
  };

  const handleSendEmail = () => {
    toast({
      title: "Quote Sent Successfully! 🎉",
      description: `Quote ${quoteData.quoteCode} has been sent to our team. We'll review it and get back to you with a detailed proposal soon!`,
    });
    setShowQuotePopup(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Materials data - Updated with ABS
  const materials = [
    {
      name: "PLA",
      description: "Polylactic Acid - Biodegradable and easy to print",
      colors: ["Black", "White", "Red", "Blue", "Yellow", "Green", "Grey", "Orange"],
      properties: "Medium strength, low flexibility, biodegradable",
      costPerMeter: "₹15/meter",
      bestFor: "Prototypes, decorative items, STEM projects"
    },
    {
      name: "PETG",
      description: "Polyethylene Terephthalate Glycol - Durable and chemical resistant",
      colors: ["Black", "White", "Red", "Blue", "Clear", "Grey"],
      properties: "High strength, medium flexibility, water resistant",
      costPerMeter: "₹18/meter",
      bestFor: "Functional parts, outdoor use, containers"
    },
    {
      name: "TPU",
      description: "Thermoplastic Polyurethane - Flexible and durable",
      colors: ["Black", "White", "Red", "Blue", "Grey"],
      properties: "Medium strength, high flexibility, excellent durability",
      costPerMeter: "₹22/meter",
      bestFor: "Flexible components, grips, protective cases"
    },
    {
      name: "ABS",
      description: "Acrylonitrile Butadiene Styrene - Heat resistant and durable",
      colors: ["Black", "White", "Red", "Blue", "Yellow", "Green"],
      properties: "High strength, heat resistant up to 100°C, impact resistant",
      costPerMeter: "₹20/meter",
      bestFor: "Mechanical parts, automotive components, enclosures"
    }
  ];
  
  // Portfolio projects
  const portfolioItems = [
    {
      title: "Custom Robot Enclosure",
      description: "3D printed enclosure for BeeBotix robotics module",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PETG",
      complexity: "Medium"
    },
    {
      title: "IoT Sensor Housing",
      description: "Weather-resistant housing for outdoor sensors",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PETG",
      complexity: "Low"
    },
    {
      title: "Educational Robotics Kit Components",
      description: "Replacement parts for BeeBotix educational kits",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PLA",
      complexity: "High"
    },
    {
      title: "Flexible Gripper Mechanism",
      description: "Robot gripper with custom flexibility patterns",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "TPU",
      complexity: "High"
    },
    {
      title: "Custom PCB Enclosure",
      description: "Protective case for electronic components",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PLA",
      complexity: "Medium"
    },
    {
      title: "Mechanical Gear System",
      description: "Custom gear set for robotics project",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "ABS",
      complexity: "High"
    }
  ];

  const scrollToQuoteForm = () => {
    const quoteSection = document.getElementById('quote-section');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          {/* Hero Section */}
          <section className="relative rounded-2xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-beebotix-navy to-beebotix-navy/60"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-30"></div>
            <div className="relative z-10 py-16 px-6 md:px-12 text-white">
              <h1 className="heading-lg mb-4">
                Professional <span className="gradient-text">3D Printing</span> for Every Need
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                High-quality, precision 3D printing services for prototypes, projects, 
                and custom tech gifts with fast turnaround times.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="button-primary" onClick={scrollToQuoteForm}>
                  Get Started
                </Button>
                <Link to="/portfolio">
                  <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    View Portfolio
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-8 mt-12">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3">
                    <span className="text-beebotix-yellow font-bold">100+</span>
                  </div>
                  <div>
                    <p className="font-semibold">Projects Completed</p>
                    <p className="text-white/70 text-sm">Happy Clients</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3">
                    <span className="text-beebotix-yellow font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold">Materials Available</p>
                    <p className="text-white/70 text-sm">For Any Project</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3">
                    <span className="text-beebotix-yellow font-bold">24h</span>
                  </div>
                  <div>
                    <p className="font-semibold">Fast Turnaround</p>
                    <p className="text-white/70 text-sm">For Standard Prints</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Materials and Specifications Section */}
          <section className="mb-16">
            <h2 className="heading-md mb-6">Materials & Specifications</h2>
            
            <Tabs defaultValue="materials" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="specifications">Printer Specifications</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="materials">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {materials.map((material) => (
                    <Card key={material.name} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-beebotix-navy p-3 text-white">
                        <h3 className="text-xl font-bold">{material.name}</h3>
                      </div>
                      <CardContent className="p-5">
                        <p className="text-sm mb-4">{material.description}</p>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold mb-1">Available Colors:</h4>
                          <div className="flex flex-wrap gap-2">
                            {material.colors.map(color => (
                              <span key={color} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold mb-1">Properties:</h4>
                          <p className="text-sm">{material.properties}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold mb-1">Cost:</h4>
                          <p className="text-sm">{material.costPerMeter}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Best For:</h4>
                          <p className="text-sm">{material.bestFor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specifications">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-xl mb-4">Printer Capabilities</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Print Bed Size</p>
                            <p className="text-sm text-gray-600">20cm × 20cm × 25cm maximum build volume</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Print Resolution</p>
                            <p className="text-sm text-gray-600">Layer height: 0.1mm - 0.4mm</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Print Speed</p>
                            <p className="text-sm text-gray-600">30-100 mm/s depending on quality requirements</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Nozzle Diameter</p>
                            <p className="text-sm text-gray-600">0.4mm standard (0.2mm and 0.6mm available)</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-xl mb-4">File Requirements</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Accepted File Formats</p>
                            <p className="text-sm text-gray-600">STL, OBJ, STEP, and 3MF</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Maximum File Size</p>
                            <p className="text-sm text-gray-600">50MB per file upload</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-beebotix-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-beebotix-navy font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <p className="font-semibold">Design Guidelines</p>
                            <p className="text-sm text-gray-600">Minimum wall thickness: 0.8mm</p>
                            <p className="text-sm text-gray-600">Minimum feature size: 0.4mm</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="applications">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Prototypes",
                      description: "Rapid prototyping for product development and testing",
                      icon: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      title: "Projects",
                      description: "Custom components for DIY and hobby projects",
                      icon: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      title: "Tech Gifts",
                      description: "Personalized tech-themed gifts and mementos",
                      icon: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      title: "Mechanical Parts",
                      description: "Functional mechanical components for real-world use",
                      icon: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      title: "Educational Models",
                      description: "3D models for STEM education and visualization",
                      icon: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      title: "Replacement Parts",
                      description: "Custom replacement parts for equipment repair",
                      icon: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    }
                  ].map((app, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-40">
                        <img 
                          src={app.icon}
                          alt={app.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{app.title}</h3>
                        <p className="text-sm text-gray-600">{app.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
          
          {/* Process Timeline Section */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Process Timeline</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-beebotix-navy/20 -ml-0.5"></div>
              
              {/* Timeline steps - Fixed the number alignment to be centered on the line */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1 pl-12 md:pl-0 relative">
                    <div className="absolute left-0 md:left-auto md:right-0 top-0 h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center z-10 -ml-4 md:ml-0 md:-mr-4">
                      <Upload className="h-4 w-4 text-beebotix-navy" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Upload Your Design</h3>
                    <p className="text-beebotix-gray-dark mb-4">
                      Submit your STL, OBJ, STEP, or 3MF file through our online form. 
                      Include any specific instructions or requirements.
                    </p>
                    <p className="text-sm text-beebotix-gray">Estimated time: Instant</p>
                  </div>
                  <div className="md:w-1/2 order-2"></div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 order-2 md:order-1"></div>
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2 pl-12 relative">
                    <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center z-10 -ml-4">
                      <FileText className="h-4 w-4 text-beebotix-navy" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Design Review</h3>
                    <p className="text-beebotix-gray-dark mb-4">
                      Our team reviews your design for printability and may suggest modifications 
                      if needed. We'll provide a quote based on material, size, and complexity.
                    </p>
                    <p className="text-sm text-beebotix-gray">Estimated time: 1-2 business days</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-1 pl-12 md:pl-0 relative">
                    <div className="absolute left-0 md:left-auto md:right-0 top-0 h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center z-10 -ml-4 md:ml-0 md:-mr-4">
                      <CheckCircle className="h-4 w-4 text-beebotix-navy" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Printing & Quality Control</h3>
                    <p className="text-beebotix-gray-dark mb-4">
                      Once approved, we'll print your design using the chosen material. 
                      Each print undergoes quality control to ensure accuracy and finish.
                    </p>
                    <p className="text-sm text-beebotix-gray">Estimated time: 1-5 business days</p>
                  </div>
                  <div className="md:w-1/2 order-2"></div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 order-2 md:order-1"></div>
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2 pl-12 relative">
                    <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center z-10 -ml-4">
                      <Truck className="h-4 w-4 text-beebotix-navy" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Shipping & Delivery</h3>
                    <p className="text-beebotix-gray-dark mb-4">
                      Your completed print is carefully packaged and shipped to your address. 
                      We provide tracking information so you can monitor your delivery.
                    </p>
                    <p className="text-sm text-beebotix-gray">Estimated time: 2-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Portfolio Gallery */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="heading-md">Our Portfolio</h2>
              <Button variant="outline">View All Projects</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-between">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Material: {item.material}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Complexity: {item.complexity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Pricing & Quote Form - Updated to use rupees and modify form */}
          <section id="quote-section" className="bg-gray-50 rounded-xl p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="heading-md mb-6">Pricing & Quotation</h2>
                <p className="text-beebotix-gray-dark mb-6">
                  Our pricing is based on material used and print time. For an accurate quote, 
                  submit your requirements using the form.
                </p>
                
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Sample Pricing</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-beebotix-navy text-white">
                        <th className="p-3 text-left">Item</th>
                        <th className="p-3 text-left">Material</th>
                        <th className="p-3 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3">Small Prototype (2m)</td>
                        <td className="p-3">PLA</td>
                        <td className="p-3 flex items-center"><IndianRupee className="h-3 w-3 mr-1" />30</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3">Medium Part (5m)</td>
                        <td className="p-3">PETG</td>
                        <td className="p-3 flex items-center"><IndianRupee className="h-3 w-3 mr-1" />90</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3">Complex Assembly (10m)</td>
                        <td className="p-3">ABS</td>
                        <td className="p-3 flex items-center"><IndianRupee className="h-3 w-3 mr-1" />200</td>
                      </tr>
                      <tr>
                        <td className="p-3">Flexible Component (3m)</td>
                        <td className="p-3">TPU</td>
                        <td className="p-3 flex items-center"><IndianRupee className="h-3 w-3 mr-1" />66</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-lg mb-2">Need a custom quote?</h3>
                  <p className="text-sm text-beebotix-gray-dark mb-4">
                    For large projects, bulk orders, or special requirements, contact us directly.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">Contact Our Team</Button>
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4">Get an Instant Quote</h3>
                <form onSubmit={handleGenerateQuote} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Name *
                      </label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name" 
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Email *
                      </label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="material" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                      Preferred Material *
                    </label>
                    <select
                      id="material"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-3"
                      required
                    >
                      <option value="">Select material</option>
                      <option value="pla">PLA</option>
                      <option value="petg">PETG</option>
                      <option value="tpu">TPU</option>
                      <option value="abs">ABS</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="length" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Length (cm) *
                      </label>
                      <Input 
                        id="length" 
                        name="length"
                        type="number" 
                        step="0.1"
                        value={formData.length}
                        onChange={handleInputChange}
                        placeholder="0.0" 
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="width" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Width (cm) *
                      </label>
                      <Input 
                        id="width" 
                        name="width"
                        type="number" 
                        step="0.1"
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder="0.0" 
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Height (cm) *
                      </label>
                      <Input 
                        id="height" 
                        name="height"
                        type="number" 
                        step="0.1"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="0.0" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                      Approximate Weight (g) - Optional
                    </label>
                    <Input 
                      id="weight" 
                      name="weight"
                      type="number" 
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Will be estimated if not provided" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                      Project Description
                    </label>
                    <Textarea 
                      id="description" 
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your project and requirements..." 
                      className="min-h-[100px]" 
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="text-gray-500">
                      <Upload className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-medium">File Upload Feature Coming Soon</p>
                      <p className="text-sm">For now, please provide dimensions above</p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="button-primary w-full">
                    Generate Instant Quote
                  </Button>
                </form>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How long does 3D printing take?",
                  a: "Printing time varies based on size, complexity, and material. Small objects might take a few hours, while larger or more complex prints can take several days. We'll provide an estimated timeframe with your quote."
                },
                {
                  q: "What file formats do you accept?",
                  a: "We accept STL, OBJ, STEP, and 3MF files. If you have a different format, please contact us to see if we can accommodate your needs."
                },
                {
                  q: "Do you offer design services?",
                  a: "Yes! If you don't have a 3D model but have an idea, our design team can create a custom model for you. This service is billed separately at our standard design rate."
                },
                {
                  q: "What's the maximum size you can print?",
                  a: "Our standard print bed accommodates objects up to 20cm × 20cm × 25cm. For larger objects, we can split the model and assemble the parts after printing."
                },
                {
                  q: "How durable are 3D printed parts?",
                  a: "Durability depends on the material and design. PLA is great for decorative items but less suitable for mechanical stress. PETG and ABS offer better durability for functional parts, while TPU provides flexibility."
                },
                {
                  q: "Do you offer color options?",
                  a: "Yes, we offer multiple color options for each material type. Available colors are listed in the materials section above."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-beebotix-gray-dark">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/70 rounded-xl p-8 text-white text-center">
            <h2 className="heading-md mb-4">Ready to Start Your 3D Printing Project?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              From concept to physical product, we'll help bring your ideas to life with precision and quality.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="button-primary" onClick={scrollToQuoteForm}>
                Get Started Now
              </Button>
              <Link to="/portfolio">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      
      {/* Quote Popup */}
      {quoteData && (
        <QuotePopup
          isOpen={showQuotePopup}
          onClose={() => setShowQuotePopup(false)}
          quoteData={quoteData}
          onSendEmail={handleSendEmail}
          projectDescription={formData.description}
        />
      )}
    </div>
  );
};

export default Printing;
