
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import portfolioData from "@/metadata/portfolio-data.json";

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { portfolioItems, categories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="3D Printing Portfolio - BeeBotix | Custom Robotics Solutions"
        description="Explore BeeBotix's comprehensive portfolio of 3D printing projects including robotics enclosures, IoT housings, educational kits, and smart home solutions."
        keywords="3D printing portfolio, robotics enclosures, IoT housings, educational robotics, smart home cases, custom 3D printing, BeeBotix projects"
        url="https://beebotix.com/portfolio"
      />
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

          {/* Portfolio Grid - Fixed uniform grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full"
              >
                <div className="relative h-48 overflow-hidden">
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
                <CardContent className="p-4 flex flex-col h-full">
                  <h3 className="font-bold text-lg mb-2 text-beebotix-navy">{item.title}</h3>
                  <p className="text-sm text-beebotix-gray-dark mb-3 flex-grow">{item.description}</p>
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
