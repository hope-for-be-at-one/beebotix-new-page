
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

interface OrderStatus {
  id: string;
  status: "Processing" | "Confirmed" | "Shipped" | "Out for Delivery" | "Delivered";
  estimatedDelivery: string;
  trackingSteps: {
    step: string;
    status: "completed" | "current" | "pending";
    date?: string;
    location?: string;
  }[];
}

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Mock order data for demonstration
  const mockOrderData: { [key: string]: OrderStatus } = {
    "BBX123456": {
      id: "BBX123456",
      status: "Shipped",
      estimatedDelivery: "2024-01-15",
      trackingSteps: [
        { step: "Order Placed", status: "completed", date: "2024-01-10", location: "Online" },
        { step: "Order Confirmed", status: "completed", date: "2024-01-11", location: "Beebotix Office" },
        { step: "Shipped", status: "current", date: "2024-01-12", location: "Mumbai" },
        { step: "Out for Delivery", status: "pending" },
        { step: "Delivered", status: "pending" }
      ]
    },
    "BBX789012": {
      id: "BBX789012",
      status: "Processing",
      estimatedDelivery: "2024-01-18",
      trackingSteps: [
        { step: "Order Placed", status: "completed", date: "2024-01-12", location: "Online" },
        { step: "Order Confirmed", status: "current", date: "2024-01-13", location: "Beebotix Office" },
        { step: "Shipped", status: "pending" },
        { step: "Out for Delivery", status: "pending" },
        { step: "Delivered", status: "pending" }
      ]
    }
  };
  
  const handleTrackOrder = () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrderData[trackingId.toUpperCase()];
      if (foundOrder) {
        setOrderStatus(foundOrder);
        toast.success("Order found!");
      } else {
        toast.error("Order not found. Please check your tracking ID.");
        setOrderStatus(null);
      }
      setIsSearching(false);
    }, 1000);
  };
  
  const getStatusColor = (status: OrderStatus["status"]) => {
    switch (status) {
      case "Processing": return "text-orange-600";
      case "Confirmed": return "text-blue-600";
      case "Shipped": return "text-purple-600";
      case "Out for Delivery": return "text-yellow-600";
      case "Delivered": return "text-green-600";
      default: return "text-gray-600";
    }
  };
  
  const getStatusIcon = (status: OrderStatus["status"]) => {
    switch (status) {
      case "Processing": return <Clock className="h-6 w-6 text-orange-600" />;
      case "Confirmed": return <CheckCircle className="h-6 w-6 text-blue-600" />;
      case "Shipped": return <Package className="h-6 w-6 text-purple-600" />;
      case "Out for Delivery": return <Truck className="h-6 w-6 text-yellow-600" />;
      case "Delivered": return <CheckCircle className="h-6 w-6 text-green-600" />;
      default: return <Package className="h-6 w-6 text-gray-600" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h1 className="heading-lg mb-2">Track Your Order</h1>
            <p className="text-beebotix-gray-dark">
              Enter your tracking ID to check the current status of your order
            </p>
          </div>
          
          <div className="max-w-md mx-auto mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="trackingId" className="block text-sm font-medium mb-2">
                      Tracking ID
                    </label>
                    <Input
                      id="trackingId"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your tracking ID (e.g., BBX123456)"
                      className="text-center font-mono"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleTrackOrder}
                    disabled={isSearching}
                    className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy"
                  >
                    {isSearching ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-beebotix-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Track Order
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {orderStatus && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Order {orderStatus.id}</h2>
                      <p className={`text-lg font-medium ${getStatusColor(orderStatus.status)}`}>
                        Status: {orderStatus.status}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusIcon(orderStatus.status)}
                      <p className="text-sm text-beebotix-gray-dark mt-1">
                        Estimated Delivery: {new Date(orderStatus.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Order Progress</h3>
                  
                  <div className="space-y-4">
                    {orderStatus.trackingSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.status === "completed" ? "bg-green-500 text-white" :
                            step.status === "current" ? "bg-beebotix-yellow text-beebotix-navy" :
                            "bg-gray-200 text-gray-500"
                          }`}>
                            {step.status === "completed" ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : step.status === "current" ? (
                              <Clock className="h-5 w-5" />
                            ) : (
                              <div className="w-3 h-3 bg-current rounded-full" />
                            )}
                          </div>
                          {index < orderStatus.trackingSteps.length - 1 && (
                            <div className={`w-0.5 h-8 mt-2 ${
                              step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                            }`} />
                          )}
                        </div>
                        
                        <div className="flex-grow pb-8">
                          <h4 className={`font-medium ${
                            step.status === "completed" ? "text-green-700" :
                            step.status === "current" ? "text-beebotix-navy" :
                            "text-gray-500"
                          }`}>
                            {step.step}
                          </h4>
                          {step.date && (
                            <p className="text-sm text-beebotix-gray-dark">
                              {new Date(step.date).toLocaleDateString()} at {new Date(step.date).toLocaleTimeString()}
                            </p>
                          )}
                          {step.location && (
                            <p className="text-sm text-beebotix-gray-dark flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {step.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-sm text-beebotix-gray-dark mb-4">
                  If you have any questions about your order, feel free to contact us.
                </p>
                <div className="space-y-2 text-sm">
                  <p>📧 Email: orders@beebotix.com</p>
                  <p>📞 Phone: +91 98765 43210</p>
                  <p>🕒 Support Hours: 9 AM - 6 PM (Mon-Sat)</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {!orderStatus && (
            <div className="mt-8 text-center text-beebotix-gray-dark">
              <p className="text-sm">
                Don't have a tracking ID? Try these sample IDs:
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <button 
                  onClick={() => setTrackingId("BBX123456")}
                  className="text-beebotix-navy hover:underline font-mono text-sm"
                >
                  BBX123456
                </button>
                <button 
                  onClick={() => setTrackingId("BBX789012")}
                  className="text-beebotix-navy hover:underline font-mono text-sm"
                >
                  BBX789012
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
