<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-content">
        <div class="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions about our charity event or need more information?</p>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <span>(555) 123-4567</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>charity@lionsclub.org</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>123 Community Center Dr, Your City, ST 12345</span>
          </div>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="event-info">
          <h3>Event Details</h3>
          <div class="event-detail">
            <strong>When:</strong> Every Saturday in October
          </div>
          <div class="event-detail">
            <strong>Time:</strong> 10:00 AM - 6:00 PM
          </div>
          <div class="event-detail">
            <strong>Pickup Location:</strong> Community Center Parking Lot
          </div>
          <div class="event-detail">
            <strong>Pre-orders:</strong> Recommended for guaranteed availability
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Contact section component - no reactive data needed
</script>

<style scoped>
.contact {
  padding: 80px 0;
  background: #f0f9ff;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.contact-item i {
  width: 20px;
  margin-right: 1rem;
  color: #f4a5a5;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #f4a5a5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
}

.event-info {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.event-detail {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.event-detail:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>