
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Filter, ExternalLink, Paperclip, Download } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import hardwareData from "@/metadata/hardware.json";

const Hardware = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  
  // Get all products from all categories
  const allProducts = hardwareData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name
    }))
  );
  
  // Get all unique categories
  const categories = ["All", ...hardwareData.categories.map(cat => cat.name)];
  
  // Filter products based on search term and category
  const filteredProducts = allProducts.filter(product => {
    const title = product.title || product.name || "";
    const description = product.description || "";
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title || product.name,
      price: product.cost || product.price,
      image: product.image,
      category: product.category
    });
    toast.success(`${product.title || product.name} added to cart!`);
  };

  const handleDownloadAttachment = (attachment: any) => {
    if (attachment.url) {
      window.open(attachment.url, '_blank');
      toast.success(`Opening ${attachment.name}...`);
    } else {
      toast.success(`Downloading ${attachment.name}...`);
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
                <span className="gradient-text">{hardwareData.title}</span>
              </h1>
              <p className="text-beebotix-gray-dark">
                {hardwareData.description}
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
                    alt={product.title || product.name}
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
                    <h3 className="font-bold text-lg line-clamp-1">{product.title || product.name}</h3>
                    <span className="font-bold text-beebotix-orange">₹{product.cost || product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Attachments Section */}
                  {product.attachments && product.attachments.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Paperclip className="h-4 w-4 text-beebotix-navy" />
                        <span className="text-sm font-medium">Attachments</span>
                      </div>
                      <div className="space-y-1">
                        {product.attachments.map((attachment: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleDownloadAttachment(attachment)}
                            className="flex items-center justify-between w-full text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded transition-colors"
                          >
                            <div className="flex items-center gap-1 truncate">
                              <span className="truncate">{attachment.name}</span>
                              <span className="text-gray-500">({attachment.size})</span>
                            </div>
                            <Download className="h-3 w-3 text-beebotix-navy flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
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
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {(product.tags || product.features)?.slice(0, 3).map((tag: string, index: number) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {(product.tags || product.features) && (product.tags || product.features).length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{(product.tags || product.features).length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="button-primary flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
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
                <h2 className="heading-md mb-2">Need custom hardware solutions?</h2>
                <p className="text-white/80">Our team can develop custom hardware tailored to your specific requirements.</p>
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
