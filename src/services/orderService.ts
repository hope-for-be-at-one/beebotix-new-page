import { supabase, type DatabaseOrder, type OrderItem, type ShippingAddress, type TimelineItem } from "@/lib/supabase";
import orderTrackingData from "@/metadata/orderTracking.json";

export interface Order {
  trackingId: string;
  orderDate: string;
  status: string;
  estimatedDelivery: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  timeline: TimelineItem[];
}

// Generate random tracking ID with timestamp to ensure uniqueness
export const generateTrackingId = (): string => {
  const prefix = "BB";
  const timestamp = Date.now().toString().slice(-8); // Last 8 digits of timestamp
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Increased randomness
  return prefix + timestamp + randomNum;
};

// Calculate estimated delivery (3-5 days from now)
export const calculateEstimatedDelivery = (): string => {
  const today = new Date();
  const deliveryDays = Math.floor(Math.random() * 3) + 3; // 3-5 days
  const deliveryDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
  return deliveryDate.toISOString().split('T')[0];
};

// Create new order in Supabase
export const createOrder = async (items: OrderItem[], shippingAddress: any): Promise<Order> => {
  const trackingId = generateTrackingId();
  const orderDate = new Date().toISOString().split('T')[0];
  const estimatedDelivery = calculateEstimatedDelivery();
  
  // Ensure all required fields are present and valid
  const orderData = {
    tracking_id: trackingId,
    order_date: orderDate,
    status: "confirmed",
    estimated_delivery: estimatedDelivery,
    items: items || [],
    shipping_address: shippingAddress || {},
    timeline: [
      {
        status: "confirmed",
        timestamp: new Date().toISOString(),
        message: "Order confirmed and payment received"
      }
    ]
  };

  console.log('Attempting to create order with data:', JSON.stringify(orderData, null, 2));
  console.log('Tracking ID generated:', trackingId);
  console.log('Order date:', orderDate);
  console.log('Items count:', items?.length || 0);

  try {
    // First, check if tracking ID already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('tracking_id')
      .eq('tracking_id', trackingId)
      .single();

    if (existingOrder) {
      console.warn('Tracking ID already exists, generating new one');
      return createOrder(items, shippingAddress); // Retry with new ID
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to create order: ${error.message} (Code: ${error.code})`);
    }

    if (!data) {
      console.error('No data returned from insert operation');
      throw new Error('Failed to create order: No data returned');
    }

    console.log('Order created successfully:', data);

    // Convert database format to frontend format
    const newOrder: Order = {
      trackingId: data.tracking_id,
      orderDate: data.order_date,
      status: data.status,
      estimatedDelivery: data.estimated_delivery || estimatedDelivery,
      items: data.items,
      shippingAddress: data.shipping_address,
      timeline: data.timeline
    };

    return newOrder;
  } catch (error) {
    console.error('Error in createOrder function:', error);
    throw error;
  }
};

// Get order by tracking ID from Supabase
export const getOrderByTrackingId = async (trackingId: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_id', trackingId)
      .single();

    if (error) {
      console.log('Order not found in Supabase, checking sample orders');
      // Fallback to sample orders from JSON
      const sampleOrder = orderTrackingData.sampleOrders.find(order => order.trackingId === trackingId);
      return sampleOrder || null;
    }

    // Convert database format to frontend format
    const order: Order = {
      trackingId: data.tracking_id,
      orderDate: data.order_date,
      status: data.status,
      estimatedDelivery: data.estimated_delivery || '',
      items: data.items,
      shippingAddress: data.shipping_address,
      timeline: data.timeline
    };

    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

// Get all orders from Supabase
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return orderTrackingData.sampleOrders;
    }

    // Convert database format to frontend format
    const orders: Order[] = data.map((dbOrder: DatabaseOrder) => ({
      trackingId: dbOrder.tracking_id,
      orderDate: dbOrder.order_date,
      status: dbOrder.status,
      estimatedDelivery: dbOrder.estimated_delivery || '',
      items: dbOrder.items,
      shippingAddress: dbOrder.shipping_address,
      timeline: dbOrder.timeline
    }));

    return [...orders, ...orderTrackingData.sampleOrders];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return orderTrackingData.sampleOrders;
  }
};
