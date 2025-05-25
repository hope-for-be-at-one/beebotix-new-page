
import orderTrackingData from "@/metadata/orderTracking.json";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  trackingId: string;
  orderDate: string;
  status: string;
  estimatedDelivery: string;
  items: OrderItem[];
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

// Generate random tracking ID
export const generateTrackingId = (): string => {
  const prefix = "BB";
  const randomNum = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return prefix + randomNum;
};

// Calculate estimated delivery (3-5 days from now)
export const calculateEstimatedDelivery = (): string => {
  const today = new Date();
  const deliveryDays = Math.floor(Math.random() * 3) + 3; // 3-5 days
  const deliveryDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
  return deliveryDate.toISOString().split('T')[0];
};

// Create new order
export const createOrder = (items: OrderItem[], shippingAddress: any): Order => {
  const trackingId = generateTrackingId();
  const orderDate = new Date().toISOString().split('T')[0];
  const estimatedDelivery = calculateEstimatedDelivery();
  
  const newOrder: Order = {
    trackingId,
    orderDate,
    status: "confirmed",
    estimatedDelivery,
    items,
    shippingAddress,
    timeline: [
      {
        status: "confirmed",
        timestamp: new Date().toISOString(),
        message: "Order confirmed and payment received"
      }
    ]
  };

  // Store in localStorage for now (in future, this will be API call)
  const existingOrders = JSON.parse(localStorage.getItem('beebotix_orders') || '[]');
  existingOrders.push(newOrder);
  localStorage.setItem('beebotix_orders', JSON.stringify(existingOrders));

  return newOrder;
};

// Get order by tracking ID
export const getOrderByTrackingId = (trackingId: string): Order | null => {
  // First check localStorage
  const localOrders = JSON.parse(localStorage.getItem('beebotix_orders') || '[]');
  const localOrder = localOrders.find((order: Order) => order.trackingId === trackingId);
  
  if (localOrder) {
    return localOrder;
  }

  // Fallback to sample orders from JSON
  const sampleOrder = orderTrackingData.sampleOrders.find(order => order.trackingId === trackingId);
  return sampleOrder || null;
};

// Get all orders
export const getAllOrders = (): Order[] => {
  const localOrders = JSON.parse(localStorage.getItem('beebotix_orders') || '[]');
  return [...localOrders, ...orderTrackingData.sampleOrders];
};
