<template>
  <section id="order" class="order">
    <div class="container">
      <div class="order-content">
        <div class="order-form-section">
          <h2>Place Your Order</h2>
          <form @submit.prevent="submitOrder" class="order-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="orderForm.name" 
                required
                :class="{ error: errors.name }"
              >
              <div v-if="errors.name" class="field-error">{{ errors.name }}</div>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="orderForm.email" 
                required
                :class="{ error: errors.email }"
              >
              <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="orderForm.phone" 
                required
                :class="{ error: errors.phone }"
              >
              <div v-if="errors.phone" class="field-error">{{ errors.phone }}</div>
            </div>
            <div class="form-group">
              <label for="pickup-date">Pickup Date</label>
              <input 
                type="date" 
                id="pickup-date" 
                v-model="orderForm.pickupDate" 
                required
                :min="minDate"
                :class="{ error: errors.pickupDate }"
              >
              <div v-if="errors.pickupDate" class="field-error">{{ errors.pickupDate }}</div>
            </div>
            <div class="form-group">
              <label for="special-requests">Special Requests</label>
              <textarea 
                id="special-requests" 
                v-model="orderForm.specialRequests" 
                rows="3"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full" :disabled="isSubmitting">
              {{ isSubmitting ? 'Processing Order...' : 'Complete Order' }}
            </button>
          </form>
        </div>
        
        <div class="cart-section">
          <h3>Your Order</h3>
          <div class="cart-items">
            <div v-if="cartItems.length === 0" class="empty-cart">
              Your cart is empty. Add some ice cream!
            </div>
            <div v-else>
              <div v-for="item in cartItems" :key="item.name" class="cart-item">
                <div class="item-info">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-controls">
                    <button class="quantity-btn" @click="updateQuantity(item.name, item.quantity - 1)">-</button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button class="quantity-btn" @click="updateQuantity(item.name, item.quantity + 1)">+</button>
                    <button class="btn btn-small btn-outline" @click="removeFromCart(item.name)">Remove</button>
                  </div>
                </div>
                <div class="item-price">{{ formatCurrency(item.price * item.quantity) }}</div>
              </div>
            </div>
          </div>
          <div class="cart-total">
            <div class="total-line">
              <span>Subtotal:</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="total-line">
              <span>Donation (10%):</span>
              <span>{{ formatCurrency(donation) }}</span>
            </div>
            <div class="total-line total-main">
              <span>Total:</span>
              <span>{{ formatCurrency(total) }}</span>
            </div>
          </div>
          <button class="btn btn-outline" @click="clearCart">Clear Cart</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  subtotal, 
  donation, 
  total, 
  formatCurrency 
} = useCart()

const orderForm = ref({
  name: '',
  email: '',
  phone: '',
  pickupDate: '',
  specialRequests: ''
})

const errors = ref({})
const isSubmitting = ref(false)

// Set minimum pickup date to tomorrow
const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const validateForm = () => {
  errors.value = {}
  
  if (!orderForm.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!orderForm.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!isValidEmail(orderForm.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!orderForm.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!isValidPhone(orderForm.value.phone)) {
    errors.value.phone = 'Please enter a valid phone number'
  }
  
  if (!orderForm.value.pickupDate) {
    errors.value.pickupDate = 'Pickup date is required'
  } else {
    const selectedDate = new Date(orderForm.value.pickupDate)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (selectedDate < tomorrow) {
      errors.value.pickupDate = 'Pickup date must be at least one day in advance'
    }
  }
  
  return Object.keys(errors.value).length === 0
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

const submitOrder = async () => {
  if (cartItems.value.length === 0) {
    showMessage('Please add items to your cart before placing an order.', 'error')
    return
  }
  
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const orderData = {
      customer: { ...orderForm.value },
      items: [...cartItems.value],
      totals: {
        subtotal: subtotal.value,
        donation: donation.value,
        total: total.value
      }
    }
    
    console.log('Order submitted:', orderData)
    
    showMessage(
      `Thank you ${orderForm.value.name}! Your order has been received. You will receive a confirmation email at ${orderForm.value.email}. Total: ${formatCurrency(total.value)}`,
      'success'
    )
    
    // Reset form and cart
    orderForm.value = {
      name: '',
      email: '',
      phone: '',
      pickupDate: '',
      specialRequests: ''
    }
    clearCart()
    
    // Emit event to update fundraising progress (if parent component is listening)
    emit('orderCompleted', total.value)
    
  } catch (error) {
    showMessage('There was an error processing your order. Please try again.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const showMessage = (message, type) => {
  const messageDiv = document.createElement('div')
  messageDiv.className = `${type}-message`
  messageDiv.textContent = message
  
  const orderSection = document.getElementById('order')
  orderSection.insertBefore(messageDiv, orderSection.firstChild)
  
  // Scroll to message
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(messageDiv)) {
      messageDiv.remove()
    }
  }, 5000)
}

const emit = defineEmits(['orderCompleted'])
</script>

<style scoped>
.order {
  padding: 80px 0;
  background: white;
}

.order-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #a8dadc;
}

.cart-section {
  background: #fef7ff;
  padding: 2rem;
  border-radius: 12px;
  height: fit-content;
}

.cart-section h3 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.cart-items {
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 600;
  color: #2c3e50;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.quantity-btn {
  background: #e9ecef;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background: #dee2e6;
}

.item-price {
  font-weight: 600;
  color: #d4a5d4;
}

.empty-cart {
  text-align: center;
  color: #999;
  font-style: italic;
}

.cart-total {
  border-top: 2px solid #e9ecef;
  padding-top: 1rem;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.total-main {
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
  border-top: 1px solid #e9ecef;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .order-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>