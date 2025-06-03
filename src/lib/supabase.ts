
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzppvqaprgvveobktnto.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cHB2cWFwcmd2dmVvYmt0bnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzI2OTQsImV4cCI6MjA2NDU0ODY5NH0.IXYjcPOrgKAjve0aZEEp1guk1tPVT5bIoUe-CPLhJuU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface DatabaseOrder {
  id: string
  tracking_id: string
  order_date: string
  status: string
  estimated_delivery: string | null
  items: OrderItem[]
  shipping_address: ShippingAddress
  timeline: TimelineItem[]
  created_at: string
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  name: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface TimelineItem {
  status: string
  timestamp: string
  message: string
}
