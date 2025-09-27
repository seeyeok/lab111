export const useCart = () => {
  const cartItems = ref([])

  const addToCart = (item) => {
    const existingItem = cartItems.value.find(cartItem => cartItem.name === item.name)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        name: item.name,
        price: item.price,
        quantity: 1
      })
    }
    
    showNotification('Item added to cart!')
  }

  const removeFromCart = (itemName) => {
    cartItems.value = cartItems.value.filter(item => item.name !== itemName)
  }

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemName)
      return
    }
    
    const item = cartItems.value.find(item => item.name === itemName)
    if (item) {
      item.quantity = newQuantity
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const donation = computed(() => {
    return subtotal.value * 0.1 // 10% donation
  })

  const total = computed(() => {
    return subtotal.value + donation.value
  })

  const itemCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const showNotification = (message) => {
    // Create notification element
    const notification = document.createElement('div')
    notification.className = 'success-message'
    notification.textContent = message
    notification.style.position = 'fixed'
    notification.style.top = '100px'
    notification.style.right = '20px'
    notification.style.zIndex = '9999'
    notification.style.opacity = '0'
    notification.style.transform = 'translateY(-20px)'
    notification.style.transition = 'all 0.3s ease'

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1'
      notification.style.transform = 'translateY(0)'
    }, 10)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transform = 'translateY(-20px)'
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  return {
    cartItems: readonly(cartItems),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    donation,
    total,
    itemCount,
    formatCurrency
  }
}