<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <div>
        <h1 class="hero-title">Sweet Treats for a Sweet Cause</h1>
        <p class="hero-subtitle">Join Lions Club in raising funds for our community through delicious artisan ice cream</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">$25,000</span>
            <span class="stat-label">Goal</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ formatCurrency(raisedAmount) }}</span>
            <span class="stat-label">Raised</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ completionPercentage }}%</span>
            <span class="stat-label">Complete</span>
          </div>
        </div>
        <div class="hero-buttons">
          <a href="#order" class="btn btn-primary">Order Ice Cream</a>
          <a href="#about" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
      <div class="hero-image">
        <div class="ice-cream-illustration">
          <i class="fas fa-ice-cream"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const raisedAmount = ref(8750)
const goal = 25000

const completionPercentage = computed(() => {
  return Math.round((raisedAmount.value / goal) * 100)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Function to update raised amount (can be called from cart)
const updateRaisedAmount = (newAmount) => {
  raisedAmount.value += newAmount
}

// Expose function for parent components
defineExpose({
  updateRaisedAmount
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%);
  padding: 120px 0 80px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="ice-cream" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="%23f4a5a5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23ice-cream)"/></svg>') repeat;
  z-index: 1;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #d4a5d4;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ice-cream-illustration {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ffb3d9, #ffc1e3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 20px 40px rgba(255, 179, 217, 0.4);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>