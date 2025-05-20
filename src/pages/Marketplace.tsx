
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  FileText, 
  ChevronRight, 
  Grid2x2, 
  Image as ImageIcon
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Link } from "react-router-dom";

// Product interface
interface Product {
  id: number;
  title: string;
  images: string[];
  description: string;
  specs: string[];
  price: number;
  category: string;
  tags: string[];
  featured: boolean;
}

const Marketplace = () => {
  // Sample data - in a real app, this would come from an API
  const products: Product[] = [
    {
      id: 1,
      title: "BeeBotix Development Board Pro",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Professional development board with multiple GPIO pins, built-in sensors, and wireless connectivity options.",
      specs: [
        "ARM Cortex-M4 Processor",
        "Bluetooth 5.0 & WiFi",
        "40+ GPIO Pins",
        "USB-C Power and Data",
        "Compatible with Arduino IDE"
      ],
      price: 79.99,
      category: "Dev Boards",
      tags: ["Bestseller", "Customizable"],
      featured: true
    },
    {
      id: 2,
      title: "BeeBotix Embedded Module Mini",
      images: [
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Compact embedded module for IoT and automation projects with low power consumption.",
      specs: [
        "ARM Cortex-M0+ Processor",
        "Bluetooth Low Energy",
        "20 GPIO Pins",
        "3.3V Logic",
        "Ultra-low power sleep mode"
      ],
      price: 39.99,
      category: "Embedded Modules",
      tags: ["New"],
      featured: true
    },
    {
      id: 3,
      title: "BeeBotix Explorer Robotics Kit",
      images: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Complete robotics kit for beginners with step-by-step guides and programming tutorials.",
      specs: [
        "BeeBotix Control Board",
        "2 DC Motors with Wheels",
        "Ultrasonic Sensor",
        "Line Following Sensors",
        "USB Cable and Battery Pack"
      ],
      price: 119.99,
      category: "Robotics Kits",
      tags: ["Educational", "Bestseller"],
      featured: true
    },
    {
      id: 4,
      title: "BeeBotix Original Smart Home Hub",
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Centralized hub for controlling all your BeeBotix smart home devices with voice commands.",
      specs: [
        "Quad-core Processor",
        "2GB RAM",
        "16GB Storage",
        "WiFi 6 & Bluetooth 5.1",
        "Compatible with Alexa & Google Assistant"
      ],
      price: 149.99,
      category: "BeeBotix Originals",
      tags: ["Coming Soon"],
      featured: false
    },
    {
      id: 5,
      title: "BeeBotix IoT Starter Kit",
      images: [
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Everything you need to start building IoT projects, including sensors, actuators, and connectivity modules.",
      specs: [
        "BeeBotix Dev Board",
        "Temperature & Humidity Sensor",
        "Motion Sensor",
        "Relay Module",
        "LED Matrix Display"
      ],
      price: 89.99,
      category: "Dev Boards",
      tags: ["Customizable"],
      featured: false
    },
    {
      id: 6,
      title: "BeeBotix Drone Development Kit",
      images: [
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Complete kit for building and programming your own custom drone with advanced flight controls.",
      specs: [
        "Flight Controller Board",
        "4 Brushless Motors",
        "Electronic Speed Controllers",
        "Frame and Propellers",
        "Programming Guide"
      ],
      price: 199.99,
      category: "Robotics Kits",
      tags: ["Advanced", "New"],
      featured: true
    }
  ];

  const categories = ["All", ...new Set(products.map(product => product.category))];
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  // Filter products based on category and search term
  const filteredProducts = products.filter(product => 
    (activeCategory === "All" || product.category === activeCategory) && 
    (product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.title.localeCompare(b.title);
      case "featured":
      default:
        return b.featured ? 1 : -1;
    }
  });

  // Get featured products
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <h1 className="heading-lg mb-4">
            <span className="gradient-text">BeeBotix Marketplace</span>
          </h1>
          <p className="text-beebotix-gray-dark text-lg mb-12">
            Browse and purchase our exclusive range of BeeBotix products for robotics enthusiasts, makers, and innovators.
          </p>
          
          {/* Featured Products Section */}
          {featuredProducts.length > 0 && (
            <section className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading-md">Featured Products</h2>
                <Link to="#all-products" className="flex items-center text-beebotix-orange hover:text-beebotix-yellow transition-colors">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                        {product.tags.map(tag => {
                          let bgColor = "bg-gray-200 text-gray-800";
                          if (tag === "Bestseller") bgColor = "bg-green-100 text-green-800";
                          if (tag === "New") bgColor = "bg-blue-100 text-blue-800";
                          if (tag === "Coming Soon") bgColor = "bg-purple-100 text-purple-800";
                          if (tag === "Customizable") bgColor = "bg-yellow-100 text-yellow-800";
                          
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
                        <span className="font-bold text-beebotix-orange">${product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-beebotix-gray-dark">{product.category}</span>
                        <Button className="button-primary">
                          <ShoppingCart className="h-4 w-4 mr-2" /> Order Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
          
          {/* Search and Filter Section */}
          <section id="all-products" className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Filter className="h-4 w-4" /> Filter
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="flex flex-col space-y-1">
                          {categories.map((category) => (
                            <Button 
                              key={category}
                              variant="ghost"
                              className={activeCategory === category ? "bg-beebotix-yellow/10 text-beebotix-navy" : ""}
                              onClick={() => setActiveCategory(category)}
                            >
                              {category}
                            </Button>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <select
                    className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <Button variant="outline" onClick={() => setActiveCategory("All")}>
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Products Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.length > 0 ? sortedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <div className="absolute inset-0 flex items-center">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                      {product.tags.map(tag => {
                        let bgColor = "bg-gray-200 text-gray-800";
                        if (tag === "Bestseller") bgColor = "bg-green-100 text-green-800";
                        if (tag === "New") bgColor = "bg-blue-100 text-blue-800";
                        if (tag === "Coming Soon") bgColor = "bg-purple-100 text-purple-800";
                        if (tag === "Customizable") bgColor = "bg-yellow-100 text-yellow-800";
                        if (tag === "Educational") bgColor = "bg-red-100 text-red-800";
                        if (tag === "Advanced") bgColor = "bg-indigo-100 text-indigo-800";
                        
                        return (
                          <span key={tag} className={`${bgColor} text-xs font-medium px-2 py-1 rounded`}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                    <Button 
                      className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-black border border-gray-200 rounded-full p-1 h-auto w-auto"
                      variant="ghost"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
                      <span className="font-bold text-beebotix-orange">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mb-4">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs gap-1">
                            <FileText className="h-3 w-3" /> View Specifications
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div>
                            <h4 className="font-bold mb-2">Specifications</h4>
                            <ul className="text-sm space-y-1">
                              {product.specs.map((spec, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="h-1 w-1 rounded-full bg-beebotix-orange mr-2"></span>
                                  {spec}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3">
                              <Button variant="outline" size="sm" className="text-xs w-full">
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-beebotix-gray-dark">{product.category}</span>
                      <Button className="button-primary">
                        <ShoppingCart className="h-4 w-4 mr-2" /> Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-beebotix-gray-dark">No products match your search criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All");
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
          
          {/* Call-to-Action Section */}
          <section className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/80 rounded-xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="heading-md mb-2">Can't find what you're looking for?</h2>
                <p className="text-white/80">Get in touch for custom orders or product inquiries.</p>
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

export default Marketplace;
