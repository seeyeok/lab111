<template>
  <section id="menu" class="menu">
    <div class="container">
      <div class="section-header">
        <h2>Our Ice Cream Menu</h2>
        <p>Choose from our selection of premium flavors</p>
      </div>
      <div class="menu-grid">
        <div v-for="item in menuItems" :key="item.id" class="menu-item fade-in">
          <div class="menu-item-image">
            <i class="fas fa-ice-cream"></i>
          </div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <div class="price">${{ item.price }}</div>
          <button 
            class="btn btn-small add-to-cart" 
            @click="addToCart(item)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { addToCart } = useCart()

const menuItems = [
  {
    id: 1,
    name: 'Classic Vanilla Bean',
    description: 'Rich Madagascar vanilla with real vanilla bean specks',
    price: 8
  },
  {
    id: 2,
    name: 'Chocolate Fudge',
    description: 'Decadent dark chocolate with fudge swirls',
    price: 8
  },
  {
    id: 3,
    name: 'Strawberry Swirl',
    description: 'Fresh strawberry ice cream with berry compote',
    price: 8
  },
  {
    id: 4,
    name: 'Mint Chocolate Chip',
    description: 'Cool mint with premium chocolate chips',
    price: 8
  },
  {
    id: 5,
    name: 'Cookies & Cream',
    description: 'Vanilla ice cream loaded with cookie pieces',
    price: 8
  },
  {
    id: 6,
    name: 'Caramel Pecan',
    description: 'Butter caramel with roasted pecans',
    price: 9
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

  const menuItems = document.querySelectorAll('.menu-item')
  menuItems.forEach(item => observer.observe(item))
})
</script>

<style scoped>
.menu {
  padding: 80px 0;
  background: #f0f9ff;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.menu-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(168, 218, 220, 0.2);
}

.menu-item-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #a8dadc, #b5ead7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
}

.menu-item h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.menu-item p {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #666;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #d4a5d4;
  margin-bottom: 1rem;
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
  .menu-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>