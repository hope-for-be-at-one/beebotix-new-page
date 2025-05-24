
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle, Clock, Phone, Mail } from "lucide-react";

const PlaceOrder = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate order ID
    const newOrderId = `BBX${Date.now().toString().slice(-6)}`;
    
    // Simulate API request
    setTimeout(() => {
      setOrderId(newOrderId);
      setOrderPlaced(true);
      setIsSubmitting(false);
      clearCart();
      
      toast.success("Order placed successfully!", {
        description: `Your order ID is ${newOrderId}`
      });
    }, 2000);
  };
  
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8 animate-fade-in">
                <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-6 animate-scale-in" />
                <h1 className="heading-lg mb-4 text-green-600">Order Confirmed!</h1>
                <p className="text-xl text-beebotix-gray-dark mb-6">
                  We have received your order successfully
                </p>
                
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between">
                        <span className="font-medium">Order ID:</span>
                        <span className="font-mono text-beebotix-navy">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Amount:</span>
                        <span className="font-bold currency-inr text-beebotix-navy">{cartTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span className="text-orange-600 font-medium">Processing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="animate-fade-in">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-12 w-12 mx-auto text-beebotix-yellow mb-4" />
                    <h3 className="font-bold mb-2">Quick Response</h3>
                    <p className="text-beebotix-gray-dark">
                      We will get back to you within 24 hours
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center gap-4 mb-4">
                      <Mail className="h-6 w-6 text-beebotix-yellow" />
                      <Phone className="h-6 w-6 text-beebotix-yellow" />
                    </div>
                    <h3 className="font-bold mb-2">Contact Methods</h3>
                    <p className="text-beebotix-gray-dark">
                      Via email or phone for order confirmation
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold">What happens next?</h3>
                <div className="bg-beebotix-gray-light/20 p-6 rounded-lg text-left">
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-beebotix-yellow text-beebotix-navy w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <span>Our team will review your order and contact you for confirmation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-beebotix-yellow text-beebotix-navy w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span>We'll provide payment details and finalize the transaction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-beebotix-yellow text-beebotix-navy w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span>Your order will be processed and shipped to your address</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-beebotix-yellow text-beebotix-navy w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <span>Track your order using the Order ID provided above</span>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center mt-8">
                <Button 
                  className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy"
                  onClick={() => navigate("/order-tracking")}
                >
                  Track Order
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Place Your Order</h1>
            <p className="text-beebotix-gray-dark">
              Fill in your details to complete your order
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No items in cart</h2>
              <p className="text-beebotix-gray-dark mb-8">
                You need to add products to your cart before placing an order.
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
                    <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name <span className="text-red-500">*</span>
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
                        <label htmlFor="address" className="block text-sm font-medium mb-1">
                          Shipping Address <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your complete shipping address"
                          rows={3}
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
                          placeholder="Any special instructions or requirements"
                          rows={3}
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
                            Processing Order...
                          </span>
                        ) : "Confirm Order"}
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
                          <span>Total Amount</span>
                          <span className="text-beebotix-navy currency-inr">{cartTotal}</span>
                        </div>
                        <p className="text-sm text-beebotix-gray-dark mt-1">
                          Final pricing and payment details will be confirmed via email/phone
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
