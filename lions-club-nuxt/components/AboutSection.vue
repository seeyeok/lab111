<template>
  <section id="about" class="about">
    <div class="container">
      <div class="section-header">
        <h2>Making a Difference, One Scoop at a Time</h2>
        <p>Every purchase supports Lions Club's community initiatives and local families in need</p>
      </div>
      <div class="about-grid">
        <div v-for="card in aboutCards" :key="card.id" class="about-card fade-in">
          <div class="card-icon">
            <i :class="card.icon"></i>
          </div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const aboutCards = [
  {
    id: 1,
    icon: 'fas fa-heart',
    title: 'Community Support',
    description: 'Funds raised go directly to supporting local families, food banks, and community programs in our area.'
  },
  {
    id: 2,
    icon: 'fas fa-users',
    title: 'Lions Club Mission',
    description: 'We serve our community through various charitable initiatives, focusing on vision care, hunger relief, and youth programs.'
  },
  {
    id: 3,
    icon: 'fas fa-trophy',
    title: 'Quality Treats',
    description: 'Premium artisan ice cream made with locally sourced ingredients, ensuring every bite is worth the cause.'
  }
]

// Animation on scroll
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  const aboutCards = document.querySelectorAll('.about-card')
  aboutCards.forEach(card => observer.observe(card))
})
</script>

<style scoped>
.about {
  padding: 80px 0;
  background: white;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.about-card {
  background: #fef7ff;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f4a5a5, #e8b4b8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: white;
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>