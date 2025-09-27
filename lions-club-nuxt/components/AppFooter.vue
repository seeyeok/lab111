<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <i class="fas fa-paw"></i>
            <span>Lions Club</span>
          </div>
          <p>Serving our community with pride and dedication</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><NuxtLink to="#home">Home</NuxtLink></li>
            <li><NuxtLink to="#about">About</NuxtLink></li>
            <li><NuxtLink to="#menu">Menu</NuxtLink></li>
            <li><NuxtLink to="#order">Order</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>charity@lionsclub.org</p>
          <p>(555) 123-4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 Lions Club. All rights reserved. | Website created for charity purposes</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component - no reactive data needed
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-brand i {
  margin-right: 8px;
  color: #f4a5a5;
}

.footer h4 {
  color: white;
  margin-bottom: 1rem;
}

.footer ul {
  list-style: none;
}

.footer li {
  margin-bottom: 0.5rem;
}

.footer a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #f4a5a5;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  text-align: center;
  color: #bdc3c7;
}
</style>