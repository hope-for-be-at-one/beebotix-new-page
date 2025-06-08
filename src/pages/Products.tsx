
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ExternalLink, Mail, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import purchasingData from "@/metadata/purchasing-options.json";

const Products = () => {
  const { purchasingChannels, businessOptions } = purchasingData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl overflow-x-hidden">
          <h1 className="heading-lg mb-4">
            <span className="gradient-text">BeeBotix Products</span>
          </h1>
          <p className="text-beebotix-gray-dark text-lg mb-12">
            Browse our range of innovative hardware and software solutions designed for robotics enthusiasts, makers, and innovators.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Hardware Section */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Hardware Products" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold">Hardware</h2>
                    <p className="mb-4">Development boards, robotics kits, and physical computing solutions</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-beebotix-gray-dark mb-4">
                  Explore our range of innovative hardware products designed for makers, robotics enthusiasts and educators.
                </p>
                <Link to="/products/hardware">
                  <Button className="button-primary flex items-center">
                    Explore Hardware <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Software Section */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Software Products" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold">Software</h2>
                    <p className="mb-4">Applications, firmware, and programming tools</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-beebotix-gray-dark mb-4">
                  Discover our software solutions including firmware, applications and programming tools to enhance your projects.
                </p>
                <Link to="/products/software">
                  <Button className="button-primary flex items-center">
                    Explore Software <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Other Services */}
          <h2 className="heading-md mb-6">Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* 3D Printing */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="3D Printing Services" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold">3D Printing Services</h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-beebotix-gray-dark mb-4">
                  Custom 3D printing services for prototypes, parts, and projects.
                </p>
                <Link to="/3d-printing">
                  <Button className="button-primary flex items-center">
                    Explore 3D Printing <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gifting */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Gifting Solutions" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold">Gifting Solutions</h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-beebotix-gray-dark mb-4">
                  Unique tech and non-tech gifts for any occasion.
                </p>
                <Link to="/gifting">
                  <Button className="button-primary flex items-center">
                    Explore Gifting <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Where to Buy Section - Moved here */}
          <div className="mb-16">
            <h2 className="heading-md mb-6">Where to Buy Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {purchasingChannels.map((channel) => (
                <Card key={channel.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <ShoppingCart className="h-6 w-6 text-beebotix-orange mr-2" />
                      <h3 className="text-lg font-bold">{channel.name}</h3>
                    </div>
                    <p className="text-sm text-beebotix-gray-dark mb-4">{channel.description}</p>
                    <ul className="text-xs space-y-1 mb-4">
                      {channel.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-1 w-1 rounded-full bg-beebotix-orange mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    {channel.type === "internal" ? (
                      <Link to={channel.link}>
                        <Button className="button-primary w-full">
                          Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <a href={channel.link} target="_blank" rel="noopener noreferrer">
                        <Button className="button-primary w-full">
                          Visit Store <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business & Mass Orders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-beebotix-navy mr-2" />
                    <h3 className="text-lg font-bold">{businessOptions.b2b.title}</h3>
                  </div>
                  <p className="text-sm text-beebotix-gray-dark mb-4">{businessOptions.b2b.description}</p>
                  <ul className="text-xs space-y-1 mb-4">
                    {businessOptions.b2b.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-1 w-1 rounded-full bg-beebotix-navy mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <a href={businessOptions.b2b.contact}>
                    <Button className="button-outline w-full">
                      Mail Us <Mail className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-beebotix-navy mr-2" />
                    <h3 className="text-lg font-bold">{businessOptions.massOrder.title}</h3>
                  </div>
                  <p className="text-sm text-beebotix-gray-dark mb-4">{businessOptions.massOrder.description}</p>
                  <ul className="text-xs space-y-1 mb-4">
                    {businessOptions.massOrder.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-1 w-1 rounded-full bg-beebotix-navy mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <a href={businessOptions.massOrder.contact}>
                    <Button className="button-outline w-full">
                      Mail Us <Mail className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

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

export default Products;
