
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationMap from "@/components/contact/LocationMap";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thanks for contacting us! We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h1 className="heading-lg mb-2 text-center">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <div className="w-20 h-1 bg-beebotix-yellow mx-auto mb-6"></div>
            <p className="text-beebotix-gray-dark text-lg text-center mb-12 max-w-2xl mx-auto">
              Have questions about our services or want to discuss your project? Reach out to us using the form below or contact us directly.
            </p>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              {/* Contact Information */}
              <div className="bg-beebotix-navy rounded-xl p-6 text-white">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-beebotix-yellow mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a href="mailto:info@beebotix.com" className="text-gray-300 hover:text-beebotix-yellow transition-colors">
                        info@beebotix.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-beebotix-yellow mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-gray-300 hover:text-beebotix-yellow transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-beebotix-yellow mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-gray-300">
                        123 Tech Avenue, <br />
                        Innovation District, <br />
                        CA 90210
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-beebotix-yellow mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Website</h3>
                      <a href="https://www.beebotix.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-beebotix-yellow transition-colors">
                        www.beebotix.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-beebotix-gray-dark mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full h-32"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="button-primary w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-12">
              <LocationMap />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
