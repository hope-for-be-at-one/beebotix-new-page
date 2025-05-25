
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import softwareData from "@/metadata/software.json";

const Software = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Get all products from all categories
  const allProducts = softwareData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name
    }))
  );
  
  // Get all unique categories
  const categories = ["All", ...softwareData.categories.map(cat => cat.name)];
  
  // Filter products based on search term and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (product: any) => {
    if (product.downloadLink) {
      window.open(product.downloadLink, '_blank');
      toast.success(`Opening GitHub repository for ${product.name}...`);
    } else {
      toast.success(`Downloading ${product.name}...`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="heading-lg mb-2">
                <span className="gradient-text">{softwareData.title}</span>
              </h1>
              <p className="text-beebotix-gray-dark">
                {softwareData.description}
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
                    placeholder="Search software products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="bg-white border border-gray-300 rounded-md px-4 py-2"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={product.image || "/placeholder.svg"} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-beebotix-yellow text-beebotix-navy">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
                    <span className="font-bold text-beebotix-orange">₹{product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Key Features:</h4>
                    <ul className="text-xs space-y-1">
                      {product.features?.slice(0, 2).map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="h-1 w-1 rounded-full bg-beebotix-orange mr-2"></span>
                          {feature}
                        </li>
                      ))}
                      {product.features && product.features.length > 2 && (
                        <li className="text-xs text-beebotix-orange">+ {product.features.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Specifications:</h4>
                    <div className="text-xs space-y-1">
                      {product.specifications && Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{key}:</span>
                          <span>{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="button-primary flex-1"
                      onClick={() => handleDownload(product)}
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
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
                <p className="text-white/80">Our team can develop custom software tailored to your specific requirements.</p>
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
