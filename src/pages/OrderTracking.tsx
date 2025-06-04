import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, XCircle } from "lucide-react";
import { getOrderByTrackingId } from "@/services/orderService";
import type { Order } from "@/services/orderService";
import orderTrackingData from "@/metadata/orderTracking.json";

interface OrderStatus {
  trackingId: string;
  orderDate: string;
  status: string;
  estimatedDelivery: string | null;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  timeline: {
    status: string;
    timestamp: string;
    message: string;
  }[];
}

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderStatus, setOrderStatus] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleTrackOrder = async () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    
    setIsSearching(true);
    
    try {
      const foundOrder = await getOrderByTrackingId(trackingId.trim());
      
      if (foundOrder) {
        setOrderStatus(foundOrder);
        toast.success("Order found!");
      } else {
        toast.error("Order not found. Please check your tracking ID.");
        setOrderStatus(null);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      toast.error("Error tracking order. Please try again.");
      setOrderStatus(null);
    } finally {
      setIsSearching(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    const statusInfo = orderTrackingData.statuses.find(s => s.id === status);
    return statusInfo ? `text-${statusInfo.color}-600` : "text-gray-600";
  };
  
  const getStatusIcon = (status: string) => {
    const statusInfo = orderTrackingData.statuses.find(s => s.id === status);
    if (!statusInfo) return <Package className="h-6 w-6 text-gray-600" />;
    
    switch (statusInfo.icon) {
      case "check-circle": return <CheckCircle className={`h-6 w-6 text-${statusInfo.color}-600`} />;
      case "clock": return <Clock className={`h-6 w-6 text-${statusInfo.color}-600`} />;
      case "truck": return <Truck className={`h-6 w-6 text-${statusInfo.color}-600`} />;
      case "package-check": return <Package className={`h-6 w-6 text-${statusInfo.color}-600`} />;
      case "x-circle": return <XCircle className={`h-6 w-6 text-${statusInfo.color}-600`} />;
      default: return <Package className="h-6 w-6 text-gray-600" />;
    }
  };
  
  const getStepStatus = (stepStatus: string, timeline: any[]) => {
    const timelineItem = timeline.find(item => item.status === stepStatus);
    if (timelineItem) return "completed";
    
    const currentStatusIndex = orderTrackingData.statuses.findIndex(s => s.id === orderStatus?.status);
    const stepIndex = orderTrackingData.statuses.findIndex(s => s.id === stepStatus);
    
    if (stepIndex === currentStatusIndex) return "current";
    if (stepIndex < currentStatusIndex) return "completed";
    return "pending";
  };

  const getDisplayStatuses = () => {
    if (!orderStatus) return [];
    
    if (orderStatus.status === 'cancelled') {
      // For cancelled orders, only show confirmed and cancelled steps
      return orderTrackingData.statuses.filter(s => s.id === 'confirmed' || s.id === 'cancelled');
    }
    
    // For non-cancelled orders, show all statuses except cancelled
    return orderTrackingData.statuses.filter(s => s.id !== 'cancelled');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h1 className="heading-lg mb-2">{orderTrackingData.title}</h1>
            <p className="text-beebotix-gray-dark">
              {orderTrackingData.description}
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
                      placeholder="Enter your tracking ID (e.g., BB123456789)"
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
                      <h2 className="text-xl font-bold">Order {orderStatus.trackingId}</h2>
                      <p className={`text-lg font-medium ${getStatusColor(orderStatus.status)}`}>
                        Status: {orderTrackingData.statuses.find(s => s.id === orderStatus.status)?.name || orderStatus.status}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusIcon(orderStatus.status)}
                      {orderStatus.estimatedDelivery && orderStatus.status !== 'cancelled' && (
                        <p className="text-sm text-beebotix-gray-dark mt-1">
                          Estimated Delivery: {new Date(orderStatus.estimatedDelivery).toLocaleDateString()}
                        </p>
                      )}
                      {orderStatus.status === 'cancelled' && (
                        <p className="text-sm text-red-600 mt-1 font-medium">
                          Order Cancelled
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Order Items:</h3>
                    {orderStatus.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-2">Shipping Address:</h3>
                    <div className="text-sm text-beebotix-gray-dark">
                      <p>{orderStatus.shippingAddress.name}</p>
                      <p>{orderStatus.shippingAddress.address}</p>
                      <p>{orderStatus.shippingAddress.city}, {orderStatus.shippingAddress.state} {orderStatus.shippingAddress.pincode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Order Progress</h3>
                  
                  <div className="space-y-4">
                    {getDisplayStatuses().map((statusStep, index, array) => {
                      const stepStatus = getStepStatus(statusStep.id, orderStatus.timeline);
                      const timelineItem = orderStatus.timeline.find(item => item.status === statusStep.id);
                      
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              stepStatus === "completed" ? 
                                (statusStep.id === 'cancelled' ? "bg-red-500 text-white" : "bg-green-500 text-white") :
                              stepStatus === "current" ? "bg-beebotix-yellow text-beebotix-navy" :
                              "bg-gray-200 text-gray-500"
                            }`}>
                              {stepStatus === "completed" ? (
                                statusStep.id === 'cancelled' ? (
                                  <XCircle className="h-5 w-5" />
                                ) : (
                                  <CheckCircle className="h-5 w-5" />
                                )
                              ) : stepStatus === "current" ? (
                                <Clock className="h-5 w-5" />
                              ) : (
                                <div className="w-3 h-3 bg-current rounded-full" />
                              )}
                            </div>
                            {index < array.length - 1 && (
                              <div className={`w-0.5 h-8 mt-2 ${
                                stepStatus === "completed" ? 
                                  (statusStep.id === 'cancelled' ? "bg-red-500" : "bg-green-500") : 
                                  "bg-gray-200"
                              }`} />
                            )}
                          </div>
                          
                          <div className="flex-grow pb-8">
                            <h4 className={`font-medium ${
                              stepStatus === "completed" ? 
                                (statusStep.id === 'cancelled' ? "text-red-700" : "text-green-700") :
                              stepStatus === "current" ? "text-beebotix-navy" :
                              "text-gray-500"
                            }`}>
                              {statusStep.name}
                            </h4>
                            <p className="text-sm text-beebotix-gray-dark">
                              {timelineItem ? timelineItem.message : statusStep.description}
                            </p>
                            {timelineItem && (
                              <p className="text-sm text-beebotix-gray-dark mt-1">
                                {new Date(timelineItem.timestamp).toLocaleDateString()} at {new Date(timelineItem.timestamp).toLocaleTimeString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
