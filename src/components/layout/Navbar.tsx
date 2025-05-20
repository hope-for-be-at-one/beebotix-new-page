
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { name: "Marketplace", path: "/marketplace" },
    { name: "3D Printing", path: "/3d-printing" },
    { name: "Gifting", path: "/gifting" },
    { name: "ClassRoom", path: "/classroom" }
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-4 py-2 text-beebotix-gray-dark hover:text-beebotix-navy font-medium transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact">
            <Button className="bg-beebotix-yellow hover:bg-yellow-400 text-beebotix-navy ml-2">
              Contact Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-beebotix-navy focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-beebotix-gray-dark hover:text-beebotix-navy font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
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
