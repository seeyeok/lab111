<template>
  <div>
    <HeroSection ref="heroRef" />
    <AboutSection />
    <MenuSection />
    <OrderSection @order-completed="handleOrderCompleted" />
    <OptInSection />
    <ContactSection />
  </div>
</template>

<script setup>
const heroRef = ref(null)

// Handle order completion and update fundraising progress
const handleOrderCompleted = (orderTotal) => {
  if (heroRef.value) {
    heroRef.value.updateRaisedAmount(orderTotal)
  }
}

// Add smooth scrolling behavior for anchor links
onMounted(() => {
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        const headerHeight = 80 // Header height
        const targetPosition = target.offsetTop - headerHeight - 20
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    })
  })

  // Update active nav links on scroll
  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')
    const scrollPosition = window.scrollY + 100

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'))
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add('active')
        }
      }
    })
  }

  window.addEventListener('scroll', updateActiveNavLink)
  updateActiveNavLink() // Initial call
})

// Set page meta
useHead({
  title: 'Lions Club Charity Ice Cream Event',
  meta: [
    { name: 'description', content: 'Join Lions Club in raising funds for our community through delicious artisan ice cream' }
  ]
})
</script>

<style>
/* Global styles for active nav link */
.nav-link.active {
  color: #f4a5a5;
}

.nav-link.active::after {
  width: 100%;
}
</style>