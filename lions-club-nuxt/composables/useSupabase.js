import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  // Get environment variables
  const config = useRuntimeConfig()
  
  // Create Supabase client
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  // Newsletter subscription functions
  const subscribeToNewsletter = async (subscriptionData) => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert([{
          name: subscriptionData.name,
          email: subscriptionData.email,
          consent: subscriptionData.consent || true,
          is_active: true,
          subscription_source: 'website_optin'
        }])

      if (error) {
        console.error('Newsletter subscription error:', error)
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Newsletter subscription failed:', error)
      return { success: false, error }
    }
  }

  // Order submission functions
  const submitOrder = async (orderData) => {
    try {
      // Insert order into orders table
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: orderData.customer.name,
          customer_email: orderData.customer.email,
          customer_phone: orderData.customer.phone,
          pickup_date: orderData.customer.pickupDate,
          special_requests: orderData.customer.specialRequests,
          subtotal: orderData.totals.subtotal,
          donation_amount: orderData.totals.donation,
          total_amount: orderData.totals.total,
          order_date: new Date().toISOString(),
          status: 'pending'
        }])
        .select()

      if (orderError) {
        console.error('Order submission error:', orderError)
        throw orderError
      }

      // Insert order items
      const orderId = orderResult[0].id
      const orderItemsData = orderData.items.map(item => ({
        order_id: orderId,
        item_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }))

      const { data: itemsResult, error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData)

      if (itemsError) {
        console.error('Order items insertion error:', itemsError)
        throw itemsError
      }

      return { success: true, data: { order: orderResult[0], items: itemsResult } }
    } catch (error) {
      console.error('Order submission failed:', error)
      return { success: false, error }
    }
  }

  // Get all orders (for admin purposes)
  const getOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('order_date', { ascending: false })

      if (error) {
        console.error('Failed to fetch orders:', error)
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Get orders failed:', error)
      return { success: false, error }
    }
  }

  // Get newsletter subscriptions (for admin purposes)
  const getNewsletterSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch newsletter subscriptions:', error)
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Get newsletter subscriptions failed:', error)
      return { success: false, error }
    }
  }

  // Test connection
  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('count', { count: 'exact', head: true })

      if (error) {
        console.error('Connection test failed:', error)
        return { success: false, error }
      }

      return { success: true, message: 'Connection successful' }
    } catch (error) {
      console.error('Connection test error:', error)
      return { success: false, error }
    }
  }

  return {
    supabase,
    subscribeToNewsletter,
    submitOrder,
    getOrders,
    getNewsletterSubscriptions,
    testConnection
  }
}