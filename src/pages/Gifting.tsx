
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Star,
  ShoppingCart,
  Filter,
  Search
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Gift interface
interface GiftItem {
  id: number;
  title: string;
  images: string[];
  description: string;
  occasion: string[];
  price: number;
  category: string;
  customizable: boolean;
  featured: boolean;
}

const Gifting = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - in a real app, this would come from an API
  const gifts: GiftItem[] = [
    {
      id: 1,
      title: "BeeBotix Robot Building Kit",
      images: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "A complete kit for building your own programmable robot with step-by-step instructions. Perfect for beginners!",
      occasion: ["Birthday", "Graduation", "STEM Events"],
      price: 79.99,
      category: "Educational Toys",
      customizable: false,
      featured: true
    },
    {
      id: 2,
      title: "Custom 3D Printed Tech Organizer",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Personalized desk organizer with customizable compartments for gadgets, cables, and accessories.",
      occasion: ["Office Gift", "Housewarming", "Corporate"],
      price: 49.99,
      category: "Customizable Options",
      customizable: true,
      featured: true
    },
    {
      id: 3,
      title: "Smart LED Desk Lamp",
      images: [
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Programmable LED desk lamp with multiple lighting modes and wireless charging base.",
      occasion: ["Birthday", "Office Gift", "Graduation"],
      price: 89.99,
      category: "Tech Gifts",
      customizable: false,
      featured: true
    },
    {
      id: 4,
      title: "Custom Circuit Board Art",
      images: [
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Personalized artwork created from real circuit boards, framed and ready to hang. Add a name or special date!",
      occasion: ["Anniversary", "Corporate", "Retirement"],
      price: 129.99,
      category: "Customizable Options",
      customizable: true,
      featured: false
    },
    {
      id: 5,
      title: "BeeBotix Coding Challenge Set",
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Interactive coding kit with 20+ challenges to build programming skills. Includes a BeeBotix microcontroller.",
      occasion: ["Birthday", "STEM Events", "School Gift"],
      price: 69.99,
      category: "Educational Toys",
      customizable: false,
      featured: true
    },
    {
      id: 6,
      title: "3D Printed Smartphone Dock",
      images: [
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Customizable smartphone dock with wireless charging capability. Available in multiple colors and designs.",
      occasion: ["Birthday", "Office Gift", "Housewarming"],
      price: 39.99,
      category: "Customizable Options",
      customizable: true,
      featured: false
    },
    {
      id: 7,
      title: "DIY Robotics Weather Station",
      images: [
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Build your own weather monitoring station with sensors for temperature, humidity, and barometric pressure.",
      occasion: ["STEM Events", "Graduation", "Birthday"],
      price: 99.99,
      category: "Educational Toys",
      customizable: false,
      featured: false
    },
    {
      id: 8,
      title: "Tech-Lover's Gift Box",
      images: [
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Curated box of tech gadgets and accessories including a BeeBotix mini drone, cable organizer, and more.",
      occasion: ["Birthday", "Corporate", "Graduation"],
      price: 149.99,
      category: "Tech Gifts",
      customizable: false,
      featured: true
    }
  ];

  const categories = ["All", ...new Set(gifts.map(gift => gift.category))];
  
  // Filter gifts based on category and search term
  const filteredGifts = gifts.filter(gift => 
    (activeCategory === "All" || gift.category === activeCategory) && 
    (gift.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     gift.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get featured gifts
  const featuredGifts = gifts.filter(gift => gift.featured);

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
                <span className="gradient-text">Tech Gifts</span> by BeeBotix
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                Unique robotics and tech-themed gifts for the innovators and creators in your life. 
                From ready-to-buy to custom 3D-printed creations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="button-primary">
                  <Gift className="mr-2 h-4 w-4" /> Explore Gift Ideas
                </Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Learn About Customization
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Gifts Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="heading-md flex items-center">
                <Star className="h-5 w-5 mr-2 text-beebotix-yellow" /> Featured Tech Gifts
              </h2>
              <Link to="#all-gifts" className="text-beebotix-orange hover:text-beebotix-yellow transition-colors">
                View All Gifts
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredGifts.slice(0, 3).map(gift => (
                <div key={gift.id} className="group relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                  <img 
                    src={gift.images[0]} 
                    alt={gift.title}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="font-bold text-xl text-white mb-2">{gift.title}</h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{gift.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gift.occasion.slice(0, 2).map(occ => (
                        <span key={occ} className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                          {occ}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">${gift.price.toFixed(2)}</span>
                      <Button className="button-primary">
                        {gift.customizable ? "Customize" : "Gift Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Search and Filter Section */}
          <section id="all-gifts" className="mb-8">
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
                <div className="relative">
                  <select
                    className="bg-white border border-gray-300 rounded-md px-8 py-2"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </section>
          
          {/* Gift Categories */}
          <section className="mb-16">
            <Tabs defaultValue="all">
              <TabsList className="mb-8 w-full justify-start overflow-x-auto">
                <TabsTrigger value="all">All Gifts</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="tech">Tech Gifts</TabsTrigger>
                <TabsTrigger value="educational">Educational</TabsTrigger>
                <TabsTrigger value="custom">Customizable</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderGiftGrid(filteredGifts)}
              </TabsContent>
              
              <TabsContent value="featured" className="mt-0">
                {renderGiftGrid(gifts.filter(gift => gift.featured))}
              </TabsContent>
              
              <TabsContent value="tech" className="mt-0">
                {renderGiftGrid(gifts.filter(gift => gift.category === "Tech Gifts"))}
              </TabsContent>
              
              <TabsContent value="educational" className="mt-0">
                {renderGiftGrid(gifts.filter(gift => gift.category === "Educational Toys"))}
              </TabsContent>
              
              <TabsContent value="custom" className="mt-0">
                {renderGiftGrid(gifts.filter(gift => gift.customizable))}
              </TabsContent>
            </Tabs>
          </section>
          
          {/* Personalization Options */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Personalization Options</h2>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Make It Personal</h3>
                  <p className="text-beebotix-gray-dark mb-6">
                    Many of our tech gifts can be personalized to create a truly unique present.
                    Add names, special dates, or custom messages to make your gift one-of-a-kind.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Choose a Customizable Gift</h4>
                        <p className="text-sm text-beebotix-gray-dark">Look for items labeled "Customizable" in our store.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Select Your Options</h4>
                        <p className="text-sm text-beebotix-gray-dark">Choose colors, sizes, and design elements.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Add Personal Details</h4>
                        <p className="text-sm text-beebotix-gray-dark">Provide names, dates, or custom messages to be included.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-beebotix-yellow flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Review & Order</h4>
                        <p className="text-sm text-beebotix-gray-dark">We'll create your one-of-a-kind tech gift with care.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="button-primary mt-8">
                    Explore Customizable Gifts
                  </Button>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Available Personalization</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-beebotix-yellow"></div>
                      <span>Custom text engraving (names, dates, messages)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-beebotix-yellow"></div>
                      <span>Custom 3D printed elements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-beebotix-yellow"></div>
                      <span>Color customization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-beebotix-yellow"></div>
                      <span>Size and dimension adjustments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-beebotix-yellow"></div>
                      <span>Custom circuit board designs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-beebotix-yellow"></div>
                      <span>Personalized packaging</span>
                    </li>
                  </ul>
                  
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h4 className="font-bold mb-2">Gift Wrapping Services</h4>
                    <p className="text-sm text-beebotix-gray-dark mb-4">
                      Add premium gift wrapping with custom message card for just $5.99.
                    </p>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-beebotix-yellow rounded"></div>
                      <div className="h-8 w-8 bg-beebotix-navy rounded"></div>
                      <div className="h-8 w-8 bg-beebotix-orange rounded"></div>
                      <div className="h-8 w-8 bg-beebotix-teal rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Gift Ideas by Occasion */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Gift Ideas by Occasion</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Birthday", icon: "🎂", color: "bg-blue-50" },
                { name: "Graduation", icon: "🎓", color: "bg-green-50" },
                { name: "Corporate", icon: "💼", color: "bg-gray-50" },
                { name: "STEM Events", icon: "🔬", color: "bg-purple-50" },
                { name: "Office Gift", icon: "🖥️", color: "bg-yellow-50" },
                { name: "Anniversary", icon: "💝", color: "bg-pink-50" },
                { name: "Housewarming", icon: "🏠", color: "bg-orange-50" },
                { name: "School Gift", icon: "📚", color: "bg-red-50" }
              ].map((occasion) => (
                <div 
                  key={occasion.name}
                  className={`${occasion.color} rounded-xl p-6 text-center cursor-pointer hover:shadow-md transition-shadow`}
                >
                  <div className="text-3xl mb-2">{occasion.icon}</div>
                  <h3 className="font-medium">{occasion.name}</h3>
                </div>
              ))}
            </div>
          </section>
          
          {/* Gift Bundle Ideas */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Gift Bundles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Tech Starter Bundle",
                  description: "Perfect for beginners: includes a BeeBotix mini robot, coding guide, and accessories.",
                  price: 129.99,
                  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  savings: "Save 20%"
                },
                {
                  title: "Robotics Enthusiast Pack",
                  description: "Advanced kit with programmable robot, sensors pack, and expansion modules.",
                  price: 199.99,
                  image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  savings: "Save 15%"
                },
                {
                  title: "Tech Desk Accessories",
                  description: "Complete your workspace with custom organizer, wireless charger, and LED lamp.",
                  price: 149.99,
                  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  savings: "Save 25%"
                }
              ].map((bundle, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative">
                    <img 
                      src={bundle.image} 
                      alt={bundle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {bundle.savings}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-xl mb-2">{bundle.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{bundle.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${bundle.price.toFixed(2)}</span>
                      <Button className="button-primary">
                        <ShoppingCart className="h-4 w-4 mr-2" /> Buy Bundle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Testimonials */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Happy Gift Recipients</h2>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <Carousel>
                <CarouselContent>
                  {[
                    {
                      quote: "The customized robot kit was the perfect graduation gift for my nephew. He was amazed by how it was personalized with his name!",
                      author: "Sarah T.",
                      gift: "Custom Robot Building Kit"
                    },
                    {
                      quote: "I ordered the Tech-Lover's Gift Box for my husband's birthday. The quality of each item was excellent, and the presentation was top-notch.",
                      author: "Michael R.",
                      gift: "Tech-Lover's Gift Box"
                    },
                    {
                      quote: "Our company ordered custom circuit board art pieces as client gifts. Everyone loved the unique tech-inspired design and premium quality.",
                      author: "Jennifer L.",
                      gift: "Custom Circuit Board Art"
                    },
                    {
                      quote: "The BeeBotix Coding Challenge Set was a hit with my 12-year-old. Educational and fun - the perfect combination!",
                      author: "David M.",
                      gift: "BeeBotix Coding Challenge Set"
                    }
                  ].map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white p-6 rounded-xl h-full">
                        <div className="flex items-center gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className="h-4 w-4 fill-beebotix-yellow text-beebotix-yellow" />
                          ))}
                        </div>
                        <p className="italic mb-4 text-beebotix-gray-dark">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-bold">{testimonial.author}</p>
                          <p className="text-sm text-beebotix-gray">Purchased: {testimonial.gift}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-2">
                  <CarouselPrevious className="static transform-none" />
                  <CarouselNext className="static transform-none" />
                </div>
              </Carousel>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How does gift customization work?",
                  a: "Select a customizable product, then use our online tool to add personalization like names, dates, or messages. For complex customizations, you can contact our design team directly."
                },
                {
                  q: "What is your return policy for gifts?",
                  a: "We offer a 30-day return policy for non-customized items in original condition. Customized items can only be returned if there's a manufacturing defect or error on our part."
                },
                {
                  q: "Do you offer gift wrapping?",
                  a: "Yes, we offer premium gift wrapping services for $5.99 per item, which includes high-quality paper, ribbon, and a personalized message card."
                },
                {
                  q: "How long does shipping take?",
                  a: "Standard shipping takes 3-5 business days. For customized items, add 2-3 business days for production. Express shipping options are available during checkout."
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
  
  // Helper function to render gift grid
  function renderGiftGrid(gifts: GiftItem[]) {
    if (gifts.length === 0) {
      return (
        <div className="text-center py-16">
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
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gifts.map((gift) => (
          <Card key={gift.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-52 relative">
              <Carousel>
                <CarouselContent>
                  {gift.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="h-52 w-full">
                        <img 
                          src={img} 
                          alt={`${gift.title} - Image ${i+1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {gift.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </>
                )}
              </Carousel>
              
              {gift.customizable && (
                <Badge className="absolute top-2 right-2 bg-beebotix-yellow text-beebotix-navy">
                  Customizable
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg line-clamp-1 mb-1">{gift.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {gift.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {gift.occasion.slice(0, 2).map(occ => (
                  <span key={occ} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                    {occ}
                  </span>
                ))}
                {gift.occasion.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                    +{gift.occasion.length - 2} more
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-beebotix-orange">${gift.price.toFixed(2)}</span>
                <Button className="button-primary">
                  {gift.customizable ? "Customize" : "Gift Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};

export default Gifting;
