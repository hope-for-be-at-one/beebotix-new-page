
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook 
} from "lucide-react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS with the working public key
  emailjs.init("K9PmDAw2eoItuAJgX");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        name: "Viewer(SubScriber)",
        email: "self@self.com",
        subject: "subsciber",
        message: `this email id user want to get daly updates: ${email}`
      };

      console.log("Sending email with params:", templateParams);

      // Use the same working EmailJS configuration from Contact page
      const serviceID = "service_rwc5cf5";
      const templateID = "template_tkr2wgr";

      await emailjs.send(serviceID, templateID, templateParams);

      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Email subscription error:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer className="bg-beebotix-navy text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block mb-4">
              <span className="font-poppins text-2xl font-bold">
                Bee<span className="text-beebotix-yellow">Botix</span>
              </span>
            </Link>
            <p className="text-gray-300 max-w-xs">
              Innovative Robotics As A Service (RAAS) solutions for industries, hobbyists, and innovators.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-beebotix-yellow transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-beebotix-yellow transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-beebotix-yellow transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-beebotix-yellow transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/3d-printing"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  3D Printing
                </Link>
              </li>
              <li>
                <Link
                  to="/gifting"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  Gifting
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-beebotix-yellow" />
                <a
                  href="mailto:info@beebotix.com"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  info@beebotix.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-beebotix-yellow" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-beebotix-yellow" />
                <span className="text-gray-300">
                  123 Tech Avenue, Innovation District, CA 90210
                </span>
              </li>
              <li className="flex items-start">
                <Globe className="mr-2 h-5 w-5 text-beebotix-yellow" />
                <a
                  href="https://www.beebotix.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-beebotix-yellow transition-colors"
                >
                  www.beebotix.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates on robotics innovations.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-beebotix-yellow hover:bg-yellow-400 text-beebotix-navy"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center md:text-left md:flex md:justify-between md:items-center">
          <p className="text-gray-400">
            © {currentYear} BeeBotix. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-beebotix-yellow transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-beebotix-yellow transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
