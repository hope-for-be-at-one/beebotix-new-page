import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Search, Filter, Heart, Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import giftingData from "@/metadata/gifting.json";

const Gifting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [customizationNotes, setCustomizationNotes] = useState<{[key: string]: string}>({});
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});
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
    const title = product.title || product.name || "";
    const description = product.description || "";
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    const customNote = customizationNotes[product.id] || "";
    addToCart({
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      image: product.images?.[0],
      category: product.category,
      customNote: customNote
    });
    toast.success(`${product.title || product.name} added to cart!`);
    
    // Clear customization note after adding to cart
    if (customNote) {
      setCustomizationNotes(prev => ({ ...prev, [product.id]: "" }));
    }
  };

  const handleCustomizationChange = (productId: string, note: string) => {
    setCustomizationNotes(prev => ({ ...prev, [productId]: note }));
  };

  const nextImage = (productId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="heading-lg mb-2">
                <span className="gradient-text">{giftingData.title}</span>
              </h1>
              <p className="text-beebotix-gray-dark">
                {giftingData.description}
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
                    placeholder="Search gift products..."
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
            {filteredProducts.length > 0 ? filteredProducts.map((product) => {
              const images = product.images || [product.image || "/placeholder.svg"];
              const currentIndex = currentImageIndex[product.id] || 0;
              
              return (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={images[currentIndex]} 
                      alt={product.title || product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(product.id, images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => nextImage(product.id, images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-beebotix-yellow text-beebotix-navy">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white/80">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg line-clamp-1">{product.title || product.name}</h3>
                      <span className="font-bold text-beebotix-orange">₹{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Customization Section */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Palette className="h-4 w-4 text-beebotix-navy" />
                        <span className="text-sm font-medium">Customization</span>
                      </div>
                      <Textarea
                        placeholder="Add custom message, engraving, or special requirements..."
                        value={customizationNotes[product.id] || ""}
                        onChange={(e) => handleCustomizationChange(product.id, e.target.value)}
                        className="text-xs"
                        rows={2}
                      />
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
                    <Button 
                      className="button-primary w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              );
            }) : (
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
                <h2 className="heading-md mb-2">Need help choosing the perfect gift?</h2>
                <p className="text-white/80">Our team can help you find the ideal tech gift for any occasion.</p>
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

export default Gifting;
