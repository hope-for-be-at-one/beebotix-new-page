
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
import { CheckCircle, Clock, Phone, Mail, AlertCircle } from "lucide-react";
import { createOrder } from "@/services/orderService";
import emailjs from "emailjs-com";

const PlaceOrder = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  const [dbSaveFailed, setDbSaveFailed] = useState(false);
  
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
  
  const generateOrderId = () => {
    const prefix = "BB";
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp.slice(-6)}${random}`;
  };

  const addOrderToTracking = async (items: any[], shippingData: any) => {
    try {
      const order = await createOrder(items, shippingData);
      console.log('Order created in Supabase:', order);
      return { trackingId: order.trackingId, dbSuccess: true };
    } catch (error) {
      console.error('Failed to create order in Supabase:', error);
      // Fallback to localStorage as before
      const newOrder = {
        trackingId: generateOrderId(),
        orderDate: new Date().toISOString().split('T')[0],
        status: "confirmed",
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: items,
        shippingAddress: shippingData,
        timeline: [
          {
            status: "confirmed",
            timestamp: new Date().toISOString(),
            message: "Order request received and under review"
          }
        ]
      };

      const existingOrders = JSON.parse(localStorage.getItem('beebotix_orders') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('beebotix_orders', JSON.stringify(existingOrders));
      
      return { trackingId: newOrder.trackingId, dbSuccess: false };
    }
  };

  const sendOrderEmail = async (orderId: string) => {
    const itemsList = cartItems.map(item => 
      `${item.title} - Quantity: ${item.quantity} - Price: ₹${item.price * item.quantity}${item.customNote ? ` (Note: ${item.customNote})` : ''}`
    ).join('\n');

    const templateParams = {
      order_id: orderId,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: formData.address,
      additional_notes: formData.message || "None",
      items_list: itemsList,
      total_amount: `₹${cartTotal}`,
      subject: `New Order Request - ${orderId}`,
      message: `
Order Request Details:

Order ID: ${orderId}
Customer: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Shipping Address: ${formData.address}

Items Ordered:
${itemsList}

Total Amount: ₹${cartTotal}

Additional Notes: ${formData.message || "None"}

Please contact the customer to confirm payment and processing details.
      `,
      to_name: "BeeBotix Team",
      from_name: "Order Management System"
    };

    const serviceID = "service_rwc5cf5";
    const templateID = "template_tkr2wgr";

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      console.log('Order email sent successfully');
    } catch (error) {
      console.error('Failed to send order email:', error);
      // Don't throw error, as order processing should continue
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const orderItems = cartItems.map(item => ({
        name: item.title,
        quantity: item.quantity,
        price: item.price
      }));

      const shippingData = {
        name: formData.name,
        address: formData.address,
        city: "City",
        state: "State",
        pincode: "000000"
      };

      // Create order in Supabase
      const { trackingId: newOrderId, dbSuccess } = await addOrderToTracking(orderItems, shippingData);
      
      // Send email notification
      await sendOrderEmail(newOrderId);
      
      // Show success
      setTimeout(() => {
        setOrderId(newOrderId);
        setDbSaveFailed(!dbSuccess);
        setOrderPlaced(true);
        setIsSubmitting(false);
        clearCart();
        
        if (dbSuccess) {
          toast({
            title: "Order Request Submitted Successfully! 🎉",
            description: `Your order ID is ${newOrderId}. We'll contact you soon for payment and confirmation.`,
          });
        } else {
          toast({
            title: "Order Request Submitted! ⚠️",
            description: `Your order ID is ${newOrderId}. Please check back after 24 hours for tracking updates.`,
          });
        }
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: "Please try again in a few minutes or reach out to us on social media. We're here to help!",
      });
    }
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
                <h1 className="heading-lg mb-4 text-green-600">Order Request Received!</h1>
                <p className="text-xl text-beebotix-gray-dark mb-6">
                  Thank you for your order request. We have received your inquiry successfully.
                </p>
                
                {dbSaveFailed && (
                  <Card className="bg-yellow-50 border-yellow-200 mb-6">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                        <div className="text-left">
                          <h3 className="font-bold text-yellow-800 mb-2">Tracking Update Notice</h3>
                          <p className="text-yellow-700 text-sm">
                            Your order has been received and we'll process it manually. Please check your Order ID after 24 hours for tracking status updates. Don't worry - we have received your order and will contact you soon!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Card className="bg-blue-50 border-blue-200 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="text-left">
                        <h3 className="font-bold text-blue-800 mb-2">Important Notice</h3>
                        <p className="text-blue-700 text-sm">
                          We currently do not have an online payment gateway. All payments and final pricing will be discussed and processed manually through email or phone communication.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between">
                        <span className="font-medium">Order ID:</span>
                        <span className="font-mono text-beebotix-navy">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Estimated Amount:</span>
                        <span className="font-bold currency-inr text-beebotix-navy">{cartTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span className="text-orange-600 font-medium">Under Review</span>
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
                      We will review your order and get back to you within 24 hours
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center gap-4 mb-4">
                      <Mail className="h-6 w-6 text-beebotix-yellow" />
                      <Phone className="h-6 w-6 text-beebotix-yellow" />
                    </div>
                    <h3 className="font-bold mb-2">Personal Contact</h3>
                    <p className="text-beebotix-gray-dark">
                      Direct communication for pricing and payment details
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
                      <span>Our team will review your order request and verify product availability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-beebotix-yellow text-beebotix-navy w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span>We'll contact you via email or phone to discuss final pricing and payment options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-beebotix-yellow text-beebotix-navy w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span>Once payment is confirmed, your order will be processed and shipped</span>
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
            <h1 className="heading-lg mb-2">Place Your Order Request</h1>
            <p className="text-beebotix-gray-dark">
              Fill in your details to submit your order request. We'll contact you for payment and confirmation.
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
                    <h2 className="text-xl font-bold mb-6">Contact & Shipping Information</h2>
                    
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
                          Additional Notes & Requirements
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any special instructions, questions about pricing, or specific requirements"
                          rows={3}
                        />
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> This is an order request. Final pricing and payment will be discussed personally via email or phone. We do not process payments online.
                        </p>
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
                            Submitting Request...
                          </span>
                        ) : "Submit Order Request"}
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
                          Final pricing will be confirmed personally via contact
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
