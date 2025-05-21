
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Product interface
interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  specs: string[];
  price: number;
  tags: string[];
}

const Hardware = () => {
  // Sample hardware products
  const products: Product[] = [
    {
      id: 1,
      title: "BeeBotix Development Board Pro",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Professional development board with multiple GPIO pins, built-in sensors, and wireless connectivity options.",
      specs: [
        "ARM Cortex-M4 Processor",
        "Bluetooth 5.0 & WiFi",
        "40+ GPIO Pins",
        "USB-C Power and Data"
      ],
      price: 3999,
      tags: ["Bestseller", "Customizable"]
    },
    {
      id: 2,
      title: "BeeBotix Embedded Module Mini",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Compact embedded module for IoT and automation projects with low power consumption.",
      specs: [
        "ARM Cortex-M0+ Processor",
        "Bluetooth Low Energy",
        "20 GPIO Pins",
        "Ultra-low power sleep mode"
      ],
      price: 1999,
      tags: ["New"]
    },
    {
      id: 3,
      title: "BeeBotix Explorer Robotics Kit",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Complete robotics kit for beginners with step-by-step guides and programming tutorials.",
      specs: [
        "BeeBotix Control Board",
        "2 DC Motors with Wheels",
        "Ultrasonic Sensor",
        "Line Following Sensors"
      ],
      price: 5999,
      tags: ["Educational", "Bestseller"]
    },
    {
      id: 4,
      title: "BeeBotix Smart Home Hub",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Centralized hub for controlling all your BeeBotix smart home devices with voice commands.",
      specs: [
        "Quad-core Processor",
        "2GB RAM",
        "16GB Storage",
        "WiFi 6 & Bluetooth 5.1"
      ],
      price: 7499,
      tags: ["New Release"]
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
                <span className="gradient-text">Hardware Products</span>
              </h1>
              <p className="text-beebotix-gray-dark">
                Development boards, robotics kits, and components for your projects
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
                    placeholder="Search hardware products..."
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
                      if (tag === "Bestseller") bgColor = "bg-green-100 text-green-800";
                      if (tag === "New") bgColor = "bg-blue-100 text-blue-800";
                      if (tag === "New Release") bgColor = "bg-purple-100 text-purple-800";
                      if (tag === "Customizable") bgColor = "bg-yellow-100 text-yellow-800";
                      if (tag === "Educational") bgColor = "bg-red-100 text-red-800";
                      
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
                    <span className="font-bold text-beebotix-orange currency-inr">{product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Specifications:</h4>
                    <ul className="text-xs space-y-1">
                      {product.specs.slice(0, 2).map((spec, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-1 w-1 rounded-full bg-beebotix-orange mr-2"></span>
                          {spec}
                        </li>
                      ))}
                      {product.specs.length > 2 && (
                        <li className="text-xs text-beebotix-orange">+ {product.specs.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                  <div className="flex justify-end">
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
                <h2 className="heading-md mb-2">Need custom hardware solutions?</h2>
                <p className="text-white/80">Our team can design and build hardware tailored to your specific needs.</p>
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

export default Hardware;
