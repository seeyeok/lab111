<template>
  <header class="header">
    <div class="container">
      <div class="nav-brand">
        <i class="fas fa-paw"></i>
        <span>Lions Club</span>
      </div>
      <nav class="nav" :class="{ 'mobile-nav-open': mobileMenuOpen }">
        <NuxtLink to="#home" class="nav-link" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="#about" class="nav-link" @click="closeMobileMenu">About</NuxtLink>
        <NuxtLink to="#menu" class="nav-link" @click="closeMobileMenu">Ice Cream Menu</NuxtLink>
        <NuxtLink to="#order" class="nav-link" @click="closeMobileMenu">Order Now</NuxtLink>
        <NuxtLink to="#contact" class="nav-link" @click="closeMobileMenu">Contact</NuxtLink>
      </nav>
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Close mobile menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
      mobileMenuOpen.value = false
    }
  })
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.nav-brand {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f4a5a5;
}

.nav-brand i {
  margin-right: 8px;
  font-size: 1.8rem;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #f4a5a5;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #f4a5a5;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: left 0.3s ease;
    z-index: 999;
  }
  
  .nav.mobile-nav-open {
    left: 0;
  }
  
  .nav-link {
    margin: 1rem 0;
    font-size: 1.2rem;
  }
  
  .mobile-menu-btn {
    display: block;
  }
}
</style>