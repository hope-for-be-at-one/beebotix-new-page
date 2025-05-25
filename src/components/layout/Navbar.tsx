import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    {
      name: "Marketplace",
      path: "/products",
      dropdown: true,
      items: [
        {
          title: "Products",
          description: "Browse our products",
          items: [
            { name: "Hardware", path: "/products/hardware" },
            { name: "Software", path: "/products/software" },
          ]
        },
        {
          title: "Other Services",
          description: "Check out our services",
          items: [
            { name: "3D Printing Service", path: "/3d-printing" },
            { name: "Gifting", path: "/gifting" },
          ]
        }
      ]
    },
    { name: "ClassRoom", path: "/classroom" },
    { name: "Our Stories", path: "/our-stories" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-poppins text-2xl font-bold text-beebotix-navy">
            Bee<span className="text-beebotix-yellow">Botix</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => 
            link.dropdown ? (
              <NavigationMenu key={link.name}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className="bg-transparent hover:bg-transparent hover:text-beebotix-navy focus:bg-transparent"
                    >
                      <span className="px-2 py-2 text-base text-beebotix-gray-dark hover:text-beebotix-navy font-medium transition-colors duration-300">
                        {link.name}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <div className="grid w-[300px] gap-3 p-4 md:grid-cols-2">
                        {link.items?.map((section, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-medium text-beebotix-navy">{section.title}</h4>
                            <p className="text-sm text-beebotix-gray-dark">{section.description}</p>
                            <div className="space-y-1">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-beebotix-yellow/10 hover:text-beebotix-navy"
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 text-base text-beebotix-gray-dark hover:text-beebotix-navy font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            )
          )}
          
          {/* Cart Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-beebotix-gray-dark" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-beebotix-yellow text-beebotix-navy h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white">
              <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {cartItems.length === 0 ? (
                <div className="py-4 px-2 text-center text-beebotix-gray-dark">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="max-h-80 overflow-auto">
                    {cartItems.map((item) => (
                      <DropdownMenuItem key={item.id} className="flex justify-between px-4 py-2 focus:bg-gray-50">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-sm text-beebotix-gray-dark currency-inr">{item.price}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-4">
                    <Link to="/cart">
                      <Button className="w-full mb-2 bg-beebotix-navy hover:bg-beebotix-navy/80">
                        View Cart
                      </Button>
                    </Link>
                    <Link to="/place-order">
                      <Button className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy">
                        Place Order
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/contact">
            <Button className="bg-beebotix-yellow hover:bg-yellow-400 text-beebotix-navy ml-2">
              Contact Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          {/* Mobile Cart Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative mr-2">
                <ShoppingCart className="h-5 w-5 text-beebotix-gray-dark" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-beebotix-yellow text-beebotix-navy h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-white">
              {/* Same content as desktop dropdown */}
              <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {cartItems.length === 0 ? (
                <div className="py-4 px-2 text-center text-beebotix-gray-dark">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="max-h-64 overflow-auto">
                    {cartItems.map((item) => (
                      <DropdownMenuItem key={item.id} className="flex justify-between px-4 py-2 focus:bg-gray-50">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-sm text-beebotix-gray-dark currency-inr">{item.price}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-4">
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-2 bg-beebotix-navy hover:bg-beebotix-navy/80">
                        View Cart
                      </Button>
                    </Link>
                    <Link to="/place-order" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy">
                        Place Order
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="text-beebotix-navy focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => 
              link.dropdown ? (
                <div key={link.name} className="space-y-2">
                  <div className="font-medium text-base text-beebotix-gray-dark flex items-center">
                    {link.name} <ChevronDown size={16} className="ml-1" />
                  </div>
                  <div className="pl-4 space-y-2">
                    {link.items?.map((section, index) => (
                      <div key={index} className="space-y-1">
                        <h5 className="text-sm font-medium text-beebotix-navy">{section.title}</h5>
                        {section.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-1 text-sm text-beebotix-gray-dark hover:text-beebotix-navy"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base text-beebotix-gray-dark hover:text-beebotix-navy font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button className="bg-beebotix-yellow hover:bg-yellow-400 text-beebotix-navy w-full">
                Contact Us
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
