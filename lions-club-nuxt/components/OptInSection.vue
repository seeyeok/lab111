<template>
  <section class="opt-in">
    <div class="container">
      <div class="opt-in-content">
        <div class="opt-in-text">
          <h2>Stay Updated</h2>
          <p>Join our mailing list to receive updates about upcoming charity events, special ice cream flavors, and community initiatives from Lions Club.</p>
          <div class="benefits">
            <div class="benefit">
              <i class="fas fa-bell"></i>
              <span>Event notifications</span>
            </div>
            <div class="benefit">
              <i class="fas fa-ice-cream"></i>
              <span>Special flavor announcements</span>
            </div>
            <div class="benefit">
              <i class="fas fa-heart"></i>
              <span>Community impact updates</span>
            </div>
          </div>
        </div>
        <div class="opt-in-form">
          <form @submit.prevent="submitOptIn" class="newsletter-form">
            <h3>Subscribe to Our Newsletter</h3>
            <div class="form-group">
              <label for="opt-name">Full Name</label>
              <input 
                type="text" 
                id="opt-name" 
                v-model="optInForm.name" 
                required
                :class="{ error: errors.name }"
                placeholder="Enter your full name"
              >
              <div v-if="errors.name" class="field-error">{{ errors.name }}</div>
            </div>
            <div class="form-group">
              <label for="opt-email">Email Address</label>
              <input 
                type="email" 
                id="opt-email" 
                v-model="optInForm.email" 
                required
                :class="{ error: errors.email }"
                placeholder="Enter your email address"
              >
              <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
            </div>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="optInForm.consent" 
                  required
                >
                <span class="checkmark"></span>
                I agree to receive email updates from Lions Club about charity events and community initiatives.
              </label>
            </div>
            <button 
              type="submit" 
              class="btn btn-primary btn-full"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Subscribing...' : 'Subscribe Now' }}
            </button>
            <p class="privacy-note">
              <i class="fas fa-lock"></i>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { subscribeToNewsletter } = useSupabase()

const optInForm = ref({
  name: '',
  email: '',
  consent: false
})

const errors = ref({})
const isSubmitting = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!optInForm.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!optInForm.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!isValidEmail(optInForm.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  return Object.keys(errors.value).length === 0
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const submitOptIn = async () => {
  if (!validateForm()) {
    return
  }
  
  if (!optInForm.value.consent) {
    showMessage('Please agree to receive email updates to subscribe.', 'error')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Submit to Supabase
    const result = await subscribeToNewsletter({
      name: optInForm.value.name,
      email: optInForm.value.email,
      consent: optInForm.value.consent
    })
    
    if (result.success) {
      showMessage(
        `Thank you ${optInForm.value.name}! You've been successfully subscribed to our newsletter. Check your email for a confirmation.`,
        'success'
      )
      
      // Reset form
      optInForm.value = {
        name: '',
        email: '',
        consent: false
      }
    } else {
      throw new Error(result.error?.message || 'Subscription failed')
    }
    
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    showMessage('There was an error subscribing to our newsletter. Please try again.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const showMessage = (message, type) => {
  const messageDiv = document.createElement('div')
  messageDiv.className = `${type}-message`
  messageDiv.textContent = message
  
  const optInSection = document.querySelector('.opt-in')
  optInSection.insertBefore(messageDiv, optInSection.firstChild)
  
  // Scroll to message
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(messageDiv)) {
      messageDiv.remove()
    }
  }, 5000)
}
</script>

<style scoped>
.opt-in {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  position: relative;
  overflow: hidden;
}

.opt-in::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="newsletter" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23a8dadc" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23newsletter)"/></svg>') repeat;
  z-index: 1;
}

.opt-in-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.opt-in-text h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.opt-in-text p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: #2c3e50;
}

.benefit i {
  width: 20px;
  color: #f4a5a5;
}

.opt-in-form {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(168, 218, 220, 0.2);
}

.newsletter-form h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #a8dadc;
}

.form-group input.error {
  border-color: #e74c3c;
}

.checkbox-group {
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  line-height: 1.4;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e9ecef;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #a8dadc;
  border-color: #a8dadc;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.privacy-note {
  text-align: center;
  font-size: 0.85rem;
  color: #999;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.privacy-note i {
  color: #a8dadc;
}

.field-error {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .opt-in-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .opt-in-text h2 {
    font-size: 2rem;
  }
  
  .opt-in-form {
    padding: 2rem;
  }
  
  .benefits {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .opt-in {
    padding: 60px 0;
  }
  
  .opt-in-text h2 {
    font-size: 1.75rem;
  }
  
  .opt-in-form {
    padding: 1.5rem;
  }
}
</style>