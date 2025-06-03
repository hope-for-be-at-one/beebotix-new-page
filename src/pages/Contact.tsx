
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Download } from "lucide-react";
import LocationMap from "@/components/contact/LocationMap";
import SponsorSection from "@/components/contact/SponsorSection";
import emailjs from "emailjs-com";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  emailjs.init("K9PmDAw2eoItuAJgX");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: "BeeBotix Team",
      from_name: formData.name
    };

    const serviceID = "service_rwc5cf5";
    const templateID = "template_tkr2wgr";

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out! We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Email.js error:", error);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: "Please try again in a few minutes or reach out to us on social media. We're here to help!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadBrochure = () => {
    // Create a sample PDF URL - in a real app, this would be a link to your actual brochure
    const brochureUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    window.open(brochureUrl, '_blank');
    
    toast({
      title: "Brochure Download Started",
      description: "Your BeeBotix brochure download has begun!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">Get in Touch</h1>
            <p className="text-beebotix-gray-dark text-lg max-w-2xl mx-auto mb-8">
              Have questions about our services? Want to discuss a project? 
              We'd love to hear from you and help bring your ideas to life.
            </p>
            
            {/* Download Brochure Button */}
            <Button 
              onClick={downloadBrochure}
              className="bg-beebotix-orange hover:bg-beebotix-orange/80 text-white mb-8"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Our Brochure
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your project or question..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-beebotix-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-beebotix-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Address</h4>
                        <p className="text-beebotix-gray-dark">
                          123 Innovation Street<br />
                          Tech District, City 12345<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-beebotix-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <p className="text-beebotix-gray-dark">+91 98765 43210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-beebotix-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-beebotix-gray-dark">hello@beebotix.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-beebotix-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Business Hours</h4>
                        <p className="text-beebotix-gray-dark">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-beebotix-yellow/10 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Why Choose BeeBotix?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Expert team of engineers and designers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Cutting-edge technology and equipment</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Fast turnaround times</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Competitive pricing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Location Map */}
          <div className="mt-16">
            <LocationMap />
          </div>

          {/* Sponsor Section */}
          <div className="mt-16">
            <SponsorSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
