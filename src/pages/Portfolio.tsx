
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: "Custom Robot Enclosure",
      description: "Weather-resistant enclosure for BeeBotix robotics module with integrated cooling system",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PETG",
      complexity: "Medium",
      category: "Robotics",
      size: "large"
    },
    {
      id: 2,
      title: "IoT Sensor Housing",
      description: "Compact housing for environmental sensors",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PETG",
      complexity: "Low",
      category: "IoT",
      size: "small"
    },
    {
      id: 3,
      title: "Educational Robotics Kit",
      description: "Complete set of replacement parts for BeeBotix educational kits",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PLA",
      complexity: "High",
      category: "Education",
      size: "medium"
    },
    {
      id: 4,
      title: "Flexible Gripper Mechanism",
      description: "Advanced robot gripper with custom flexibility patterns",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "TPU",
      complexity: "High",
      category: "Robotics",
      size: "medium"
    },
    {
      id: 5,
      title: "Custom PCB Enclosure",
      description: "Protective case for electronic components with heat dissipation",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PLA",
      complexity: "Medium",
      category: "Electronics",
      size: "small"
    },
    {
      id: 6,
      title: "Mechanical Gear System",
      description: "Precision gear set for high-torque robotics applications",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "ABS",
      complexity: "High",
      category: "Mechanical",
      size: "large"
    },
    {
      id: 7,
      title: "Drone Frame Components",
      description: "Lightweight frame parts for custom drone builds",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PLA",
      complexity: "Medium",
      category: "Aerospace",
      size: "medium"
    },
    {
      id: 8,
      title: "Prototype Phone Stand",
      description: "Ergonomic phone stand with cable management",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PLA",
      complexity: "Low",
      category: "Accessories",
      size: "small"
    },
    {
      id: 9,
      title: "Custom Tool Holder",
      description: "Modular tool organization system",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PETG",
      complexity: "Low",
      category: "Organization",
      size: "medium"
    },
    {
      id: 10,
      title: "Smart Home Hub Case",
      description: "Sleek enclosure for home automation controller",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "ABS",
      complexity: "Medium",
      category: "Smart Home",
      size: "small"
    },
    {
      id: 11,
      title: "Automotive Dashboard Mount",
      description: "Custom mount for automotive applications",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "ABS",
      complexity: "High",
      category: "Automotive",
      size: "large"
    },
    {
      id: 12,
      title: "Medical Device Prototype",
      description: "Biocompatible prototype for medical applications",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      material: "PETG",
      complexity: "High",
      category: "Medical",
      size: "medium"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Robotics", "IoT", "Education", "Electronics", "Mechanical", "Aerospace", "Accessories", "Organization", "Smart Home", "Automotive", "Medical"];

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Function to get grid classes based on size for random layout
  const getGridClasses = (size: string, index: number) => {
    const patterns = [
      { large: "md:col-span-2 md:row-span-2", medium: "md:col-span-1 md:row-span-1", small: "md:col-span-1 md:row-span-1" },
      { large: "md:col-span-2 md:row-span-1", medium: "md:col-span-1 md:row-span-2", small: "md:col-span-1 md:row-span-1" },
      { large: "md:col-span-1 md:row-span-2", medium: "md:col-span-2 md:row-span-1", small: "md:col-span-1 md:row-span-1" }
    ];
    
    const pattern = patterns[index % patterns.length];
    return pattern[size as keyof typeof pattern];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          {/* Header */}
          <div className="mb-8">
            <Link to="/3d-printing" className="inline-flex items-center text-beebotix-navy hover:text-beebotix-yellow transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to 3D Printing
            </Link>
            <h1 className="heading-lg mb-4">Our Portfolio</h1>
            <p className="text-beebotix-gray-dark text-lg max-w-2xl">
              Explore our collection of successfully completed 3D printing projects across various industries and applications.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "button-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`overflow-hidden hover:shadow-lg transition-all duration-300 group ${getGridClasses(item.size, index)}`}
              >
                <div className="relative h-48 md:h-full min-h-[200px] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-beebotix-navy">{item.title}</h3>
                  <p className="text-sm text-beebotix-gray-dark mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.material}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.complexity === 'High' ? 'border-red-300 text-red-600' :
                          item.complexity === 'Medium' ? 'border-yellow-300 text-yellow-600' :
                          'border-green-300 text-green-600'
                        }`}
                      >
                        {item.complexity}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-beebotix-navy to-beebotix-navy/70 rounded-xl p-8 text-white">
            <h2 className="heading-md mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join our satisfied clients and bring your ideas to life with professional 3D printing services.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/3d-printing#quote-section">
                <Button className="button-primary">
                  Get Your Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
