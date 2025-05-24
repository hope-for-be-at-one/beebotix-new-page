
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, ShoppingCart, Search, Filter, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import giftingData from "@/metadata/gifting.json";

const Gifting = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  // Get all products from all categories
  const allProducts = giftingData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name
    }))
  );
  
  // Get all unique categories
  const categories = ["All", ...giftingData.categories.map(cat => cat.name)];
  
  // Filter products based on search term and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle adding product to cart
  const handleAddToCart = (product: any) => {
    addToCart({
      id: parseInt(product.id),
      title: product.name,
      price: product.price,
      image: product.image,
      category: "Gifting"
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          {/* Hero Section */}
          <section className="relative rounded-2xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-beebotix-navy/90 to-beebotix-navy/70"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 py-16 px-6 md:px-12 text-white">
              <h1 className="heading-lg mb-4">
                <span className="gradient-text">{giftingData.title}</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                {giftingData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="button-primary">
                  <Gift className="mr-2 h-4 w-4" /> Explore Gift Ideas
                </Button>
              </div>
            </div>
          </section>
          
          {/* Search and Filter Section */}
          <section className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for tech gifts..."
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
          </section>
          
          {/* Products Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-52 relative">
                    <img 
                      src={product.image} 
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
                    <h3 className="font-bold text-lg line-clamp-1 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Features:</h4>
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
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Specifications:</h4>
                      <div className="text-xs space-y-1">
                        {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-beebotix-orange">₹{product.price}</span>
                      <Button 
                        className="button-primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-beebotix-gray-dark">No gifts match your search criteria.</p>
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
          
          {/* Call to Action */}
          <section className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/80 rounded-xl p-8 text-white text-center">
            <h2 className="heading-md mb-4">Find the Perfect Tech Gift Today</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Unique, innovative, and customizable gifts for the tech enthusiasts in your life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="button-primary">
                <Gift className="mr-2 h-4 w-4" /> Browse All Gifts
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Contact for Custom Projects
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gifting;
