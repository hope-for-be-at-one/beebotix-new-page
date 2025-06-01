import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Check } from "lucide-react";
import emailjs from "emailjs-com";

const RequestQuote = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize EmailJS
  emailjs.init("K9PmDAw2eoItuAJgX");
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setIsSubmitting(true);

    const itemsList = cartItems.map(item => 
      `${item.title} - Quantity: ${item.quantity} - Price: ₹${item.price * item.quantity}${item.customNote ? ` (Note: ${item.customNote})` : ''}`
    ).join('\n');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      additional_notes: formData.message || "None",
      items_list: itemsList,
      total_amount: `₹${cartTotal}`,
      subject: `Quote Request from ${formData.name}`,
      message: `
Quote Request Details:

Customer: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Items for Quote:
${itemsList}

Estimated Total: ₹${cartTotal}

Additional Notes: ${formData.message || "None"}

Please prepare a detailed quote for the customer.
      `,
      to_name: "BeeBotix Team",
      from_name: formData.name
    };

    const serviceID = "service_rwc5cf5";
    const templateID = "template_tkr2wgr";

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      
      toast({
        title: "Quote Request Sent Successfully! 🎉",
        description: "We'll review your request and get back to you with pricing details shortly.",
      });
      
      // Reset form and clear cart after short delay for better UX
      setTimeout(() => {
        clearCart();
        navigate("/", { replace: true });
      }, 1500);
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Request a Quote</h1>
            <p className="text-beebotix-gray-dark">
              Fill in your details and we'll get back to you with pricing
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <ShoppingCart className="h-16 w-16 mx-auto text-beebotix-gray" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-beebotix-gray-dark mb-8">
                You need to add products to your cart before requesting a quote.
              </p>
              <Button 
                className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy"
                onClick={() => navigate("/products")}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
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
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Additional Notes
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any specific requirements or questions"
                          rows={4}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy mt-6 w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-beebotix-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : "Submit Request for Quote"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="max-h-60 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="pr-2">
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-beebotix-gray-dark">Quantity: {item.quantity}</p>
                              {item.customNote && (
                                <p className="text-xs text-beebotix-gray-dark mt-1 bg-gray-50 p-1.5 rounded">
                                  <span className="font-medium">Note:</span> {item.customNote}
                                </p>
                              )}
                            </div>
                            <p className="font-medium currency-inr whitespace-nowrap">{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold">
                          <span>Estimated Total</span>
                          <span className="text-beebotix-navy currency-inr">{cartTotal}</span>
                        </div>
                        <p className="text-sm text-beebotix-gray-dark mt-1">
                          Final pricing will be provided in your quote
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-green-500" />
                    What happens next?
                  </h3>
                  <ul className="text-sm text-beebotix-gray-dark space-y-2">
                    <li>1. Our team reviews your request</li>
                    <li>2. We prepare a personalized quote</li>
                    <li>3. You receive the quote via email</li>
                    <li>4. We'll follow up to answer any questions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestQuote;
