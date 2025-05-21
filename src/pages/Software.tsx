
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter, FileText, Tag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Software product interface
interface SoftwareProduct {
  id: number;
  title: string;
  image: string;
  description: string;
  features: string[];
  price: number | null; // null means free
  tags: string[];
  compatibility: string[];
  downloadLink: string;
}

const Software = () => {
  // Sample software products
  const products: SoftwareProduct[] = [
    {
      id: 1,
      title: "BeeBotix Studio IDE",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive integrated development environment for programming BeeBotix devices with visual and text-based programming.",
      features: [
        "Visual block-based programming",
        "Code editor with syntax highlighting",
        "Integrated debugger",
        "Simulation environment",
      ],
      price: null, // Free
      tags: ["Free", "Development"],
      compatibility: ["Windows", "macOS", "Linux"],
      downloadLink: "#"
    },
    {
      id: 2,
      title: "BeeBotix IoT Dashboard",
      image: "https://images.unsplash.com/photo-1453906971074-ce568cccbc63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Monitor and control your BeeBotix IoT devices from anywhere with our cloud-based dashboard.",
      features: [
        "Real-time data visualization",
        "Remote device control",
        "Customizable dashboards",
        "Data export and analysis"
      ],
      price: 999, // Monthly subscription
      tags: ["Subscription", "IoT"],
      compatibility: ["Web", "iOS", "Android"],
      downloadLink: "#"
    },
    {
      id: 3,
      title: "BeeBotix Robotics Firmware",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Advanced firmware for BeeBotix robotics kits with pre-built functions for movement, sensing, and more.",
      features: [
        "Pre-built movement functions",
        "Sensor libraries",
        "Low-level hardware control",
        "Power optimization"
      ],
      price: null, // Free
      tags: ["Free", "Firmware"],
      compatibility: ["BeeBotix Hardware"],
      downloadLink: "#"
    },
    {
      id: 4,
      title: "BeeBotix CAD Plugin Suite",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Design plugins for popular CAD software to create 3D printable parts compatible with BeeBotix hardware.",
      features: [
        "Libraries of BeeBotix-compatible components",
        "Auto-check for 3D printability",
        "Parametric design templates",
        "Direct export to BeeBotix 3D printing service"
      ],
      price: 2499,
      tags: ["Design", "Premium"],
      compatibility: ["Fusion 360", "SolidWorks", "FreeCAD"],
      downloadLink: "#"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="heading-lg mb-2">
                <span className="gradient-text">Software Solutions</span>
              </h1>
              <p className="text-beebotix-gray-dark">
                Applications, firmware, and programming tools for your BeeBotix devices
              </p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                All Products
              </Button>
            </Link>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search software..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                    {product.tags.map(tag => {
                      let bgColor = "bg-gray-200 text-gray-800";
                      if (tag === "Free") bgColor = "bg-green-100 text-green-800";
                      if (tag === "Premium") bgColor = "bg-purple-100 text-purple-800";
                      if (tag === "Subscription") bgColor = "bg-blue-100 text-blue-800";
                      
                      return (
                        <span key={tag} className={`${bgColor} text-xs font-medium px-2 py-1 rounded`}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
                    {product.price !== null ? (
                      <span className="font-bold text-beebotix-orange currency-inr">{product.price}</span>
                    ) : (
                      <span className="font-bold text-green-600">Free</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Key Features:</h4>
                    <ul className="text-xs space-y-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-1 w-1 rounded-full bg-beebotix-orange mr-2"></span>
                          {feature}
                        </li>
                      ))}
                      {product.features.length > 2 && (
                        <li className="text-xs text-beebotix-orange">+ {product.features.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {product.compatibility.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full" variant={product.price === null ? "default" : "outline"}>
                      <Download className="h-4 w-4 mr-2" /> 
                      {product.price === null ? "Download Free" : "Purchase & Download"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-beebotix-gray-dark">No software products match your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {/* Call-to-Action Section */}
          <section className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/80 rounded-xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="heading-md mb-2">Need custom software solutions?</h2>
                <p className="text-white/80">Our development team can create bespoke software tailored to your specific requirements.</p>
              </div>
              <Link to="/contact">
                <Button className="button-primary mt-4 md:mt-0">
                  Contact Us
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Software;
